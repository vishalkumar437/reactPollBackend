const mongoose = require("mongoose");



const Categories = new mongoose.Schema({
    MainCategory: {
      name: { type: String, required: true, unique: true },
      pollCount: { type: Number, default: 0 },
      voteCount: { type: Number, default: 0 },
    },
    SubCategories: [
      {
        name: { type: String, required: true, unique: true },
        pollCount: { type: Number, default: 0 },
        voteCount: { type: Number, default: 0 },
      },
    ],
  });

module.exports = mongoose.model('Categories',Categories)