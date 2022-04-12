import comments from "../schema/comments.js"

export const Comment=async(req,res) => {
    try {
        let var1 = req.body;
        
        let data = await comments.insertMany([var1]);
        
        res.send(data);

    
    } catch (er) {
        console.log(er);
    }
}
export const getcomments = async(req,res) => {
    try {
        // console.log(req.query);
        //
        let var1 = await comments.find({blogid: req.params.id });
        res.send(var1);
      
    } catch (er) {
        console.log(er);
    }
}

export const deleatcomment = async(req,res) => {
    try {
        // console.log(req.params);
        let var1 = await comments.findByIdAndDelete(req.params.id);
        res.send(var1);
    } catch (er) {
        console.log(er);
    }
}
const fun1 = async () => {
  let var1 = await comments.deleteMany({});
  console.log(var1);
};
// fun1();