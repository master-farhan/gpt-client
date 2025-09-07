import { IoClose } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { useChat } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isSidebar, setIsSidebar }) => {
  const {
    chats,
    currentChat,
    setCurrentChat,
    loadChatMessages,
    createChat,
    logout,
    user,
    setUser,
  } = useChat();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState("");

  const handleCreateChat = async () => {
    if (!newChatTitle.trim()) return;
    const chat = await createChat(newChatTitle);
    if (chat) setNewChatTitle("");
    setIsModalOpen(false);
  };

  return (
    <aside
      className={`sm:w-60 w-65 bg-accent transition-all flex flex-col p-3 space-y-4 fixed md:relative z-100 h-full ${
        isSidebar ? `max-md:-left-[100%] max-md:top-0` : "top-0 left-0"
      }`}
    >
      <div className="w-full flex items-center justify-between">
        <h2 className="font-bold">Chats</h2>
        <IoClose
          onClick={() => setIsSidebar(!isSidebar)}
          className="text-2xl md:hidden block"
        />
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 rounded-lg hover:bg-dark/10 px-3 py-2 transition w-full"
      >
        <FiPlus /> New Chat
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateChat}
        title="Create New Chat"
      >
        <input
          type="text"
          value={newChatTitle}
          onChange={(e) => setNewChatTitle(e.target.value)}
          placeholder="Enter chat title"
          autoFocus
          className="w-full px-4 py-2 rounded-lg border border-dark/10 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </Modal>

      <div className="flex-1 overflow-y-auto space-y-1">
        {chats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => {
              setCurrentChat(chat);
              loadChatMessages(chat._id);
            }}
            className={`p-2 px-3 text-sm rounded-lg cursor-pointer transition ${
              currentChat?._id === chat._id ? "bg-dark/20" : "hover:bg-dark/10"
            }`}
          >
            {chat.title}
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-end justify-between gap-3 p-3 border-t border-dark/10">
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {user?.fullName.firstName || "User"}
          </span>
          <span className="text-xs text-gray-500">{user?.email}</span>
        </div>
        <button
          onClick={() => {
            logout, navigate("/login");
          }}
          className="text-sm text-red-500 hover:underline"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
