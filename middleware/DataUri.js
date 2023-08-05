const DataUriParser = require("datauri/parser");
const path= require("path")

  module.exports=(file)=>{
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  console.log(extName);
  return parser.format(extName, file.buffer);
};

 
