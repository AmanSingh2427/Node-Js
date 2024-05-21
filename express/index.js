const express = require('express');
const app = express();
const PORT=5000;

app.get('/',(req,res)=>{
    res.send('Hello World this message is from express')
})

app.get('/about',(req,res)=>{
    res.send('Hello I am Aman Singh')
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

