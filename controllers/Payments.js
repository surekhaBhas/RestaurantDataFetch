const orders = require('../model/order');
require('dotenv').config();
const formidable = require('formidable');
const https = require('https');
const { v4: uuidv4 } = require('uuid');


const PaytmChecksum = require('./PaytmChecksum');


exports.payments = (req, res) => {
    const {
        amount,order
        
    } = req.body;
  console.log(amount,order)
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
        CALLBACK_URL: 'http://localhost:8900/paytm/paymentCallback',
        ORDER:order
    };

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
    

    try {

        const form = new formidable.IncomingForm();

        form.parse(req, (error, fields, file) => {

          
            if (error) {
                console.log(error);
                res.status(500).json({ error });
            }


            const checksumHash = fields.CHECKSUMHASH;
            const isVerified = PaytmChecksum.verifySignature(fields, process.env.PAYTM_MERCHANT_KEY, checksumHash);

            if (isVerified) {
                

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
                            responseFromPaytm.on('end', async() => {
                                const callbackOrder = fields.ORDER;
                                const result = await orders.findOne({ "order_id": callbackOrder });
                
                                if (result) {
                                    if (JSON.parse(fields.STATUS).toUpperCase() === 'TXN_SUCCESS') {
                                        result.payment = "Success";
                                    } else {
                                        result.payment = "Failure";
                                    }
                                    await result.save();
                                }
                                if (JSON.parse(response).STATUS === 'TXN_SUCCESS') {
                                    
                                    res.sendFile(__dirname + '/txn_success.html');
                                } else { 
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
            
                console.log("checksum mismatch");
                res.status(500).json({ error: "It's a hacker !" });
            }
        });

    } catch (e) {
        res.sendFile(__dirname, + '/txn_failure.html');
    }
}