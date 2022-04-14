import React, { useEffect } from 'react'
import { Typography, Box, makeStyles } from '@material-ui/core'
import { Delete } from "@material-ui/icons";
import { deleatcmnt, getProfile } from "../../service/api";
import { useAuth0 } from "@auth0/auth0-react";
import { useGlobalState } from '../GlobalState/Globalstate';
import * as timeago from "timeago.js";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles({
  component: {
    marginTop: 10,
    marginBottom:-20,
    background: "#F5F5F5",
    // border:"1px solid grey",
    padding: 5,
    border: "1px solid grey",
    transition: ".5s",
    "&:hover": {
      border: "1px solid transparent",
      boxShadow: "0 1px 6px rgb(60 64 67 / 30%)",
      background: "white",
    },
  },
  container: {
    display: "flex",
    // marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontWeight: 600,
    fontSize: 18,
    cursor: "pointer",
    color: "#878787",
    transition: "0.5s",
    "&:hover": {
      color: "black",
    },
  },
  date: {
    fontSize: 14,
    color: "#878787",
    textTransform: "capitalize",
  },
  delete: {
    cursor: "pointer",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  coment: {
    textAlign: "center",
  },
});

export default function Coments(props) {
 const [flag, setFlag] = useGlobalState("flagCoomment");
  const [Profile, setProfile] = useGlobalState("profile");
  const [Response, setResponse] = useState({});
const classes = useStyles();
  const [isAuthenticated, setAuthenticated] = useGlobalState("Authenticated");

  
  let url = "https://static.thenounproject.com/png/12017-200.png";
   
   useEffect(async() => {
     let response = await getProfile(
       `?userid=${props.data.userId}`
     );
    //  console.log(response);
     setResponse(response.data);
   },[]);
  
  const deletcmnt = async (userid) => {
    console.log(props.userDlt, Profile.userid);
    if (isAuthenticated && ((Profile.userid === props.userDlt))||(Profile.userid === userid)) {
  let res=  await deleatcmnt(props.data._id)
      setFlag(res.data);
}
else {
      alert(
         "You are noy allowed delete someone else "
       );
    }
  }
  const history = useHistory();
  const { imageUrl, userid, name } = Response;
  const viewProfile = () => {
    history.push(`/Profile/${userid}`);
  }
  const [imageurl, setImageUrl] = useGlobalState("imageUrl");

    return (
      <>
        <Box className={classes.component}>
          <Box className={classes.container}>
            <img

              src={imageUrl ?imageurl+ imageUrl : url}
              alt=""
              className={classes.image}
              onClick={viewProfile}
            />
            <Typography className={classes.name} onClick={viewProfile}>
              
              {name}
            </Typography>
            <Typography className={classes.date}>
              {timeago.format(props.data.date)}

              {/* {new Date(props.data.date).toDateString()} */}
            </Typography>
            <Delete
              className={classes.delete}
              onClick={() => deletcmnt(userid)}
            />
          </Box>
          <Typography className={classes.coment}>
            {props.data.comments}
          </Typography>
        </Box>
      </>
    )
}
