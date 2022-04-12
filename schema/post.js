import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: false,
  },
  pictureId: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  categories: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
});
const post=mongoose.model("post", schema)
export default post;