import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import styled from "styled-components";

interface Props {
  signUpModalOnOff(): void;
}

const SignUp = ({ signUpModalOnOff }: Props) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const { name, email, password, error, loading } = data;

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setData({ ...data, error: "", loading: true });
    if (!name || !email || !password) {
      setData({ ...data, error: "모든 정보를 입력하세요!" });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      setData({ name: "", email: "", password: "", error: "", loading: false });
      signUpModalOnOff();
    } catch (err) {
      setData({ ...data, error: "모든 정보를 입력하세요!", loading: false });
    }
  };
  return (
    <>
      <Background onClick={signUpModalOnOff} />
      <SignUpWrapper>
        <CloseBtn>
          <i className="fa-solid fa-x" onClick={signUpModalOnOff}></i>
        </CloseBtn>
        <MainIcon>
          <i className="fa-solid fa-computer"></i>
        </MainIcon>
        <div className="title">회원가입</div>

        <InputBox>
          <>
            <input
              name="name"
              type="name"
              placeholder="이름"
              value={name}
              onChange={handleChange}
            ></input>
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
              placeholder="비밀번호 (6 자리이상 입력해주세요)"
              value={password}
              onChange={handleChange}
            ></input>
          </>
        </InputBox>

        {error ? <ErrorText>{error}</ErrorText> : null}

        <BtnAboutSign onClick={handleSubmit} disabled={loading}>
          {loading ? "회원 가입 중입니다..." : "회원가입"}
        </BtnAboutSign>
      </SignUpWrapper>
    </>
  );
};

export default SignUp;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.4;
  top: 0;
  left: 0;
`;

const SignUpWrapper = styled.section`
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
