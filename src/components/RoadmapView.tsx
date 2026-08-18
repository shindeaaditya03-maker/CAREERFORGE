import React, { useState } from 'react';
import { Sparkles, CheckSquare, FileText } from 'lucide-react';
import type { RoadmapPathway, UserProfile } from '../types/career';
import { RoadmapCard } from './RoadmapCard';

interface RoadmapViewProps {
  roadmaps: RoadmapPathway[];
  selectedPathwayId: string;
  onSelectPathway: (id: string) => void;
  userProfile: UserProfile;
  onOpenParentBrief: (pathway: RoadmapPathway) => void;
  onNavigateTab: (tab: 'skillgap' | 'parentbrief') => void;
  knownSkills: string[];
  onToggleSkill: (skillName: string) => void;
  isLiveAI: boolean;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  roadmaps,
  selectedPathwayId,
  onSelectPathway,
  userProfile,
  onOpenParentBrief,
  onNavigateTab,
  knownSkills,
  onToggleSkill,
  isLiveAI,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(selectedPathwayId || roadmaps[0]?.id || '');

  const activePathway = roadmaps.find((r) => r.id === activeTabId) || roadmaps[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      {/* Top Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
              {userProfile.stage === 'high_school' ? '🎓 High School / 12th Grade' : userProfile.stage === 'college' ? '📚 College / Undergrad' : '💼 Working Professional'}
            </span>
            <span className="text-xs text-slate-400 font-medium">| {userProfile.streamOrField}</span>
            {isLiveAI && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Gemini Live Generated
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            3 Distinct AI-Engineered Pathways
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mt-1">
            Compare higher-education, skill-first, and niche pathways designed for your profile.
          </p>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('skillgap')}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-xs rounded-xl transition-all shadow-md"
          >
            <CheckSquare className="w-4 h-4 text-emerald-400" />
            <span>Skill Gap Tracker</span>
          </button>

          <button
            onClick={() => activePathway && onOpenParentBrief(activePathway)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs rounded-xl transition-all shadow-lg shadow-indigo-600/25"
          >
            <FileText className="w-4 h-4" />
            <span>Parent Brief</span>
          </button>
        </div>
      </div>

      {/* Pathway Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {roadmaps.map((r) => {
          const isActive = r.id === activeTabId;
          return (
            <button
              key={r.id}
              onClick={() => {
                setActiveTabId(r.id);
                onSelectPathway(r.id);
              }}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-xs font-bold border transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-lg shadow-blue-500/20'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-slate-600'}`} />
              <div className="text-left">
                <div className="font-extrabold">{r.title}</div>
                <div className="text-[10px] opacity-80 font-normal">{r.matchPercentage}% Match</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Roadmap Card */}
      {activePathway && (
        <RoadmapCard
          pathway={activePathway}
          isSelected={activePathway.id === selectedPathwayId}
          onSelect={() => onSelectPathway(activePathway.id)}
          onOpenParentBrief={() => onOpenParentBrief(activePathway)}
          knownSkills={knownSkills}
          onToggleSkill={onToggleSkill}
        />
      )}
    </div>
  );
};
