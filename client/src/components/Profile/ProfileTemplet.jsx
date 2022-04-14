import { Tooltip } from '@material-ui/core';
import { Camera, Chat, Edit, Facebook, Instagram, LinkedIn, Mail, Twitter } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getAllFollowers } from '../../service/api';
import FollowersMain from '../Followers/FollowersMain';
import FollowingMain from '../Followings/FollowingMain';
import { useGlobalState } from '../GlobalState/Globalstate';
import NotificationWrapper from '../Notification/NotificationWrapper';



 
const Profiletemplet = styled.div`
  .container {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 85vh;
  }

  .card {
    position: relative;
    width: 50%;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 5px 15px 1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  @media (max-width: 880px) {
    .card {
      width: 100%;
    }
  }

  .card:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 270px;
    top: 0;
    left: 0;
    background-image: linear-gradient(to top, #00f2fe, #4facfe);
    clip-path: circle(400px at 50% -48.5%);
  }

  .header {
    position: relative;
    height: 265px;
  }

  .mail {
    position: absolute;
    top: 1rem;
    right: 2rem;
    font-size: 1.5rem;
    color: #fff;
    opacity: 0.8;
    transition: 0.3s;
    z-index: 3;
    text-decoration: none;
  }

  .mail:hover {
    opacity: 1;
  }

  .hamburger-menu {
    position: absolute;
    width: 31px;
    height: 35px;
    top: 1.4rem;
    left: 1.9rem; 
    /* /* border: 1px solid white; */
    z-index: 3;
    cursor: pointer;
    transition: 0.3s;
    opacity: 0.8;
    color: #fff;
    display: flex; 
    align-items: center;
    justify-content: center;
  }

  .hamburger-menu:hover {
    opacity: 1;
  }

  .hamburger-menu .center {
    /* position: absolute; */
    /* height: 2px;
    width: 70%; */
    /* top: 50%; */
    /* transform: translateY(-50%);   */
     /* background-color: #fff;
     border-radius: 1px; */
  }

  .hamburger-menu:before,
  .hamburger-menu:after {
    content: "";
    position: absolute; 
 width: 100%; 
    height: 2px;
    /* border-radius: 1px;
     background-color: #fff;  */
  }

  .hamburger-menu:before {
    top: 0;
  } 

  .hamburger-menu:after {
    bottom: 0;
  }

  .main {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .main .image {
    position: relative;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    border: 4px solid #00d8fe;
    margin-bottom: 2px;
    overflow: hidden;
    cursor: pointer;
  }

  .image .hover {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(79, 172, 254, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    transition: 0.5s;
    opacity: 0;
  }

  .image:hover .hover {
    opacity: 1;
  }

  .hover.active {
    opacity: 1;
  }

  .name {
    font-size: 1.4rem;
    color: #fff;
    font-weight: 500;
    margin: 5px 0;
    text-transform: uppercase;
  }

  .sub-name {
    font-family: "Cutive Mono", monospace;
    font-size: 1.2rem;
    opacity: 0.8;
    color: #fff;
  }

  .content {
    display: flex;
    padding: 1.7rem 2.5rem 2.6rem 2.5rem;
    align-items: center;
    justify-content: center;
    gap: 50px;
  }

  .right {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 0px;
  }

  .number {
    font-size: 2.1rem;
    font-weight: 200;
    color: #333;

    text-align: center;
    margin-bottom: -10px;
  }

  .number-title {
    font-size: 0.55rem;
    color: #666;
    font-weight: 400;

    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .title {
    position: relative;
    color: #555;
    font-weight: 500;
    font-size: 1.1rem;
    padding: 0 0 3px 0;

    display: inline-block;
  }

  .title:after {
    content: "";
    position: absolute;
    height: 3px;
    width: 50%;

    background-color: #555;
    bottom: 0;
    left: 0;
  }

  .text {
    color: #666;
    font-weight: 300;
  }

  .icons-container {
    padding: 1rem 0;
  }

  .icon {
    color: #c4c4c4;
    font-size: 1.3rem;
    text-decoration: none;
    margin-right: 8px;
    transition: 0.3s;
  }

  .icon:hover {
    color: #4facfe;
  }

  .buttons-wrap {
    display: flex;
  }

  .follow-wrap,
  .share-wrap {
    flex: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
  }

  .follow-wrap:hover,
  .share-wrap:hover {
    flex: 5;
  }

  .follow {
    padding: 9.6px 0;
    width: 100%;
    background: linear-gradient(to right, #4facfe 0%, #00f2fe 140%);
    color: #fff;
    text-align: center;
    text-decoration: none;
    font-size: 0.7rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-radius: 18.1px;
    margin-right: 3px;
    cursor: pointer;
  }

  .share {
    padding: 7.6px 0;
    width: 100%;
    border: 2px solid #4facfe;
    color: #4facfe;
    text-decoration: none;
    text-align: center;
    font-size: 0.7rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-left: 3px;
    border-radius: 18.1px;
    cursor: pointer;
  }

  .modal {
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: -1;
    opacity: 0;
    transition: 0.5s;
  }

  .modal img {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.3);
    max-width: 100%;
    max-height: 100%;
    transition: 0.5s;
  }

  .modal.show {
    opacity: 1;
    z-index: 99;
  }

  .modal.show img {
    top: 50%;
    transform: translate(-50%, -50%) scale(1);
  }

  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: 0.3s;
  }

  .close:hover {
    opacity: 0.5;
  }

  .close:before,
  .close:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    border-radius: 1.5px;
    top: 50%;
    left: 50%;
    background-color: #fff;
  }

  .close:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .close:after {
    transform: translate(-50%, -50%) rotate(135deg);
  }
  .follower {
    margin: -20px 0;
  }
  @media (max-width: 410px) {
    .content {
      flex-direction: column;
      gap: 0px;
    }

    .right {
      flex-direction: row;
      text-align: center;
      gap: 20px;
      align-items: center;
      justify-content: center;
    }
    .border{
      height: 20px;
      width: 0.4px;
      color: black;
      /* border: 1px solid black; */
    }
  }

  @media (max-width: 370px) {
    .header {
      height: 230px;
    }

    .card:before {
      clip-path: circle(400px at 50% -74.5%);
      height: 230px;
    }

    .hamburger-menu {
      width: 16px;
      /* height: 12px; */
      margin-top: 5px;
      top: 1.1rem;
      left: 1.5rem;
    }

    .mail {
      font-size: 1.5rem;
      top: 0.75rem;
      right: 1.5rem;
    }

    .main .image {
      width: 90px;
      height: 90px;
      border-width: 3px;
    }

    .name,
    .sub-name {
      font-size: 1rem;
    }

    .content {
      padding: 1.2rem 1.8rem 1.8rem 1.8rem;
    }

    .number {
      font-size: 1.8rem;
    }

    .number-title {
      font-size: 0.4rem;
    }

    .right {
      padding-top: 1rem;
    }

    .title {
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .text {
      font-size: 0.8rem;
    }

    .icons-container {
      padding: 0.5rem 0;
    }

    .icon {
      font-size: 1.1rem;
    }

    .follow {
      padding: 7.6px 0;
      border-radius: 14.6px;
      font-size: 0.6rem;
    }

    .share {
      padding: 5.6px 0;
      border-radius: 14.6px;
      font-size: 0.6rem;
    }
  }

  .header_section {
  }
`;

