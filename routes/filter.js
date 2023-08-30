const express=require('express')
const router=express.Router()
const getFilterData=require("../controllers/filterController")


router.get('/',getFilterData)


module.exports=router;
