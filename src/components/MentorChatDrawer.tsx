import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, User, Bot, RefreshCw, ChevronRight } from 'lucide-react';
import type { ChatMessage, RoadmapPathway, UserProfile } from '../types/career';
import { sendMentorChatMessage } from '../services/geminiService';

interface MentorChatDrawerProps {
  currentRoadmap: RoadmapPathway | null;
  userProfile: UserProfile;
}

const SUGGESTED_PROMPTS = [
  "How do I prepare for target entrance exams alongside my current schedule?",
  "What 2 projects should I build to boost my resume for this path?",
  "How can I explain this high-tech career choice clearly to my parents?",
  "What backup options exist if I miss the top entrance exam rank?"
];

export const MentorChatDrawer: React.FC<MentorChatDrawerProps> = ({
  currentRoadmap,
  userProfile,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `Hello! I am your CAREERFORGE AI Mentor. I have reviewed your profile and your roadmap. What questions can I answer about entrance exams, skill prep, or career strategies?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputValue.trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      const aiReplyText = await sendMentorChatMessage(newMessages, currentRoadmap, userProfile);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full shadow-2xl shadow-blue-500/40 border border-white/20 transition-all transform hover:scale-105 group"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
        </div>
        <span className="text-xs font-bold tracking-wide">AI Career Mentor</span>
      </button>

      {/* Slide-over Chat Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col justify-between animate-slide-up">
              
              {/* Header */}
              <div className="p-4 sm:p-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-sm">AI Career Mentor</h3>
                    <p className="text-[11px] text-slate-400">
                      Context: {currentRoadmap ? currentRoadmap.title : 'General Guidance'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div key={msg.id} className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isUser ? 'bg-blue-600 text-white' : 'bg-indigo-600 text-white'
                        }`}
                      >
                        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>

                      <div
                        className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                          isUser
                            ? 'bg-blue-600 text-white rounded-tr-none'
                            : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                        <span className="block text-[9px] opacity-60 mt-1 text-right">{msg.timestamp}</span>
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                    <span>Gemini AI is crafting your career advice...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggested Prompts Pill Bar */}
              <div className="px-4 py-2 border-t border-slate-900 bg-slate-950/80">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-2">Suggested Questions:</p>
                <div className="flex flex-col gap-1.5 max-h-28 overflow-y-auto">
                  {SUGGESTED_PROMPTS.map((promptText, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(promptText)}
                      className="text-left text-[11px] p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-blue-300 hover:text-white transition-colors flex items-center justify-between"
                    >
                      <span className="truncate">{promptText}</span>
                      <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 bg-slate-900 border-t border-slate-800">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask mentor a follow-up question..."
                    className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl transition-all shadow-md"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
