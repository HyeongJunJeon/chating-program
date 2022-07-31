import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "../context/auth";

const NavBar = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    alert("로그아웃 되었습니다!");
    navigate("/");
  };

  const goToProfile = () => {
    navigate(`/Profile`);
  };

  const goToChattingMain = () => {
    navigate("/ChattingMain");
  };
  return (
    <NavWrapper>
      <NavIcon>
        <i className="fa-solid fa-computer"></i>
        <NavText>
          똑 <span>TALK</span> <br /> 힐링의 <span>KNOCK</span>
        </NavText>
      </NavIcon>
      {user && (
        <NavBtnWrapper>
          <Chatting onClick={goToChattingMain}> 채팅</Chatting>
          <Profile onClick={goToProfile}>프로필</Profile>
          <Logout onClick={handleSignOut}>로그아웃</Logout>
        </NavBtnWrapper>
      )}
    </NavWrapper>
  );
};

export default NavBar;

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 0 10px;
  border: 1px solid #ff665c;
  border-radius: 5px;
  background-color: white;
`;

const NavIcon = styled.div`
  display: flex;
  align-items: center;
  i {
    font-size: 80px;
    color: #ff665c;
  }
`;

const NavText = styled.p`
  margin-left: 10px;
  font-style: italic;
  font-size: 20px;

  span {
    color: #ff665c;
  }
`;

const NavBtnWrapper = styled.div`
  height: 60%;
  display: flex;
  align-items: center;
`;

const Chatting = styled.button`
  width: 70px;
  height: 100%;
  background-color: #ff665c;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 10px;
`;

const Profile = styled(Chatting)``;

const Logout = styled(Chatting)``;
