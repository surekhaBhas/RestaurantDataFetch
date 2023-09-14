const orders = require('../model/order');
const { format } = require('date-fns');

const postOrderDetails = async (req, res) => {
    const date = format(new Date(), 'dd/MM/yyyy HH:mm:ss');

    const {
        username,
        email,
        address,
        phone,
        cost,
        restaurantName,
        menuItem
    } = req.body;

    const lastOrder = await orders.findOne().sort({ order_id: -1 });
    const orderId = lastOrder ? lastOrder.order_id + 1 : 1;
    
    try {
        const result = await orders.create({
            "order_id": orderId,
            "name": username,
            "email": email,
            "address": address,
            "phone": phone,
            "cost": cost,
            "restaurant_name": restaurantName,
            "menu_item": menuItem,
            "date": date
        });

        console.log(result);
        res.status(201).json({ "order_id":`${orderId}`,"Success": `order Details of ${username} created` });
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
}


const getAllUserDetails=async(req,res)=>{
     try{
        const result=await orders.find().sort( {order_id: -1})
        res.status(200).json(result)
     }catch(err){
        console.log(err)
     }
}

const getUserByOrderId=async(req,res)=>{
    const orderId=req.params.orderId
    try{
        const result=await orders.findOne({"order_id":orderId})
        res.status(200).json(result)
    }catch(err){
        console.log(err)
    }
}
module.exports = {postOrderDetails,getAllUserDetails,getUserByOrderId};
