import { useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { useChat } from "../context/ChatContext";
import { FiMessageCircle } from "react-icons/fi";

const MessageList = ({ messagesEndRef }) => {
  const { messages, loading, sendMessage, currentChat } = useChat();

  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, loading]);


  const examplePrompts = [
    "✨ Give me coding tips",
    "📖 Summarize an article",
    "💡 Explain a concept",
  ];

  const handleExampleClick = (prompt) => {
    if (!currentChat) {
      alert("⚠️ Please select a chat first!");
      return;
    }

    if (sendMessage) {
      sendMessage(prompt);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-6 md:w-11/12 lg:w-180 w-full scroll-hidden transition-colors pt-10 pb-[15vh] mb-15">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center h-full text-dark/70">
          <FiMessageCircle className="h-15 w-15 opacity-70" />
          <h2 className="text-2xl font-semibold">Start a new conversation</h2>
          <p className="mt-2 text-sm max-w-sm leading-relaxed">
            Ask me anything, or try one of the examples below to get started.
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-3 w-full max-w-md">
            {examplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleExampleClick(prompt)}
                className="px-4 py-3 rounded-xl border border-dark/10 hover:bg-dark/10 transition"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {Array.isArray(messages) &&
            messages.map((msg, index) => (
              <MessageBubble key={index} sender={msg.role} text={msg.content} />
            ))}

          {loading && <MessageBubble sender="model" isLoading />}

          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default MessageList;
