const userModule = require("../schema/User");
const bcrypt = require("bcrypt")

module.exports.userSignUpPost = (req, res) => {
  bcrypt.hash(req.body.password, 10, function(err, hash){
  const name = req.body.name;
  const email = req.body.email;
  const password = hash;

  userModule
    .create({ name: name, email: email, password: password })
    .then((result) => {
      console.log(result);
      r = {
        msg: "user created",
        result,
      };

      res.status(201).send(r);
    })
    .catch((error) => {
      r = {
        error: "Email Already Exist"
      };

      res.status(403).send(r);
    });
}
)};

module.exports.userLoginPost = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email,password)
  userModule
    .findOne({ email })
    .then((result) => {

      bcrypt.compare(password,result.password).then(c=>{
        
        if(c==true){

          res.status(200).send({
            id: result._id,
            msg: "login successfull",
            result,
          });

        }
        else{
          console.log("Wrong Password");
          res.status(502).json({
            error : err
        })
        }
        
    })
    .catch(err=>{

        console.log("error logging in");
        res.status(500).json({
            error : err
        })
    })

    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({
        msg: err,
      });
    });
};
