
const connectToDB =require('../db')

const getMenuData=async(req,res)=>{
    const db=await connectToDB();
    const menuCollection=db.collection('restaurantMenu')
    try{
        const restaurantId=Number(req.params.restaurantId)
        const result=await menuCollection.find({ "restaurant_id": restaurantId }).toArray()
        res.status(200).json(result)
      }

    catch(err){
        res.status(500)
        console.log(err.message)
        
    }
}

module.exports=getMenuData;