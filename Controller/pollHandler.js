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

module.exports.submit_poll = (req,res)=>{
    let pollId = req.body.pollId;
    let voter_id = req.body.voter_id;
    let option = req.body.option;
    
    poll.findById(pollId)
    .then(result=>{
        let newCount =  result.Options[option].count+1;
        
        let newOptions=[...result.Options]
        
        newOptions[option].count=newCount;
        
        let newVoterId = [...result.voter_ids,voter_id]
        console.log(newOptions)
        console.log(newVoterId)
        poll.updateOne({_id:pollId},{$set:{Options:newOptions,voter_ids:newVoterId}})
        .then(result=>{
            console.log("Poll Updated Successfully");
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



       

    })

    .catch(err=>{
        console.log("PollId not found in the server");
        res.status(500).json({
            error:err
        })
    })

}