const {Router}= require("express");
const {userSignUpPost, userLoginPost} =require("../Controller/userHandler");
const uploadMiddleware = require("../middleware/imageUpload");
const cloudnaryUpload = require("../middleware/cloudnaryUpload");

const router= Router();

router.post("/createUser",uploadMiddleware,userSignUpPost);
router.post("/userLogin",userLoginPost);

module.exports=router;