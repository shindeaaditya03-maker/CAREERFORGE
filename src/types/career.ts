export type CareerStage = 'high_school' | 'college' | 'professional' | 'switcher';

export type UserProfile = {
  stage: CareerStage;
  streamOrField: string;
  gradeOrYear: string;
  skills: string[];
  interests: string[];
  workStyle: string;
  budgetTimeline: string;
};

export type SkillItem = {
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category?: string;
  isKnown?: boolean;
};

export type ExamOrCert = {
  name: string;
  type: 'Exam' | 'Cert' | 'Degree' | 'Portfolio';
  details: string;
};

export type ResourceItem = {
  title: string;
  type: 'Free Course' | 'Certification' | 'Platform' | 'Project';
  url?: string;
};

export type RoadmapStage = {
  id: string;
  phaseTitle: string;
  timeframe: string;
  description: string;
  keyMilestones: string[];
  skillsToAcquire: SkillItem[];
  entranceExamsOrCerts: ExamOrCert[];
  recommendedDegreesOrCourses: string[];
  learningResources: ResourceItem[];
};

export type RoadmapPathway = {
  id: string;
  title: string;
  type: 'traditional' | 'tech_skill_first' | 'niche_emerging';
  subtitle: string;
  matchPercentage: number;
  overview: string;
  suitabilityReason: string;
  entryLevelSalary: string;
  midCareerSalary: string;
  growthOutlook: string;
  stabilityScore: number;
  steps: RoadmapStage[];
};

export type ParentBrief = {
  pathwayId: string;
  pathwayTitle: string;
  targetAudience: 'Parent' | 'Stakeholder';
  executiveSummary: string;
  whyThisCareer: string;
  industryStabilityGrowth: string;
  financialROI: string;
  formalDegreeBacking: string;
  parentActionPlan: string[];
  automationRiskRating: 'Very Low' | 'Low' | 'Moderate';
};

export type ChatMessage = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
};
