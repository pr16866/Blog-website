
import post from '../schema/post.js';

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

export const createpost = async(req, res) => {
   
    try {
      const var1 = req.body;
        //  console.log(req.query.data)
      if (req.query.data) {
        var1.picture = req.query.data;
      }
      let response = await post.insertMany([var1]);

      res.status(200).send({
        message: "Blog is published",
        response,
      });
    } catch (er) {
        res.status(500).send({ message: "somethig error in publising your blog" });
        console.log(er);
   }
}


export const createImage = async(req,res) => {
    try {
        // console.log(req.file);
        let response = await cloudinary.uploader.upload(req.file.path)
          console.log(response);
    //   res.send(req.file.filename);
        res.send(response.url);
    } catch (error) {
        console.log(error);
    }
}
export const sendText = async (req, res) => {
    try {
        console.log(req.body);
        res.send(req.body);
    } catch (error) {
        console.log(error);
    }
}

export const updatepost = async(req, res) => {

    try {
        console.log(req.query.data, req.params.id);
        const var1 = req.body;
        var1.picture = req.query.data ? req.query.data : req.body.picture;
        console.log(var1)

        let response = await post.findByIdAndUpdate(
          req.params.id,
          {
            $set: var1,
          },
          { new: true }
        );
        console.log(response);
      res.status(200).send(response);
    } catch (er) {
        res.status(500).send({ message: "somethig error in publising your blog" });
   }
}


export const gatepost = async(req, res) => {
    
    let allPost;
    try {
        // console.log(req.query);
        allPost = await post.find(req.query);
                                                                 
      res.status(200).send(allPost.reverse());
    } catch (er) {
        res.status(500).send({message:"error"},er );
   }
}

export const detailview = async (req, res) => {
    try {
        const detaildata = await post.findById(req.params.id);
        res.status(200).send(detaildata);
    } catch (er) {
        res.status(500).send({ message: "error" }, er);
    }
};


export const deletepost = async (req,res) => {
    try {

       
        const delet = await post.findByIdAndDelete(req.params.id);
        res.status(200).send("blog deleted successfully");
        
       
    } catch (er) {
        console.log(er);
    }
};
const fun1 = async () => {
    
    let var1 = await post.deleteMany({});
  console.log(var1);
}
// fun1();