const {Router}= require("express");
const {userSignUpPost} =require("../Controller/userHandler")

const router= Router();

router.post("/createUser",userSignUpPost);

module.exports=router;