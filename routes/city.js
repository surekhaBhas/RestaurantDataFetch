const connectToDB =require('../db')
const express = require('express');
const router = express.Router();
router.get('/', async (req, res) => {
    try {
      const db = await connectToDB();
      const cityCollection=db.collection('cities') 
     
        const data = await cityCollection.find().toArray()
        res.json(data)
    
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports=router;