const express =require("express");
const router = express.Router();
const poll = require("../schema/Poll");
const userModule = require("../schema/User");
const mongo = require("mongoose");
const { receiveCategory } = require("./Categories");

module.exports.create_poll = (req,res)=> {
    console.log("create poll route hit");
    let question = req.body.Question;
    let options = req.body.Options;
    let category = req.body.Category;
    let creatorId = req.body.creatorId;
    const Poll = new poll({
        Question: question,
        Options: options,
        Category: category,
        creatorId:creatorId
    })
    console.log(Poll)
    //finding creator of poll and then saving poll's id in  creators createdpoll array
    //and saving Poll
     userModule
    .findById(creatorId).then((user)=>{
        console.log("user found successfull",user);
        //creating poll
          Poll.save()
    .then(result=>{
        // after poll created take its id and attach to creator
        receiveCategory(Poll.Category);
        let newcreatedPollIds=[result._id.toString(),...user.createdPollIds]
        console.log(user._id.toString(),typeof(user._id));
        console.log("new creaters poll array is ",newcreatedPollIds);
        userModule.updateOne({_id:user._id.toString()},{$set:{createdPollIds:newcreatedPollIds}}).then((result)=>{
            console.log("creator- and- poll attachment successfull");
            return;
        }).catch((err)=>{
            console.log("Creator and Poll not synced ");
            res.status(500).json({
                error:err
            })    
        })

        console.log("Poll Created Successfully");
        res.status(201).json({
            msg:"Poll Created successfully",
            newPoll: result
        })
    })
    .catch(err=>{
        console.log("failed to create poll");
        res.status(500).json({
            error:err
        })
        return;
    });


    }).catch((err)=>{
        console.log("No such user exist how poll will be created by such user")
        
        res.status(500).json({
            msg:"User not locatable",
            error:err,
        })
        return;
    })
  
}
// THis will be used to fetch all the polls or we can use it by modifying and fetch query polls by passing in find as object.
module.exports.getAllPolls = (req,res) =>{
    poll.find().sort({_id:-1})
    .then(result=>{
        console.log("Fetched all polls");
        res.status(201).json({
            poll : result
        })
    })
    .catch(err=>{
        console.log("Error Occured");
        res.status(500).json({
            error : err
        })
    })
}

//this is use to fetch poll by id

module.exports.getPoll = (req,res) =>{
    const id = req.body.pid;
    console.log(req.body.pid)
    poll.findById(id)
    .then(result =>{
        console.log("Poll fetch Successfully",result);
        res.status(201).json({
            poll : result
        })
    })

    .catch(err=>{
        console.log("Error Occured");
        res.status(500).json({
            error : err
        })
    })
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