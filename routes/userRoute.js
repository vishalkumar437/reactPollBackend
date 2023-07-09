const {Router}= require("express");
const {userSignUpPost, userLoginPost} =require("../Controller/userHandler")

const router= Router();

router.post("/createUser",userSignUpPost);
router.post("/userLogin",userLoginPost);

module.exports=router;