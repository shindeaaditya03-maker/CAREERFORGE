import React from 'react';
import { CheckSquare, Square, CheckCircle2, Trophy } from 'lucide-react';
import type { RoadmapPathway, SkillItem } from '../types/career';
import confetti from 'canvas-confetti';

interface SkillGapTrackerProps {
  activePathway: RoadmapPathway | null;
  knownSkills: string[];
  onToggleSkill: (skillName: string) => void;
}

export const SkillGapTracker: React.FC<SkillGapTrackerProps> = ({
  activePathway,
  knownSkills,
  onToggleSkill,
}) => {
  if (!activePathway) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center text-slate-400 glass-card rounded-3xl my-8">
        <CheckSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-1">No Active Roadmap Selected</h3>
        <p className="text-xs">Please complete the questionnaire or select a roadmap to track your skill gap.</p>
      </div>
    );
  }

  // Extract unique required skills from all phases
  const allSkillsMap = new Map<string, SkillItem>();
  activePathway.steps.forEach((step) => {
    step.skillsToAcquire.forEach((skill) => {
      if (!allSkillsMap.has(skill.name)) {
        allSkillsMap.set(skill.name, skill);
      }
    });
  });

  const allSkills = Array.from(allSkillsMap.values());
  const knownCount = allSkills.filter((s) => knownSkills.includes(s.name)).length;
  const totalCount = allSkills.length;
  const progressPct = totalCount > 0 ? Math.round((knownCount / totalCount) * 100) : 0;

  const handleToggle = (skillName: string) => {
    onToggleSkill(skillName);
    // Trigger confetti if adding last skill
    if (!knownSkills.includes(skillName) && knownCount + 1 === totalCount) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in space-y-8">
      
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5" /> Interactive Skill Readiness
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Skill Gap Checklist: {activePathway.title}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
            Toggle skills you already know vs skills you need to acquire. Watch your career readiness score grow in real time!
          </p>
        </div>

        {/* Readiness Meter */}
        <div className="w-full md:w-64 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300">Career Readiness</span>
            <span className="text-emerald-400 text-base font-extrabold">{progressPct}%</span>
          </div>
          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 text-center">
            {knownCount} of {totalCount} Skills Mastered
          </p>
        </div>
      </div>

      {/* Completion Banner */}
      {progressPct === 100 && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/40 flex items-center gap-4 animate-slide-up">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-extrabold text-white text-lg">100% Skill Readiness Achieved! 🎉</h4>
            <p className="text-xs text-slate-300">
              You possess all the core foundational skills for this pathway. You are ready to apply for roles or top university programs!
            </p>
          </div>
        </div>
      )}

      {/* Skills Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allSkills.map((skill) => {
          const isKnown = knownSkills.includes(skill.name);
          return (
            <div
              key={skill.name}
              onClick={() => handleToggle(skill.name)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                isKnown
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${isKnown ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {isKnown ? <CheckCircle2 className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className={`font-bold text-sm ${isKnown ? 'text-emerald-300 line-through' : 'text-white'}`}>
                    {skill.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {isKnown ? 'Mastered / Known Skill' : 'Skill Needed for Pathway'}
                  </p>
                </div>
              </div>

              <span
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                  skill.difficulty === 'Beginner'
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    : skill.difficulty === 'Intermediate'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}
              >
                {skill.difficulty}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
};
