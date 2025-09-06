import { FiPlus, FiSend } from "react-icons/fi";
import React, { useEffect, useState, useRef } from "react";
import { IoMoon } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";

const Home = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const body = document.documentElement;
    if (theme === "dark") {
      body.classList.add("dark");
      body.classList.remove("light");
    } else {
      body.classList.add("light");
      body.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // -----------------
  const [chats, setChats] = useState([
    { id: 1, title: "Chat with AI" },
    { id: 2, title: "Project Ideas" },
    { id: 3, title: "Study Plan" },
  ]);

  const [messages, setMessages] = useState([
    { sender: "user", text: "Hello! How can I help you today?" },
    { sender: "ai", text: "Hello! How can I help you today?" },
    { sender: "user", text: "Hello! How can I help you today?" },
    { sender: "ai", text: "Hello! How can I help you today?" },
    { sender: "user", text: "Hello! How can I help you today?" },
    { sender: "ai", text: "Hello! How can I help you today?" },
    { sender: "user", text: "Hello! How can I help you today?" },
    { sender: "ai", text: "Hello! How can I help you today?" },
    { sender: "user", text: "Hello! How can I help you today?" },
    { sender: "ai", text: "Hello! How can I help you today?" },
    { sender: "user", text: "Hello! How can I help you today?" },
    { sender: "ai", text: "Hello! How can I help you today?" },
    { sender: "user", text: "Hello! How can I help you today?" },
    { sender: "ai", text: "Hello! How can I help you today?" },
    { sender: "user", text: "Hello! How can I help you today?" },
    { sender: "ai", text: "Hello! How can I help you today?" },
    { sender: "user", text: "Hello! How can I help you today?" },
    { sender: "ai", text: "Hello! How can I help you today?" },
  ]);

  const [input, setInput] = useState("");

  // Ref for auto-scroll
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // scroll whenever messages change

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="h-screen w-full flex bg-light text-dark transition-colors">
      {/* Sidebar */}
      <aside className="w-75 bg-accent transition-colors flex-col p-4 space-y-4 hidden md:flex">
        <button className="flex items-center gap-2 bg-primary px-3 py-2 rounded-lg hover:bg-opacity-80 transition">
          <FiPlus /> New Chat
        </button>
        <div className="flex-1 overflow-y-auto space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="p-2 rounded-lg hover:bg-dark/10 cursor-pointer transition"
            >
              {chat.title}
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Section */}
      <main className="relative h-full w-full flex flex-col items-center">
        {/* Top bar */}
        <div className="flex justify-between items-center w-full bg-light z-50 px-3 py-2 transition-colors">
          <h2 className="font-medium text-xl hover:bg-dark/10 py-2 px-4 rounded-xl">ChatGPT</h2>
          <button
            className="bg-light rounded-full text-xl transition-colors hover:bg-dark/10 py-2.5 px-3"
            onClick={toggleTheme}
          >
            {theme === "light" ? <IoMdSunny /> : <IoMoon />}
          </button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto space-y-6 lg:w-180 w-full scroll-hidden transition-colors pb-30 mb-15">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs ${
                  msg.sender === "user" &&
                  "px-4 py-2 bg-dark/10 rounded-full text-dark"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {/* Dummy div to scroll into view */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="flex items-center gap-2 bg-light text-dark rounded-full lg:w-180 w-full border transition-colors p-1 fixed bottom-10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Send a message..."
            className="focusInp flex-1 px-5 py-3 border-none outline-none placeholder:text-dark"
          />
          <button
            onClick={handleSend}
            className={`p-3 m-1 rounded-full transition ${
              input.length > 0
                ? "bg-dark text-light hover:bg-dark/80"
                : "bg-light text-dark hover:bg-light/80"
            }`}
          >
            <FiSend className="text-xl" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
