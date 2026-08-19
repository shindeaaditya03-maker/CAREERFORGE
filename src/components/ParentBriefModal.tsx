import React from 'react';
import { X, Printer, ShieldCheck, TrendingUp, DollarSign, GraduationCap, Sparkles, Heart, CheckCircle } from 'lucide-react';
import type { ParentBrief, RoadmapPathway } from '../types/career';

interface ParentBriefModalProps {
  brief: ParentBrief | null;
  pathway: RoadmapPathway | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ParentBriefModal: React.FC<ParentBriefModalProps> = ({
  brief,
  pathway,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !brief || !pathway) return null;

  const handlePrint = () => {
    window.print();
  };

  // Extract all unique exams from the pathway steps
  const allExams = pathway.steps.reduce((acc, step) => {
    step.entranceExamsOrCerts.forEach(item => {
      if (item.type === 'Exam' && !acc.some(x => x.name === item.name)) {
        acc.push(item);
      }
    });
    return acc;
  }, [] as typeof pathway.steps[0]['entranceExamsOrCerts']);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl p-6 sm:p-10 glass-card rounded-3xl border border-slate-700/60 shadow-2xl my-8">
        
        {/* Modal Controls (Hidden during print) */}
        <div className="no-print flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <Heart className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-white text-lg">Parent Brief (Bridge Mode)</h3>
              <p className="text-xs text-slate-400">1-Page Executive Summary for Parents & Family</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Printer className="w-4 h-4" /> Print / Save as PDF
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="space-y-6 text-slate-200 printable-content">
          
          {/* Header Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-violet-950/60 border border-indigo-500/20">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                EXECUTIVE CAREER BRIEF • CAREERFORGE
              </span>
              <span className="px-3 py-1 text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Automation Risk: {brief.automationRiskRating}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">{brief.pathwayTitle}</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{brief.executiveSummary}</p>
          </div>

          {/* Core Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
            
            {/* Why This Career */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" /> What is this career?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{brief.whyThisCareer}</p>
            </div>

            {/* Industry Stability & Growth */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" /> Industry Stability & Outlook
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{brief.industryStabilityGrowth}</p>
            </div>

            {/* Financial ROI */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" /> Financial ROI & Expected Earnings
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{brief.financialROI}</p>
            </div>

            {/* Degree Backing */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-400" /> Formal Education & Exams
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">{brief.formalDegreeBacking}</p>
              
              {allExams.length > 0 && (
                <div className="pt-2 border-t border-slate-800 mt-2">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                    Key Target Entrance Exams:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {allExams.map((exam, i) => (
                      <span
                        key={i}
                        title={exam.details}
                        className="px-2.5 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-semibold"
                      >
                        {exam.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Action Plan for Parents */}
          <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 space-y-3">
            <h4 className="font-bold text-indigo-300 text-sm flex items-center gap-2">
              <Heart className="w-4 h-4 text-indigo-400" /> How Parents Can Support This Journey
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {brief.parentActionPlan.map((action, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center text-[11px] text-slate-500 border-t border-slate-800 pt-4">
            CAREERFORGE AI Parent Brief • Generated for informed decision-making and parental alignment.
          </div>

        </div>

      </div>
    </div>
  );
};
