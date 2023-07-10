const userModule = require("../schema/User");

module.exports.userSignUpPost = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

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
};

module.exports.userLoginPost = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email,password)
  userModule
    .findOne({ email })
    .then((result) => {
      console.log(result)
      if (result.password === password) {
        res.status(200).send({
          id: result._id,
          msg: "login successfull",
          result,
        });
      }
      else{
        res.status(401).send({
          error: "Invalid Credentials",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({
        msg: err,
      });
    });
};
