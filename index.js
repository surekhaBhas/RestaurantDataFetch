const express=require('express');
const app=express();
const PORT=8900;
const cors=require('cors');
const corsOptions = require('./config/corsOptions');
const mongoose=require('mongoose');
const connectDB=require('./dbConn')
const cookieParser=require('cookie-parser');
const credentials = require('./middleware/credentials');
const verifyJWT=require('./middleware/verifyJWT')
const bodyParser=require('body-parser')
const https=require('https');
const qs=require('querystring')
const dotenv = require("dotenv");
dotenv.config()

app.use(cors(corsOptions));
app.use(credentials);


connectDB()



app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/register',require('./routes/register'))
app.use('/login',require('./routes/login'))
app.use('/refresh',require('./routes/refresh'))
app.use('/logout',require('./routes/logout'))
app.use('/locations', require('./routes/locations'));
app.use('/cities', require('./routes/city'));
app.use('/filter', require('./routes/filter'));
app.use('/quickSearch', require('./routes/quickSearch'));
app.use('/restaurant', require('./routes/restaurant'));
app.use('/details/restaurant', require('./routes/restaurantDetail'));
app.use('/menu', require('./routes/menu'));
app.use('/menuItems',require('./routes/menuItems'))

app.use(verifyJWT)
app.use('/orders',require('./routes/orders'))
app.use('/paytm',require('./routes/paytm'))



app.use('*', (req, res) => {
    res.status(404).json({"message": "Not Found"})
  });

  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

