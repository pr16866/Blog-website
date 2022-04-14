import { Box, Button, makeStyles, TextField, Tooltip } from '@material-ui/core';
import { Camera } from '@material-ui/icons';
import { styled } from '@material-ui/styles';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createImage, updadteImage, updateProfile } from '../../service/api';
import { useGlobalState } from '../GlobalState/Globalstate';
import Loadanimation from '../loadAnimation/Loadanimation';


const useStyle = makeStyles((theme) => ({
  mainBox: {
    border: "1px solid grey",
    padding: "20px",
    margin: "20px auto",
    width: "30%",
    marginTop: "80px",
    textAlign: "center",
    borderRadius: 14,
    boxShadow: " 10px 10px 10px rgba(0, 0, 0, 0.4)",

    [theme.breakpoints.down("sm")]: {
      width: "60%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  textfield: {
    padding: "10px 0",

    marginBottom: 10,
    "& label.Mui-focused": {
      color: "#3f51b5",
      fontWeight: "bolder",
      fontSize: 22,
    },
  },
  button: {
    width: "80%",
    letterSpacing: 1,
    wordSpacing: 2,
    borderRadius:20,
  },
  imageBox: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    border: "5px solid #00d8fe",
    marginBottom: "2px",
    overflow: "hidden",
    cursor: " pointer",
    margin: "0 auto",

    "&:hover": {
      "& $hover": {
        opacity: "1",
      },
    },
  },
  hover: {
    width: "100%",  
    height: "100%",
    backgroundColor: "rgba(79, 172, 254, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: " #fff",
    transition: " 0.5s",
    opacity: "0",
  },
  file: {
    display: "none",
  },
   loadAnimi: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "Center",
    justifyContent:"center",
  },
}));

export default function EditProfile({ profile }) {
  const classes = useStyle();
  // console.log(profile);
  let initialData = {
    name: profile.name,
    userid: profile.userid,
    email: profile.email,
    address: profile.address ? profile.address : "",
    imageUrl: profile.imageUrl ? profile.imageUrl : "",
    followers: profile.followers,
    followersUserId: profile.followersUserId,
    linkdinLink: profile.linkdinLink ? profile.linkdinLink : "",
    fbLink: profile.fbLink ? profile.fbLink : "",
    instaLink: profile.instaLink ? profile.instaLink : "",
    twitterLink: profile.twitterLink ? profile.twitterLink : "",
    about: profile.about ? profile.about : "",
    imageId: profile.imageId ? profile.imageId : "",
  };
  const [loadAnimation, setLoadAnimation] = useState(null);
  const [Data, setData] = useState(initialData);
  const [File, setFile] = useState("");
  const { mainBox, textfield, button, imageBox, hover, file, toolTip } =
    classes;

  let data = "https://static.thenounproject.com/png/12017-200.png";

  const handleChange = (e) => {
    e.preventDefault();
    // console.log(e.target.name, e.target.value);
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const {
    _id,
    name,
    imageUrl,
    address,
    userid,
    followers,
    email,
    followersUserId,
    fbLink,
    instaLink,
    linkdinLink,
    twitterLink,
    about,
    // image
  } = Data;

  

  //=========>> * * * Code for making image into base64 start * * * <<=========

  const [previewSource, setPreviewSource] = useState("");
  const handleImgae = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFile(file);
    setPreviewSource(URL.createObjectURL(file));
    // previewFile(file);
  };

  // const previewFile = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setPreviewSource(reader.result);
  //   };
  // };

  //=========>>* * *Code for making image into base64 end* * * <<=========

  // useEffect(async () => {
  //   if (previewSource) {
  //     setFormData({ ...formData, imageUrl: previewSource })
  //   }

  // }, [previewSource]);

  const history = useHistory();

  const [user, setUser] = useGlobalState("profile");

  const UpdateData = async (e) => {
    let formData;
    e.preventDefault();
setLoadAnimation(true);
    let imageRes;

    if (File) {
      formData = new FormData();
      formData.append("file", File);
      formData.append("fileName", File.Name);
      imageRes = await createImage(formData);
    }

    let imageLink = imageRes ? imageRes.data : "";
    // setLoadAnimation(true);
    let res = await updateProfile(userid, Data, imageLink);
    // console.log(res.data);
    if (res.data) {
      // setLoadAnimation(false);
      setUser(res.data);
      alert("Profile updated sucessfull");
      history.push(`/profile/${userid}`);
    }
  };
  const [imageurl, setImageUrl] = useGlobalState("imageUrl");

  let dpUrl = previewSource
    ? previewSource
    : imageUrl
    ? imageurl + imageUrl
    : "https://static.thenounproject.com/png/12017-200.png";
  //
  return (
    <div>
      {loadAnimation ? (
        <Box className={classes.loadAnimi}>
          <Loadanimation />
        </Box>
      ) : (
        <Box className={mainBox}>
          <label htmlFor="file">
            <Tooltip title="Update Image" className={toolTip}>
              <Box
                className={imageBox}
                sx={{
                  backgroundImage: `url(${dpUrl})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}>
                <Box className={hover}>
                  <Camera />
                </Box>
              </Box>
            </Tooltip>
          </label>

          <input
            type="file"
            id="file"
            className={file}
            onChange={handleImgae}
          />
          <TextField
            fullWidth
            id="standard-search"
            label="Name..."
            color="primary"
            variant="standard"
            className={textfield}
            value={name}
            focused
            onChange={handleChange}
            name="name"
          />
          {/* <TextField
            fullWidth
            disabled
            // id="standard-disabled"
            id="standard-search"
            label="UserId..."
            color="primary"
            variant="standard"
            className={textfield}
            // focused
            // onChange={handleChange}
            name="userid"
            value={userid}
          /> */}
        
          {/* <TextField
            fullWidth
            // disabled
            id="standard-search"
            label="Email..."
            color="primary"
            variant="standard"
            className={textfield}
            focused
            onChange={handleChange}
            name="email"
            value={email}
          /> */}
          <TextField
            fullWidth
            id="standard-search"
            label="Address..."
            color="primary"
            variant="standard"
            className={textfield}
            helperText="**This way city,state,country ** "
            focused
            onChange={handleChange}
            name="address"
            value={address}
          />
          <TextField
            fullWidth
            id="standard-search"
            label="FaceBook Link..."
            color="primary"
            variant="standard"
            className={textfield}
            focused
            onChange={handleChange}
            name="fbLink"
            value={fbLink}
          />
          <TextField
            fullWidth
            id="standard-search"
            label="Instagram Link..."
            color="primary"
            variant="standard"
            className={textfield}
            focused
            onChange={handleChange}
            name="instaLink"
            value={instaLink}
          />
          <TextField
            fullWidth
            id="standard-search"
            label="Linkdin Link..."
            color="primary"
            variant="standard"
            className={textfield}
            focused
            onChange={handleChange}
            name="linkdinLink"
            value={linkdinLink}
          />
          <TextField
            fullWidth
            id="standard-search"
            label="Twitter Link..."
            color="primary"
            variant="standard"
            className={textfield}
            focused
            onChange={handleChange}
            name="twitterLink"
            value={twitterLink}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="About Yourself..."
            multiline
            maxRows={4}
            fullWidth
            className={textfield}
            helperText="** Minimum 30-40 words **"
            focused
            onChange={handleChange}
            name="about"
            value={about}
          />
          <Button
            variant="contained"
            color="primary"
            className={button}
            onClick={UpdateData}>
            Update Profile
          </Button>
        </Box>
      )}
    </div>
  );
}
