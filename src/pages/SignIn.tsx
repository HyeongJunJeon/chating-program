import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { updateDoc, doc } from "firebase/firestore";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SignIn = (props: any) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const navigate = useNavigate();

  const { email, password, error, loading } = data;

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setData({ ...data, error: "", loading: true });
    if (!email || !password) {
      setData({ ...data, error: "모든 정보를 입력하세요!" });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
      setData({ email: "", password: "", error: "", loading: false });
      navigate("/ChattingMain");
    } catch (err) {
      setData({ ...data, error: "모든 정보를 입력하세요!", loading: false });
    }
  };
  return (
    <>
      <Background onClick={props.signInModalOnOff} />
      <SignInWrapper>
        <CloseBtn>
          <i className="fa-solid fa-x" onClick={props.signInModalOnOff}></i>
        </CloseBtn>
        <MainIcon>
          <i className="fa-solid fa-computer"></i>
        </MainIcon>
        <div className="title">로그인</div>

        <InputBox>
          <>
            <input
              name="email"
              type="email"
              placeholder="이메일"
              value={email}
              onChange={handleChange}
            ></input>
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={handleChange}
            ></input>
          </>
        </InputBox>

        {error ? <ErrorText>{error}</ErrorText> : null}

        <BtnAboutSign onClick={handleSubmit} disabled={loading}>
          {loading ? "로그인 중 입니다..." : "로그인"}
        </BtnAboutSign>
      </SignInWrapper>
    </>
  );
};

export default SignIn;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.4;
  top: 0;
  left: 0;
`;

const SignInWrapper = styled.section`
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

const ErrorText = styled.p`
  color: red;
  font-weight: 700;
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
