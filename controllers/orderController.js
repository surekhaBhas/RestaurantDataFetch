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

const deleteOrder=async(req,res)=>{
    const orderId=req.params.orderId
    try{
        const result=await orders.deleteOne({"order_id":orderId})
        if (result.deletedCount === 1) {
          
            res.status(204).json({ message: 'Order deleted successfully' });
          } else {
           
            res.status(404).json({ error: 'Order not found' });
          }
    }catch(err){
        console.error('Error deleting order:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateOrders=async(req,res)=>{
    let menuItem=req.query.menuId;
    const cost=req.query.cost;
    const orderId=req.params.orderId 
    menuItem=menuItem.slice(1,menuItem.length-1).split(',')
    
      
    try{
        const result=await orders.findOne({"order_id":orderId})
        result.cost=cost 
        result.menu_item=menuItem 
        await result.save()
        res.status(200).json({ message: 'Menu items and cost updated successfully' });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

module.exports = {postOrderDetails,getAllUserDetails,getUserByOrderId,deleteOrder,updateOrders};
