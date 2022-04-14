import React from "react";
import { createGlobalState } from "react-hooks-global-state";

const initialState = {
  Authenticated: "",
  Registered: true,
  profile: "",
  flagCoomment: false,
  followerflag: true,
  showFollowers: false,
  notificationFlag: false,
  Notification: "",
  imageUrl: "",
  // imageUrl: "https://prt003-blog.herokuapp.com/images/",
  // https://prt003-blog.herokuapp.com/images/1649769873767p1.png
};
const { useGlobalState, setGlobalState } =
  createGlobalState(initialState);
// console.log(useGlobalState);

export { useGlobalState, setGlobalState };
