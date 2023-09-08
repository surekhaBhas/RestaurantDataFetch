//const restaurantData=require('../model/restaurantData.json')
const connectToDB =require('../db')

const getLocationData = async(req, res) => {
       const cityId=req.query.city_id;
    try{
        //const data=await restaurantData.filter(data=>data.city_name===cityName)
         const db = await connectToDB();
         const restaurantData = db.collection('locations'); // Access the collection using collection() method
        if(cityId){
          const data = await restaurantData.find({"city_id":cityId}).toArray();
          res.status(200).json(data) 
        }else{
          const data = await restaurantData.find().toArray();
          res.status(200).json(data) 
        }
         
    }catch(err){
        res.status(500).json({ 'message': err.message });
    }
    
    
  };

module.exports=getLocationData