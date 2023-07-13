const express = require('express');
const app = express();
const mongo= require('mongoose');
const bd=require('body-parser');
const pollRoute = require("./routes/pollRoute")
const userRoute= require("./routes/userRoute");
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

mongo.connect("mongodb+srv://ReactPoll:rM8H7VLryG4WylOR@cluster0.lpqrhm7.mongodb.net/?retryWrites=true&w=majority");
//mongo.connect("mongodb+srv://sandip9028162859:akRGllC8ogrg0xRU@cluster0.mrlcme7.mongodb.net/?retryWrites=true&w=majority");


mongo.connection.on('error',err=>{
    console.log("Error connection failed!!");
});

mongo.connection.on('connected',connected=>{
    console.log("Connected Successfully!");
});


app.use(bd.urlencoded({extended:false}));
app.use(bd.json());
app.use(pollRoute);
app.use(userRoute);


app.use((req,res,next)=>{
    res.status(404).json({
        msg: "Error Bad Request"
    })
})

module.exports = app;