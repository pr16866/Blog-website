import React, { useState, useEffect } from "react";
import { Box, Button, makeStyles, Tooltip, Typography } from "@material-ui/core";
import { Edit, Delete, Check } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
// import * as timeago from "timeago.js";
import {
  detailview,
  deletblog,
  addFollowing,
  getProfile,
  removeFollowing,
} from "../../service/api";
import Coment from "../coments/coment";
import { useAuth0 } from "@auth0/auth0-react";
import Loadanimation from "../loadAnimation/Loadanimation";
import { useGlobalState } from "../GlobalState/Globalstate";
import { auth } from "../FirebaseSetup/Firebase";
import FollowersMain from "../Followers/FollowersMain";
import ProfileCardWrapper from "../ProfileCard/ProfileCardWrapper";
import styled from "styled-components";
import ProfileButton from "../Profile/ProfileButton";
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
  icon: {
    float: "right",
  },
  icons: {
    border: "1px solid #878787",
    padding: "5px 5px",
    marginLeft: "8px",
    cursor: "pointer",
  },
  heading: {
    fontSize: "25px",
    fontWeight: 600,
    color: "#595959",
    textAlign: "center",

    margin: "50px 0 15px 0",
    textTransform: "capitalize",
  },
  author: {
    color: "#878787",
    display: "flex",
    margin: "20px 0",
    alignItems: "center",
    flexWrap: "wrap",
  },
  spn: {
    color: "#6301ed",

    letterSpacing: "1.5px",
    cursor: "pointer",
    "&:hover": {
      color: "black",
    },
  },
  loadAnimi: {
    width: "100%",
    height: "60vh",
    display: "flex",
    alignItems: "Center",
    justifyContent: "center",
  },
  like_coment_box: {
    border: "1px solid black",
    width: "200px",
    height: "10px",
  },
  nameAndImage: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },

  AuthorImage: {
    width: "80px",
    height: "80px",

    borderRadius: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "70px",
      height: "70px",
    },
  },
  AuthorName: {
    display: "flex",
    flexDirection: "column",

    textAlign: "center",
  },
  follow_btn: {
    border: "1px solid black",
    padding: "5px 10px",
    borderRadius: "10px",
    background: "rgb(15, 115, 12)",
    color: "white",
    cursor: "pointer",
  },

  followersBox: {
    "&>:nth-child(1)": {
      // color: "#6301ed",
      cursor: "pointer",
      margin: "6px 0",
      wordSpacing: "5px",
      "&:hover": {
        color: "black",
        "&.allFollowers": {
          color: "red",
          background: "red",
        },
      },
    },
  },
  allFollowers: {
    display: "none",
  },
  detail: {
    color: "#595959",
  },
}));

