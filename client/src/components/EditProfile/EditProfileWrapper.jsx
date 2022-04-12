import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getProfile } from '../../service/api';
import { useGlobalState } from '../GlobalState/Globalstate';
import EditProfile from './EditProfile';

export default function EditProfileWrapper() {

  const [profile, setProfile] = useGlobalState("profile");
  const params = useParams();
  useEffect(async() => {
  
    const response = await getProfile(`?userid=${params.userid}`);
    setProfile(response.data);
  
  }, [params]);
  return (
    <div>
      <EditProfile profile={profile}/>
    </div>
  )
}
