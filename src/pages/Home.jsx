import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";

const Home = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const [isSidebar, setIsSidebar] = useState(false)

  useEffect(() => {
    const body = document.documentElement;
    body.classList.toggle("dark", theme === "dark");
    body.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const [chats] = useState([
    { id: 1, title: "Chat with AI" },
    { id: 2, title: "Project Ideas" },
    { id: 3, title: "Study Plan" },
  ]);

  const [messages, setMessages] = useState([
    { sender: "user", text: "Hello! How can I help you today?" },
    { sender: "ai", text: "Hi there! I’m your AI assistant." },
  ]);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="h-screen w-full flex bg-light text-dark justify-center transition-colors">
      {/* Sidebar */}
      <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} chats={chats} />

      {/* Chat Section */}
      <main className="relative h-full md:w-full w-10/12 flex flex-col items-center">
        <TopBar isSidebar={isSidebar} setIsSidebar={setIsSidebar} theme={theme} toggleTheme={toggleTheme} />
        <MessageList messages={messages} messagesEndRef={messagesEndRef} />
        <ChatInput input={input} setInput={setInput} handleSend={handleSend} />
      </main>
    </div>
  );
};

export default Home;
