
import React, { useEffect, useRef, memo } from 'react';
import { useSelector } from 'react-redux';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import MarkdownRenderer from './MarkDownRenderer';


function Chat() {
  const conversations = useSelector((state) => state.prompt.conversations);
  const chatEndRef = useRef(null);
  const containerRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (conversations.length > 0) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    Prism.highlightAll();
  }, [conversations.length]);

  // Handle empty state
  if (!conversations.length) {
    return (
      <div className="h-[30vh] flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        <h1 className='text-5xl font-semibold'>Start a conversation with Astara</h1>
      </div>
    );
  }

  return (
    <div className="h-[70vh] w-full flex justify-center items-center">
      <div
        ref={containerRef}
        className="h-full w-full rounded-2xl overflow-y-auto p-4 scroll-smooth"
        role="log"
        aria-live="polite"
      >
        {conversations.map((conversation) => (
          <div
            className="w-full flex flex-col items-center mb-6"
            key={conversation.id}
          >
            {/* User Message */}
            <div className="w-full max-w-3xl flex justify-end mb-4">
              <div className="bg-gray-500/20 text-white px-4 py-2 rounded-2xl max-w-prose">
                {conversation.prompt.trim()}
              </div>
            </div>

            {/* AI Response */}
            <div className="w-full max-w-3xl text-white font-medium break-words">
              {conversation.status === 'loading' ? (
                <div className="flex items-center text-gray-400">
                  <span className="ml-2">Astara is thinking...</span>
                </div>
              ) : (
                <MarkdownRenderer content={conversation.response.trim()} />
                
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
}

export default memo(Chat)