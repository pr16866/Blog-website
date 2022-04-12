import React, { useEffect } from "react";
import ProfileCardWrapper from "../ProfileCard/ProfileCardWrapper";
import ProfileTemplet from "./ProfileTemplet";
import { useGlobalState } from "../GlobalState/Globalstate";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  addFollowing,
  getpost,
  getProfile,
  removeFollowing,
} from "../../service/api";
import { useState } from "react";
import { from } from "responselike";
const Profilemain = styled.div`
  
`;
export default function ProfileMain() {
  const [post, setpost] = useState([]);
  const [user, setuser] = useGlobalState("profile");
  const [profile, setProfile] = useState({});

  const [ProfileFlag, setProfileFlag] = useState("");
  const { search } = useLocation();
  const params = useParams();
  const [followFlag, setFollowFlag] = useGlobalState("followerflag");
  const [notificationFlag, setnotificationFlag] =
    useGlobalState("notificationFlag");
const [Notification, setNotification] = useGlobalState("Notification");
  useEffect(async () => {

    let res = await getpost(`?username=${params.username}`);
    setpost(res.data);

  }, [params]);

  useEffect(async () => {
    const response = await getProfile(`?userid=${params.username}`);
    setProfile(response.data);
    setNotification(response.data.notification);
    // console.log(response.data.notification);
  }, [params, ProfileFlag, notificationFlag]);
  // console.log(notificationFlag);

  const Check = async () => {
    if (profile.userid !== user.userid) {
      if (!profile.followersUserId.includes(user.userid)) {
        const res = await addFollowing(params.username, user.userid);

        setProfileFlag(res.data);
        setFollowFlag(false);
      } else {
        const res = await removeFollowing(params.username, user.userid);
        setProfileFlag(res.data);
        setFollowFlag(true);
      }
    }
  };
  // console.log(Notification.reverse());
  return (
    <Profilemain>
      <div className="box">
        <ProfileTemplet profile={profile} post={post} check={Check} />
      </div>
    </Profilemain>
  );
}
