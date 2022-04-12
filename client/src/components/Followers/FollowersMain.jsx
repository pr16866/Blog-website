import { Camera } from '@material-ui/icons';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import { getAllFollowers } from '../../service/api';
import { useGlobalState } from '../GlobalState/Globalstate';
import ProfileCard from '../ProfileCard/ProfileCard';
import CustomizedDialogs from './FollowersUi';
import FollowersUi from './FollowersUi';



const Followers = styled.div`
  .main {
    position: absolute;
    border: 1px solid black;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .main .image {
    position: relative;
    border: 1px solid black;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background: url("https://static.thenounproject.com/png/12017-200.png")
      no-repeat center / cover;
    margin-bottom: 2px;
    overflow: hidden;
    cursor: pointer;
  }
  .image .hover {
    position: absolute;
    width:100px;
    height:100px;
    top: 0;
    left: 0;
    background-color: rgba(79, 172, 254, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    transition: 0.5s;
  }
  .image:hover .hover {
    opacity: 1;
  }

  .hover.active {
    opacity: 1;
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
`;

export default function FollowersMain()



{
  return (
    <Followers>
      <CustomizedDialogs />
    </Followers>
  );
}
