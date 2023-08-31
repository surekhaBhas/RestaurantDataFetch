//const restaurantData=require('../model/restaurantData.json')
const connectToDB =require('../db')

const getRestaurantData = async(req, res) => {
  
    try{
      
        if (!req.params.cityName) {
            return res.status(400).json({"message": "City name is required"});
          } 
         let cityName=req.params.cityName
         cityName=cityName.charAt(0).toUpperCase()+cityName.slice(1).toLowerCase()

        //const data=await restaurantData.filter(data=>data.city_name===cityName)
  
         const query={"city_name":cityName}
         const db = await connectToDB();
        
         const restaurantData = db.collection('restaurantData'); // Access the collection using collection() method
         const data = await restaurantData.find(query).toArray();
         if(!data) return res.status(404).json({"message": "City name  not found"})
         res.status(200).json(data) 
       
    }catch(err){
        res.status(500).json({ 'message': err.message });
    }
    
    
  };

module.exports=getRestaurantData