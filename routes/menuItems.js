const express=require('express')
const router=express.Router()
const getMenuItems=require("../controllers/menuItemsController")


router.get('/',getMenuItems)


module.exports=router;
