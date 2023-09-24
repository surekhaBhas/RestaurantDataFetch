const express=require('express');
const router=express.Router()
const {payments,paymentsCallback} =require('../controllers/Payments')
router.post('/payment',payments);
router.post('/paymentsCallback',paymentsCallback)

module.exports=router;