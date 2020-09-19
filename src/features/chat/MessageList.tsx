import React from "react";
import { useSelector } from "react-redux";
import { selectMessages } from "./chatSlice";
import Message from "./Message";
import "./MessageList.css";

const MessageList: React.FC = () => {
  const messages = useSelector(selectMessages);

  return (
    <div className="messages center">
      {messages.map((message) => (
        <Message key={message.id} author={message.author} text={message.text} />
      ))}
    </div>
  );
};

export default MessageList;
