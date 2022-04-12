import mongoose from "mongoose";
const schema = new mongoose.Schema({
    picture: {
        type: Buffer,
        contentType:String,
        required: false,
    },
});
const image = mongoose.model("image", schema);
export default image;
