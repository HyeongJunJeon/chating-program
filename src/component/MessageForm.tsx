import React from "react";
import styled from "styled-components";

import Attachment from "./svg/Attachment";

const MessageForm = (props: any) => {
  return (
    <Form onSubmit={props.handleSubmit}>
      <label htmlFor="img">
        <Attachment />
      </label>
      <input
        onChange={(e) => props.setImg(e.target.files[0])}
        type="file"
        id="img"
        accept="image/*"
        style={{ display: "none" }}
      />
      <div>
        <input
          type="text"
          placeholder="메세지를 입력하세요."
          value={props.text}
          onChange={(e) => {
            props.setText(e.target.value);
          }}
        />
      </div>
      <SendBtn className="btn">보내기</SendBtn>
    </Form>
  );
};

export default MessageForm;

const Form = styled.form`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 40vw;
    margin: 0px 10px 10px;
    padding: 10px;
    border-radius: 5px;
    outline: none;
  }
`;

const SendBtn = styled.button``;
