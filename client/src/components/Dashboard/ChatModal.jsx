import { Bot } from "lucide-react";
import Chatbot from "../../Pages/Chatbot";

const ChatModal = ({ showChatbot, setShowChatbot }) => {
  if (!showChatbot) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm'>
      <div className='bg-white rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl'>
        <div className='flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm'>
              <Bot className='w-6 h-6 text-white' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-white'>
                Zoro AI Assistant
              </h3>
              <p className='text-blue-100 text-sm'>
                Your intelligent budget companion
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowChatbot(false)}
            className='text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200'
            aria-label='Close chat'>
            ✕
          </button>
        </div>
        <div className='flex-1 overflow-hidden'>
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
