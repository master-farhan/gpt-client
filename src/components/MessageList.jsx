import { useEffect } from "react";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages, messagesEndRef }) => {
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto space-y-6 md:w-11/12 lg:w-180 w-full scroll-hidden transition-colors pt-10 pb-30 mb-15">
      {messages.map((msg, index) => (
        <MessageBubble key={index} sender={msg.sender} text={msg.text} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
