const Router = require('express');
const {create_poll,submit_poll, getPoll, getAllPolls} = require("../Controller/pollHandler")
console.log(typeof create_poll);
const router = Router();
router.post("/createPoll",create_poll);
router.post("/submitPoll",submit_poll);
router.post("/getPoll",getPoll);
router.post("/getPolls",getAllPolls);


module.exports = router;