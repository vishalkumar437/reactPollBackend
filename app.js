const express = require('express');
const app = express();
const mongo= require('mongoose');
const bd=require('body-parser');

mongo.connect("mongodb+srv://ReactPoll:rM8H7VLryG4WylOR@cluster0.lpqrhm7.mongodb.net/?retryWrites=true&w=majority");

mongo.connection.on('error',err=>{
    console.log("Error connection failed!!");
});

mongo.connection.on('connected',connected=>{
    console.log("Connected Successfully!");
});

module.exports = app;