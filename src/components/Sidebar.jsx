import { IoClose } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";

const Sidebar = ({ chats, isSidebar, setIsSidebar }) => {
  return (
    <aside
      className={`sm:w-75 w-65 bg-accent transition-colors flex-col p-4 space-y-4 md:flex ${
        isSidebar ? `fixed left-0 top-0 z-100 h-full` : "hidden"
      }`}
    >
      <button className="flex items-center gap-2 bg-primary px-3 py-2 rounded-lg hover:bg-opacity-80 transition">
        <FiPlus /> New Chat
      </button>

      <IoClose
        onClick={() => setIsSidebar(!isSidebar)}
        className={`text-4xl p-2 fixed top-5 left-50 hover:bg-dark/20 rounded-sm block md:hidden`}
      />

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
  );
};

export default Sidebar;
