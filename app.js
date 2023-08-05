const express = require('express');
const app = express();
const dotenv=require('dotenv');
const mongo= require('mongoose');
const bd=require('body-parser');
const pollRoute = require("./routes/pollRoute")
const userRoute= require("./routes/userRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
dotenv.config();

// mongo.connect(process.env.DB_URL_VISHAL);
mongo.connect(process.env.DB_URL_DASHRATH);

mongo.connection.on('error',err=>{
    console.log("Error connection failed!!");
});

mongo.connection.on('connected',connected=>{
    console.log("Connected Successfully!");
});


app.use(bd.urlencoded({extended:false,limit:"50mb"}));
app.use(bd.json({limit:"50mb"}));
app.use(pollRoute);
app.use(userRoute);
app.use(categoriesRoute);


app.use((req,res,next)=>{
    res.status(404).json({
        msg: "Error Bad Request"
    })
})

module.exports = app;