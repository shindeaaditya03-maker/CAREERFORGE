import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, ArrowLeft, Check, GraduationCap, Briefcase, 
  Compass, Zap, BookOpen, Scale, Wrench, Heart, Globe, 
  Building, Landmark, CircleDot, DollarSign, Clock 
} from 'lucide-react';
import type { UserProfile, CareerStage } from '../types/career';

interface QuestionnaireProps {
  onComplete: (profile: UserProfile) => void;
  isLoading: boolean;
}

const STAGE_OPTIONS: { id: CareerStage; title: string; desc: string; icon: any }[] = [
  {
    id: 'high_school',
    title: 'High School Student',
    desc: 'Focus on boards, entrance exams, and top college degrees.',
    icon: GraduationCap,
  },
  {
    id: 'college',
    title: 'College / Undergrad',
    desc: 'Targeting internships, industry certs, and portfolio projects.',
    icon: BookOpen,
  },
  {
    id: 'professional',
    title: 'Working Professional',
    desc: 'Targeting promotion, specialization, and salary acceleration.',
    icon: Briefcase,
  },
  {
    id: 'switcher',
    title: 'Career Switcher',
    desc: 'Transitioning to high-growth sectors with minimal disruption.',
    icon: Compass,
  },
];

const STREAM_OPTIONS = [
  { id: 'Science (PCM)', title: 'Science (PCM)', desc: 'Math, Physics, Computing', icon: Zap },
  { id: 'Science (PCB)', title: 'Science (PCB)', desc: 'Biology, Chem, Healthcare', icon: Heart },
  { id: 'Commerce', title: 'Commerce', desc: 'Finance, Accounts, Trade', icon: Landmark },
  { id: 'Arts / Humanities', title: 'Arts / Humanities', desc: 'Writing, Sociology, History', icon: BookOpen },
  { id: 'Design & Media', title: 'Design & Media', desc: 'UI/UX, 3D Art, Journalism', icon: Sparkles },
  { id: 'Law', title: 'Law', desc: 'Corporate Law, Litigation', icon: Scale },
  { id: 'Vocational', title: 'Vocational & Tech', desc: 'Solar, Smart Home IoT, Trade', icon: Wrench }
];

const STREAM_STRENGTHS: Record<string, string[]> = {
  'Science (PCM)': ['Calculus & Math', 'Physics', 'Python Coding', 'Data Analysis', 'Hardware & Electronics', 'Problem Solving'],
  'Science (PCB)': ['Biology & Life Sciences', 'Chemistry', 'Clinical Care', 'Research Methods', 'Anatomy & Physiology', 'Problem Solving'],
  'Commerce': ['Financial Accounting', 'Economics', 'Statistics & Analytics', 'Excel & Spreadsheets', 'Taxation', 'Public Speaking'],
  'Arts / Humanities': ['Creative Writing', 'Active Listening', 'Research & Analysis', 'Sociology & History', 'Debating', 'Public Speaking'],
  'Design & Media': ['Visual Design', 'Figma & UI Tools', '3D Modeling', 'Video Editing', 'Creative Writing', 'Storytelling'],
  'Law': ['Logical Reasoning', 'Legal Analysis', 'Critical Reading', 'Public Speaking', 'Contract Drafting', 'Debating'],
  'Vocational': ['Electrical Maintenance', 'Mechanical Aptitude', 'PLC Programming', 'Solar Energy Basics', 'Smart Home Assembly', 'Troubleshooting']
};

const DEFAULT_STRENGTHS = ['Problem Solving', 'Data Analysis', 'Public Speaking', 'Creative Writing', 'Project Management', 'Logic'];

const WORK_ENVIRONMENTS = [
  { id: 'Remote', title: 'Remote / Hybrid', desc: 'Work from home or anywhere globally, digital first.', icon: Globe },
  { id: 'Lab/Field', title: 'Lab / Field Research', desc: 'Hands-on clinical lab, hardware field, or onsite work.', icon: Heart },
  { id: 'Startup', title: 'Fast-Paced Startup', desc: 'High speed, multiple roles, rapid skill testing.', icon: Zap },
  { id: 'Enterprise/Corporate', title: 'Enterprise & Corporate', desc: 'Structured hierarchy, clear ladder, scale operations.', icon: Building },
  { id: 'Public Service', title: 'Public Service / Govt', desc: 'Stable public agency work, social governance roles.', icon: Landmark }
];

const BUDGET_TIERS = [
  { id: 'Scholarship/Free', title: 'Scholarship / Free Focus', desc: 'Prioritizing open-source content, free certifications, and aid.' },
  { id: 'Affordable', title: 'Affordable Budget', desc: 'Local institutions, online micro-credentials, and state colleges.' },
  { id: 'Moderate', title: 'Moderate Budget', desc: 'Standard degree backing combined with parallel certifications.' },
  { id: 'Premium', title: 'Premium Budget', desc: 'Top tier private academies, bootcamps, and global university paths.' }
];

