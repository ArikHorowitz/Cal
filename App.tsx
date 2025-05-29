
import React, { useState, useCallback } from 'react';
import CalculatorShell from './components/CalculatorShell';
import AiHelpPanel from './components/AiHelpPanel';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

interface ConversationMessage {
  sender: 'user' | 'ai';
  message: string;
}

const App: React.FC = () => {
  const [showAiHelpPanel, setShowAiHelpPanel] = useState<boolean>(false);
  const [aiHelpQuery, setAiHelpQuery] = useState<string>("");
  const [aiHelpConversation, setAiHelpConversation] = useState<ConversationMessage[]>([]);
  const [aiHelpLoading, setAiHelpLoading] = useState<boolean>(false);
  const [aiHelpError, setAiHelpError] = useState<string | null>(null);

  const handleToggleAiHelpPanel = () => {
    setShowAiHelpPanel(prev => !prev);
    if (showAiHelpPanel) { // Closing
      setAiHelpConversation([]);
      setAiHelpQuery("");
      setAiHelpError(null);
    }
  };

  const handleAiQueryChange = (query: string) => {
    setAiHelpQuery(query);
  };

  const handleSendAiQuery = async () => {
    if (!aiHelpQuery.trim()) return;

    const newConversation: ConversationMessage[] = [...aiHelpConversation, { sender: 'user', message: aiHelpQuery }];
    setAiHelpConversation(newConversation);
    setAiHelpQuery("");
    setAiHelpLoading(true);
    setAiHelpError(null);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: aiHelpQuery,
        config: {
          systemInstruction: "You are a helpful AI assistant for the Casio FC-100V financial calculator. Users will ask questions about how to use the calculator, its functions, or financial calculations. Provide clear, concise, and accurate information. If a question is outside this scope, politely state that you are specialized for calculator assistance.",
        }
      });
      
      const aiMessage = response.text;
      setAiHelpConversation([...newConversation, { sender: 'ai', message: aiMessage }]);
    } catch (error) {
      console.error("Gemini API error:", error);
      let errorMessage = "Sorry, I couldn't get a response. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setAiHelpError(errorMessage);
      // Optionally add the error as an AI message
      // setAiHelpConversation([...newConversation, { sender: 'ai', message: `Error: ${errorMessage}` }]);
    } finally {
      setAiHelpLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-800 flex flex-col items-center justify-center p-4 text-white relative">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-sky-400">FC-100V Web Simulator</h1>
        <p className="text-slate-400 text-sm">Casio Financial Calculator Digital Twin</p>
      </header>
      <CalculatorShell />
      <div className="mt-6 text-center">
        <button
          onClick={handleToggleAiHelpPanel}
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-150 ease-in-out"
          aria-label="Toggle AI Assistant"
        >
          {showAiHelpPanel ? 'Close AI Assistant' : 'AI Assistant'}
        </button>
      </div>
      <footer className="mt-6 text-center text-slate-500 text-xs">
        <p>This is a simulator. For educational purposes only.</p>
        <p>Phase 1: UI & Input Shell. Visuals based on Casio FC-100V.</p>
      </footer>

      {showAiHelpPanel && (
        <AiHelpPanel
          isOpen={showAiHelpPanel}
          query={aiHelpQuery}
          conversation={aiHelpConversation}
          isLoading={aiHelpLoading}
          error={aiHelpError}
          onClose={handleToggleAiHelpPanel}
          onQueryChange={handleAiQueryChange}
          onSendQuery={handleSendAiQuery}
        />
      )}
    </div>
  );
};

export default App;
