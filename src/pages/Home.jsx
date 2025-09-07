import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import { useChat } from "../context/ChatContext"; // 👈 import context

const Home = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [isSidebar, setIsSidebar] = useState(false);
  const messagesEndRef = useRef(null);

  const {
    chats,
    setChats,
    messages,
    sendMessage,
    currentChat,
    setCurrentChat,
  } = useChat(); // 👈 get context values

  useEffect(() => {
    const body = document.documentElement;
    body.classList.toggle("dark", theme === "dark");
    body.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center  bg-light text-dark transition-colors">
      {/* Sidebar */}
      <Sidebar
        isSidebar={isSidebar}
        setIsSidebar={setIsSidebar}
        chats={chats}
        setChats={setChats}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
      />

      {/* Chat Section */}
      <main className="relative h-full md:w-full w-10/12 flex flex-col items-center justify-center">
        <TopBar
          isSidebar={isSidebar}
          setIsSidebar={setIsSidebar}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <MessageList messages={messages} messagesEndRef={messagesEndRef} />
        <ChatInput input={input} setInput={setInput} handleSend={handleSend} />
      </main>

      <div className="absolute bg-gradient-to-b from-light via-light/80 to-accent/20 h-20 w-screen bottom-0 left-0"></div>
    </div>
  );
};

export default Home;
