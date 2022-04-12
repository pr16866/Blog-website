import image from "../schema/image.js";
import cloudinary from "cloudinary";
let cloud = cloudinary.v2;
import dotenv from "dotenv";
dotenv.config();

cloud.config({
  cloud_name: process.env.Cloud_name,
  api_key: process.env.API_key,
  api_secret: process.env.API_secret,
  secure: true,
});

export const uploadimage = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);




    // if (!req.file) {
    //   res.send("No file uploded");
    // }
    // else {
    //   let imgSrc = "http://localhost:3001/images/" + req.file.filename;
    //   console.log(imgSrc);
    // }
    // let var2 = await cloudinary.uploader.upload(req.file.path);
    res.send("piyush");
  } catch (er) {
    console.log(er);
  }
};

const fun1 = async() => {
  let var1 = await image.deleteMany({});
  console.log(var1);
}
// fun1();

