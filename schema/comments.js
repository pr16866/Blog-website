import mongoose from "mongoose";
const schema = new mongoose.Schema({
  blogid: {
    type: String,
    required: false,
  },
  
  comments: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  },
});
const comments = mongoose.model("comments", schema);
export default comments;
