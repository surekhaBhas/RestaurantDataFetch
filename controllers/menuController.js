const restaurantData=require('../model/restaurantData.json')
const connectToDB =require('../db')

getMenuData=async(req,res)=>{
    const db=await connectToDB();
    const restaurantCollection=db.collection('restaurantMenu')
    try{
        const restaurantId=req.params.restaurantId
        const result=await restaurantCollection.find({ "restaurant_id": restaurantId }).toArray()
        res.status(200).json(result)
      }

    catch(err){
        res.status(500)
        console.log(err.message)
        
    }
}

module.exports=getMenuData;