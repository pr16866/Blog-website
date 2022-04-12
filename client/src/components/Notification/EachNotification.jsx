import React, { useState } from "react";

import { Typography, Box, makeStyles, Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getProfile } from "../../service/api";
import { useGlobalState } from "../GlobalState/Globalstate";

const useStyles = makeStyles({
  component: {
    marginTop: 18,
    background: "#F5F5F5",

    padding: 5,

    border: "1px solid grey",
    transition: ".5s",
  },
  seencomponent: {
    marginTop: 18,
    padding: 5,
    border: "1px solid transparent",
    boxShadow: "0 1px 6px rgb(60 64 67 / 30%)",
    background: "white",
  },
  seen: {},
  container: {
    display: "flex",
    gap: "5px",
    // flexDirection: "column",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    textAlign: "center",
  },
  name: {
    fontWeight: 600,
    letterSpacing: "2px",
    fontSize: 18,
    color: "#666",
    cursor: "pointer",
    transition: "0.5s",
    // fontWeight:"bold",
    "&:hover": {
      color: "Black",
    }
  },
  date: {
    fontSize: 14,
    color: "#878787",
  },
  delete: {
    cursor: "pointer",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: "50%",
  },
  coment: {
    textAlign: "center",
  },
});
export default function EachNotification({item}) {
  const history = useHistory();
  const classes = useStyles();

  const [imageurl, setImageUrl] = useGlobalState("imageUrl");

  const viewBlog = () => {
    history.push(`/detail/${item.BlogId}`);
  }
  const viewProfile = () => {
    history.push(`/Profile/${item.userid}`)
  }
  const [Response, setResponse] = useState({});
useEffect(async() => {
  let response = await getProfile(`?userid=${item.userid}`);
  setResponse(response.data)
  // console.log();
}, [])
 const { imageUrl, userid, name } = Response;
  return (
    <div>
      <Box className={item.seen ? classes.seencomponent : classes.component}>
        <Box className={classes.container}>
          <img
            src={
              imageUrl
                ?imageurl+imageUrl
                : "https://static.thenounproject.com/png/12017-200.png"
            }
            alt=""
            className={classes.image}
          />
          <Typography className={classes.name} onClick={viewProfile}>
            @{item.userid}
          </Typography>{" "}
          <span> {item.message}</span>
          <Typography className={classes.date}></Typography>
          <Button variant="outlined" onClick={viewBlog}>
            read
          </Button>
        </Box>
      </Box>
    </div>
  );
}
