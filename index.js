const express=require('express');
const app=express();
const PORT=8900;
const cors=require('cors');
const mongoose=require('mongoose');
const connectDB=require('./dbConn')
const cookieParser=require('cookie-parser');
const verifyJWT=require('./middleware/verifyJWT')

const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true, 
};

app.use(cors(corsOptions));

connectDB()
app.use(cookieParser());

app.use(express.json())

app.use('/register',require('./routes/register'))
app.use('/login',require('./routes/login'))
app.use('/refresh',require('./routes/refresh'))
app.use('/',require('./routes/logout'))
app.use(verifyJWT)
app.use('/locations', require('./routes/locations'));
app.use('/cities', require('./routes/city'));
app.use('/filter', require('./routes/filter'));
app.use('/quickSearch', require('./routes/quickSearch'));
app.use('/restaurant', require('./routes/restaurant'));
app.use('/details/restaurant', require('./routes/restaurantDetail'));
app.use('/menu', require('./routes/menu'));


app.use('*', (req, res) => {
    res.status(404).json({"message": "Not Found"});
  });

  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

