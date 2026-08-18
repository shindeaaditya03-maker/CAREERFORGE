import type { RoadmapPathway, ParentBrief, UserProfile } from '../types/career';

export const DEFAULT_USER_PROFILE: UserProfile = {
  stage: 'high_school',
  streamOrField: 'Science (PCM / Computer Science)',
  gradeOrYear: '12th Grade / High School Senior',
  skills: ['Math & Physics', 'Basic Python / Coding', 'Problem Solving', 'Analytical Thinking'],
  interests: ['Artificial Intelligence', 'Robotics & Hardware', 'Software Engineering'],
  workStyle: ['Remote & Hybrid', 'High Growth & Innovation'],
  budgetTimeline: ['Moderate Budget (University / Degree Focused)']
};

export const MOCK_ROADMAPS_HIGH_SCHOOL: RoadmapPathway[] = [
  {
    id: 'path-hs-1',
    title: 'AI & Autonomous Systems Engineering',
    type: 'traditional',
    subtitle: 'B.Tech / B.S. Computer Science → M.S. AI Specialization',
    matchPercentage: 96,
    overview: 'Rigorous engineering foundation building core mathematics, algorithm design, and neural networks through top tier university education.',
    suitabilityReason: 'Matches your strong PCM background, high interest in AI, and preference for formal university credentials.',
    entryLevelSalary: '₹12 - 22 LPA ($85,000 - $115,000 / yr)',
    midCareerSalary: '₹35 - 75 LPA ($160,000 - $240,000 / yr)',
    growthOutlook: '+32% Annual Growth (Critical Global Shortage)',
    stabilityScore: 9,
    steps: [
      {
        id: 'hs-1-step-1',
        phaseTitle: 'Phase 1: 12th Board & Entrance Exam Sprint',
        timeframe: 'Months 1 - 12 (Grade 12)',
        description: 'Focus on core mathematics (Calculus, Linear Algebra), Physics, and cracking target entrance examinations.',
        keyMilestones: [
          'Score 90%+ in 12th Board Physics & Mathematics',
          'Target JEE Main / JEE Advanced / SAT / State CETs',
          'Build 2 basic Python projects (Data structures & Pygame)'
        ],
        skillsToAcquire: [
          { name: 'Advanced Mathematics & Calculus', difficulty: 'Intermediate' },
          { name: 'Python Basics & NumPy', difficulty: 'Beginner' },
          { name: 'Physics & Classical Mechanics', difficulty: 'Intermediate' }
        ],
        entranceExamsOrCerts: [
          { name: 'JEE Main & Advanced', type: 'Exam', details: 'Top Indian Engineering Institutes (IITs/NITs)' },
          { name: 'CUET / SAT', type: 'Exam', details: 'Central & Global Universities' },
          { name: 'State Engineering CET', type: 'Exam', details: 'Premier State Technological Universities' }
        ],
        recommendedDegreesOrCourses: [
          'B.Tech / B.E. in Computer Science Engineering (AI/ML)',
          'B.S. in Computer Science (Global Universities)'
        ],
        learningResources: [
          { title: 'Khan Academy Multivariable Calculus', type: 'Free Course', url: 'https://khanacademy.org' },
          { title: 'Python for Everybody (Coursera)', type: 'Free Course', url: 'https://coursera.org' }
        ]
      },
      {
        id: 'hs-1-step-2',
        phaseTitle: 'Phase 2: Bachelor Degree & Deep Learning Foundations',
        timeframe: 'Years 1 - 4 (Undergraduate)',
        description: 'Master Data Structures & Algorithms, Machine Learning fundamentals, and secure research or industry internships.',
        keyMilestones: [
          'Maintain 8.5+ CGPA in B.Tech Computer Science',
          'Publish 1 undergraduate research paper or open-source AI project',
          'Complete 2 summer software engineering internships'
        ],
        skillsToAcquire: [
          { name: 'Data Structures & Algorithms', difficulty: 'Advanced' },
          { name: 'PyTorch & Neural Networks', difficulty: 'Intermediate' },
          { name: 'System Design & Computer Architecture', difficulty: 'Intermediate' }
        ],
        entranceExamsOrCerts: [
          { name: 'AWS Certified Machine Learning Specialist', type: 'Cert', details: 'Industry Cloud Certification' },
          { name: 'GATE / GRE (Optional)', type: 'Exam', details: 'For M.Tech / M.S. Higher Studies' }
        ],
        recommendedDegreesOrCourses: [
          'Specialized Electives in Robotics, Computer Vision, and NLP'
        ],
        learningResources: [
          { title: 'Fast.ai Deep Learning for Coders', type: 'Free Course', url: 'https://fast.ai' },
          { title: 'Stanford CS229 Machine Learning Notes', type: 'Platform', url: 'https://cs229.stanford.edu' }
        ]
      },
      {
        id: 'hs-1-step-3',
        phaseTitle: 'Phase 3: Industry Entrance & Specialization',
        timeframe: 'Years 5+',
        description: 'Step into AI research labs, robotics startups, or enterprise tech giants as an Applied AI Engineer.',
        keyMilestones: [
          'Join Tier-1 Tech Firm or High-Growth AI Startup',
          'Lead autonomous agent or computer vision pipeline deployment'
        ],
        skillsToAcquire: [
          { name: 'LLM Fine-Tuning & Quantization', difficulty: 'Advanced' },
          { name: 'MLOps & Kubernetes Deployment', difficulty: 'Advanced' }
        ],
        entranceExamsOrCerts: [],
        recommendedDegreesOrCourses: ['Optional M.S. / Ph.D. in Robotics or AI'],
        learningResources: [
          { title: 'Hugging Face Deep RL & Transformer Course', type: 'Free Course', url: 'https://huggingface.co' }
        ]
      }
    ]
  },
  {
    id: 'path-hs-2',
    title: 'Full-Stack Software Engineer & Cloud Architect',
    type: 'tech_skill_first',
    subtitle: 'Skill-First Accelerator: Practical Bootcamp + Degree + Open Source',
    matchPercentage: 92,
    overview: 'Accelerated, hands-on path prioritizing building production web applications, open-source contributions, and cloud certifications alongside standard degree.',
    suitabilityReason: 'Great fit for high coding interest, fast-paced execution, and desire to land paid internships early.',
    entryLevelSalary: '₹10 - 18 LPA ($75,000 - $105,000 / yr)',
    midCareerSalary: '₹30 - 60 LPA ($140,000 - $200,000 / yr)',
    growthOutlook: '+24% Steady Expansion',
    stabilityScore: 8.5,
    steps: [
      {
        id: 'hs-2-step-1',
        phaseTitle: 'Phase 1: Full-Stack Foundations & Modern Web Development',
        timeframe: 'Months 1 - 12',
        description: 'Master HTML/CSS, Modern React, Node.js/TypeScript, and build 4 full-stack portfolio applications.',
        keyMilestones: [
          'Deploy 4 full-stack web applications on Vercel / AWS',
          'Earn GitHub Developer Badge with 100+ commits',
          'Target CUET / BCA / B.Tech Admissions'
        ],
        skillsToAcquire: [
          { name: 'JavaScript & TypeScript', difficulty: 'Intermediate' },
          { name: 'React.js & Next.js Framework', difficulty: 'Intermediate' },
          { name: 'Tailwind CSS & Modern UI/UX', difficulty: 'Beginner' }
        ],
        entranceExamsOrCerts: [
          { name: 'MetaData Full-Stack Web Developer Cert', type: 'Cert', details: 'Professional Certificate' }
        ],
        recommendedDegreesOrCourses: ['BCA / B.Sc Computer Science / B.Tech'],
        learningResources: [
          { title: 'The Odin Project Full-Stack Path', type: 'Free Course', url: 'https://theodinproject.com' },
          { title: 'Full Stack Open (University of Helsinki)', type: 'Free Course', url: 'https://fullstackopen.com' }
        ]
      },
      {
        id: 'hs-2-step-2',
        phaseTitle: 'Phase 2: Cloud Architecture & Backend Scalability',
        timeframe: 'Years 2 - 3',
        description: 'Expand into PostgreSQL, Microservices, Docker, Redis, and DevOps pipeline automation.',
        keyMilestones: [
          'Clear AWS Solutions Architect Associate exam',
          'Land first remote internship or freelance client project'
        ],
        skillsToAcquire: [
          { name: 'Docker & Containerization', difficulty: 'Intermediate' },
          { name: 'PostgreSQL & ORMs (Prisma)', difficulty: 'Intermediate' },
          { name: 'AWS Cloud Services (EC2, S3, Lambda)', difficulty: 'Intermediate' }
        ],
        entranceExamsOrCerts: [
          { name: 'AWS Certified Solutions Architect', type: 'Cert', details: 'Global Cloud Certification' }
        ],
        recommendedDegreesOrCourses: [],
        learningResources: [
          { title: 'AWS Cloud Practitioner & Architect Prep', type: 'Platform', url: 'https://aws.amazon.com' }
        ]
      }
    ]
  },
  {
    id: 'path-hs-3',
    title: 'Quantum Computing & Hardware Innovation',
    type: 'niche_emerging',
    subtitle: 'Interdisciplinary Physics + Computer Engineering Pathway',
    matchPercentage: 88,
    overview: 'Cutting-edge frontier career operating at the intersection of quantum physics, semiconductor chips, and Next-Gen computing.',
    suitabilityReason: 'Perfect for deep passion in physics and math combined with computing systems.',
    entryLevelSalary: '₹15 - 28 LPA ($95,000 - $130,000 / yr)',
    midCareerSalary: '₹45 - 90 LPA ($180,000 - $290,000 / yr)',
    growthOutlook: '+40% High-Tech Frontier Growth',
    stabilityScore: 8,
    steps: [
      {
        id: 'hs-3-step-1',
        phaseTitle: 'Phase 1: Quantum Physics & Mathematical Rigor',
        timeframe: 'Years 1 - 2',
        description: 'Focus on Quantum Mechanics, Linear Algebra, and IBM Qiskit simulator programming.',
        keyMilestones: [
          'Enroll in B.Sc Physics Honors or B.Tech Engineering Physics',
          'Run first quantum algorithm simulation on IBM Quantum Experience'
        ],
        skillsToAcquire: [
          { name: 'Linear Algebra & Complex Matrices', difficulty: 'Advanced' },
          { name: 'Quantum Mechanics Basics', difficulty: 'Intermediate' },
          { name: 'Qiskit & Python Quantum SDK', difficulty: 'Intermediate' }
        ],
        entranceExamsOrCerts: [
          { name: 'IBM Quantum Developer Certification', type: 'Cert', details: 'IBM Official Cert' }
        ],
        recommendedDegreesOrCourses: ['B.Tech Engineering Physics / B.Sc Quantum Computing'],
        learningResources: [
          { title: 'IBM Qiskit Textbook', type: 'Free Course', url: 'https://qiskit.org' }
        ]
      }
    ]
  }
];

