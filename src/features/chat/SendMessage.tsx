import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../hooks/useSocket";
import { selectUsername, sendMessage } from "./chatSlice";

const SendMessage: React.FC = () => {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const socket = useSocket();

  const [text, setText] = useState<string>("");

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value),
    []
  );

  const handleSendMessage = useCallback(() => {
    if (!socket.sendSocketMessage) return;

    dispatch(sendMessage(username, text, socket.sendSocketMessage));
    setText("");
  }, [dispatch, username, socket.sendSocketMessage, text]);

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode === 13) handleSendMessage();
    },
    [handleSendMessage]
  );

  return (
    <div className="center" id="send">
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        onKeyDown={handleInputKeyDown}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default SendMessage;
