import type { UserProfile, RoadmapPathway, ParentBrief, ChatMessage } from '../types/career';
import { MOCK_ROADMAPS_HIGH_SCHOOL, MOCK_PARENT_BRIEFS } from '../data/mockRoadmaps';

const API_KEY_STORAGE_KEY = 'CAREERFORGE_GEMINI_KEY';

export const getStoredApiKey = (): string => {
  const rawKey =
    localStorage.getItem(API_KEY_STORAGE_KEY) ||
    import.meta.env.VITE_GEMINI_API_KEY ||
    import.meta.env.GEMINI_API_KEY ||
    '';
  return rawKey.trim().replace(/^["']|["']$/g, '');
};

export const setStoredApiKey = (key: string): void => {
  const cleaned = key.trim().replace(/^["']|["']$/g, '');
  if (cleaned) {
    localStorage.setItem(API_KEY_STORAGE_KEY, cleaned);
  } else {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  }
};

const GEMINI_MODELS = [
  'gemini-1.5-flash',
  'gemini-2.0-flash',
  'gemini-2.5-flash',
  'gemini-1.5-pro'
];

/**
 * Call Gemini REST API directly using standard fetch with multi-model fallback chain
 */
async function callGeminiApi(prompt: string, apiKey: string): Promise<string> {
  const cleanKey = apiKey.trim().replace(/^["']|["']$/g, '');
  let lastErrorMsg = '';

  for (const modelName of GEMINI_MODELS) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${cleanKey}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 3000,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const msg = errorData.error?.message || `HTTP ${response.status}`;
        lastErrorMsg = msg;
        console.warn(`Gemini Model ${modelName} returned error: ${msg}. Trying fallback model...`);
        continue;
      }

      const data = await response.json();
      const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (textOutput) {
        return textOutput;
      }
    } catch (err: any) {
      lastErrorMsg = err.message || String(err);
      console.warn(`Fetch error for model ${modelName}:`, err);
    }
  }

  throw new Error(lastErrorMsg || "All Gemini API model endpoints failed. Please check your API key.");
}

/**
 * Clean Markdown backticks and extra text surrounding JSON response
 */
function parseJsonResponse<T>(text: string): T {
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  return JSON.parse(cleaned) as T;
}

/**
 * Generate 3 Distinct Roadmaps based on user profile
 */
export async function generateCareerRoadmaps(userProfile: UserProfile): Promise<{ roadmaps: RoadmapPathway[]; isLiveAI: boolean }> {
  const apiKey = getStoredApiKey();

  if (!apiKey) {
    console.log("No Gemini API key provided. Using fallback demo roadmaps.");
    return { roadmaps: MOCK_ROADMAPS_HIGH_SCHOOL, isLiveAI: false };
  }

  const systemPrompt = `
You are an expert AI Career Strategist for CAREERFORGE.
Given the following student/professional profile:
- Career Stage: ${userProfile.stage} (e.g. high_school, college, professional, switcher)
- Stream / Background: ${userProfile.streamOrField}
- Current Level / Grade: ${userProfile.gradeOrYear}
- Core Skills: ${userProfile.skills.join(', ')}
- Interests: ${userProfile.interests.join(', ')}
- Preferred Work Style: ${userProfile.workStyle}
- Budget & Timeline: ${userProfile.budgetTimeline}

TASK:
Generate EXACTLY 3 DISTINCT career pathways tailored specifically to this user:
1. Path A (type: "traditional"): University/Higher Education / Accredited Deep Dive Pathway.
2. Path B (type: "tech_skill_first"): High-Growth Skill-First Fast-Track / Bootcamp / Industry Certifications Pathway.
3. Path C (type: "niche_emerging"): Niche, Interdisciplinary, or Emerging Frontier Pathway.

Return ONLY a valid JSON array of 3 objects conforming to this TypeScript structure:
[
  {
    "id": "path-1",
    "title": "Clear Actionable Title",
    "type": "traditional" | "tech_skill_first" | "niche_emerging",
    "subtitle": "Short 1-line tag",
    "matchPercentage": 95,
    "overview": "Detailed summary of this path",
    "suitabilityReason": "Why this path matches their specific profile",
    "entryLevelSalary": "Estimated entry salary range in INR & USD",
    "midCareerSalary": "Estimated 5-year salary range in INR & USD",
    "growthOutlook": "Industry growth metrics (e.g., +28% growth)",
    "stabilityScore": 9,
    "steps": [
      {
        "id": "step-1",
        "phaseTitle": "Phase 1: Title",
        "timeframe": "Timeframe",
        "description": "Overview of phase",
        "keyMilestones": ["Milestone 1", "Milestone 2"],
        "skillsToAcquire": [
          { "name": "Skill Name", "difficulty": "Beginner" | "Intermediate" | "Advanced" }
        ],
        "entranceExamsOrCerts": [
          { "name": "JEE / AWS / Cert Name", "type": "Exam" | "Cert" | "Degree" | "Portfolio", "details": "Brief info" }
        ],
        "recommendedDegreesOrCourses": ["Degree or Course Name"],
        "learningResources": [
          { "title": "Resource Name", "type": "Free Course" | "Certification" | "Platform", "url": "https://..." }
        ]
      }
    ]
  }
]
IMPORTANT: Return strictly raw JSON. Do NOT wrap in markdown explanation text.
`;

  try {
    const rawResult = await callGeminiApi(systemPrompt, apiKey);
    const roadmaps = parseJsonResponse<RoadmapPathway[]>(rawResult);
    return { roadmaps, isLiveAI: true };
  } catch (err) {
    console.error("Gemini API generation failed, using fallback roadmaps:", err);
    return { roadmaps: MOCK_ROADMAPS_HIGH_SCHOOL, isLiveAI: false };
  }
}

/**
 * Generate 1-Page Parent Brief / Stakeholder Summary for a specific pathway
 */
export async function generateParentBrief(userProfile: UserProfile, pathway: RoadmapPathway): Promise<ParentBrief> {
  const apiKey = getStoredApiKey();

  if (!apiKey || MOCK_PARENT_BRIEFS[pathway.id]) {
    return MOCK_PARENT_BRIEFS[pathway.id] || {
      pathwayId: pathway.id,
      pathwayTitle: pathway.title,
      targetAudience: userProfile.stage === 'high_school' || userProfile.stage === 'college' ? 'Parent' : 'Stakeholder',
      executiveSummary: `This executive brief outlines the strategic value, financial return, and industry stability of the ${pathway.title} pathway.`,
      whyThisCareer: pathway.overview,
      industryStabilityGrowth: pathway.growthOutlook,
      financialROI: `Entry-level salary starts around ${pathway.entryLevelSalary}, growing to ${pathway.midCareerSalary} within 5 years.`,
      formalDegreeBacking: `Backed by accredited computer science/engineering degrees and industry-recognized professional certifications.`,
      parentActionPlan: [
        'Support target skill development and exam/cert registrations.',
        'Ensure access to computer equipment and high-speed internet.',
        'Encourage networking and project building.'
      ],
      automationRiskRating: 'Low'
    };
  }

  const systemPrompt = `
You are an executive career advisor.
Generate a reassuring, highly structured 1-page "Parent / Stakeholder Brief" for a student/professional pursuing the career pathway: "${pathway.title}".

User Profile: Stage: ${userProfile.stage}, Stream: ${userProfile.streamOrField}.
Pathway Details:
- Title: ${pathway.title}
- Overview: ${pathway.overview}
- Entry Salary: ${pathway.entryLevelSalary}
- Mid Career Salary: ${pathway.midCareerSalary}
- Growth Outlook: ${pathway.growthOutlook}

Generate a JSON object matching this TypeScript structure:
{
  "pathwayId": "${pathway.id}",
  "pathwayTitle": "${pathway.title}",
  "targetAudience": "${userProfile.stage === 'high_school' || userProfile.stage === 'college' ? 'Parent' : 'Stakeholder'}",
  "executiveSummary": "A clear 2-3 sentence overview explaining why this is a high-opportunity choice.",
  "whyThisCareer": "Explanation in simple, non-jargon language of what the job involves and its real-world impact.",
  "industryStabilityGrowth": "Detailed breakdown of 5-10 year market demand and economic stability.",
  "financialROI": "Financial return on investment analysis (starting salary vs growth).",
  "formalDegreeBacking": "Details on official university degrees, entrance exams, or accredited certifications backing this path.",
  "parentActionPlan": [
    "Actionable bullet point 1",
    "Actionable bullet point 2",
    "Actionable bullet point 3"
  ],
  "automationRiskRating": "Very Low" | "Low" | "Moderate"
}

Return strictly raw JSON.
`;

  try {
    const rawResult = await callGeminiApi(systemPrompt, apiKey);
    return parseJsonResponse<ParentBrief>(rawResult);
  } catch (err) {
    console.error("Gemini Parent Brief generation failed, returning fallback:", err);
    return {
      pathwayId: pathway.id,
      pathwayTitle: pathway.title,
      targetAudience: 'Parent',
      executiveSummary: `This executive brief outlines the strategic value and ROI of the ${pathway.title} pathway.`,
      whyThisCareer: pathway.overview,
      industryStabilityGrowth: pathway.growthOutlook,
      financialROI: `Entry-level salary starting at ${pathway.entryLevelSalary}.`,
      formalDegreeBacking: `Backed by accredited university courses and certifications.`,
      parentActionPlan: [
        'Encourage foundation math and coding practice.',
        'Support entrance exam registrations.',
        'Provide a dedicated study environment.'
      ],
      automationRiskRating: 'Low'
    };
  }
}

/**
 * AI Mentor Chat Assistant
 */
export async function sendMentorChatMessage(
  messages: ChatMessage[],
  currentRoadmap: RoadmapPathway | null,
  userProfile: UserProfile
): Promise<string> {
  const apiKey = getStoredApiKey();
  const lastUserMsg = messages[messages.length - 1]?.text.toLowerCase() || '';

  if (!apiKey) {
    console.log("No Gemini API key found for chat. Using dynamic fallback counselor.");
    return generateDynamicFallbackResponse(lastUserMsg, currentRoadmap, userProfile);
  }

  const roadmapContext = currentRoadmap ? `Current Selected Roadmap: ${currentRoadmap.title}\nOverview: ${currentRoadmap.overview}\nMilestones: ${currentRoadmap.steps.map(s => s.phaseTitle).join(', ')}` : 'No specific roadmap selected yet.';

  const prompt = `
You are CAREERFORGE AI Mentor, an empathetic, expert career counselor for high schoolers, college students, and working professionals.
User Profile: Stage: ${userProfile.stage}, Stream: ${userProfile.streamOrField}.
${roadmapContext}

Chat History:
${messages.map(m => `${m.sender.toUpperCase()}: ${m.text}`).join('\n')}

Respond to the latest user message with clear, actionable, encouraging advice. Keep responses concise (2-4 paragraphs max). Use bullet points where appropriate.
`;

  try {
    return await callGeminiApi(prompt, apiKey);
  } catch (err: any) {
    console.error("Mentor chat API error:", err);
    const errorString = err?.message || String(err);
    if (errorString.includes('API key') || errorString.includes('400') || errorString.includes('403')) {
      return `⚠️ API Key Error: ${errorString}.\n\nPlease verify your API key in the top bar ("Key" button) or add VITE_GEMINI_API_KEY in Vercel Environment Variables.`;
    }
    return generateDynamicFallbackResponse(lastUserMsg, currentRoadmap, userProfile);
  }
}

/**
 * Dynamic Smart Response generator when offline or during API hiccups
 */
function generateDynamicFallbackResponse(
  query: string,
  roadmap: RoadmapPathway | null,
  profile: UserProfile
): string {
  const title = roadmap ? roadmap.title : 'your career path';

  if (query.includes('parent') || query.includes('explain') || query.includes('family')) {
    return `To explain **${title}** to your parents or family:\n\n1. **Highlight Economic Stability**: Mention that this field has strong growth metrics (${roadmap ? roadmap.growthOutlook : '+25% annual growth'}).\n2. **Formal Degree Backing**: Reassure them that this path includes recognized university degrees (B.Tech / B.Sc) and accredited certifications.\n3. **Financial Return**: Share the entry salary expectations (${roadmap ? roadmap.entryLevelSalary : 'competitive packages'}).\n\n💡 **Tip**: Click the **"Generate Parent Brief"** button at the top of your roadmap screen for a ready-to-print 1-page executive report!`;
  }

  if (query.includes('exam') || query.includes('jee') || query.includes('cuet') || query.includes('clat') || query.includes('sat') || query.includes('cert')) {
    return `For target exams and certifications in **${title}**:\n\n• **Schedule Strategy**: Dedicate 2-3 hours daily during weekdays strictly for core conceptual prep, and reserved weekends for full-length mock exams.\n• **High-Yield Practice**: Solve the last 5 years' question papers to understand exam patterns and weak areas.\n• **Parallel Certifications**: If aiming for skill-first certs (e.g., AWS, Meta, IBM), allocate 45 minutes of evening hands-on lab practice.`;
  }

  if (query.includes('project') || query.includes('portfolio') || query.includes('build') || query.includes('resume')) {
    return `To build a standout portfolio for **${title}**:\n\n1. **Foundational Project**: Build a full-stack CRUD web or data application solving a real-world problem in ${profile.streamOrField}.\n2. **Advanced AI / Domain Project**: Develop an open-source tool incorporating LLM APIs, dataset pipelines, or cloud deployment.\n3. **GitHub Presence**: Document your repositories with clear READMEs, system architecture diagrams, and live demo links.`;
  }

  if (query.includes('skill') || query.includes('learn') || query.includes('gap')) {
    return `Looking at your active roadmap for **${title}**:\n\n• Focus first on mastering your **Foundational Skills** (e.g., Problem Solving, Data Structures, Mathematics).\n• Use the **Skill Gap Tracker** tab to check off skills you already know vs skills to acquire.\n• Build mini-projects for each unchecked skill to gain practical confidence!`;
  }

  return `As your CAREERFORGE AI Mentor, I recommend focusing on the current phase of **${title}**.\n\n• **Immediate Action**: Work through the key milestones listed in Phase 1 of your roadmap.\n• **Skill Readiness**: Check off your known skills in the Skill Gap Tracker tab.\n• **Question**: Would you like advice on target entrance exams, portfolio projects, or preparing for interviews for this specific path?`;
}
