import  express from "express";
import  dotenv from "dotenv";
import  connection  from "./database/db.js";
import router from "./route/route.js";
import cors from "cors";

import path from "path";

const __dirname = path.resolve();

const app = express();
dotenv.config();

app.use(cors());
app.use(router);

// console.log(__dirname+"/client/public/images")
app.use("/images",express.static(path.join(__dirname, "/images")));




let port =process.env.PORT || 3001;

let url = process.env.URL;
connection(
    process.env.MONGODB_URI || url
);

 app.use(express.static("images/"));

if (process.env.NODE_ENV == "production") {

     app.use(express.static(path.join(__dirname,"/client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
  
} else {
    app.get("/", (req, res) => {
        res.send("piyush");
    })
}
   
process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});

app.listen(port,()=>{
    console.log(`your server is runnig at port ${port}`);
    
});
// connection();