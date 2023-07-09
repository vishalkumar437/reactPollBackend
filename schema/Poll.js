const mongoose = require('mongoose')

const Poll = new mongoose.Schema({
    
    Question : String,
    Options: { type : []},
    Category: { type : [] },
    creatorId: mongoose.Schema.Types.ObjectId,
    voter_id: { type: [] }

})

module.exports = mongoose.model('Poll',Poll)