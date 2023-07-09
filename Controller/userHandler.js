const userModule = require("../schema/User");

module.exports.userSignUpPost = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  userModule
    .create({ email: email, password: password })
    .then((result) => {
      r = {
        msg: "user created",
        result,
      };

      res.status(201).send(r);
    })
    .catch((result) => {
      console.log(res);
    });
};

module.exports.userLoginPost = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  userModule
    .findOne({ email })
    .then((result) => {
      if (result.password === password) {
        res.status(200).send({
          id: result._id,
          msg: "login success full",
          result,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send({
        msg: "invalid credintials",
      });
    });
};
