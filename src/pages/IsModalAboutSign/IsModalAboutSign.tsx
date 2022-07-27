import React from "react";
import styled from "styled-components";

const IsModalAboutSign = (props: any) => {
  return (
    <>
      <Background
        onClick={
          props.title === "회원가입"
            ? props.signUpModalOnOff
            : props.signInModalOnOff
        }
      />
      <Wrapper>
        <CloseBtn>
          <i
            className="fa-solid fa-x"
            onClick={
              props.title === "회원가입"
                ? props.signUpModalOnOff
                : props.signInModalOnOff
            }
          ></i>
        </CloseBtn>
        <MainIcon>
          <i className="fa-solid fa-computer"></i>
        </MainIcon>
        <div className="title">{props.title}</div>

        <InputBox>
          {props.title === "회원가입"
            ? props.signUpData.map(
                (
                  data: {
                    text: string;
                    type: string;
                  },
                  index: React.Key
                ) => {
                  return (
                    <input
                      key={index}
                      type={data.type}
                      placeholder={data.text}
                    ></input>
                  );
                }
              )
            : props.signInData.map(
                (
                  data: {
                    text: string;
                    type: string;
                  },
                  index: React.Key
                ) => {
                  return (
                    <input
                      key={index}
                      type={data.type}
                      placeholder={data.text}
                    ></input>
                  );
                }
              )}
        </InputBox>

        <BtnAboutSign
          onClick={() =>
            props.title === "회원가입" &&
            alert(`회원가입이 완료되었습니다!
로그인을 진행해주세요.`)
          }
        >
          {props.title === "회원가입" ? "회원가입" : "로그인"}
        </BtnAboutSign>
      </Wrapper>
    </>
  );
};

export default IsModalAboutSign;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.4;
  top: 0;
  left: 0;
`;

const Wrapper = styled.section`
  box-sizing: border-box;
  margin: 0 auto;
  width: 800px;
  height: 600px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  z-index: 1;
  position: fixed;
  top: 50%;
  transform: translateX(50%);
  transform: translateY(-50%);

  .title {
    margin-top: 50px;
    font-size: 30px;
    font-weight: 700;
    color: black;
  }
`;

const CloseBtn = styled.div`
  width: 90%;
  margin-top: 20px;
  text-align: right;
  font-size: 20px;

  i {
    cursor: pointer;
  }
`;

const MainIcon = styled.div`
  margin-top: 50px;
  i {
    font-size: 100px;
    color: #ff665c;
  }
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 600px;
  margin-top: 40px;
  input {
    width: 100%;
    height: 40px;
    margin: 5px 0;
    font-size: 20px;
    background-color: #f5f5f5;
    border: none;
    border-radius: 5px;
    outline: none;
  }
`;

const BtnAboutSign = styled.button`
  /* margin: 10px auto; */
  width: 600px;
  height: 40px;
  background-color: #ff665c;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  color: white;
  cursor: pointer;
  position: absolute;
  bottom: 30px;
`;
