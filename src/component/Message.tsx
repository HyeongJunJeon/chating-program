import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Moment from "react-moment";

const Message = (props: any) => {
  const scrollRef: any = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.msg]);

  return (
    <MessageWrapper>
      <div
        className={`messageWrapper ${
          props.msg.from === props.user1 ? "own" : ""
        }`}
        ref={scrollRef}
      >
        <p className={props.msg.from === props.user1 ? "me" : "friend"}>
          {props.msg.media ? (
            <img src={props.msg.media} alt={props.msg.text} />
          ) : null}
          {props.msg.text}
          <br />
          <small>
            <Moment fromNow>{props.msg.createdAt.toDate()}</Moment>
          </small>
        </p>
      </div>
    </MessageWrapper>
  );
};

export default Message;

const MessageWrapper = styled.div`
  /* width: 800px; */
  margin-top: 5px;
  padding: 0px 5px;

  .own {
    text-align: right;
  }

  .me {
    background-color: #038fff;
    color: white;
  }

  .friend {
    background-color: beige;
  }

  img {
    width: 100%;
    border-radius: 5px;
  }

  p {
    padding: 10px;
    display: inline-block;
    max-width: 50%;
    text-align: left;
    border-radius: 5px;
  }

  small {
    display: inline-block;
    margin-top: 15px;
    opacity: 0.8;
  }
`;