const TIMELINE_PREFERENCES = [
  { id: 'degree', title: '3-4 Year Degree Path', desc: 'Traditional structured university education with formal backing.', icon: GraduationCap },
  { id: 'fast_track', title: '3-6 Month Skill Fast-Track', desc: 'Direct certifications, active portfolios, and early job application.', icon: Zap }
];

const STREAM_PASSIONS: Record<string, string[]> = {
  'Science (PCM)': ['Artificial Intelligence', 'Robotics & Automation', 'Quantum Computing', 'Software Engineering', 'Cyber Security'],
  'Science (PCB)': ['BioTech & Healthcare', 'Health Diagnostics', 'Genomics & DNA Research', 'Medical Practice', 'Biomedical Devices'],
  'Commerce': ['FinTech & Blockchain', 'Quantitative Finance', 'Stock Valuation', 'Corporate Audit', 'Digital Marketing'],
  'Arts / Humanities': ['Clinical Psychology', 'UX Research & Behaviour', 'Public Policy & Advocacy', 'Digital Media & Content', 'Social Impact'],
  'Design & Media': ['UI/UX & Product Design', 'Game Design & AR/VR', '3D Animation', 'Brand Architecture', 'Digital Content Creation'],
  'Law': ['Corporate Law', 'Intellectual Property & Patents', 'Cyber Law & Privacy', 'International Law & Diplomacy', 'Public Advocacy'],
  'Vocational': ['Renewable Energy & Solar', 'Smart Home IoT', 'Industrial Automation & PLC', 'Drone Surveys', 'Aerospace Assembly']
};

const DEFAULT_PASSIONS = ['Sustainable Energy', 'Artificial Intelligence', 'Social Good', 'Cyber Security', 'E-Commerce'];

