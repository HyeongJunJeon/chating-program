import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../component/Navbar";
import { db, auth, storage } from "../services/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  DocumentData,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import User from "../component/User";
import MessageForm from "../component/MessageForm";
import Message from "../component/Message";

const ChattingMain = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState<any>("");
  const [text, setText] = useState<any>("");
  const [img, setImg] = useState<any>("");
  const [msgs, setMsgs] = useState<any>([]);
  const [rooms, setRooms] = useState([]);

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "not-in", [user1]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const usersRef = collection(db, "room");
    const q = query(usersRef, where("uid", "not-in", [user1]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let rooms: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        rooms.push(doc.data());
      });
      setRooms(rooms);
    });
    return () => unsub();
  }, []);

  const selectUser = async (user: any) => {
    setChat(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    //get last message b/w logged in user and selected user
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    //if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data().from !== user1) {
      //update last message doc, set unread to false
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const user2 = chat.uid;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });

    setText("");
  };

  return (
    <>
      <NavBar />
      <ChattingMainWrapper>
        <UserContainer>
          {users.map((user) => (
            <User
              key={user.uid}
              user={user}
              selectUser={selectUser}
              user1={user1}
              chat={chat}
            />
          ))}
        </UserContainer>

        <MessageContainer>
          {chat ? (
            <>
              <div className="messagesUser">
                <h3>{chat.name}</h3>
              </div>
              <div className="messages">
                {msgs.length
                  ? msgs.map((msg: any, i: React.Key) => (
                      <Message key={i} msg={msg} user1={user1} />
                    ))
                  : null}
              </div>
              <MessageForm
                handleSubmit={handleSubmit}
                text={text}
                setText={setText}
                setImg={setImg}
              />
            </>
          ) : (
            <h3 className="noConv">대화하고 싶은 친구를 선택해 주세요.</h3>
          )}
        </MessageContainer>
      </ChattingMainWrapper>
    </>
  );
};

export default ChattingMain;

const ChattingMainWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 3fr;
  overflow: hidden;
  height: calc(100vh - 70px);
`;

const UserContainer = styled.div`
  margin-top: 10px;
  border-right: 2px solid black;
  overflow-y: auto;
`;

const MessageContainer = styled.div`
  position: relative;
  max-width: 1100px;

  .messagesUser {
    padding: 10px;
    text-align: center;
    border-bottom: 2px solid black;
  }

  .messages {
    /* max-width: 1100px; */
    height: calc(100vh - 200px);
    overflow-y: auto;
    overflow-x: hidden;
    border-bottom: 1px solid black;
  }

  .noConv {
    font-size: 20px;
    color: black;
    text-align: center;
  }
`;
