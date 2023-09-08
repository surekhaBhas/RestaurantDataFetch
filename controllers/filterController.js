const restaurantData=require('../model/restaurantData.json')
const connectToDB =require('../db')

getFilterData=async(req,res)=>{
    const db=await connectToDB();
    const restaurantCollection=db.collection('restaurantData')
    const mealId=req.params.mealId;
    let cuisineIds=req.query.cuisine_id;
    const lcost=Number(req.query.lcost);
    const hcost=Number(req.query.hcost) 
    const locationId=req.query.location_id
    const sort=Number(req.query.sort)
    try{
      if(req.query){
         
        let query = { "type.mealtype": mealId };

       
          if (cuisineIds) {
            cuisineIds = Array.isArray(cuisineIds) ? cuisineIds : cuisineIds.split(',');
            query["Cuisine.cuisine"] = { $in: cuisineIds };
          }
        
    
        if (lcost && hcost) {
          query.cost = { $gt: lcost, $lt: hcost };
        }
    
        if (locationId) {
          query.location_id = locationId;
        }
    
        let data = await restaurantCollection.find(query);
    
        if (sort) {
          data = data.sort({ cost: sort });
        }
    
        data = await data.toArray();
        res.status(200).json(data)
      }else{
        const result=await restaurantCollection.find({ "type.mealtype": mealId }).toArray()
        res.status(200).json(result)
      }

    }catch(err){
        res.status(500)
        console.log(err.message)
        
    }
}

module.exports=getFilterData;