// src/hooks/useSocket.js
import { useEffect, useState } from "react";
import io from "socket.io-client";

const useSocket = (token) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (token) {
      const socketInstance = io("http://localhost:8000", {
        auth: {
          token: token, // Send token during handshake
        },
      });

      socketInstance.on("connect", () => {
        console.log("Connected to the server");
      });

      socketInstance.on("message", (msg) => {
        console.log("New message:", msg);
      });

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [token]);

  // Send message to the server
  const sendMessage = (msg) => {
    if (socket) {
      socket.emit("message", msg);
    }
  };

  return {
    socket,
    sendMessage,
  };
};

export default useSocket;
