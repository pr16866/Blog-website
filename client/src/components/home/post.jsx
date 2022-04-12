import React from "react";
import { Box, Typography, makeStyles, Button } from "@material-ui/core";
import {  useHistory } from "react-router-dom";
import { useGlobalState } from "../GlobalState/Globalstate";


const style = makeStyles({
  container: {
    // border: "1px solid #e3e4e6",

    borderRadius: 10,
    margin: 20,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    height: 350,
    boxShadow: "0 1px 6px rgb(60 64 67 / 30%)",

    border: "1px solid grey",
    transition: "0.4s",
    "& > *": {
      padding: "0 5px 5px 5px",
    },
    "&:hover": {
      // backgroundColor: "#f2f2f2",
      boxShadow: " 10px 10px 10px rgba(0, 0, 0, 0.4)",
      border: "1px solid transparent",
    },
  },
  image: {
    width: "100%",
    objectFit: "center",

    borderRadius: "10px 10px 0 0",
    height: 150,
  },
  textColor: {
    color: " #0028b9",
    fontSize: 13,
    cursor: "pointer",
   
    // lineHeight:"12px",
    // margin:"0px 0 ",
   
  },
  heading: {
    fontSize: 18,
    fontWeight: 600,
        textTransform: "capitalize",
  },
  detail: {
    fontSize: 14,
    wordBreak: "break-word",
    fontFamily: `'Roboto', sans-serif`,
  },
  button: {
    backgroundColor: "#6495ED",
    color: "white",
    padding: "7px 0px",
    width: "36%",
    fontWeight: "bold",
    position: "absolute",
    bottom: "4px",
  },
});

export default function Post(props) {
  const history = useHistory();
  const classes = style();
const [imageUrl, setImageUrl] = useGlobalState("imageUrl");
  const { categories, title, description, picture, username, _id } =
    props.item;
  // ${picture}
  const url =
    picture === ""
      ? "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
      : imageUrl + picture;

   const search = (val) => {
     // history.push(`/?author=piyush`);
     history.push(val);
  };
  
  return (
    <>
      <Box layout className={classes.container} key={_id}>
        <img src={url} alt="error" className={classes.image} />
        <Typography
          className={classes.textColor}
          onClick={() =>
            search(categories === "All" ? `/` : `/?categories=${categories}`)
          }>
          {categories}
        </Typography>
        <Typography className={classes.heading} style={{ textAlign: "center" }}>
          {title.length > 30 ? title.substring(0, 29) + "..." : title}
        </Typography>
        <Typography
          className={classes.textColor}
          onClick={() => search(`/?username=${username}`)}>
          {username}
        </Typography>

        <Typography className={classes.detail} style={{ textAlign: "center" }}>
          {" "}
          {description.length > 100
            ? description.substring(0, 99) + "..."
            : description}
        </Typography>
        <Button
          variant="contained"
          className={classes.button}
          // onClick={() => history.push(`/detail/${_id}`)}
          onClick={() => history.push(`/detail/${_id}`)}>
          Read
        </Button>
      </Box>
    </>
  );
}
