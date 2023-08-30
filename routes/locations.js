const express=require('express')
const router=express.Router()
const getRestaurantData=require("../controllers/locationController")

router.get('/:cityName',getRestaurantData)

module.exports=router;
