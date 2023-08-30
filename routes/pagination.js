const express=require('express')
const router=express.Router()
const getMenuItems=require("../controllers/paginationController")


router.get('/',getMenuItems)


module.exports=router;