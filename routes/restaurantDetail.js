const connectToDB =require('../db')
const express = require('express');
const router = express.Router();
router.get('/:restaurant_id', async (req, res) => {
    try {
        const restaurantId=req.params.restaurant_id
      const db = await connectToDB();
      const restaurantCollection=db.collection('restaurantData') 
     
        const data = await  restaurantCollection.find({"restaurant_id":restaurantId}).toArray()
        res.json(data)
    
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports=router;