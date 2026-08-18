import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Questionnaire } from './components/Questionnaire';
import { RoadmapView } from './components/RoadmapView';
import { ParentBriefModal } from './components/ParentBriefModal';
import { SkillGapTracker } from './components/SkillGapTracker';
import { MentorChatDrawer } from './components/MentorChatDrawer';
import { ApiKeyModal } from './components/ApiKeyModal';
import type { UserProfile, RoadmapPathway, ParentBrief } from './types/career';
import { DEFAULT_USER_PROFILE, MOCK_ROADMAPS_HIGH_SCHOOL } from './data/mockRoadmaps';
import { generateCareerRoadmaps, generateParentBrief } from './services/geminiService';

const PROFILE_STORAGE_KEY = 'CAREERFORGE_USER_PROFILE';
const ROADMAPS_STORAGE_KEY = 'CAREERFORGE_ROADMAPS';
const KNOWN_SKILLS_STORAGE_KEY = 'CAREERFORGE_KNOWN_SKILLS';

export function App() {
  const [activeTab, setActiveTab] = useState<'assessment' | 'roadmaps' | 'skillgap' | 'parentbrief'>('assessment');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isLiveAI, setIsLiveAI] = useState<boolean>(false);

  // User State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
  });

  const [roadmaps, setRoadmaps] = useState<RoadmapPathway[]>(() => {
    const saved = localStorage.getItem(ROADMAPS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedPathwayId, setSelectedPathwayId] = useState<string>(() => {
    return roadmaps[0]?.id || '';
  });

  const [knownSkills, setKnownSkills] = useState<string[]>(() => {
    const saved = localStorage.getItem(KNOWN_SKILLS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : ['Math & Logic', 'Python / Coding'];
  });

  // Parent Brief Modal State
  const [parentBriefModalOpen, setParentBriefModalOpen] = useState<boolean>(false);
  const [activeParentBrief, setActiveParentBrief] = useState<ParentBrief | null>(null);
  const [briefTargetPathway, setBriefTargetPathway] = useState<RoadmapPathway | null>(null);

  // Synchronize Dark Mode Class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  // Persist Profile & Roadmaps
  useEffect(() => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    if (roadmaps.length > 0) {
      localStorage.setItem(ROADMAPS_STORAGE_KEY, JSON.stringify(roadmaps));
    }
  }, [roadmaps]);

  useEffect(() => {
    localStorage.setItem(KNOWN_SKILLS_STORAGE_KEY, JSON.stringify(knownSkills));
  }, [knownSkills]);

  // Handle Questionnaire Completion
  const handleQuestionnaireComplete = async (profile: UserProfile) => {
    setUserProfile(profile);
    setIsGenerating(true);

    try {
      const result = await generateCareerRoadmaps(profile);
      setRoadmaps(result.roadmaps);
      setIsLiveAI(result.isLiveAI);
      setSelectedPathwayId(result.roadmaps[0]?.id || '');
      setActiveTab('roadmaps');
    } catch (err) {
      console.error("Error generating roadmaps:", err);
      setRoadmaps(MOCK_ROADMAPS_HIGH_SCHOOL);
      setSelectedPathwayId(MOCK_ROADMAPS_HIGH_SCHOOL[0].id);
      setActiveTab('roadmaps');
    } finally {
      setIsGenerating(false);
    }
  };

  // Open Parent Brief Modal for specific pathway
  const handleOpenParentBrief = async (pathway: RoadmapPathway) => {
    setBriefTargetPathway(pathway);
    setParentBriefModalOpen(true);

    const brief = await generateParentBrief(userProfile, pathway);
    setActiveParentBrief(brief);
  };

  const handleToggleSkill = (skillName: string) => {
    setKnownSkills((prev) =>
      prev.includes(skillName) ? prev.filter((s) => s !== skillName) : [...prev, skillName]
    );
  };

  const handleStartNewAssessment = () => {
    setActiveTab('assessment');
  };

  const activePathway = roadmaps.find((r) => r.id === selectedPathwayId) || roadmaps[0] || null;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'light bg-slate-50 text-slate-900'}`}>
      
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'parentbrief' && activePathway) {
            handleOpenParentBrief(activePathway);
          } else {
            setActiveTab(tab);
          }
        }}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasRoadmaps={roadmaps.length > 0}
        onStartNewAssessment={handleStartNewAssessment}
      />

      {/* Main Content Area */}
      <main className="pb-24">
        {activeTab === 'assessment' && (
          <Questionnaire
            onComplete={handleQuestionnaireComplete}
            isLoading={isGenerating}
          />
        )}

        {activeTab === 'roadmaps' && roadmaps.length > 0 && (
          <RoadmapView
            roadmaps={roadmaps}
            selectedPathwayId={selectedPathwayId}
            onSelectPathway={(id) => setSelectedPathwayId(id)}
            userProfile={userProfile}
            onOpenParentBrief={handleOpenParentBrief}
            onNavigateTab={(tab) => {
              if (tab === 'parentbrief' && activePathway) {
                handleOpenParentBrief(activePathway);
              } else {
                setActiveTab(tab);
              }
            }}
            knownSkills={knownSkills}
            onToggleSkill={handleToggleSkill}
            isLiveAI={isLiveAI}
          />
        )}

        {activeTab === 'skillgap' && (
          <SkillGapTracker
            activePathway={activePathway}
            knownSkills={knownSkills}
            onToggleSkill={handleToggleSkill}
          />
        )}
      </main>

      {/* Standout Feature: Parent Brief Modal */}
      <ParentBriefModal
        brief={activeParentBrief}
        pathway={briefTargetPathway}
        isOpen={parentBriefModalOpen}
        onClose={() => setParentBriefModalOpen(false)}
      />

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeySaved={() => {
          if (roadmaps.length > 0) {
            handleQuestionnaireComplete(userProfile);
          }
        }}
      />

      {/* Floating AI Career Mentor Drawer */}
      <MentorChatDrawer
        currentRoadmap={activePathway}
        userProfile={userProfile}
      />

    </div>
  );
}

export default App;
