const multer = require("multer");
const storage = multer.memoryStorage();
const uploadMiddleware =multer({storage}).single("profileimage");

module.exports= uploadMiddleware ;
