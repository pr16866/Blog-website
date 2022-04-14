import React, { useState, useEffect } from 'react';
import { Box, makeStyles, FormControl, Button, InputBase, TextareaAutosize } from '@material-ui/core'
import { AddCircle as Add } from '@material-ui/icons';
import images from '../../images/banner2.jpg';
import { useParams,useHistory } from 'react-router-dom';
import { createImage, detailview,updated,uploadFile } from "../../service/api";

import { useAuth0 } from "@auth0/auth0-react";
import Loadanimation from '../loadAnimation/Loadanimation';
import { useGlobalState } from '../GlobalState/Globalstate';

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
  addIcon: {
    backgroundColor: "#6495ED",
    color: "white",
    cursor: "pointer",
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
    fontSize: 18,
    "&:focus-visible": {
      outline: "none",
    },
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    border: "1px solid black",
  },
  loadAnimi: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "Center",
    justifyContent: "center",
  },
}));


export default function EditBlog() {

 
    const classes = style();
    
    const params = useParams();
    const history = useHistory();
const [imageurl, setImageUrl] = useGlobalState("imageUrl");
  const [previewImage, setPreviewImage] = useState("");  
  
    const [post, setpost] = useState({});
    const [file, setfile] = useState();
  useEffect(() => {
    loadfun(params);
    console.log(params);
  }, [params]);

    const loadfun = async (params) => {
        let req = await detailview(params.id);
        setpost(req.data);
    }

    const handleChange = (e) => {
      setpost({
        ...post, [e.target.name]: e.target.value
        });
    }
   const handleimage = (e) => {
     e.preventDefault();
     const file = e.target.files[0];
     setfile(file);
     setPreviewImage(URL.createObjectURL(file));
    
   };

  //  const previewFile = (file) => {
  //    const reader = new FileReader();
  //    reader.readAsDataURL(file);
  //    reader.onloadend = () => {
      
  //      setfile(reader.result);
  //     //  setpost({ ...post, picture: reader.result });
  //    };
  // };

  const [loadAnimation, setLoadAnimation] = useState(null);

  const update = async () => {
    let formData;
    let imageRes;
    if (file) {
   formData = new FormData();
formData.append("file", file);
      formData.append("fileName", file.Name);
      
  imageRes = await createImage(formData);

}
let imageLink = imageRes ? imageRes.data : "";



    setLoadAnimation(true);
   
    let res = await updated(_id, post,imageLink);
     setLoadAnimation(false);
        setpost(res.data);
        history.push(`/detail/${_id}/?id=${_id}`); 
    }

 const { _id, title, description, picture } = post;
  let imageUrl = previewImage
    ? previewImage
    : picture
    ? imageurl + picture
    : "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
    // 
    ;
  
    return (
      <>
        {loadAnimation ? (
          <Box className={classes.loadAnimi}>
            <Loadanimation />
          </Box>
        ) : (
          <Box className={classes.container}>
            <img src={imageUrl} alt="err" className={classes.image} />

            <FormControl className={classes.form}>
              <label htmlFor="fileInput">
                <Add
                  className={classes.addIcon}
                  fontSize="large"
                  color="action"
                />
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleimage}
              />
              <InputBase
                name="title"
                placeholder="Title..."
                className={classes.textfield}
                value={title}
                onChange={handleChange}
              />

              <Button variant="contained" color="primary" onClick={update}>
                Update
              </Button>
            </FormControl>

            <TextareaAutosize
              // rows={5}
              minRows={5}
              name="description"
              value={description}
              placeholder="Tell your story...."
              className={classes.textarea}
              onChange={handleChange}
            />
          </Box>
        )}
      </>
    );
}