export const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete, isLoading }) => {
  const [step, setStep] = useState<number>(1);
  const [stage, setStage] = useState<CareerStage>('high_school');
  const [stream, setStream] = useState<string>('Science (PCM)');
  const [gradeOrYear, setGradeOrYear] = useState<string>('');
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  const [customStrength, setCustomStrength] = useState<string>('');
  
  const [selectedEnv, setSelectedEnv] = useState<string>('Remote');
  const [selectedBudget, setSelectedBudget] = useState<string>('Moderate');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('degree');
  const [selectedPassions, setSelectedPassions] = useState<string[]>([]);

  const strengthsPool = STREAM_STRENGTHS[stream] || DEFAULT_STRENGTHS;
  const passionsPool = STREAM_PASSIONS[stream] || DEFAULT_PASSIONS;

  const toggleStrength = (strength: string) => {
    setSelectedStrengths(prev => 
      prev.includes(strength) ? prev.filter(s => s !== strength) : [...prev, strength]
    );
  };

  const addCustomStrength = () => {
    const trimmed = customStrength.trim();
    if (trimmed && !selectedStrengths.includes(trimmed)) {
      setSelectedStrengths(prev => [...prev, trimmed]);
      setCustomStrength('');
    }
  };

  const togglePassion = (passion: string) => {
    setSelectedPassions(prev => 
      prev.includes(passion) ? prev.filter(p => p !== passion) : [...prev, passion]
    );
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Assemble final UserProfile object
      const budgetTimelineText = `${selectedBudget} Budget (${selectedTimeline === 'degree' ? 'Degree Focused (3-4 Year University Journey)' : 'Fast-Track Skill Sprint (3-6 Month Certs + Portfolio)'})`;
      
      const userProfile: UserProfile = {
        stage,
        streamOrField: stream,
        gradeOrYear: gradeOrYear || (stage === 'high_school' ? '12th Grade' : stage === 'college' ? 'Undergrad' : 'Working'),
        skills: selectedStrengths.length > 0 ? selectedStrengths : [strengthsPool[0], strengthsPool[1]],
        interests: selectedPassions.length > 0 ? selectedPassions : [passionsPool[0], passionsPool[1]],
        workStyle: selectedEnv,
        budgetTimeline: budgetTimelineText
      };
      
      onComplete(userProfile);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 via-violet-500 to-fuchsia-400 animate-spin flex items-center justify-center p-1 shadow-2xl shadow-indigo-500/40">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-indigo-400 animate-pulse-glow" />
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
          <div className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-400 w-3/4 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          <span>Step {step} of 4</span>
          <span>
            {step === 1 ? 'Academic Stream & Strengths' : 
             step === 2 ? 'Preferred Work Environment' : 
             step === 3 ? 'Budget & Time Horizon' : 
             'Aptitude & Core Passions'}
          </span>
        </div>
        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="glass-card p-6 sm:p-10 rounded-3xl border border-slate-800/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* STEP 1: CAREER STAGE, ACADEMIC STREAM & CORE STRENGTHS */}
        {step === 1 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                1. Select Stage & Academic Stream
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Identify your current stage and stream to populate targeted strength chips.
              </p>
            </div>

            {/* Career Stage Selector */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                Current Career Stage
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {STAGE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = stage === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setStage(opt.id)}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-500/10'
                          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-indigo-400" />
                      <span className="text-[10px] font-bold">{opt.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Academic Stream Grid */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                Academic Career Stream
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {STREAM_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = stream === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => {
                        setStream(opt.id);
                        // Reset strengths matching the new stream
                        setSelectedStrengths([]);
                      }}
                      className={`p-3.5 rounded-xl cursor-pointer border transition-all flex items-start gap-3 hover:scale-[1.01] ${
                        isSelected
                          ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white">{opt.title}</h4>
                        <p className="text-[9px] text-slate-400 leading-normal mt-0.5">{opt.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Level / Grade Text Input */}
            <div className="grid grid-cols-1 gap-4 pt-2">
              <div>
                <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-2">
                  Current Grade, Year or Job Title (Optional)
                </label>
                <input
                  type="text"
                  value={gradeOrYear}
                  onChange={(e) => setGradeOrYear(e.target.value)}
                  placeholder={stage === 'high_school' ? 'e.g. 12th Grade / Senior' : stage === 'college' ? 'e.g. 3rd Year B.Com' : 'e.g. Associate Accountant'}
                  className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium"
                />
              </div>
            </div>

            {/* Core Strengths Chips */}
            <div className="space-y-3 pt-2">
              <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                Select Your Core Strengths & Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {strengthsPool.map((s) => {
                  const isSelected = selectedStrengths.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleStrength(s)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-medium border transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/20'
                          : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                      {s}
                    </button>
                  );
                })}
              </div>

              {/* Custom Strength Input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={customStrength}
                  onChange={(e) => setCustomStrength(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomStrength())}
                  placeholder="Add custom strength..."
                  className="flex-1 px-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-[11px]"
                />
                <button
                  type="button"
                  onClick={addCustomStrength}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold rounded-xl transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PREFERRED WORK ENVIRONMENT & LIFESTYLE */}
        {step === 2 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                2. Preferred Work Environment & Lifestyle
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Select the work setup that matches your target productivity style and workspace comfort.
              </p>
            </div>

            <div className="space-y-3">
              {WORK_ENVIRONMENTS.map((env) => {
                const Icon = env.icon;
                const isSelected = selectedEnv === env.id;
                return (
                  <div
                    key={env.id}
                    onClick={() => setSelectedEnv(env.id)}
                    className={`p-4 rounded-xl cursor-pointer border flex items-center justify-between transition-all hover:scale-[1.01] ${
                      isSelected
                        ? 'bg-indigo-600/15 border-indigo-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-bold block">{env.title}</span>
                        <span className="text-[10px] text-slate-400">{env.desc}</span>
                      </div>
                    </div>
                    {isSelected && <CircleDot className="w-4 h-4 text-indigo-400 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: FINANCIAL & TIME HORIZON GOALS */}
        {step === 3 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                3. Financial & Time Horizon Goals
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Define your investment parameters to allow the AI to calibrate academic degrees vs skill sprints.
              </p>
            </div>

            {/* Budget / Resource Tier */}
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-indigo-400" /> Resource & Budget Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUDGET_TIERS.map((tier) => {
                  const isSelected = selectedBudget === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedBudget(tier.id)}
                      className={`p-4 rounded-xl cursor-pointer border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-indigo-600/15 border-indigo-500 text-white'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <h4 className="font-bold text-xs text-white">{tier.title}</h4>
                      <p className="text-[9px] text-slate-400 mt-1 leading-normal">{tier.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline Preferences */}
            <div className="space-y-3 pt-2">
              <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" /> Education Timeframe & Path Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TIMELINE_PREFERENCES.map((pref) => {
                  const Icon = pref.icon;
                  const isSelected = selectedTimeline === pref.id;
                  return (
                    <div
                      key={pref.id}
                      onClick={() => setSelectedTimeline(pref.id)}
                      className={`p-4 rounded-xl cursor-pointer border transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'bg-indigo-600/15 border-indigo-500 text-white'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white">{pref.title}</h4>
                        <p className="text-[9px] text-slate-400 mt-0.5 leading-normal">{pref.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: APTITUDE & CORE PASSIONS */}
        {step === 4 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                4. Select Aptitude & Core Passions
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Pick domains and technology integrations that spark your excitement.
              </p>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                Tailored Passions Pool ({stream})
              </label>
              <div className="flex flex-wrap gap-2.5">
                {passionsPool.map((passion) => {
                  const isSelected = selectedPassions.includes(passion);
                  return (
                    <button
                      key={passion}
                      type="button"
                      onClick={() => togglePassion(passion)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'bg-violet-600 text-white border-violet-500 shadow-md shadow-violet-500/20'
                          : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      {passion}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-800/80 mt-8 font-sans">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-600/25 transition-all"
          >
            {step === 4 ? (
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
