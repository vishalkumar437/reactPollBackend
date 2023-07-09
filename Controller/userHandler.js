const userModule = require("../schema/User");
module.exports.userSignUpPost = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  userModule
    .create({ email: email, password: password })
    .then((result) => {
        
        r={
   
            msg:"user created",
            result,
        }

        res.status(201).send(r);
    })
    .catch((result) => {
      console.log(res);
    });
};


// module.exports.userLoginPost= (req,res)=>{
//     const email=req.body.email;
//     const password=req.body.password;

//     userModule.findOne({email}).then( () )

// }
