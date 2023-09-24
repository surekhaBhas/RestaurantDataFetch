// require all the packages needed

require('dotenv').config();
const formidable = require('formidable');
const https = require('https');
const { v4: uuidv4 } = require('uuid');

// import the paytmChecksum to authenticate the payment requests
const PaytmChecksum = require('./PaytmChecksum');


exports.payments = (req, res) => {
    const {
        amount
        
    } = req.body;

    // prepare the request Object
    let params = {
        MID: process.env.PAYTM_MERCHANT_ID,
        WEBSITE: process.env.PAYTM_WEBSITE,
        CHANNEL_ID: process.env.PAYTM_CHANNEL_ID,
        INDUSTRY_TYPE_ID: process.env.PAYTM_INDUSTRY_TYPE,
        ORDER_ID: uuidv4(),
        CUST_ID: 'tsurekha3@gmail.com',
        TXN_AMOUNT: amount.toString(),
        EMAIL: "tsurekha3@gmail.com",
        MOBILE_NO: '9032586651',
        CALLBACK_URL: 'http://localhost:8900/paytm/paymentCallback'
    };

    // use paytmchecksum to generate a signature
    let paytmChecksum = PaytmChecksum.generateSignature(params, process.env.PAYTM_MERCHANT_KEY);

    paytmChecksum.then(response => {
        let paytmChecksumResp = {
            ...params,
            "CHECKSUMHASH": response
        };
        res.json(paytmChecksumResp);
    }).catch(error => {
        res.status(500).json({
            message: 'Error in Payment',
            error: error
        });
    });
}

exports.paymentsCallback = (req, res) => {
    // it is called by paytm system, Paytm server will send the transaction status here
    // we need to read this transaction details

    try {

        const form = new formidable.IncomingForm();

        form.parse(req, (error, fields, file) => {

            // check if it is an error or not
            if (error) {
                console.log(error);
                res.status(500).json({ error });
            }

            // verify the signature
            const checksumHash = fields.CHECKSUMHASH;
            const isVerified = PaytmChecksum.verifySignature(fields, process.env.PAYTM_MERCHANT_KEY, checksumHash);

            if (isVerified) {
                // response from the paytm server is valid
                // make an API call to the paytm server to get the transaction status

                let params = {
                    MID: fields.MID,
                    ORDER_ID: fields.ORDERID
                };
                
                PaytmChecksum.generateSignature(params, process.env.PAYTM_MERCHANT_KEY)
                    .then(checksum => {
                        params["CHECKSUMHASH"] = checksum;
                        const data = JSON.stringify(params);
                        const reqObject = {
                            hostname: 'securegw-stage.paytm.in',
                            port: '443',
                            path: '/order/status',
                            method: 'POST',
                            header: {
                                'Content-Type': 'application/json',
                                'Content-Length': data.length
                            },
                            data: data
                        }
                        let response = "";
                        let request = https.request(reqObject, (responseFromPaytm) => {
                            responseFromPaytm.on('data', (chunk) => {
                                response += chunk;
                            });
                            responseFromPaytm.on('end', () => {
                                if (JSON.parse(response).STATUS === 'TXN_SUCCESS') {
                                    // transaction is successfull
                                    // zomato BE will inform the zomato FE

                                    // TODO: Learner Task: save the order details and transaction status to the Database
                                    res.sendFile(__dirname + '/txn_success.html');
                                } else {
                                    // transaction in failure
                                    // zomato BE will inform the zomato FE
                                    
                                    // TODO: Learner Task: save the order details and transaction status to the Database
                                    res.sendFile(__dirname + '/txn_failure.html');
                                }
                            });
                        });
                        request.write(data);
                        request.end();
                    }).catch(error => {
                        res.status(500).json({
                            message: "Error in Payment",
                            error: error
                        });
                    })
            } else {
                // response is not valid
                console.log("checksum mismatch");
                res.status(500).json({ error: "It's a hacker !" });
            }
        });

    } catch (e) {
        res.sendFile(__dirname, + '/txn_failure.html');
    }
}