const connectToDB =require('../db')
const express = require('express');
const router = express.Router();
router.get('/', async (req, res) => {
    try {
      const db = await connectToDB();
      const restaurantData = db.collection('mealTypes'); // Access the collection using collection() method
      const data = await restaurantData.find().toArray();
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;
  
  