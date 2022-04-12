import { Facebook, GitHub, Instagram, Twitter } from "@material-ui/icons";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory} from 'react-router-dom';
import styled from "styled-components";
import { createImage } from "../../service/api";
import { useGlobalState } from "../GlobalState/Globalstate";


export default function ProfileCard({ profileData }) {
  const [first, setfirst] = useState({
  });
  const [second, setSecond] = useState({
    name:"",
  });

    const handleChange = (e) => {
    // e.preventDefault();
    setfirst(e.target.files[0]);
  }
  const handleTextChange = (e) => {
    e.preventDefault();
    setSecond({ name: e.target.value });
  }

  const history= useHistory();

  const handleSubmit =async (e) => {
     e.preventDefault();
    // let textRes = await sendText();
 const formData = new FormData();
 formData.append("file", first);
 const config = {
   headers: {
     "content-type": "multipart/form-data",
   },
 };

 let res = await createImage(formData, config);
    console.log(res.data);
    history.push("/");
  }
  const sendText = async() => {
    return axios.post("/sendText", second);
}


  const sendImage = async () => {

  //   const formData = new FormData();
  //   formData.append("file", first);
  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //   };
  //   let data = { name: "Piyush" };
  //  let res= await createImage(formData,config,data);
  //   console.log(res.data);
    // return await axios.post("/file/upload",formData,data);
  }

  console.log(second);
  
  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <input type="file" name='file' onChange={handleChange}  />
        <input type="text" onChange={handleTextChange} />
        <input type="submit"  />
      </form>
    </div>
  );
}
