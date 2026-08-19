import type { UserProfile, RoadmapPathway, ParentBrief, ChatMessage } from '../types/career';
import { MOCK_PARENT_BRIEFS, getFallbackRoadmaps } from '../data/mockRoadmaps';

const API_KEY_STORAGE_KEY = 'CAREERFORGE_GEMINI_KEY';

export const getStoredApiKey = (): string => {
  const rawKey =
    localStorage.getItem(API_KEY_STORAGE_KEY) ||
    import.meta.env.VITE_GEMINI_API_KEY ||
    import.meta.env.GEMINI_API_KEY ||
    '';
  // Strip quotes and trim whitespaces
  return rawKey.trim().replace(/^["']|["']$/g, '').trim();
};

export const setStoredApiKey = (key: string): void => {
  const cleaned = key.trim().replace(/^["']|["']$/g, '').trim();
  if (cleaned) {
    localStorage.setItem(API_KEY_STORAGE_KEY, cleaned);
  } else {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  }
};

const VALID_GEMINI_MODELS = [
  'gemini-1.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-pro'
];

/**
 * Call Gemini REST API directly using standard fetch with multi-model fallback chain and temperature control
 */
async function callGeminiApi(prompt: string, apiKey: string, temperature: number = 0.85): Promise<string> {
  const cleanKey = apiKey.trim().replace(/^["']|["']$/g, '').trim();
  if (!cleanKey) {
    throw new Error("NO_API_KEY");
  }

  let lastErrorMsg = '';

  for (const modelName of VALID_GEMINI_MODELS) {
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
            temperature: temperature,
            maxOutputTokens: 2500,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const msg = errorData.error?.message || `HTTP ${response.status}`;
        lastErrorMsg = msg;
        console.warn(`[Gemini API] Model ${modelName} returned error: ${msg}. Trying next model...`);
        continue;
      }

      const data = await response.json();
      const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (textOutput) {
        console.log(`[Gemini API Success] Received live response from ${modelName} with temperature ${temperature}`);
        return textOutput;
      }
    } catch (err: any) {
      lastErrorMsg = err.message || String(err);
      console.warn(`[Gemini API] Fetch error for model ${modelName}:`, err);
    }
  }

  throw new Error(lastErrorMsg || "Gemini API request failed.");
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
  const fallbackData = getFallbackRoadmaps(userProfile.streamOrField);

  if (!apiKey) {
    console.log(`[CAREERFORGE] No Gemini API key provided. Using fallback roadmaps for stream: ${userProfile.streamOrField}`);
    return { roadmaps: fallbackData, isLiveAI: false };
  }

  const systemPrompt = `
You are an expert AI Career Strategist for CAREERFORGE.
Given the following student/professional profile:
- Career Stage: ${userProfile.stage}
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
          { "name": "JEE / NEET / CLAT / Cert Name", "type": "Exam" | "Cert" | "Degree" | "Portfolio", "details": "Brief info" }
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
    // System 1: Rigid evaluation synthesis at temperature 0.4
    const rawResult = await callGeminiApi(systemPrompt, apiKey, 0.4);
    const roadmaps = parseJsonResponse<RoadmapPathway[]>(rawResult);
    return { roadmaps, isLiveAI: true };
  } catch (err) {
    console.error("[CAREERFORGE] Gemini API generation failed, using fallback roadmaps:", err);
    return { roadmaps: fallbackData, isLiveAI: false };
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
      formalDegreeBacking: `Backed by accredited university courses, entrance exams, and industry-recognized professional certifications.`,
      parentActionPlan: [
        'Support target skill development and exam/cert registrations.',
        'Ensure access to study equipment and high-speed internet.',
        'Encourage networking and project building.'
      ],
      automationRiskRating: 'Low'
    };
  }

  const systemPrompt = `
You are an executive career advisor.
Generate a reassuring, highly structured 1-page "Parent / Stakeholder Brief" for a student/professional pursuing the career pathway: "${pathway.title}".
Include details about relevant entrance exams (like JEE, NEET, CUET, CLAT, MHT-CET, NATA, IPMAT) if they apply to this pathway.
Provide a clear 5-10 Year Industry Outlook, ROI metrics, degree backing, and action advice for the parent.

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
  "industryStabilityGrowth": "Detailed breakdown of 5-10 year market demand, automation resilience, and economic stability.",
  "financialROI": "Financial return on investment analysis (starting salary vs growth and study cost factors).",
  "formalDegreeBacking": "Details on official university degrees, national entrance exams (JEE/NEET/CLAT/etc.), or accredited certifications backing this path.",
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
    // System 1: Rigid evaluation synthesis at temperature 0.4
    const rawResult = await callGeminiApi(systemPrompt, apiKey, 0.4);
    return parseJsonResponse<ParentBrief>(rawResult);
  } catch (err) {
    console.error("[CAREERFORGE] Gemini Parent Brief generation failed, returning fallback:", err);
    return MOCK_PARENT_BRIEFS[pathway.id] || {
      pathwayId: pathway.id,
      pathwayTitle: pathway.title,
      targetAudience: 'Parent',
      executiveSummary: `This executive brief outlines the strategic value and ROI of the ${pathway.title} pathway.`,
      whyThisCareer: pathway.overview,
      industryStabilityGrowth: pathway.growthOutlook,
      financialROI: `Entry-level salary starting at ${pathway.entryLevelSalary}.`,
      formalDegreeBacking: `Backed by accredited university courses, exams, and certifications.`,
      parentActionPlan: [
        'Support focus on foundational stream preparations.',
        'Support registration for entrance exams.',
        'Provide a dedicated study environment.'
      ],
      automationRiskRating: 'Low'
    };
  }
}

/**
 * AI Mentor Chat Assistant - Live Gemini Call
 */
export async function sendMentorChatMessage(
  messages: ChatMessage[],
  currentRoadmap: RoadmapPathway | null,
  userProfile: UserProfile
): Promise<{ text: string; isLive: boolean; errorDetails?: string }> {
  const apiKey = getStoredApiKey();
  const lastUserMsg = messages[messages.length - 1]?.text || '';

  if (!apiKey) {
    console.log("[CAREERFORGE Chat] No API key present. Returning fallback Alex response.");
    return {
      text: generateDynamicAlexResponse(lastUserMsg.toLowerCase(), currentRoadmap, profileText(userProfile)),
      isLive: false,
      errorDetails: "No API key configured"
    };
  }

  const roadmapContext = currentRoadmap
    ? `Target Pathway Selected: ${currentRoadmap.title}\nPathway Summary: ${currentRoadmap.overview}\nMilestones: ${currentRoadmap.steps.map(s => s.phaseTitle).join(', ')}`
    : 'No specific roadmap selected yet.';

  const prompt = `
You are Alex — a super friendly, warm, empathetic, and human-like AI Career Mentor. You help students, college grads, and career switchers map out and hit their biggest career goals.

YOUR PERSONA & STYLE:
- Name: Alex 👋
- Tone: Extremely warm, natural, human, conversational, and energetic.
- Speak directly to the user as a real person.
- Avoid robotic AI tropes (NEVER say "As an AI language model..." or "As your CAREERFORGE AI Mentor, I recommend...").
- Keep your answers natural, encouraging, and clear (2-3 natural paragraphs).

USER PROFILE:
- Stage: ${userProfile.stage}
- Stream / Background: ${userProfile.streamOrField}
- Core Skills: ${userProfile.skills.join(', ')}
${roadmapContext}

CHAT HISTORY:
${messages.map(m => `${m.sender === 'user' ? 'USER' : 'ALEX'}: ${m.text}`).join('\n')}

Task:
Respond directly and naturally as Alex to the user's latest message: "${lastUserMsg}"
`;

  try {
    // System 2: Warm chatbot at temperature 0.85
    const liveResponse = await callGeminiApi(prompt, apiKey, 0.85);
    return { text: liveResponse, isLive: true };
  } catch (err: any) {
    const errMsg = err?.message || String(err);
    console.error("[CAREERFORGE Chat] Live Gemini API error:", errMsg);

    return {
      text: `⚠️ **Gemini API Notice**: ${errMsg}\n\n*Falling back to offline Alex assistant:* \n\n${generateDynamicAlexResponse(lastUserMsg.toLowerCase(), currentRoadmap, profileText(userProfile))}`,
      isLive: false,
      errorDetails: errMsg
    };
  }
}

function profileText(userProfile: UserProfile): string {
  return userProfile.streamOrField || 'your field';
}

/**
 * Human-like Dynamic Response Generator (Alex Persona Offline Fallback)
 */
function generateDynamicAlexResponse(
  query: string,
  roadmap: RoadmapPathway | null,
  streamOrField: string
): string {
  const title = roadmap ? roadmap.title : 'your career journey';

  if (query.includes('parent') || query.includes('explain') || query.includes('family')) {
    return `Hey! I completely get where you're coming from — explaining modern careers to family can feel like translating two different languages! 😅\n\nHere is how I recommend breaking down **${title}** to them:\n\n• **Focus on Growth & Security**: Remind them that this field is expanding fast (${roadmap ? roadmap.growthOutlook : '+25% annual growth'}), meaning strong long-term job security.\n• **Highlight Accredited Degrees**: Reassure them that this path is backed by formal degrees or top-tier industry certifications.\n• **Show the ROI**: Point out the solid starting salaries (${roadmap ? roadmap.entryLevelSalary : 'great packages'})!\n\n💡 **Pro Tip**: Click the **"Generate Parent Brief"** button at the top of your roadmap screen. I've written a ready-to-print 1-page executive summary you can physically hand to your parents!`;
  }

  if (query.includes('exam') || query.includes('jee') || query.includes('neet') || query.includes('cuet') || query.includes('clat') || query.includes('sat') || query.includes('cert') || query.includes('nata') || query.includes('ipmat')) {
    return `Cracking entrance exams and certifications for **${title}** is all about smart consistency, not burning out! 🔥\n\nHere's my game plan for you:\n\n1. **Daily Focus Window**: Block out 2 dedicated hours every weekday just for solving past question papers and core concepts.\n2. **Weekend Mock Tests**: Take full-length timed tests on weekends — analyzing your mistakes is where 80% of your score gains come from.\n3. **Parallel Certifications**: If you're building towards certs, spend 30 minutes in the evening building hands-on projects.\n\nYou've got this! What specific subject or exam section feels trickiest right now?`;
  }

  if (query.includes('project') || query.includes('portfolio') || query.includes('build') || query.includes('resume')) {
    return `Building an awesome portfolio for **${title}** is your ticket to standing out from 99% of applicants! 🚀\n\nHere are 2 high-impact projects you should build:\n\n1. **Core Domain Application**: Create a tool that solves a real-world problem in ${streamOrField} (e.g. an interactive mock model or analytics spreadsheet).\n2. **Documentation & Showcase**: Share your process online with clean notes, architecture steps, and clear results.\n\nWhich project idea sounds most exciting to start building first?`;
  }

  return `Hey there! I'm Alex, your personal AI career guide 👋 I'm right here to help you match, plan, and crush your goals in **${title}**!\n\nRight now, your best move is working through the milestones in your roadmap and checking off your skills in the **Skill Gap Tracker** tab.\n\nWhat would you like to brainstorm next — entrance exam strategy, cool portfolio projects, or how to land internships?`;
}
