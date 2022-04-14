import React, { useState, useEffect } from "react";
import {
  Box,
  makeStyles,
  FormControl,
  Button,
  InputBase,
  TextareaAutosize,
} from "@material-ui/core";



import { AddCircle as Add } from "@material-ui/icons";
import images from "../../images/banner2.jpg";
import {
  createpost,
  getAllFollowers,
  getProfile,
  uploadFile,
  sendNoti,
  createImage,
} from "../../service/api";
import { useHistory } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import Loadanimation from "../loadAnimation/Loadanimation";
import { useGlobalState } from "../GlobalState/Globalstate";

const style = makeStyles((theme) => ({
  container: {
    padding: "0px 100px",
    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },
  image: {
    width: "100%",
    height: "60vh",
    objectFit: "center",
  },
  loadAnimi: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "Center",
    justifyContent:"center",
  },
  addIcon: {
    backgroundColor: "#6495ED",
    color: "white",
    cursor: "pointer",
    fontSize: 35,
  },
  form: {
    display: "flex",
    margin: 10,
    flexDirection: "row",
  },
  textfield: {
    flex: 1,
    margin: "0 30px",
    fontSize: 25,
  },
  textarea: {
    width: "100%",
    border: "none",
    marginTop: 50,
    fontSize: 20,

    "&:focus-visible": {
      outline: "none",
    },
  },

  select: {
    outline: "none",
    border: "none",
    borderBottom: "1px solid grey",
    color: "grey",
    fontSize: 20,
    letterSpacing: "2px",
    width: "50%",
  },

}));

export default function CreateBlog() {
  //////////////////////
 
  const [Authenticated, setAuthenticate] = useGlobalState("Authenticated");

  const [profile, setProfile] = useGlobalState("profile");
  // console.log(profile);
  const {name,userid,email}=profile
  //////////////////////
  let initialState = {
    name:"",
    title: "",
    description: "",
    picture: "",
    // userImage:"",
    username: "",
    categories: "",
    date: new Date(),
    
  };
  // console.log(userid);
  const classes = style();
  const history = useHistory();
  const [post, setpost] = useState(initialState);
  const [file, setfile] = useState("");
  const [flag, setflag] = useState(false);
  const [registered, setregister] = useGlobalState("Registered");
  

  
  const handleChange = (e) => {
     setpost({ ...post, username: userid,name:name, [e.target.name]: e.target.value });

  };
// =========>>converting image into base 64<<============
  const [previewFile, setPreviewFile] = useState("");
  
  const handleimage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setPreviewFile(file);
    setfile(URL.createObjectURL(file));
    // console.log(file);
  };

  // const previewFile = (file) => {
    
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend = () => {
      // setfile(reader.result);
      // setpost({ ...post, picture: formData });
    // };
  // };

// ===========>>end<<===============
  const [loadAnimation, setLoadAnimation] = useState(null);

  const publish = async (e) => {
    let formData;
      setLoadAnimation(true);
    e.preventDefault();
    let imageRes;
    if (previewFile) {
      formData = new FormData();
formData.append("file", previewFile);
      formData.append("fileName", previewFile.Name);
      imageRes = await createImage(formData);
    }
    // setLoadAnimation(true);
    let imageLink = imageRes ? imageRes.data : "";
    let req = await createpost(post, imageLink);
    setLoadAnimation(false);
    alert(req.data.message);
    history.push("/");
    // console.log(req.data);
    sendNotification(req.data.response[0]._id);
  };

  const sendNotification = async(BlogId) => {
    let message = `added a new blog`;
    let res = await sendNoti(userid, message,BlogId);
    // console.log(res);
}

  let imgurl = file
    ? file
    : "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
 
 
  return (
    <>
      {loadAnimation ? (
        <Box className={classes.loadAnimi}>
          <Loadanimation />
        </Box>
      ) : (
        <Box className={classes.container}>
          {flag ? (
            <Box className={classes.loadAnimi}>
              <Loadanimation />
            </Box>
          ) : (
            <img
              // file === "" ? images : file
              src={imgurl}
              alt="err"
              className={classes.image}
            />
          )}

          <FormControl className={classes.form}>
            <label htmlFor="fileInput">
              <Add className={classes.addIcon} />
            </label>

            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleimage}
              name="file"
            />

            <InputBase
              name="title"
              placeholder="Title..."
              className={classes.textfield}
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" onClick={publish}>
              {/* <input type="submit" value="submit" /> */}
              Publish
            </Button>
          </FormControl>
          <br />
          <select
            onChange={handleChange}
            name="categories"
            className={classes.select}>
            <option value="" defaultValue style={{ color: "Black" }}>
              Select category Of Blog
            </option>
            <option value="Music" style={{ color: "Black" }}>
              Music
            </option>
            <option value="Movies" style={{ color: "Black" }}>
              Movies
            </option>
            <option value="Sports" style={{ color: "Black" }}>
              Sports
            </option>
            <option value="Technology" style={{ color: "Black" }}>
              Technology
            </option>
            <option value="Fashion" style={{ color: "Black" }}>
              Fashion
            </option>
          </select>

          <TextareaAutosize
            name="description"
            // rows={5}
            minRows={5}
            placeholder="Tell your story...."
            className={classes.textarea}
            onChange={handleChange}
          />
        </Box>
      )}
      {/* <Loadanimation/> */}
    </>
  );
}
