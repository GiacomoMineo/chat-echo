import React, { createContext, PropsWithChildren, useContext } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../features/chat/chatSlice";
import { initSocket } from "../utilities/socket";

const SocketUrl = "wss://echo.websocket.org";

const SocketContext = createContext<
  Partial<{
    socket: WebSocket;
    sendSocketMessage: (author: string, text: string) => void;
  }>
>({});

export const SocketProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}: PropsWithChildren<{}>) => {
  const dispatch = useDispatch();

  const { socket, sendSocketMessage } = initSocket(SocketUrl);

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    dispatch(
      addMessage(
        "Alice", // Pretend all messages come from Alice
        data.text
      )
    );
  };

  return (
    <SocketContext.Provider value={{ socket, sendSocketMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
