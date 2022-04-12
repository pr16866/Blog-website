import React from "react";
import { createGlobalState } from "react-hooks-global-state";

const initialState = { Authenticated:"",Registered:true,profile:"",flagCoomment:false,followerflag:true,showFollowers:false,notificationFlag:false,Notification:"",imageUrl:"http://localhost:3001/images/"};
const { useGlobalState, setGlobalState } =
  createGlobalState(initialState);
// console.log(useGlobalState);

export { useGlobalState, setGlobalState };
