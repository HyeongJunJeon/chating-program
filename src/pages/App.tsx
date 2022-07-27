import React, { useState } from "react";
import styled from "styled-components";
import IsModalAboutSign from "./IsModalAboutSign/IsModalAboutSign";

export interface AboutSign {
  type: string;
  text: string;
}

function App() {
  const [isSignUpModal, setIsSignUpModal] = useState(false);
  const [isSignInModal, setIsSignInModal] = useState(false);

  const signUpModalOnOff = () => {
    setIsSignUpModal(!isSignUpModal);
  };

  const signInModalOnOff = () => {
    setIsSignInModal(!isSignInModal);
  };

  const SIGN_UP_DATA: Array<AboutSign> = [
    {
      type: "name",
      text: "이름",
    },
    {
      type: "email",
      text: "이메일",
    },
    {
      type: "password",
      text: "비밀번호",
    },
  ];

  const SIGN_IN_DATA: Array<AboutSign> = [
    {
      type: "email",
      text: "이메일",
    },
    {
      type: "password",
      text: "비밀번호",
    },
  ];

  return (
    <Wrapper>
      <MainIcon>
        <i className="fa-solid fa-computer"></i>
      </MainIcon>
      <div className="mainIconText">
        Maumlab & JHJ's <br />
        Communication Program
      </div>

      <div className="middleText">똑똑, 내마음을 두드리는 공간</div>

      <SignUpBtn onClick={signUpModalOnOff}>회원가입</SignUpBtn>
      <SignInBtn onClick={signInModalOnOff}>로그인</SignInBtn>

      {isSignUpModal && (
        <IsModalAboutSign
          signUpData={SIGN_UP_DATA}
          title="회원가입"
          signUpModalOnOff={signUpModalOnOff}
        ></IsModalAboutSign>
      )}
      {isSignInModal && (
        <IsModalAboutSign
          signInData={SIGN_IN_DATA}
          title="로그인"
          signInModalOnOff={signInModalOnOff}
        ></IsModalAboutSign>
      )}
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.section`
  box-sizing: border-box;
  margin: 0 auto;
  width: 1100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .mainIconText {
    margin-top: 50px;
    font-size: 30px;
    color: #ff665c;
    text-align: center;
  }

  .middleText {
    margin-top: 130px;
    font-size: 20px;
    font-weight: 700;
  }
`;

const MainIcon = styled.div`
  margin-top: 100px;
  i {
    font-size: 100px;
    color: #ff665c;
  }
`;

const SignUpBtn = styled.button`
  margin-top: 150px;
  width: 500px;
  height: 40px;
  background-color: #ff665c;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  color: white;
  cursor: pointer;
`;

const SignInBtn = styled(SignUpBtn)`
  margin-top: 20px;
  background-color: transparent;
  border: 1px solid #ff665c;
  color: #ff665c;
`;