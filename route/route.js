import express from "express";
const router = new express.Router();
// const multer = require("multer");
// import multer from "multer";
// const upload = multer({
//   dest: "pictures/"

// });
  

router.use(express.json({ limit: "50mb" }));
router.use(express.urlencoded({ limit: "50mb" }));

import {
  createpost,
  gatepost,
  detailview,
  updatepost,
  deletepost,
  createImage,
  sendText
} from "../controller/post-controler.js";

import {
  Comment,
  getcomments,
  deleatcomment,
} from "../controller/comment-controller.js";
import {
  addProfile,
  getProfile,
  addFollowing,
  removeFollowing,
  getAllFollowers,
  filterFollowers,
  updateProfile,
  updateImage,
  getAllFollowings,
  sendNoti,
  Unseen,
  getallProfile
} from "../controller/Profile-controller.js";
import upload from "../utils/upload.js";



router.post("/create",createpost);
router.post("/sendImage", upload.single('file'), createImage);
router.post("/update/:id", updatepost);
router.post("/comments",Comment);
router.post("/addProfile", addProfile);
router.post("/updateProfile/:userid", updateProfile);
router.post("/updateImage",updateImage);
router.post("/sendNotification", sendNoti);

router.delete("/delet/:id", deletepost);
router.delete("/deleate/:id", deleatcomment);

router.get("/getallProfile", getallProfile);

router.get("/create", gatepost);
router.get("/detailview/:id", detailview);
router.get("/comment/:id", getcomments);
router.get("/getProfile", getProfile);
router.get("/addFollowing/:userid/:profileId", addFollowing);
router.get("/removeFollowing/:userid/:profileId", removeFollowing);
router.get("/getAllFollowers/:userid", getAllFollowers);
router.get("/getAllFollowings/:userid", getAllFollowings);
router.get("/filterFollowers/:userid", filterFollowers);

router.get("/unseen", Unseen);




router.post("/sendText", sendText);




export default router;