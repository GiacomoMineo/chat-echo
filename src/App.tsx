import React from "react";
import SendMessage from "./features/chat/SendMessage";
import "./App.css";
import MessageList from "./features/chat/MessageList";

function App() {
  return (
    <div className="root">
      <SendMessage />
      <div className="spacing" />
      <MessageList />
    </div>
  );
}

export default App;
