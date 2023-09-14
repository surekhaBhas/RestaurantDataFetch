const mongoose=require('mongoose');
const Schema=mongoose.Schema

const orderSchema=new Schema({
    order_id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
       type: Number,
       required:true
    },
    cost:{
        type:Number,
        required:true 
    },
    restaurant_name:{
        type:String,
        required:true
    },
    menu_item:{
        type:Array,
        required:true
    },
    date:{
        type:String
    },
    bank_name:{
        type:String
    }

})

module.exports=mongoose.model("orders",orderSchema)