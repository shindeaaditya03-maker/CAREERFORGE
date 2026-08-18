import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Award, ExternalLink, ShieldCheck, DollarSign, TrendingUp, Sparkles, FileText, CheckCircle2, Circle } from 'lucide-react';
import type { RoadmapPathway, RoadmapStage } from '../types/career';

interface RoadmapCardProps {
  pathway: RoadmapPathway;
  isSelected: boolean;
  onSelect: () => void;
  onOpenParentBrief: () => void;
  knownSkills: string[];
  onToggleSkill: (skillName: string) => void;
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({
  pathway,
  isSelected,
  onSelect,
  onOpenParentBrief,
  knownSkills,
  onToggleSkill,
}) => {
  const [expandedPhase, setExpandedPhase] = useState<string>(pathway.steps[0]?.id || '');

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'traditional':
        return { label: 'Traditional / Higher Ed', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' };
      case 'tech_skill_first':
        return { label: 'High-Growth Skill-First', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
      case 'niche_emerging':
        return { label: 'Niche & Emerging Field', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' };
      default:
        return { label: 'Career Pathway', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' };
    }
  };

  const typeInfo = getTypeBadge(pathway.type);

  return (
    <div
      className={`glass-card rounded-3xl border transition-all duration-300 relative overflow-hidden ${
        isSelected
          ? 'border-blue-500/80 shadow-2xl shadow-blue-500/10 ring-1 ring-blue-500/50'
          : 'border-slate-800 hover:border-slate-700'
      }`}
    >
      {/* Top Banner */}
      <div className="p-6 sm:p-8 border-b border-slate-800/80">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${typeInfo.color}`}>
            {typeInfo.label}
          </span>
          <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-bold text-blue-300">{pathway.matchPercentage}% AI Match</span>
          </div>
        </div>

        <h3 className="text-2xl font-extrabold text-white mb-2">{pathway.title}</h3>
        <p className="text-xs sm:text-sm text-slate-400 mb-4">{pathway.subtitle}</p>

        {/* Why Matched */}
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 mb-6">
          <strong className="text-blue-400 font-semibold">Why this path fits: </strong>
          {pathway.suitabilityReason}
        </div>

        {/* Salary & Outlook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Entry Salary
            </div>
            <p className="text-xs sm:text-sm font-bold text-emerald-400">{pathway.entryLevelSalary}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" /> 5-Yr Growth Outlook
            </div>
            <p className="text-xs sm:text-sm font-bold text-blue-400">{pathway.growthOutlook}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Job Security
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-indigo-300">{pathway.stabilityScore}/10</span>
              <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full"
                  style={{ width: `${(pathway.stabilityScore / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6">
          <button
            onClick={onOpenParentBrief}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-500/30 text-indigo-300 text-xs font-semibold rounded-xl transition-all"
          >
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Generate Parent Brief</span>
          </button>

          <button
            onClick={onSelect}
            className={`px-5 py-2 text-xs font-semibold rounded-xl transition-all ${
              isSelected
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            {isSelected ? '✓ Active Roadmap' : 'Select Pathway'}
          </button>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="p-6 sm:p-8 space-y-4">
        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
          Step-by-Step Execution Timeline
        </h4>

        <div className="relative pl-6 border-l-2 border-slate-800 space-y-6">
          {pathway.steps.map((step: RoadmapStage, idx: number) => {
            const isExpanded = expandedPhase === step.id;

            return (
              <div key={step.id} className="relative group">
                {/* Timeline node icon */}
                <div className="absolute -left-[31px] top-1 w-6 h-6 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center text-[10px] font-bold text-blue-400 shadow-md">
                  {idx + 1}
                </div>

                <div
                  onClick={() => setExpandedPhase(isExpanded ? '' : step.id)}
                  className="glass-panel p-4 rounded-2xl border border-slate-800/80 cursor-pointer hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                        {step.timeframe}
                      </span>
                      <h5 className="font-bold text-sm text-white">{step.phaseTitle}</h5>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-4 text-xs text-slate-300 animate-fade-in">
                      <p className="text-slate-400">{step.description}</p>

                      {/* Milestones */}
                      {step.keyMilestones.length > 0 && (
                        <div>
                          <strong className="block text-slate-200 font-semibold mb-2">Key Milestones:</strong>
                          <ul className="space-y-1.5">
                            {step.keyMilestones.map((m, i) => (
                              <li key={i} className="flex items-start gap-2 text-slate-300">
                                <span className="text-blue-400 mt-0.5">•</span>
                                <span>{m}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Entrance Exams & Certifications */}
                      {step.entranceExamsOrCerts.length > 0 && (
                        <div>
                          <strong className="block text-slate-200 font-semibold mb-2 flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-amber-400" /> Target Exams / Certifications:
                          </strong>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {step.entranceExamsOrCerts.map((exam, i) => (
                              <div key={i} className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                                <span className="font-bold text-amber-300 block">{exam.name}</span>
                                <span className="text-[11px] text-slate-400">{exam.details}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Must-Learn Skills */}
                      {step.skillsToAcquire.length > 0 && (
                        <div>
                          <strong className="block text-slate-200 font-semibold mb-2">Skills to Acquire:</strong>
                          <div className="flex flex-wrap gap-2">
                            {step.skillsToAcquire.map((skill, i) => {
                              const isKnown = knownSkills.includes(skill.name);
                              return (
                                <button
                                  key={i}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleSkill(skill.name);
                                  }}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-medium border transition-all ${
                                    isKnown
                                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                                  }`}
                                >
                                  {isKnown ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Circle className="w-3 h-3 text-slate-500" />}
                                  <span>{skill.name}</span>
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                                    {skill.difficulty}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Learning Resources */}
                      {step.learningResources.length > 0 && (
                        <div>
                          <strong className="block text-slate-200 font-semibold mb-2">Recommended Resources:</strong>
                          <div className="flex flex-wrap gap-2">
                            {step.learningResources.map((res, i) => (
                              <a
                                key={i}
                                href={res.url || '#'}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1 px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-blue-400 hover:text-blue-300 rounded-lg text-[11px]"
                              >
                                <span>{res.title}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
