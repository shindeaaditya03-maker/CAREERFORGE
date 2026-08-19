import React from 'react';
import { Compass, Sparkles, Key, Sun, Moon, RotateCcw, FileText, CheckSquare } from 'lucide-react';
import { getStoredApiKey } from '../services/geminiService';

interface HeaderProps {
  activeTab: 'assessment' | 'roadmaps' | 'skillgap' | 'parentbrief';
  setActiveTab: (tab: 'assessment' | 'roadmaps' | 'skillgap' | 'parentbrief') => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  onOpenApiKeyModal: () => void;
  hasRoadmaps: boolean;
  onStartNewAssessment: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode,
  onOpenApiKeyModal,
  hasRoadmaps,
  onStartNewAssessment,
}) => {
  const apiKey = getStoredApiKey();

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab(hasRoadmaps ? 'roadmaps' : 'assessment')}>
            <div className="relative p-2.5 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl shadow-lg shadow-indigo-500/25 group">
              <Compass className="w-7 h-7 text-white transition-transform group-hover:rotate-45 duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white font-sans bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
                  CAREER<span className="text-violet-500">FORGE</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full uppercase tracking-widest">
                  AI v2.5
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                AI Career Guidance & Pathway Engine
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-slate-900/80 border border-slate-800 rounded-2xl">
            <button
              onClick={() => setActiveTab('assessment')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'assessment'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Assessment
            </button>

            <button
              onClick={() => setActiveTab('roadmaps')}
              disabled={!hasRoadmaps}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                !hasRoadmaps
                  ? 'opacity-40 cursor-not-allowed text-slate-500'
                  : activeTab === 'roadmaps'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              3 Roadmaps
            </button>

            <button
              onClick={() => setActiveTab('skillgap')}
              disabled={!hasRoadmaps}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                !hasRoadmaps
                  ? 'opacity-40 cursor-not-allowed text-slate-500'
                  : activeTab === 'skillgap'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              Skill Gap
            </button>

            <button
              onClick={() => setActiveTab('parentbrief')}
              disabled={!hasRoadmaps}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                !hasRoadmaps
                  ? 'opacity-40 cursor-not-allowed text-slate-500'
                  : activeTab === 'parentbrief'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/40'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Parent Brief
            </button>
          </nav>

          {/* Action Buttons & Controls */}
          <div className="flex items-center gap-2">
            
            {/* Gemini API Key Status Pill */}
            <button
              onClick={onOpenApiKeyModal}
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                apiKey
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>{apiKey ? 'AI Key Active' : 'Demo Mode'}</span>
              <span className={`w-2 h-2 rounded-full ${apiKey ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            </button>

            {/* Restart Assessment */}
            {hasRoadmaps && (
              <button
                onClick={onStartNewAssessment}
                title="Retake Questionnaire"
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
