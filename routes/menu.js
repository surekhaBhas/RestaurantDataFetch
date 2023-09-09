const express=require('express')
const router=express.Router()
const getMenuData=require("../controllers/menuController")


router.get('/:restaurantId',getMenuData)


module.exports=router;
