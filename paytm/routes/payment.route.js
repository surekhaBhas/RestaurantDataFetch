const express = require("express");
const router = express.Router();

// include payment controller
const { paynow, callback } = require("../controllers/payment.controller");

router.post("/paynow", paynow);
router.post("/callback", callback);

module.exports = router;