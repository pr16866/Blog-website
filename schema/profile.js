import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  imageId: {
    type: String,
  },
  address: {
    type: String,
  },
  userid: {
    type: String,
  },
  email: {
    type: String,
  },
  followersUserId: {
    type: Array,
  },
  followingsUserId: {
    type: Array,
  },
  
  notification: {
    type: Array,
  },

  linkdinLink: {
    type: String,
    required: false,
  },
  fbLink: {
    type: String,
  },
  instaLink: {
    type: String,
  },
  twitterLink: {
    type: String,
  },
  about: {
    type: String,
  },
});
const UserCollection = mongoose.model("UserCollection", schema);
export default UserCollection;