export const MOCK_PARENT_BRIEFS: Record<string, ParentBrief> = {
  'path-hs-1': {
    pathwayId: 'path-hs-1',
    pathwayTitle: 'AI & Autonomous Systems Engineering',
    targetAudience: 'Parent',
    executiveSummary: 'This pathway prepares your student for one of the highest-demand, most financially rewarding careers globally. It combines a traditional 4-year Computer Science engineering degree with specialized training in Artificial Intelligence and Robotics.',
    whyThisCareer: 'Artificial Intelligence is transforming every sector from healthcare to transportation. Graduates with strong technical degrees in this domain are in extremely high demand, securing stable, future-proof roles with rapid salary growth.',
    industryStabilityGrowth: 'Expected industry growth is 32% annually over the next 10 years. Because this field requires advanced mathematical logic and engineering degrees, jobs have high security against economic shifts.',
    financialROI: 'High Return on Investment. Typical entry-level starting packages range from ₹12 to ₹22 Lakhs per annum ($85K-$115K globally), with 5-year mid-career earnings reaching ₹35-75 LPA as senior engineers or tech leads.',
    formalDegreeBacking: 'Rooted in accredited 4-year university degrees (B.Tech / B.E. / B.S. Computer Science) from top institutions (IITs, NITs, Central & International Universities) entered via established exams like JEE Main, CUET, or SAT.',
    parentActionPlan: [
      'Encourage focus on 12th grade Physics & Mathematics preparation.',
      'Support registration for entrance exams (JEE, CUET, SAT).',
      'Provide a reliable laptop (16GB RAM recommended for coding projects).'
    ],
    automationRiskRating: 'Very Low'
  }
};
