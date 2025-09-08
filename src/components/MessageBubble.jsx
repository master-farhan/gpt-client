import ReactMarkdown from "react-markdown";
import { FiCopy } from "react-icons/fi"; // copy icon
import { useState } from "react";

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

  return (
    <div
      className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`transition-colors text-[14px] leading-6.5 tracking-wide ${
          sender === "user"
            ? "px-4 py-2 bg-secondary rounded-xl text-dark max-w-lg"
            : "py-5 rounded-xl w-full bg-light"
        }`}
      >
        {/* message text */}
        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }) {
              const codeText = String(children).replace(/\n$/, "");

              // inline code
              if (inline) {
                return (
                  <code className="bg-dark/10 px-1 py-0.5 rounded text-sm font-mono">
                    {children}
                  </code>
                );
              }

              // block code
              return <CodeBlock codeText={codeText} />;
            },
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

// ✅ Separate CodeBlock Component (each has its own state)
const CodeBlock = ({ codeText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2s
  };

  return (
    <div className="relative my-3">
      <pre className="bg-accent text-white p-3 rounded-xl overflow-x-auto text-sm font-mono">
        {codeText}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 text-white/70 hover:text-white transition"
      >
        {copied ? "Copied" : <FiCopy size={16} />}
      </button>
    </div>
  );
};

export default MessageBubble;
