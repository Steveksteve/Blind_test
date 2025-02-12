import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Input from "../components/Input";
import Button from "../components/Button";

const socket = io("http://127.0.0.1:8080", { autoConnect: false });

const Chat = ({ roomId, username }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");


  useEffect(() => {
    if (roomId) {
      socket.connect(); 
      socket.emit("join_room", { username, room: roomId });

      socket.on("join_confirmation", (data) => {
        console.log("✅ Connexion confirmée :", data.message);
      });

      socket.on("new_message", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      return () => {
        socket.disconnect(); 
      };
    }
  }, [roomId, username]);


  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("send_message", { room: roomId, message: `${username}: ${message}` });
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg w-full max-w-lg">
      <h2 className="text-xl font-bold mb-3">💬 Chat de la Room #{roomId}</h2>
      <div className="h-40 overflow-auto bg-gray-900 p-3 rounded-lg w-full">
        {messages.map((msg, i) => (
          <p key={i} className="text-sm text-white">{msg}</p>
        ))}
      </div>
      <form className="mt-4 flex space-x-2 w-full" onSubmit={sendMessage}>
        <Input
          placeholder="Tape un message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button text="Envoyer" type="submit" />
      </form>
    </div>
  );
};

export default Chat;
