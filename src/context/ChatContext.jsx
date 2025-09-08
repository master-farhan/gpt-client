import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const ChatContext = createContext();
const SOCKET_URL = "https://gpt-0-09.onrender.com";

// Axios default config
axios.defaults.baseURL = "https://gpt-0-09.onrender.com/api";
axios.defaults.withCredentials = true;
axios.defaults.headers["Content-Type"] = "application/json";

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(undefined); // undefined = not fetched yet
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setLoading(false);
    });

    return () => socket.off("ai-response");
  }, [socket]);

  // Fetch logged-in user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/auth/user");
        const result = response.data.data;
        setUser(result || null);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // Send message
  const sendMessage = async (content) => {
    if (!currentChat) return console.error("⚠️ No active chat selected");

    setMessages((prev) => [
      ...prev,
      { role: "user", content, chat: currentChat._id },
    ]);
    setLoading(true);
    socket.emit("ai-message", { content, chat: currentChat._id });
  };

  // Create chat
  const createChat = async (title) => {
    try {
      const response = await axios.post("/chat", { title });
      const newChat = response.data.chat;
      setChats((prev) => [...prev, newChat]);
      setCurrentChat(newChat);
      return newChat;
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  // Load all chats
  const loadChats = async () => {
    try {
      const { data } = await axios.get("/chat/get");
      const chatArray = Array.isArray(data.chats) ? data.chats : [];
      setChats(chatArray);
      return chatArray; // return koro jate initial chat select kora jay
    } catch (error) {
      console.error("Error loading chats:", error);
      setChats([]);
      return [];
    }
  };

  // Load chat messages safely
  const loadChatMessages = async (chatId) => {
  try {
    const { data } = await axios.get(`/messages/${chatId}`);
    const msgs = Array.isArray(data) ? data : data.messages || [];
    setMessages(msgs);
  } catch (error) {
    console.error("Error loading chat messages:", error);
    setMessages([]);
  }
};


  // Logout user
  const logout = async () => {
    try {
      await axios.get("/auth/logout");
      setUser(null);
      setChats([]);
      setMessages([]);
      setCurrentChat(null);
    } catch (error) {
      console.error("Logout failed:", error);
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
    loading,
    user,
    setUser,
    logout,
  };

  // Only render children after checking user to prevent flicker
  if (user === undefined) return null;

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};
