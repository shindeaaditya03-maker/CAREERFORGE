import React, { useState } from 'react';
import { Key, ShieldCheck, ExternalLink, X, Check, Sparkles } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey } from '../services/geminiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onKeySaved }) => {
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredApiKey(apiKey);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onKeySaved();
      onClose();
    }, 600);
  };

  const handleClear = () => {
    setApiKey('');
    setStoredApiKey('');
    onKeySaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md p-6 glass-card rounded-2xl border border-slate-700/60 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-sans">Gemini API Key</h3>
            <p className="text-xs text-slate-400">Configure key for live AI generation</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 font-sans">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              API Key (Free Tier Gemini API)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-medium"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1">
            <div className="flex items-center gap-2 text-indigo-400 font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Get Free Gemini API Key</span>
            </div>
            <p className="text-slate-400">
              Obtain your key free of charge at Google AI Studio to unlock live real-time career roadmap synthesis.
            </p>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium underline mt-1"
            >
              Get key from Google AI Studio <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {apiKey ? (
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Key Configured - Live AI Generation Enabled</span>
            </div>
          ) : (
            <div className="text-amber-400 text-xs">
              💡 No key? No problem! CAREERFORGE automatically runs in high-fidelity Demo Mode.
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            {apiKey && (
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2.5 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors"
              >
                Clear Key
              </button>
            )}
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-500/25 transition-all"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4" /> Saved!
                </>
              ) : (
                'Save Key'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
