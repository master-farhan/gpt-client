import { FiSend } from "react-icons/fi";

const ChatInput = ({ input, setInput, handleSend }) => {
  return (
    <div className="flex items-center gap-2 bg-accent text-dark rounded-full lg:w-180 w-10/12 sm:w-120 border transition-colors p-1 fixed bottom-10">
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
            ? "bg-dark text-light cursor-pointer hover:bg-dark/80"
            : "bg-light text-dark cursor-not-allowed"
        }`}
      >
        <FiSend className="text-xl" />
      </button>
    </div>
  );
};

export default ChatInput;
