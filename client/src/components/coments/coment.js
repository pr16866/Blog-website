import React, { useState,useEffect } from "react";
import { Box, TextareaAutosize, Button, makeStyles } from "@material-ui/core";
import { postcomment } from "../../service/api"
import { useAuth0 } from "@auth0/auth0-react";
import { getcomment } from "../../service/api";
import { useLocation, useParams } from "react-router-dom";
import Coments from "./coments"
import { useGlobalState } from "../GlobalState/Globalstate";
import { AirlineSeatFlatAngledSharp } from "@material-ui/icons";


const style = makeStyles({
  container: {
    marginTop: 50,
    display: "flex",
    "& > *": {
      // padding: '10px '
    },
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  textarea: {
    height: 100,
    width: "100%",
    margin: "0 20px",
  },
  button: {
    height: 40,
  },
});
export default function Coment(prop) {
//    console.log(prop.id)
  // prop.flag1 = "true";
  // const { user,} = useAuth0(); 
  // console.log(prop.id);
    const classes = style();
    const initialState = {
     
      userId:"",
      blogid:"" ,
      date: new Date(),
      comments: "",
    };
  const [comment, setcomment] = useState(initialState);
  const [allcomment, setallcomment] = useState([]);
  
  const [flag, setFlag] = useGlobalState("flagCoomment");

  const [Profile, setProfile] = useGlobalState("profile");

  const [isAuthenticated, setAuthenticated] = useGlobalState("Authenticated");
  const [imageurl, setImageUrl] = useGlobalState("imageUrl");
    const handlechange = (e) => {
      setcomment({
        ...comment,
        comments: e.target.value,
        blogid: prop.id._id ,
        userId:isAuthenticated? Profile.userid:"", 
      });
      
  };
// console.log(prop)
  // console.log(comment);
  const post = async () => {
    let var1 = document.querySelector("#textarea");
    console.log(comment);
    var1.value = "";
    if (comment.comments) {
      let res = await postcomment(comment);
       setFlag(res.data);
    } else {
      alert("Can't add empty comment");
    } 
  };

    // const sendNotification = async (BlogId) => {
      // let message = `added a new blog`;
      // let res = await sendNoti(userid, message, BlogId);
      // console.log(res);
    // };
  
  
  let url = Profile
    ? Profile.imageUrl
      ? imageurl + Profile.imageUrl
      : "https://static.thenounproject.com/png/12017-200.png"
    : "https://static.thenounproject.com/png/12017-200.png";
  // let url = Profile.imageUrl
  //   ? imageurl + Profile.imageUrl
  //   : "https://static.thenounproject.com/png/12017-200.png";
  // const { search } = useLocation();
  const params = useParams();
  // console.log(params)
// `/detail/${_id

  useEffect(() => {
    loadfun();
  }, [flag]);

  // console.log(search);
  const loadfun = async () => {
    
    let res = await getcomment(params.id);
   
    setallcomment(res.data.reverse());
  }
  

  return (
    <>
      <Box>
        <Box className={classes.container}>
          <img src={url} alt="" className={classes.image} />
          <TextareaAutosize
            minRows={5}
            className={classes.textarea}
            placeholder="what's on your mind?"
            onChange={handlechange}
            id="textarea"
          />
          <Button
            variant="contained"
            color="primary"
            size="medium"
            className={classes.button}
            onClick={isAuthenticated ? post : () => alert("login first")}>
            Post
          </Button>
        </Box>

        {allcomment &&
          allcomment.map((data) => {
            return (
              <Box key={data._id}>
              <Coments data={data} userDlt={prop.id.username} />;
             </Box>
            )
            
            
          })}
      </Box>
    </>
  );
}
