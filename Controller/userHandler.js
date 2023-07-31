const userModule = require("../schema/User");
const bcrypt = require("bcrypt");

module.exports.userSignUpPost = (req, res) => {
  if (req.body.password.length < 4) {
    console.log("password length is", req.body.password);
    res.status(401).send({ msg: "Password to short minimum 4 length" });
    return;
  }
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    const name = req.body.name;
    const email = req.body.email;
    const password = hash;
    const dateInMilliSeconds = Date.now().toString();

    userModule
      .create({
        name: name,
        email: email,
        password: password,
        createdAt: dateInMilliSeconds,
      })
      .then((result) => {
        console.log(result);
        r = {
          msg: "user created",
          result,
        };

        res.status(201).send(r);
      })
      .catch((error) => {
        const msg =
          error.code === 11000
            ? "Email Already Exixt"
            : " ValidatorError: please Enter valid Email";

        console.log("error code occured is", error);
        r = {
          error: "Email Already Exist",
          msg: msg,
        };

        res.status(403).send(r);
      });
  });
};

module.exports.userLoginPost = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  userModule
    .findOne({ email })
    .then((result) => {
      console.log("result after login", result);

      //checking if user exist or not
      if (result===null) {
        res.status(400).send({
          msg: "No User Exist",
        });

        return;
      }
      bcrypt
        .compare(password, result.password)
        .then((c) => {
          if (c == true) {
            res.status(200).send({
              id: result._id,
              msg: "login successfull",
              result,
            });
          } else {
            console.log("Wrong Password");
            res.status(502).json({
              error: err,
            });
          }
        })
        .catch((err) => {
          console.log("error logging in");
          res.status(500).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({
        msg: err,
      });
    });
};
