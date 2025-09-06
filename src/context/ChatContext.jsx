import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const ChatContext = createContext();
const SOCKET_URL = "http://localhost:3000";

axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;
axios.defaults.headers["Content-Type"] = "application/json";

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [loading, setLoading] = useState(false); // <--- loading state

  // Initialize Socket.IO
  useEffect(() => {
    const newSocket = io(SOCKET_URL, { withCredentials: true });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      setIsConnected(true);
      console.log("✅ Connected to Socket.IO server");
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      console.log("❌ Disconnected from Socket.IO server");
    });

    return () => newSocket.close();
  }, []);

  // Listen for AI responses
  useEffect(() => {
    if (!socket) return;

    socket.on("ai-response", (message) => {
      setMessages((prev) => [
        ...prev,
        { role: "model", content: message.content, chat: message.chat },
      ]);

      setLoading(false); // <--- stop loading
    });

    return () => socket.off("ai-response");
  }, [socket]);

  // Send message
  const sendMessage = async (content) => {
    if (!currentChat) {
      console.error("⚠️ No active chat selected");
      return;
    }

    try {
      // Add user's message immediately
      setMessages((prev) => [
        ...prev,
        { role: "user", content, chat: currentChat.id },
      ]);

      setLoading(true); // <--- start loading

      socket.emit("ai-message", { content, chat: currentChat.id });
    } catch (error) {
      console.error("Error sending message:", error);
      setLoading(false);
    }
  };

  // Create chat
  const createChat = async (title) => {
    try {
      const response = await axios.post("/chat", { title });
      const newChat = response.data.chat;
      setChats((prev) => [...prev, newChat]);
      setCurrentChat(newChat); // set as active
      return newChat;
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  // Load all chats
  const loadChats = async () => {
    try {
      const { data } = await axios.post("/chat/get"); // <-- POST
      setChats(data.chats);
    } catch (error) {
      console.error("Error loading chats:", error);
    }
  };

  // Load chat messages
  const loadChatMessages = async (chatId) => {
    try {
      const { data } = await axios.get(`/chat/${chatId}/messages`);
      setMessages(data);
    } catch (error) {
      console.error("Error loading chat messages:", error);
    }
  };

  const value = {
    socket,
    messages,
    setMessages,
    chats,
    setChats,
    currentChat,
    setCurrentChat,
    isConnected,
    sendMessage,
    createChat,
    loadChats,
    loadChatMessages,
    loading, // <--- expose loading
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
