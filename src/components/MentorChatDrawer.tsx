import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, User, Bot, RefreshCw, ChevronRight, ShieldCheck, AlertCircle } from 'lucide-react';
import type { ChatMessage, RoadmapPathway, UserProfile } from '../types/career';
import { sendMentorChatMessage, getStoredApiKey } from '../services/geminiService';

interface MentorChatDrawerProps {
  currentRoadmap: RoadmapPathway | null;
  userProfile: UserProfile;
}

const SUGGESTED_PROMPTS = [
  "Hey Alex, how do I balance entrance exams with my current schedule?",
  "What 2 portfolio projects should I build to stand out?",
  "How can I explain this high-tech career path to my parents?",
  "What backup options exist if I miss the top entrance exam rank?"
];

export const MentorChatDrawer: React.FC<MentorChatDrawerProps> = ({
  currentRoadmap,
  userProfile,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const apiKey = getStoredApiKey();
  const [lastApiStatus, setLastApiStatus] = useState<'live' | 'fallback' | 'error'>(apiKey ? 'live' : 'fallback');
  const [apiErrorMessage, setApiErrorMessage] = useState<string>('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `Hey there! 👋 I'm Alex, your personal AI career guide. I'm right here to help you match, plan, and reach your dream career goals! What's on your mind today?`,
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
      const result = await sendMentorChatMessage(newMessages, currentRoadmap, userProfile);
      
      if (result.isLive) {
        setLastApiStatus('live');
        setApiErrorMessage('');
      } else {
        setLastApiStatus(result.errorDetails ? 'error' : 'fallback');
        if (result.errorDetails) {
          setApiErrorMessage(result.errorDetails);
        }
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: result.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setLastApiStatus('error');
      setApiErrorMessage(err?.message || 'API connection failed');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button with pulse badge */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-none">
        {/* Pulse Notification Badge */}
        <div className="bg-slate-950/95 border border-slate-800 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-2xl pointer-events-auto animate-float">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-extrabold text-emerald-400 tracking-wider uppercase font-sans">
            Alex is online
          </span>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full shadow-2xl shadow-indigo-500/30 border border-white/10 transition-all transform hover:scale-105 pointer-events-auto group font-sans"
        >
          <Sparkles className="w-4 h-4 group-hover:rotate-45 transition-transform text-indigo-200" />
          <span className="text-xs font-black tracking-wide">Ask AI Career Mentor</span>
        </button>
      </div>

      {/* Slide-over Chat Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col justify-between animate-slide-in-right">
              
              {/* Header with Live Status Indicator */}
              <div className="p-4 sm:p-6 bg-slate-900/90 border-b border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-white text-sm">Alex • AI Career Mentor</h3>
                      <p className="text-[11px] text-slate-400">
                        Target: {currentRoadmap ? currentRoadmap.title : 'General Guidance'}
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

                {/* API Status Badge */}
                <div className="flex items-center justify-between pt-1">
                  {lastApiStatus === 'live' ? (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Live Gemini API Connected
                    </span>
                  ) : lastApiStatus === 'error' ? (
                    <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> API Error: {apiErrorMessage || 'Key Error'}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      ⚡ Demo Mode (Add API Key in Header for Live AI)
                    </span>
                  )}
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div key={msg.id} className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isUser ? 'bg-indigo-600 text-white' : 'bg-violet-600 text-white'
                        }`}
                      >
                        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>

                      <div
                        className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                          isUser
                            ? 'bg-indigo-600 text-white rounded-tr-none'
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
                  <div className="flex items-center gap-2 text-slate-400 text-xs italic font-sans">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                    <span>Alex is calling Gemini AI...</span>
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
                      className="text-left text-[11px] p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-indigo-300 hover:text-white transition-colors flex items-center justify-between font-sans"
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
                    placeholder="Ask Alex a question..."
                    className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-sans"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition-all shadow-md"
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
