const MessageBubble = ({ sender, text, isLoading }) => {
  // typing indicator case
  if (isLoading && sender !== "user") {
    return (
      <div className="flex justify-start">
        <div className="px-4 py-2 bg-light rounded-full flex space-x-1">
          <span className="w-2 h-2 bg-dark/50 rounded-full dot"></span>
          <span className="w-2 h-2 bg-dark/50 rounded-full dot"></span>
          <span className="w-2 h-2 bg-dark/50 rounded-full dot"></span>
        </div>
      </div>
    );
  }

  // normal message case
  return (
    <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs transition-colors text-sm ${
          sender === "user"
            ? "px-4 py-2 bg-secondary rounded-xl text-dark"
            : "py-2 rounded-xl"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default MessageBubble;