export default function DetailView() {
  const classes = style();
  const history = useHistory();
  const [post, setpost] = useState({});
  const params = useParams();
  const [flag, setflag] = useState(true);
  const [isAuthenticated, setAuthenticated] = useGlobalState("Authenticated");
  const [user, setuser] = useGlobalState("profile");
  const [profileFlag, setProfileFlag] = useState("");
  const [followFlag, setfollowFlag] = useState(false);
  const [profileData, setProfileData] = useState("");
  const [ProfileCardflag, setProfileCardflag] = useState(false);

  useEffect(() => {
    loadfun(params);
  }, []);
  const loadfun = async (params) => {
    let req = await detailview(params.id);

    setpost(req.data);
    setflag(false);
  };
// console.log(params)
  const { _id, title, description, picture, date, username, userimage, name } =
    post;
  const [bloggerProfile, setBlogerProfile] = useState({});

  const [imageurl, setImageUrl] = useGlobalState("imageUrl");
  
  const url = picture
    ? imageurl + picture
    : "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
  

  const deleat = async () => {
    let req = await deletblog(_id);
    alert(req.data);
    history.push("/");
  };

  const author = () => {
    history.push(`/?username=${username}`);
  };
  const Follow_me = async () => {
    let data = profileData.followersUserId
     if (isAuthenticated) {
       if (data) {
         await Check();
       } 
     } else {
       alert("Please logIn first");
     }
  };

  const Check = async () => {
    
    if (!profileData.followersUserId.includes(user.userid)) {
      const res = await addFollowing(username, user.userid);
      setProfileFlag(res.data);
      setfollowFlag(true);
    }
}

  useEffect(async () => {
    if (username) {
      const response = await getProfile(`?userid=${username}`);
      setProfileData(response.data);
      // console.log(user, response.data.followersUserId);
      if (user && response.data.followersUserId) {
        if (response.data.followersUserId.includes(user.userid)) {
          setfollowFlag(true);
        } else {
          setfollowFlag(false);
        }
      }
    }
  }, [profileFlag, username, user]);

  // =======>> unfollow the user <<=========
  const Unfollow_Me = async() => {
  
   await unfollowUser();
}
  const unfollowUser = async () => {
    if (profileData.followersUserId.includes(user.userid)) {
      const res = await removeFollowing(username, user.userid);
      setProfileFlag(res.data);
      setfollowFlag(false);
    }
  };

  const AllFollowers = () => {
    history.push(`/followers/${username}`)
  }
  
  const getProfileCard = async() => {
    history.push(`/profile/${username}`);
  }
  const { imageUrl,followersUserId } = profileData;
  
  return (
    <>
      {flag ? (
        <Box className={classes.loadAnimi}>
          <Loadanimation />
        </Box>
      ) : (
        <Box className={classes.container}>
          <img
            src={url}
            alt="err"
            className={classes.image}
            onClick={() => getProfileCard()}
          />
          {isAuthenticated && user.userid === username ? (
            <>
              <Box className={classes.icon}>
                <Tooltip title="Edit blog" arrow>
                  <Edit
                    className={classes.icons}
                    color="primary"
                    onClick={() => history.push(`/update_blog/${_id}`)}
                  />
                </Tooltip>

                <Tooltip title="Delete Blog" arrow>
                  <Delete
                    className={classes.icons}
                    onClick={deleat}
                    color="error"
                  />
                </Tooltip>
              </Box>
            </>
          ) : (
            ""
          )}
          {/* <Typography className={classes.heading}>{title}</Typography> */}
          <Box className={classes.author}>
            <Box className={classes.authorBox}>
              <Box className={classes.nameAndImage}>
                <Box className={classes.imagebox}>
                  <img
                    src={
                      imageUrl
                        ? imageurl + imageUrl
                        : "https://static.thenounproject.com/png/12017-200.png"
                    }
                    className={classes.AuthorImage}
                    alt=""
                    onClick={() => getProfileCard()}
                  />
                </Box>
                <Box className={classes.AuthorName}>
                  <Typography
                    // onClick={author}
                    onClick={() => getProfileCard()}
                    className={classes.spn}
                    style={{
                      fontWeight: 600,
                      textTransform: "uppercase",
                      wordSpacing: "1px",
                    }}>
                    {name}
                  </Typography>
                  {followersUserId && (
                    <Box className={classes.followersBox}>
                      <Typography
                        className={classes.followers_list}
                        style={{ wordSpacing: "4px" }}>
                        {followersUserId.length > 9
                          ? followersUserId.length
                          : "0" + followersUserId.length}

                        <span> Followers</span>
                      </Typography>
                    </Box>
                  )}

                  {isAuthenticated && user.userid === username ? (
                    <Tooltip
                      title="You are not allowed to follow yourself"
                      // followCursor
                      arrow>
                      <Box>
                        <span className={classes.follow_btn}>Follow</span>
                      </Box>
                    </Tooltip>
                  ) : (
                    <Typography>
                      {!followFlag ? (
                        <span
                          className={classes.follow_btn}
                          onClick={Follow_me}>
                          Follow
                        </span>
                      ) : (
                        <span
                          className={classes.follow_btn}
                          onClick={Unfollow_Me}>
                          Unfollow
                        </span>
                      )}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>

            <Typography style={{ marginLeft: "auto" }}>
              {new Date(date).toDateString()}
            </Typography>
          </Box>
          <Typography className={classes.heading}>{title}</Typography>
          <br />
          <Typography className={classes.detail}>{description}</Typography>
          {/* <ProfileButton/> */}
          <Coment id={post} />
        </Box>
      )}
    </>
  );
}
