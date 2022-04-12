import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useHistory,
} from "react-router-dom";
import { Check, InsertDriveFileSharp, Mail,Google,mai, AirlineSeatFlatAngled, AddToQueueSharp, Email } from "@material-ui/icons";
import { auth, facebookAuthProvider, googleAuthProvider } from "../FirebaseSetup/Firebase";
import { useGlobalState } from "../GlobalState/Globalstate";
import { addProfile, getProfile, getAllProfile } from "../../service/api";


const LoginAndRegister = styled.div`
  .form-box {
    height: 500px;

    position: relative;

    background: rgb(233, 233, 233, 0.8);
    padding: 5px;

    overflow: hidden;
  }

  .button-box {
    width: 230px;

    margin: 35px auto;
    border-radius: 30px;
    box-shadow: 0 0 20px 9px #ff61241f;
    position: relative;
  }
  .toggle-btn {
    padding: 10px 30px;
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
    position: relative;
  }
  #btn {
    top: 0;
    left: -10px;
    position: absolute;
    width: 110px;
    height: 100%;
    border: 2px solid black;
    background: linear-gradient(to right, #ff105f, #ffad06);
    border-radius: 30px;
    transition: 0.5s;
  }
  .social-icon {
    text-align: center;
  }
  .social-icon i {
    margin: 0 10px;
    font-size: 35px;
    color: rgb(209, 36, 36);
    cursor: pointer;
    box-shadow: 0 0 20px 0 #7f7f7f3d;
  }
  .input-group {
    position: absolute;
    left: 0px;
    width: 90%;
    margin-top: 10%;
    transition: 0.5s;
  }
  .input-field {
    width: 100%;
    padding: 10px 0;
    margin: 5px 0;
    border: 0;
    border-bottom: 1px solid #999;
    outline: none;
    background: transparent;
    font-size: 20px;
  }
  .submit-btn {
    width: 85%;
    padding: 10px 30px;
    cursor: pointer;
    display: block;
    margin: auto;
    background: linear-gradient(to right, #ff105f, #ffad06);
    border: 0;
    outline: none;
    border-radius: 30px;
  }
  .checkbox {
    margin: 30px 10px 30px 0;
  }
  span {
    color: #777;
    font-size: 12px;
    bottom: 68px;
    position: absolute;
  }
  #login {
    top: 140px;
    left: 5%;
  }
  #Register {
    left: 101%;
  }
  .otp-inner {
    display: flex;

    align-items: center;
  }

  .otp-inner button {
    font-size: 14px;
    line-height: 0px;
    background: linear-gradient(to right, #ff105f, #ffad06);
    padding: 0px 0px;
    width: 100px;
    height: 25px;
    cursor: pointer;
    border-radius: 14px;
  }

  #Register {
    position: absolute;
  }
  .doneBox {
    color: white;
    background-color: green;
    width: 100%;
    height: 20px;
    text-align: center;
    padding: 5px;
    font-weight: bolder;
    border-radius: 15px;
  }
  .logEmail {
    display: flex;
    align-items: center;

    gap: 20px;
    margin: 30px auto;
    justify-content: center;
    background-color: #3b5998;
    color: white;
    padding: 10px 0px;
    border-radius: 15px;
    cursor: pointer;
  }

  .text {
    font-size: 18px;
  }

  @media screen and (max-width: 480px) {
    .form-box {
    }
    .input-group {
      width: 90%;
    }
  }
  @media screen and (max-width: 350px) {
    .button-box {
      width: 90%;
    }
  }
`;


