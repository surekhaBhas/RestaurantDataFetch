// paytm checksum lib
const PaytmChecksum = require("../lib/paytmChecksum");
const https = require("https");
const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");

// controllers for payment routes

exports.paynow = (req, res, next) => {
	const order_id = uuidv4(); //some random order id
	const amount = req.body.amount; //amount to be paid
	const cust_id = "shivam121820"; //customer id (this can be your db user id)
	const email = "shivam@gmail.com"; //customer email address
	const mobile_no = "7777777777"; //customer mobile no.

	let params = {}; // declare params for paytm

	/* initialize params */
	(params["MID"] = process.env.MERCHANT_ID),
		(params["WEBSITE"] = process.env.WEBSITE),
		(params["CHANNEL_ID"] = process.env.CHANNEL_ID),
		(params["INDUSTRY_TYPE_ID"] = process.env.INDUSTRY_TYPE),
		(params["ORDER_ID"] = order_id),
		(params["CUST_ID"] = cust_id),
		(params["TXN_AMOUNT"] = amount),
		(params["CALLBACK_URL"] = "http://localhost:5500/payment/callback"),
		(params["EMAIL"] = email),
		(params["MOBILE_NO"] = mobile_no);

	// generate checksum hash and pass it to the react front end
	let paytmChecksum = PaytmChecksum.generateSignature(params, process.env.MERCHANT_KEY);
	paytmChecksum
		.then((checksum) => {
			let paytmParams = {
				...params,
				CHECKSUMHASH: checksum,
			};
			res.json(paytmParams); //send json response with paytm params and checksum hash
		})
		.catch((error) => {
			console.log(error.message); // error if any
		});
};

exports.callback = (req, res, next) => {
	// paytm sends and callback response with form data ... we'll use formidable lib to parse the form data
	const form = new formidable.IncomingForm();

	form.parse(req, (err, fields, file) => {
		let paytm_checksum = fields.CHECKSUMHASH;
		delete fields.CHECKSUMHASH;
		console.log(fields);

		// verify the checksum hash
		const isVerified = PaytmChecksum.verifySignature(
			fields,
			process.env.MERCHANT_KEY,
			paytm_checksum
		);

		// if checksum is verified then store the order details inside the db and redirect user to the application page
		if (isVerified) {
			let params = {
				MID: fields.MID,
				ORDERID: fields.ORDERID,
			};

			// generate checksum to get the status of the payment
			PaytmChecksum.generateSignature(params, process.env.MERCHANT_KEY).then((checksum) => {
				params["CHECKSUMHASH"] = checksum;

				var post_data = JSON.stringify(params);
				var options = {
					/* for Staging */
					hostname: "securegw-stage.paytm.in", //for staging (development)
					port: 443,
					path: "/order/status",
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Content-Length": post_data.length,
					},
				};

				var response = "";
				var post_req = https.request(options, function (post_res) {
					post_res.on("data", function (chunk) {
						response += chunk;
					});

					post_res.on("end", function () {
						let result = JSON.parse(response);
						if (result.STATUS === "TXN_SUCCESS") {
							//store data in db
						}
						//redirect user to the frontend
						// res.redirect(`http://localhost:3000/status/${result.ORDERID}`);

						// for now i am redirecting to the backed only
						res.send(result);
					});
				});

				post_req.write(post_data);
				post_req.end();
			});
		}
	});
};