import { FiSend } from "react-icons/fi";
import { useChat } from "../context/ChatContext";

const ChatInput = ({ input, setInput }) => {
  const { currentChat, sendMessage } = useChat();

  const handleSend = () => {
    if (!input.trim()) return;

    if (!currentChat) {
      alert("Please select a chat first!");
      return;
    }

    sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex items-center gap-2 bg-dark/10 text-dark rounded-full lg:w-160 w-10/12 sm:w-110 border transition-colors p-1 fixed bottom-10">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Send a message..."
        className="focusInp flex-1 px-5 py-1 border-none outline-none placeholder:text-dark"
      />
      <button
        onClick={handleSend}
        className={`p-2 m-1 rounded-full transition ${
          input.length > 0
            ? "bg-dark text-light cursor-pointer hover:bg-dark/80"
            : "bg-dark/20 text-light"
        }`}
      >
        <FiSend className="text-xl" />
      </button>
    </div>
  );
};

export default ChatInput;
