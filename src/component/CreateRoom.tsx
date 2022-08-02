import React from "react";
import styled from "styled-components";

const CreateRoom = () => {
  return (
    <CreateRoomWrapper>
      <span>대화방 생성</span>
      <span className="addRoom">+</span>
    </CreateRoomWrapper>
  );
};

export default CreateRoom;

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
