const express =require("express");
const router = express.Router();
const poll = require("../schema/Poll");
const mongo = require("mongoose");

module.exports.create_poll = (req,res)=> {
    let question = req.body.Question;
    let options = req.body.Options;
    let category = req.body.Category;
    let creator_Id = req.body.creatorId;
    const Poll = new poll({
        Question: question,
        Options: options,
        Category: category,
        creatorId:creator_Id
    })
    Poll.save()
    .then(result=>{
        console.log("Poll Created Successfully");
        res.status(201).json({
            newPoll: result
        })
    })
    .catch(err=>{
        console.log("Error Occured");
        res.status(500).json({
            error:err
        })
    });
}