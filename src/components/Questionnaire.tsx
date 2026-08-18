import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Check, GraduationCap, Briefcase, UserCheck, Compass, Zap, BookOpen } from 'lucide-react';
import type { UserProfile, CareerStage } from '../types/career';
import { DEFAULT_USER_PROFILE } from '../data/mockRoadmaps';

interface QuestionnaireProps {
  onComplete: (profile: UserProfile) => void;
  isLoading: boolean;
}

const STAGE_OPTIONS: { id: CareerStage; title: string; desc: string; icon: any }[] = [
  {
    id: 'high_school',
    title: 'High School / 12th Grade',
    desc: 'Focus on stream selection, entrance exams (JEE, NEET, CUET, SAT), & top college degrees.',
    icon: GraduationCap,
  },
  {
    id: 'college',
    title: 'College / University Student',
    desc: 'Targeting internships, industry certs, research papers, portfolio projects, & postgrad.',
    icon: BookOpen,
  },
  {
    id: 'professional',
    title: 'Early Career Professional',
    desc: 'Targeting rapid promotion, specialized skills, salary acceleration, & leadership.',
    icon: Briefcase,
  },
  {
    id: 'switcher',
    title: 'Career Switcher / Upskiller',
    desc: 'Transitioning to high-growth tech sectors (AI, Cloud, FinTech) with minimal disruption.',
    icon: Compass,
  },
];

const SKILL_CHIPS = [
  'Math & Logic', 'Python / Coding', 'Physics', 'Problem Solving', 'Data Analysis',
  'UI/UX Design', 'Financial Accounting', 'Public Speaking', 'Hardware & Electronics',
  'Machine Learning', 'Content Writing', 'Project Management'
];

const INTEREST_CHIPS = [
  'Artificial Intelligence', 'Robotics & Automation', 'Web & Mobile Apps', 'FinTech & Crypto',
  'Sustainable & Green Energy', 'Cyber Security', 'BioTech & Healthcare', 'Game Design & AR',
  'E-Commerce & Marketing', 'Deep Research'
];

const WORK_STYLE_OPTIONS = [
  'Remote & Global Hybrid', 'Hands-on Hardware / Lab Research', 'Fast-Paced Startup Culture',
  'Stable Enterprise & Government', 'High Financial Growth & Incentives'
];

const BUDGET_TIMELINE_OPTIONS = [
  'Degree Focused (3-4 Year University Journey)',
  'Fast-Track Skill Sprint (3-6 Month Certs + Portfolio)',
  'Balanced (Degree + Parallel Certifications & Internships)',
  'Affordable / Scholarship & Free Learning Focus'
];

export const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete, isLoading }) => {
  const [step, setStep] = useState<number>(1);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [customSkill, setCustomSkill] = useState<string>('');

  const toggleSkill = (skill: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !profile.skills.includes(customSkill.trim())) {
      setProfile((prev) => ({ ...prev, skills: [...prev.skills, customSkill.trim()] }));
      setCustomSkill('');
    }
  };

  const toggleInterest = (interest: string) => {
    setProfile((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      onComplete(profile);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 animate-spin flex items-center justify-center p-1 shadow-2xl shadow-blue-500/40">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-blue-400 animate-pulse-glow" />
            </div>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
          Generating 3 Distinct Career Pathways
        </h2>
        <p className="text-sm text-slate-400 max-w-md mb-6">
          Synthesizing your academic background, skill vectors, target exams, and financial goals with Gemini AI...
        </p>
        <div className="w-full max-w-xs bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
          <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 w-3/4 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      {/* Progress Bar & Step Indicators */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          <span>Step {step} of 5</span>
          <span>{step === 1 ? 'Career Stage' : step === 2 ? 'Skills & Strengths' : step === 3 ? 'Interests & Passions' : step === 4 ? 'Work Preferences' : 'Budget & Timeline'}</span>
        </div>
        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="glass-card p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* STEP 1: CAREER STAGE & BACKGROUND */}
        {step === 1 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                What is your current career stage?
              </h2>
              <p className="text-slate-400 text-sm">
                CAREERFORGE customizes roadmaps differently for students vs working professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STAGE_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = profile.stage === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setProfile({ ...profile, stage: opt.id })}
                    className={`p-5 rounded-2xl cursor-pointer border transition-all duration-200 ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-sm text-white">{opt.title}</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{opt.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Academic Stream / Current Field
                </label>
                <input
                  type="text"
                  value={profile.streamOrField}
                  onChange={(e) => setProfile({ ...profile, streamOrField: e.target.value })}
                  placeholder="e.g. Science (PCM), Computer Science, Commerce"
                  className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Current Grade / Level
                </label>
                <input
                  type="text"
                  value={profile.gradeOrYear}
                  onChange={(e) => setProfile({ ...profile, gradeOrYear: e.target.value })}
                  placeholder="e.g. 12th Grade / 3rd Year B.Tech"
                  className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: SKILLS & STRENGTHS */}
        {step === 2 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                What are your key skills & strengths?
              </h2>
              <p className="text-slate-400 text-sm">
                Select skills you are good at or comfortable with.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {SKILL_CHIPS.map((skill) => {
                const isSelected = profile.skills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                        : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    {skill}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSkill())}
                placeholder="Add custom skill..."
                className="flex-1 px-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
              />
              <button
                type="button"
                onClick={addCustomSkill}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-xl transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: INTERESTS & PASSIONS */}
        {step === 3 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Which domains excite you the most?
              </h2>
              <p className="text-slate-400 text-sm">
                Choose target industries and areas you want to explore or work in.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {INTEREST_CHIPS.map((interest) => {
                const isSelected = profile.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/20'
                        : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: WORK PREFERENCES */}
        {step === 4 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                What is your preferred work style?
              </h2>
              <p className="text-slate-400 text-sm">
                Select your ideal job environment and growth preferences.
              </p>
            </div>

            <div className="space-y-3">
              {WORK_STYLE_OPTIONS.map((style) => {
                const isSelected = profile.workStyle === style;
                return (
                  <div
                    key={style}
                    onClick={() => setProfile({ ...profile, workStyle: style })}
                    className={`p-4 rounded-xl cursor-pointer border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-medium">{style}</span>
                    {isSelected && <Zap className="w-4 h-4 text-blue-400" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: BUDGET & TIMELINE */}
        {step === 5 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Budget & Upskilling Timeline
              </h2>
              <p className="text-slate-400 text-sm">
                Help AI calibrate degree recommendations vs bootcamp fast-tracks.
              </p>
            </div>

            <div className="space-y-3">
              {BUDGET_TIMELINE_OPTIONS.map((option) => {
                const isSelected = profile.budgetTimeline === option;
                return (
                  <div
                    key={option}
                    onClick={() => setProfile({ ...profile, budgetTimeline: option })}
                    className={`p-4 rounded-xl cursor-pointer border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-medium">{option}</span>
                    {isSelected && <UserCheck className="w-4 h-4 text-blue-400" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-800 mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all"
          >
            {step === 5 ? (
              <>
                Generate 3 Roadmaps <Sparkles className="w-4 h-4" />
              </>
            ) : (
              <>
                Next Step <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
