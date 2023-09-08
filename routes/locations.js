const express=require('express')
const router=express.Router()
const getLocationData=require("../controllers/locationController")

router.get('/',getLocationData)

module.exports=router;
