const express = require("express");
const router = express();
const {getAllCategories} = require("../Controller/Categories");

router.get("/getCategories",getAllCategories);

module.exports= router;
