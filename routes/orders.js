const express=require('express');
const router=express.Router()
const {postOrderDetails,getAllUserDetails,getUserByOrderId,deleteOrder,updateOrders}=require('../controllers/orderController')

router.post('/',postOrderDetails)
router.get('/',getAllUserDetails)
router.get('/:orderId',getUserByOrderId)
router.delete('/:orderId',deleteOrder)
router.put('/:orderId',updateOrders)
module.exports=router