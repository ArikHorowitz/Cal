
import React, { useRef, useEffect } from 'react';

interface ConversationMessage {
  sender: 'user' | 'ai';
  message: string;
}

interface AiHelpPanelProps {
  isOpen: boolean;
  query: string;
  conversation: ConversationMessage[];
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onQueryChange: (query: string) => void;
  onSendQuery: () => void;
}

const AiHelpPanel: React.FC<AiHelpPanelProps> = ({
  isOpen,
  query,
  conversation,
  isLoading,
  error,
  onClose,
  onQueryChange,
  onSendQuery,
}) => {
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  if (!isOpen) return null;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSendQuery();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}  
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-help-panel-title"
    >
      <div 
        className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the panel
      >
        {/* Header */}
        <header className="bg-slate-700 p-4 rounded-t-lg flex justify-between items-center">
          <h2 id="ai-help-panel-title" className="text-lg font-semibold text-white">AI Calculator Assistant</h2>
          <button 
            onClick={onClose} 
            className="text-slate-300 hover:text-white text-2xl"
            aria-label="Close AI Assistant"
          >
            &times;
          </button>
        </header>

        {/* Conversation Area */}
        <div className="flex-grow p-4 overflow-y-auto space-y-3">
          {conversation.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm shadow ${
                  msg.sender === 'user'
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-600 text-white'
                }`}
              >
                {msg.message.split('\\n').map((line, i) => <p key={i}>{line}</p>)}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-600 text-white p-3 rounded-lg text-sm shadow animate-pulse">
                AI is thinking...
              </div>
            </div>
          )}
          {error && (
             <div className="flex justify-start">
                <div className="bg-red-500 text-white p-3 rounded-lg text-sm shadow">
                    Error: {error}
                </div>
            </div>
          )}
          <div ref={conversationEndRef} />
        </div>

        {/* Input Area */}
        <footer className="bg-slate-700 p-3 rounded-b-lg border-t border-slate-600">
          <div className="flex items-center space-x-2">
            <textarea
              ref={inputRef}
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about the FC-100V calculator..."
              className="flex-grow p-2 bg-slate-800 text-white border border-slate-600 rounded-md resize-none focus:ring-sky-500 focus:border-sky-500"
              rows={2}
              aria-label="Your question for the AI assistant"
              disabled={isLoading}
            />
            <button
              onClick={onSendQuery}
              disabled={isLoading || !query.trim()}
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Send question to AI"
            >
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AiHelpPanel;
