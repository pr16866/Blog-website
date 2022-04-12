import React from 'react';
import styled from 'styled-components';
import LoginRegisterWrapper from "./LoginRegisterWrapper";

const Authenticatio = styled.div`
  .Box {
    text-align: -webkit-center;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 100px 0;
    /* gap: 20px; */

    /* background: rgb(233, 233, 233, 0.8); */
  }
  .LoginRegister {
    width: 380px;
  }
  .LoginImge {
    width: 400px;
    background: rgb(233, 233, 233, 0.8);
    height: 510px;
    /* border: 1px solid black; */
  }
  .LoginImge img {
    width: 80%;
    height: 100%;
  }
  @media screen and (max-width: 780px) {
    .LoginRegister {
      width: 90%;
    }
    .LoginImge {
      width: 90%;
      /* height: 400px; */
    }
  }
  @media screen and (max-width: 480px) {
    .LoginImge {
      /* width: 90%; */
      height: 400px;
    }
  }
`;
export default function AuthenticationMain() {
  return (
    <Authenticatio>
      <div className="Box">
       <div className="LoginImge">
          <img
            src="https://login.mailgun.com/login/static/dev-ilustration.png"
            alt=""
          />
        </div>
        <div className="LoginRegister">
          <LoginRegisterWrapper />
        </div>

        
      </div>
    </Authenticatio>
  );
}
