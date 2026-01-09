import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your V2Cost. neural assistant. How can I help with your manufacturing cost estimation today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API Key missing");
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: 'You are the V2Cost. Manufacturing Expert. You help users with queries regarding injection molding, CNC machining, and cost optimization. Be precise, professional, and helpful.'
        },
      });

      const responseText = response.text || 'I encountered an issue processing that request.';
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Neural link failed. Please check your system configuration.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`size-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${isOpen ? 'bg-slate-900 rotate-90 scale-90' : 'bg-primary hover:scale-110 active:scale-95'}`}
      >
        <span className="material-symbols-outlined text-white text-2xl font-bold">
          {isOpen ? 'close' : 'smart_toy'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-fadeIn">
          <div className="p-4 bg-primary text-white flex items-center gap-3 shrink-0">
            <span className="material-symbols-outlined text-white">psychology</span>
            <p className="font-bold text-sm">V2Cost. Neural Assistant</p>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50 dark:bg-slate-950">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-sm ${
                  m.role === 'user' 
                  ? 'bg-primary text-white rounded-br-none' 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-xl rounded-bl-none shadow-sm">
                   <div className="flex gap-1">
                      <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                   </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
            <div className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question..."
                className="w-full h-10 pl-3 pr-10 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-1 top-1/2 -translate-y-1/2 size-8 rounded-md bg-primary text-white flex items-center justify-center hover:bg-blue-600 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-base">send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatBot;