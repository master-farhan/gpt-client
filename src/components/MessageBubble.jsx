const MessageBubble = ({ sender, text }) => {
  return (
    <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs transition-colors ${
          sender === "user"
            ? "px-4 py-2 bg-dark/10 rounded-full text-dark"
            : "px-4 py-2 bg-light rounded-full"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default MessageBubble;
