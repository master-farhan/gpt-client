import { useEffect } from "react";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages, messagesEndRef, loading }) => {
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto space-y-6 md:w-11/12 lg:w-180 w-full scroll-hidden transition-colors pt-10 pb-30 mb-15">
      {messages.map((msg, index) => (
        <MessageBubble key={index} sender={msg.role} text={msg.content} />
      ))}

      {loading && (
        <MessageBubble sender="model" text="AI is typing..." isLoading />
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
