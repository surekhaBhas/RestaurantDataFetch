const express=require('express');
const app=express();
const PORT=8900;


app.use(express.json())

app.use('/locations', require('./routes/locations'));
app.use('/filter', require('./routes/filter'));
app.use('/menu', require('./routes/pagination'));



app.use('*', (req, res) => {
    res.status(404).json({"message": "Not Found"});
  });

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})