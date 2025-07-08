import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Simulated API call since axios isn't available
      await new Promise(resolve => setTimeout(resolve, 1000));
      const botReply = "This is a simulated response. Your message was: " + input;
      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Server error. Please try again." }
      ]);
    }

    setInput("");
    setLoading(false);
  };

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="max-w-4xl mx-auto h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 px-6 py-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Zoro AI Assistant</h1>
            <p className="text-blue-100 text-sm">Your intelligent budget companion</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div
        ref={chatRef}
        className="flex-1 p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-transparent to-white/50"
      >
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Welcome to Zoro!</h3>
            <p className="text-gray-600">Ask me anything about your budget and finances.</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-3 animate-in slide-in-from-bottom-2 duration-300 ${
              msg.from === "user" ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.from === "user" 
                ? "bg-gradient-to-r from-green-500 to-emerald-500" 
                : "bg-gradient-to-r from-blue-500 to-purple-500"
            }`}>
              {msg.from === "user" ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>

            {/* Message Bubble */}
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
              msg.from === "user"
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-br-md"
                : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start space-x-3 animate-pulse">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your budget..."
              disabled={loading}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  sendMessage(e);
                }
              }}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}