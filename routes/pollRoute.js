const Router = require('express');
const {create_poll} = require("../Controller/pollHandler")
console.log(typeof create_poll);
const router = Router();
router.post("/createPoll",create_poll);

module.exports = router;