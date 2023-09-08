const express=require('express');
const app=express();
const PORT=8900;
const cors=require('cors');

app.use(cors())
app.use(express.json())

app.use('/locations', require('./routes/locations'));
app.use('/cities', require('./routes/city'));
app.use('/filter', require('./routes/filter'));
app.use('/menu', require('./routes/pagination'));
app.use('/quickSearch', require('./routes/quickSearch'));
app.use('/restaurant', require('./routes/restaurant'));
app.use('/details/restaurant', require('./routes/restaurantDetail'));
app.use('/menu', require('./routes/menu'));


app.use('*', (req, res) => {
    res.status(404).json({"message": "Not Found"});
  });


app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });

