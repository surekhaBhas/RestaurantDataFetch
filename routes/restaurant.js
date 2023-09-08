const connectToDB =require('../db')
const express = require('express');
const router = express.Router();
router.get('/', async (req, res) => {
    try {
      const db = await connectToDB();
      const restaurantCollection=db.collection('restaurantData') 
      const cityId=req.query.city_id;
      const mealId=req.query.meal_id;
      if(cityId && mealId){
        const data = await restaurantCollection.find({ 
          "type.mealtype":mealId,
          "city":cityId
        }).toArray();
        res.json(data)
      }
      else if(cityId){
        const data=await restaurantCollection.find({ 
          "city":cityId
        }).toArray();
        res.json(data)
      }
      else if(mealId){
        const data=await restaurantCollection.find({ 
          "type.mealtype":mealId
        }).toArray();
        res.json(data)
      }
    
      else {
        const data = await restaurantCollection.find().toArray();
       
        res.json(data);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  
  
  module.exports = router;