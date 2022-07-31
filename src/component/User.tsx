import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Img from "../img/image1.jpg";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../services/firebase";

const User = ({ user, selectUser, user1, chat }: any) => {
  const user2 = user?.uid;
  const [data, setData] = useState<any>("");

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  return (
    <UserWrapper>
      <div
        className={`userWrapper ${chat.name === user.name && "selectedUser"}`}
        onClick={() => {
          selectUser(user);
        }}
      >
        <UserInfo>
          <UserDetail>
            <img src={user.avatar || Img} alt="avatar" />
            <h4>{user.name}</h4>
            {data?.from !== user1 && data?.unread && (
              <small className="unread">새 메세지</small>
            )}
          </UserDetail>

          <div
            className={`userStatus ${user.isOnline ? "online" : "offline"}`}
          ></div>
        </UserInfo>
        {data && (
          <p className="truncate">
            <strong>{data.from === user1 ? "나:" : null}</strong>
            {data.text}
          </p>
        )}
      </div>
    </UserWrapper>
  );
};

export default User;

const UserWrapper = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid black;
  }

  .selectedUser {
    background-color: #ff665c;
    opacity: 0.6;
    border-radius: 10px;
    transition: 1.5s;
  }

  .truncate {
    font-size: 14px;
    white-space: nowrap;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .truncate strong {
    margin-right: 10px;
  }

  .unread {
    margin-left: 10px;
    background-color: black;
    color: white;
    padding: 2px 4px;
    border-radius: 10px;
  }

  .userStatus {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .online {
    background-color: yellowgreen;
  }

  .offline {
    background-color: red;
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserDetail = styled.div`
  display: flex;
  align-items: center;

  h4 {
    margin-left: 10px;
  }
`;
