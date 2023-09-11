/*const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

const connectToDB  = async () => {
  try {
    // Connect using MongoClient
    const client = await MongoClient.connect(MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('MongoClient connected');

    // Access a specific database using MongoClient
    const mongoDB = client.db('your-database-name'); // Specify your database name here

    // Connect using Mongoose
    await mongoose.connect(MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Mongoose connected');

    // Perform MongoDB operations using MongoClient or Mongoose as needed
    // For example, you can access collections and perform CRUD operations
    const collection = mongoDB.collection('your-collection-name'); // Specify your collection name here
    // You can use collection.insertOne(), collection.find(), etc.

  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

connectToDB();

*/
const { MongoClient } = require('mongodb');
require('dotenv').config()
const MONGO_URL = process.env.MONGO_URL
//const MONGO_URL='mongodb://127.0.0.1:27017'
const connectToDB = async () => {
  try {
    const client = await MongoClient.connect(MONGO_URL,{
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log('MongoDB connected');
    return client.db('zomatoApp');
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports=connectToDB 









