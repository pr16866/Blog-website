
//www.youtube.com/watch?v=o1chMISeTC0
import { Box } from "@material-ui/core";
import Home from "./components/home/home";
import Nav from "./components/nav";
import DetailView from "./components/post/detailView";
import "./css/post.css";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import CreateBlog from "./components/create/createBlog";
import EditBlog from "./components/create/editBlog";
import AuthenticationMain from "./components/Authentication/AuthenticationMain";
import { useGlobalState } from "./components/GlobalState/Globalstate";
import { auth } from "./components/FirebaseSetup/Firebase";
import { useEffect } from "react";
import { useState } from "react";
import { getProfile } from "./service/api";
import ProfileMain from "./components/Profile/ProfileMain";
import NotFound from "./components/notFound/NotFound";
import FollowersMain from "./components/Followers/FollowersMain";
import EditProfileWrapper from "./components/EditProfile/EditProfileWrapper";


function App() {
  const [flag, setFlag] = useState(false);
  const [authenticated, setauthenticated] = useGlobalState("Authenticated");
  const [profile, setProfile] = useGlobalState("profile");
  const [registered, setRegistered] = useGlobalState("Registered");

  const history = useHistory();
  useEffect(() => {
    try {
      auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          console.log(authUser.email);
          setauthenticated(authUser.email);
          setFlag(true);
        } else {
          setauthenticated(false);
          setProfile(null);
        }
      });
    } catch (er) {
      console.log(er);
    }
  }, [authenticated]);


  useEffect(() => {
    if (authenticated) {
      getUser();
    }
  }, [authenticated]);


  
  
  const getUser = async () => {
    const response = await getProfile( `?email=${authenticated}`);
    setProfile(response.data);
    //  response.data
    //    ? alert("we got the user with this profile")
    //    : alert("user with this email address is not present in our database");
    // history.push("/");
  };
 
 

  return (
    <>
      <Router>
        <Nav />

        <Box style={{ marginTop: "65px" }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/followers/:userid" component={FollowersMain} />
            <Route exact path="/detail/:id" component={DetailView} />

            <Route exact path="/Profile/:username" component={ProfileMain} />
            <Route exact path="/Create_blog" component={CreateBlog} />
            {authenticated ? (
              <>
                {/* <Route exact path="/Profile/:username" component={ProfileMain} /> */}

                <Route exact path="/update_blog/:id" component={EditBlog} />

                <Route
                  exact
                  path="/update_profile/:userid"
                  component={EditProfileWrapper}
                />
              </>
            ) : (
              ""
            )}

            <Route exact path="/logIn" component={AuthenticationMain} />
            <Route exact path="*" component={NotFound} />
          </Switch>
          <p
            style={{
              background: "#3f51b5",
              color: "white",
              textAlign: "center",
            }}>
            Copyright © designed and developed by Piyush Thakur
          </p>
        </Box>
      </Router>
    </>
  );
}

export default App;
