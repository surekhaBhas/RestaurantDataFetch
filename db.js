const { MongoClient } = require('mongodb');
const MONGO_URL = 'mongodb://127.0.0.1:27017';


const connectToDB = async () => {
  try {
    const client = await MongoClient.connect(MONGO_URL);
    console.log('MongoDB connected');
    return client.db('zomato');
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports=connectToDB 









