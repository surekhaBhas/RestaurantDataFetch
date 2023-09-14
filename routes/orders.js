const express=require('express');
const router=express.Router()
const {postOrderDetails,getAllUserDetails,getUserByOrderId}=require('../controllers/orderController')

router.post('/',postOrderDetails)
router.get('/',getAllUserDetails)
router.get('/:orderId',getUserByOrderId)
module.exports=router