export default function ProfileTemplet({ profile, post, check}) {
  const [user, setUser] = useGlobalState("profile");

  const [Authenticated, setAuthenticated] = useGlobalState("Authenticated");
  const [followFlag, setFollowFlag] = useGlobalState("followerflag");
  const [Notification, setNotification] = useGlobalState("Notification");
  
  
  let data = "https://static.thenounproject.com/png/12017-200.png";

  const [imageurl, setImageUrl] = useGlobalState("imageUrl");

  const {
    _id,
    name,
    imageUrl,
    address,
    userid,
    followers,
    email,
    followersUserId,
    notification
  } = profile;

  let dpUrl = imageUrl?imageurl+imageUrl:"https://static.thenounproject.com/png/12017-200.png";

  
  const Show = () => {
    const hover = document.querySelector(".hover");
    const modal = document.querySelector(".modal");
    hover.classList.add("active");
    modal.classList.add("show");
  };


  const hide = () => {
    const hover = document.querySelector(".hover");
    const modal = document.querySelector(".modal");
    hover.classList.remove("active");
    modal.classList.remove("show");
  };


  const history = useHistory();
  const seeProject = (userid) => {
    history.push(`/?username=${userid}`);
  };
 

  useEffect(() => {
    if (Authenticated) {
      
    
      if (followersUserId) {
        if (followersUserId.includes(user.userid)) {
          setFollowFlag(false);
        } else {
          setFollowFlag(true);
        }
      }
    }
  }, [followersUserId]);

  // if (Notification) {
  //    let newNoti = Notification.map((item, index) => {
  //   if (!item.seen) {
  //     return item;
  //   }
  //   else {
  //     return item;
  //   }
  // });
  // console.log(newNoti);

  // }
 
  
  
 const [allFollowers, setallFollowers] = useState([]);
  const params = useParams();
  // console.log(Notification);
  // let revNotification = Notification ? Notification.reverse() : "";
  // // console.log(revNotification);
  
  useEffect(async () => {
    // if (notification) {
      
    //   for (let i = 0; i < notification.length; i++){
    //   notification[i] = notification[notification.length-1+i];
    //   }
      
    // }
   const response = await getAllFollowers(params.username);

   if (response.data) {
     setallFollowers(response.data);
   }
  }, [params]);
  
  // console.log(Notification);
  return (
    <Profiletemplet>
      <div className="modal">
        <img src={dpUrl} alt="" />
        <div className="close" onClick={hide}></div>
      </div>

      <div className="container">
        <div className="card">
          <div className="header">
            {Authenticated && user.userid === userid ? (
              <>
                {Notification && (
                  <NotificationWrapper notification={Notification} />
                )}
                <Link className="mail" to={`/update_profile/${userid}`}>
                  <Tooltip title="Edit Profile" arrow>
                    <Edit style={{ fontSize: "30px" }} />
                  </Tooltip>
                </Link>
              </>
            ) : (
              ""
            )}

            <div className="main">
              <div
                className="image"
                style={{
                  backgroundImage: `url(${dpUrl})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                onClick={Show}>
                <div className="hover">
                  <Camera />
                </div>
              </div>
              <h3 className="name">{name}</h3>
              <h3 className="sub-name" style={{ margin: "0px 0 -10px 0" }}>
                @{userid}
              </h3>
              <h3 className="sub-name" style={{ textTransform: "capitalize" }}>
                {address ? address : "State, Country"}
              </h3>
            </div>
          </div>

          <div className="content">
            <div className="left">
              <div className="about-container">
                <h3 className="title">About</h3>

                <p className="text">
                  Lorem Ipsum is simply text of the printing and types
                  industrythe printing and types industry..
                </p>
              </div>
              <div className="icons-container">
                <a href="#" className="icon">
                  <Facebook />
                </a>
                <a href="#" className="icon">
                  <Instagram />
                </a>
                <a href="#" className="icon">
                  <LinkedIn />
                </a>
                <a href="#" className="icon">
                  <Twitter />
                </a>
              </div>
              <div className="buttons-wrap">
                <div className="follow-wrap">
                  {Authenticated && user.userid === userid ? (
                    <Tooltip
                      title="You are not allowed to follow yourself"
                      arrow>
                      <div className="follow">Follow</div>
                    </Tooltip>
                  ) : (
                    <div
                      className="follow"
                      onClick={
                        Authenticated
                          ? check
                          : () => alert("Please login first")
                      }>
                      {followFlag ? "Follow" : "Unfollow"}
                    </div>
                  )}
                </div>
                <div className="share-wrap">
                  <div className="share" onClick={() => seeProject(userid)}>
                    Blogs
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <div
                onClick={() => seeProject(userid)}
                style={{ cursor: "pointer" }}>
                <h3 className="number">
                  {post.length > 9 ? post.length : "0" + post.length}
                </h3>
                <h3 className="number-title">Posts</h3>
              </div>
              <div className="border"></div>
              <div className="follower">
                <FollowingMain />
              </div>
              <div className="border"></div>
              <div>
                <FollowersMain />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Profiletemplet>
  );
}
