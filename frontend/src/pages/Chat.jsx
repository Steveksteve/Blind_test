import React, { useState } from "react";
import { io } from "socket.io-client";
import Input from "../components/Input";
import Button from "../components/Button";

const socket = io("http://127.0.0.1:5000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  socket.on("message", (msg) => {
    setMessages((prev) => [...prev, msg]);
  });

  const sendMessage = () => {
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg w-full max-w-lg">
      <h2 className="text-xl font-bold mb-3">💬 Chat de la Room</h2>
      <div className="h-40 overflow-auto bg-gray-900 p-3 rounded-lg w-full">
        {messages.map((msg, i) => (
          <p key={i} className="text-sm">{msg}</p>
        ))}
      </div>
      <div className="mt-4 flex space-x-2 w-full">
        <Input
          placeholder="Tape un message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button text="Envoyer" onClick={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
