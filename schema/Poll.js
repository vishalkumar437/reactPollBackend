const mongoose = require('mongoose')

const Poll = new mongoose.Schema({
    
    Question : String,
    Options: { type : []},
    Category: {},
    creatorId: mongoose.Schema.Types.ObjectId,
    voter_ids: { type:[]},
    createdAt : String,

})

module.exports = mongoose.model('Poll',Poll)