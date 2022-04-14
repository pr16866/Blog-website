import React from 'react'


import { Typography, Box, makeStyles, Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useHistory } from 'react-router-dom';
import { useGlobalState } from '../GlobalState/Globalstate';


const useStyles = makeStyles((theme) => ({
  component: {
    marginTop: 18,
    background: "#F5F5F5",
    // border:"1px solid grey",
    padding: 5,
    // width: "60vw",
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
    gap: "20px",
    flexDirection: "row",
    alignItems: "center",
    // flexWrap: "wrap",
    justifyContent: "space-between",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      gap: 0,
    },
  },
  name: {
    fontWeight: 500,
    letterSpacing: "2px",
    fontSize: 18,
    color: "#666",
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
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
}));
export default function EachFollowers({ followers }) {
  const [imageurl, setImageUrl] = useGlobalState("imageUrl");
  const { name, imageUrl, address, userid, followersUserId } = followers;
  const classes = useStyles();
  const history = useHistory();
  const viewProfile = () => {
    history.push(`/profile/${userid}`);
    window.location.reload();
    console.log("piyush");
  }
  return (
    <div>
      <Box className={classes.component}>
        <Box className={classes.container}>
          <img
            src={
              imageUrl
                ? imageurl + imageUrl
                : "https://static.thenounproject.com/png/12017-200.png"
            }
            alt=""
            className={classes.image}
          />
          <Typography className={classes.name}>@{userid}</Typography>
          <Typography className={classes.date}></Typography>
          <Button variant="outlined" onClick={viewProfile}>
            Profile
          </Button>
        </Box>
      </Box>
    </div>
  );
}
