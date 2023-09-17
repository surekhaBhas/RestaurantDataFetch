const express = require("express");

const ejs = require("ejs");
const router = express.Router();
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const {initPayment, responsePayment} = require("./paytm/services/index");



router.get("/paywithpaytm", (req, res) => {
    initPayment(req.query.amount).then(
        success => {
            res.render("paytmRedirect.ejs", {
                resultData: success,
                paytmFinalUrl: process.env.PAYTM_FINAL_URL
            });
        },
        error => {
            res.send(error);
        }
    );
});

router.post("/paywithpaytmresponse", (req, res) => {
    responsePayment(req.body).then(
        success => {
            res.render("response.ejs", {resultData: "true", responseData: success});
        },
        error => {
            res.send(error);
        }
    );
});


module.exports=router