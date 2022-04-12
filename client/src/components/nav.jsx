import React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import {  useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useGlobalState } from "./GlobalState/Globalstate";
import { auth } from "./FirebaseSetup/Firebase";
// import { useGlobalState } from "../GlobalState/Globalstate";

const usestyle = makeStyles({
  nav: {
    // backgroundColor:"white",
    // color:"black",
  },
  navchild: {
    justifyContent: "center",
    "&  > *": {
      padding: "10px 20px",
      "&:hover": {
        backgroundColor: "#6495ED",
        color: "white",
        cursor: "pointer",
        borderRadius: 20,
      },
    },
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: "50%",
  },
});

export default function Nav() {
  const classes = usestyle();
  const history = useHistory();
  const [isAuthenticated, setAuthenticated] = useGlobalState("Authenticated");

 const [profile, setProfile] = useGlobalState("profile");
  const Logout = () => {

    auth.signOut().then((res) => {

      alert("logout sucess");
      history.push("/logIn");
      setAuthenticated(false);

      
    }).catch((er) => { alert("Something is error in signout")});
  }
  
  const LogIn = () => {
    history.push("/logIn")
  }
   
  return (
    <>
      <AppBar className={classes.nav}>
        <Toolbar className={classes.navchild}>
          <Typography onClick={() => history.push("/")}>Home</Typography>

          {isAuthenticated &&
           <Typography
            onClick={() => history.push(`/Profile/${profile.userid}`)}>
            Profile
          </Typography>
          }
         

          {isAuthenticated ? (
            <Typography className="login" onClick={Logout}>
              Logout
            </Typography>
          ) : (
            <Typography className="login" onClick={LogIn}>
              Login
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
