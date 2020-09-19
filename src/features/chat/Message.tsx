import React from "react";
import { useSelector } from "react-redux";
import { selectUsername } from "./chatSlice";
import "./Message.css";

type Props = {
  author: string;
  text: string;
};

const Message: React.FC<Props> = ({ author, text }: Props) => {
  const username = useSelector(selectUsername);

  return (
    <div className={`message${username === author ? " self" : ""}`}>
      <div className="author">{author}</div>
      {text}
    </div>
  );
};

export default Message;
