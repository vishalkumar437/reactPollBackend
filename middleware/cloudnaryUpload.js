const cloudinary = require("cloudinary").v2;
const dataUri = require("./DataUri");

module.exports = async (file) => {

  try{
    console.log("file reached in cloudnary is",file)
    
    cloudinary.config({     
      cloud_name:process.env.CLOUD_NAME, 
      api_key:process.env.API_KEY, 
      api_secret:process.env.API_SECRET,
    });
  

  const fileUri = dataUri(file);
  console.log(fileUri);
  
  const result=await cloudinary.uploader
    .upload(fileUri.content, {
      folder: "userProfilePic",
      allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jifif", "webp"],
    });

    console.log("result of cloudnary ",result);
    return result;
  }
  catch(err){
    console.log(err);
    return err;
  }
   
};