export default function Login() {
  const initialLogData = {
    email: "",
    password: "",
  };
  const [logData, setlogData] = useState(initialLogData);
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [flage, setFlag] = useState(false);
  const [register, setRegister] = useGlobalState("Registered");
  const [profile, setProfile] = useGlobalState("profile");
  const [authenticated, setauthenticated] = useGlobalState("Authenticated");
  const history = useHistory();
  const initialState = {
    name: "",
    userid: "",
    email: "",
    password: "",
    cnfpassword: "",
  };

  const [formData, setformData] = useState(initialState);
  
  const { name, userid, email, password, cnfpassword } = formData;

  // ======>> Register <<======

  const RegisterNow = async (e) => {

    e.preventDefault();

    try {
      let res = await addUser(); 
      
      if (res) {
        history.push("/");
        const user = await auth.createUserWithEmailAndPassword(
          formData.email,
          formData.password
        );
      }
    } catch (er) {
      alert(er.message);
    }
  };
  const validate = (data) => {
    let returnval = true;
    
 if (data.userid !== "") {
   for (let index = 0; index < allId.length; index++) {
        if ( allId[index].userid === data.userid) {
          returnval = false;
          alert("userId must be unique");
          break;       
        }       
  }
      }
  if (data.email !== "") {
   console.log("Piyush");
   for (let i = 0; i < allId.length; i++) {
     console.log(allId[i].email);
     if (allId[i].email === data.email) {
       returnval = false;
       alert("emailId must be unique");
       break;
          
     }
   } 
    }
    return returnval;

  };
  const addUser = async () => {
    let data = {
      name: formData.name,
      userid: formData.userid,
      email: formData.email,
      address: "",
      imageUrl: "",
      followersUserId: [],
      linkdinLink: "",
      fbLink: "",
      instaLink: "",
      twitterLink: "",
      about: "",
      followingsUserId: [],
      notification:[],
    };
    let returnVal = validate(data);
    console.log(returnVal);
    if (returnVal) {
      let res = await addProfile(data);
    
    setformData(initialState);
    return res;
    }
    else {
      return false;
    }
    
  };
  // ======>> Register end<<======

  const [allId, setallId] = useState([]);
  
  const AlluserId = async() => {
    let res = await getAllProfile();
    setallId(res.data);
  }
  useEffect(() => {
    AlluserId();
  });
  // ========> login <<========
  const LoginNow = async (e) => {

    e.preventDefault();
    auth
      .signInWithEmailAndPassword(logData.email, logData.password)
      .then((User) => {
        console.log();
        alert("Login sucessfully"); 
        history.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  // ========>> LogIn end <<=========



  // ======>> Handle change <<=======
  const handleChange = (e) => {
    e.preventDefault();
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeLog = (e) => {
    e.preventDefault();
    setlogData({ ...logData, [e.target.name]: e.target.value });
  };
  // ==========>> toggle button <<=======
  const login = () => {
    let x = document.getElementById("login");
    let y = document.getElementById("Register");
    let z = document.getElementById("btn");
    x.style.left = "5%";
    y.style.left = "101%";
    z.style.left = "-10px";
  };
  const Register = () => {
    let x = document.getElementById("login");
    let y = document.getElementById("Register");
    let z = document.getElementById("btn");
    x.style.left = "-101%";
    y.style.left = "5%";
    z.style.left = "95px";
  };

  const loginEmail = () => {
    // auth.signInWithPopup(googleAuthProvider).then((user) => {
    //   console.log(user.user);
     
    // });
  };
  const loginFb = () => {
    auth
      .signInWithPopup(facebookAuthProvider)
      .then((user) => {
        console.log();
        setauthenticated(user);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <LoginAndRegister className="hero">
      <div className="form-box">
        <div className="button-box">
          <div id="btn"></div>
          <button type="button" className="toggle-btn" onClick={login}>
            Log in
          </button>
          <button type="button" className="toggle-btn" onClick={Register}>
            Register
          </button>
        </div>
        <div className="form">
          <form className="input-group" id="login" onSubmit={LoginNow}>
            <input
              type="email"
              name="email"
              className="input-field"
              placeholder="Email Id"
              required
              onChange={handleChangeLog}
            />
            <input
              type="text"
              name="password"
              className="input-field"
              placeholder="Password"
              required
              onChange={handleChangeLog}
            />
            <br/><br />
            <button type="submit" className="submit-btn">
              Login
            </button>
            <br />
            <br />
            {/* <div className="smVerificationMain">
              <div className="logEmail" onClick={loginEmail}>
                <spn className="icon">
                  <Email />
                </spn>
                <spn className="text"> Login with google</spn>
              </div>
            </div> */}
          </form>
          <form className="input-group" id="Register" onSubmit={RegisterNow}>
            <input
              type="text"
              name="name"
              className="input-field"
              placeholder="Name"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="userid"
              className="input-field"
              placeholder="User Id"
              required
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              className="input-field"
              placeholder="Email Id"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="password"
              className="input-field"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cnfpassword"
              className="input-field"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            {show ? (
              <div className="doneBox">
                <Check />
              </div>
            ) : (
              <>
                {formData.Number ? (
                  <div className="otp-verification">
                    <div id="recaptcha-container"></div>
                    <div className="otp-inner">
                      <input
                        type="text"
                        name="otp"
                        className="input-field"
                        placeholder="Otp"
                        required
                        onChange={handleChange}
                      />
                    
                    </div>
                    <p>Enter The Otp Sent On Your Number</p>
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
            <br />
            <br />
            <button type="submit" className="submit-btn">
              Register
            </button>
          </form>
        </div>
      </div>
    </LoginAndRegister>
  );
}
