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
import MessageForm from "../component/MessageForm";
import Message from "../component/Message";
import Room from "../component/Room";

//room컬렉션에 대화방을 생성하면 각 대화방의 uid가 생성되고,
//동일한 uid안에서 채팅을 하면 각 대화방에 chat컬렉션안에 저장.
//room컬렉션안에 part테이블을 생성해서 참여하는 user의 uid를 입력해서
//part테이블에 포함되있으면 대화방이 보이면서 그룹채팅이 구현될거라 생각했다.
//하지만 구현이 잘 되지않았다.
//다시 공부해서 해결방법을 다시 찾아야 할 것같다.

const GroupChatting = () => {
  const [chat, setChat] = useState<any>("");
  const [text, setText] = useState<any>("");
  const [img, setImg] = useState<any>("");
  const [msgs, setMsgs] = useState<any>([]);
  const [rooms, setRooms] = useState<any>([]);

  const user1 = auth.currentUser.uid;

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

  const selectRoom = async (room: any) => {
    setChat(room);

    const user2 = room.uid;

    const msgsRef = collection(db, "messgaes", user2, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
  };

  const handleAddRoom = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const user2 = chat.uid;

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

    await addDoc(collection(db, "room", user2, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    setText("");
  };

  let valid;

  for (let i = 0; i < 3; i++) {
    //room컬렉션에 part테이블안에 해당 user에 uid가 있는지 검사.
    for (let j = 0; j < 3; j++) {
      if (rooms[i]?.part[j] === user1) {
        valid = 1;
      }
    }
  }

  return (
    <>
      <NavBar />
      <ChattingMainWrapper>
        <RoomContainer>
          <CreateRoomWrapper>
            <span>대화방 생성</span>
            <span className="addRoom" onClick={handleAddRoom}>
              +
            </span>
          </CreateRoomWrapper>

          {rooms.map((room: { uid: any }) => (
            <Room
              key={room.uid}
              room={room}
              selectRoom={selectRoom}
              user1={user1}
              chat={chat}
            />
          ))}
        </RoomContainer>

        <MessageContainer>
          {valid ? (
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
                handleAddRoom={handleAddRoom}
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

export default GroupChatting;

const ChattingMainWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 3fr;
  overflow: hidden;
  height: calc(100vh - 70px);
`;

const CreateRoomWrapper = styled.div`
  height: 50px;
  margin: 0 10px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .addRoom {
    font-size: 30px;
    color: #ff665c;
    cursor: pointer;
  }
`;

const RoomContainer = styled.div`
  margin-top: 10px;
  border-right: 2px solid #ff665c;
  overflow-y: auto;
`;

const MessageContainer = styled.div`
  position: relative;
  max-width: 1100px;

  .messagesUser {
    padding: 10px;
    text-align: center;
    border-bottom: 2px solid #ff665c;
  }

  .messages {
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
