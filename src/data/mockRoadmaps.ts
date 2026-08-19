import type { RoadmapPathway, ParentBrief, UserProfile } from '../types/career';

export const DEFAULT_USER_PROFILE: UserProfile = {
  stage: 'high_school',
  streamOrField: 'Science (PCM / Computer Science)',
  gradeOrYear: '12th Grade / High School Senior',
  skills: ['Math & Physics', 'Basic Python / Coding', 'Problem Solving', 'Analytical Thinking'],
  interests: ['Artificial Intelligence', 'Robotics & Hardware', 'Software Engineering'],
  workStyle: 'Remote & Global Hybrid',
  budgetTimeline: 'Degree Focused (3-4 Year University Journey)'
};

// ==========================================
// 1. SCIENCE (PCM / COMPUTER SCIENCE) MOCK DATA
// ==========================================
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
    stabilityScore: 9.2,
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
          { name: 'MHT-CET', type: 'Exam', details: 'State Technological Universities' }
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
          { name: 'Meta Full-Stack Web Developer Cert', type: 'Cert', details: 'Professional Certificate' }
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

// ==========================================
// 2. SCIENCE (PCB / BIOLOGY & HEALTHTECH) MOCK DATA
// ==========================================
export const MOCK_ROADMAPS_PCB: RoadmapPathway[] = [
  {
    id: 'path-pcb-1',
    title: 'Medical Practice & HealthTech Integration',
    type: 'traditional',
    subtitle: 'MBBS → MD Specialization / Digital Health Innovation Practitioner',
    matchPercentage: 95,
    overview: 'Rigorous medical journey leading to clinical residency, enhanced with digital health diagnostics, telemedicine, and AI-assisted care.',
    suitabilityReason: 'Ideal for your clinical orientation, interest in direct patient care, and background in biological sciences.',
    entryLevelSalary: '₹9 - 15 LPA ($70,000 - $95,000 / yr)',
    midCareerSalary: '₹24 - 55 LPA ($150,000 - $220,000 / yr)',
    growthOutlook: '+22% Steady Healthcare Expansion',
    stabilityScore: 9.8,
    steps: [
      {
        id: 'pcb-1-step-1',
        phaseTitle: 'Phase 1: Pre-Med Board Prep & NEET Sprint',
        timeframe: 'Months 1 - 12 (Grade 12)',
        description: 'Master Human Physiology, Organic Chemistry, and Biological Taxonomy while practicing MCQ speed runs.',
        keyMilestones: [
          'Score 92%+ in 12th Boards (Biology, Chemistry)',
          'Clear NEET UG with top national/state rank',
          'Secure admission in premier government medical college'
        ],
        skillsToAcquire: [
          { name: 'Human Physiology & Anatomy', difficulty: 'Intermediate' },
          { name: 'Organic & Bio-Chemistry', difficulty: 'Intermediate' },
          { name: 'Clinical Ethics Foundations', difficulty: 'Beginner' }
        ],
        entranceExamsOrCerts: [
          { name: 'NEET UG', type: 'Exam', details: 'National Eligibility cum Entrance Test for Medical admission' },
          { name: 'MHT-CET (Medical)', type: 'Exam', details: 'State Level Allied Medical Entrance' }
        ],
        recommendedDegreesOrCourses: ['MBBS (Bachelor of Medicine, Bachelor of Surgery)'],
        learningResources: [
          { title: 'NEET Prep Biology & Chemistry Labs', type: 'Platform', url: 'https://neetprep.com' }
        ]
      },
      {
        id: 'pcb-1-step-2',
        phaseTitle: 'Phase 2: Medical School & Tech Foundations',
        timeframe: 'Years 1 - 5.5',
        description: 'Complete MBBS coursework and mandatory rotations while learning digital health tools, EHR systems, and medical diagnostics APIs.',
        keyMilestones: [
          'Pass all professional MBBS university exams',
          'Complete 12-month rotating internship in public hospitals',
          'Build a telehealth or diagnostics side project'
        ],
        skillsToAcquire: [
          { name: 'Clinical Diagnostics', difficulty: 'Advanced' },
          { name: 'Pharmacology', difficulty: 'Intermediate' },
          { name: 'Digital Health Records & EHR APIs', difficulty: 'Beginner' }
        ],
        entranceExamsOrCerts: [
          { name: 'FMGE / NEXT', type: 'Exam', details: 'National Exit Test for Medical License & PG admission' }
        ],
        recommendedDegreesOrCourses: ['MD in Internal Medicine / Radiology / Digital Health elective'],
        learningResources: [
          { title: 'Coursera AI in Healthcare Specialization', type: 'Certification', url: 'https://coursera.org' }
        ]
      }
    ]
  },
  {
    id: 'path-pcb-2',
    title: 'Bioinformatics & Computational Genomics Analyst',
    type: 'tech_skill_first',
    subtitle: 'BioTech/BioScience Degree + Python Scripting + Cloud Genomics',
    matchPercentage: 91,
    overview: 'Accelerated track merging molecular biology with Python scripting, genomic sequencing algorithms, and cloud database analytics.',
    suitabilityReason: 'Matches interests in life sciences combined with a drive for data analytics and programming.',
    entryLevelSalary: '₹8 - 14 LPA ($65,000 - $90,000 / yr)',
    midCareerSalary: '₹20 - 45 LPA ($120,000 - $180,000 / yr)',
    growthOutlook: '+28% Fast-Paced R&D Growth',
    stabilityScore: 8.8,
    steps: [
      {
        id: 'pcb-2-step-1',
        phaseTitle: 'Phase 1: Molecular Biology & Programming Foundations',
        timeframe: 'Months 1 - 12',
        description: 'Learn genetic sequencing fundamentals and acquire solid command of Python and data management libraries.',
        keyMilestones: [
          'Secure admission in B.Sc BioTech / B.Tech Bioinformatics / BCA',
          'Develop a script to analyze DNA codon sequences'
        ],
        skillsToAcquire: [
          { name: 'Python Basics & Pandas', difficulty: 'Beginner' },
          { name: 'Genetics & Molecular Biology', difficulty: 'Intermediate' },
          { name: 'Relational Databases (SQL)', difficulty: 'Beginner' }
        ],
        entranceExamsOrCerts: [
          { name: 'CUET UG (Biotech)', type: 'Exam', details: 'Central Universities Admission Test' }
        ],
        recommendedDegreesOrCourses: ['B.Sc Biotech / B.Tech Bioinformatics'],
        learningResources: [
          { title: 'Rosalind Bioinformatics Exercises', type: 'Platform', url: 'https://rosalind.info' }
        ]
      }
    ]
  }
];

// ==========================================
// 3. COMMERCE & FINTECH MOCK DATA
// ==========================================
export const MOCK_ROADMAPS_COMMERCE: RoadmapPathway[] = [
  {
    id: 'path-comm-1',
    title: 'Chartered Accountancy & Strategic Audit',
    type: 'traditional',
    subtitle: 'CA Foundation → Intermediate → Finals + Corporate Advisory',
    matchPercentage: 94,
    overview: 'The golden standard of financial qualifications, leading to corporate auditing, tax consultancy, and advisory services.',
    suitabilityReason: 'Perfect for your mathematical mindset, high attention to detail, and interest in financial regulations.',
    entryLevelSalary: '₹8 - 15 LPA ($70,000 - $90,000 / yr)',
    midCareerSalary: '₹22 - 50 LPA ($140,000 - $210,000 / yr)',
    growthOutlook: '+18% Steady Industry Demand',
    stabilityScore: 9.6,
    steps: [
      {
        id: 'comm-1-step-1',
        phaseTitle: 'Phase 1: CA Foundation & B.Com Integration',
        timeframe: 'Months 1 - 12',
        description: 'Enroll in B.Com (Hons) and clear CA Foundation entrance while mastering Mercantile Law and Accounting principles.',
        keyMilestones: [
          'Score 85%+ in B.Com Hons Semester 1 & 2',
          'Pass CA Foundation exam in the first attempt'
        ],
        skillsToAcquire: [
          { name: 'Financial Accounting & Bookkeeping', difficulty: 'Intermediate' },
          { name: 'Mercantile Law & Business Correspondence', difficulty: 'Beginner' },
          { name: 'Excel Foundations', difficulty: 'Beginner' }
        ],
        entranceExamsOrCerts: [
          { name: 'CA Foundation', type: 'Exam', details: 'ICAI Entrance Examination' },
          { name: 'IPMAT', type: 'Exam', details: 'Integrated Program in Management (IIM Indore/Rohtak)' }
        ],
        recommendedDegreesOrCourses: ['B.Com (Hons) Accounting & Finance'],
        learningResources: [
          { title: 'ICAI Study Portal Materials', type: 'Platform', url: 'https://icai.org' }
        ]
      }
    ]
  },
  {
    id: 'path-comm-2',
    title: 'FinTech & Quantitative Risk Analyst',
    type: 'tech_skill_first',
    subtitle: 'B.Com / B.BA Finance + Python for Finance + Financial Modelling',
    matchPercentage: 91,
    overview: 'A skill-first path bridging corporate commerce with modern quantitative analysis, algorithmic modeling, and blockchain technology.',
    suitabilityReason: 'Fits a desire to work in fast-paced financial markets or investment tech operations.',
    entryLevelSalary: '₹9 - 16 LPA ($75,000 - $100,000 / yr)',
    midCareerSalary: '₹25 - 60 LPA ($150,000 - $230,000 / yr)',
    growthOutlook: '+35% Hyper-Growth FinTech Space',
    stabilityScore: 8.4,
    steps: [
      {
        id: 'comm-2-step-1',
        phaseTitle: 'Phase 1: Financial Modeling & Analytical Coding',
        timeframe: 'Months 1 - 12',
        description: 'Build robust spreadsheets and learn coding to manipulate stock datasets and run statistical simulations.',
        keyMilestones: [
          'Complete Certified Financial Planner (CFP) or NISM certifications',
          'Build a portfolio of 3 quantitative Excel models'
        ],
        skillsToAcquire: [
          { name: 'Financial Modeling & Valuation', difficulty: 'Intermediate' },
          { name: 'Python for Quantitative Analysis', difficulty: 'Beginner' },
          { name: 'Statistics & Probability', difficulty: 'Intermediate' }
        ],
        entranceExamsOrCerts: [
          { name: 'NISM Series XV exam', type: 'Exam', details: 'Research Analyst certification' }
        ],
        recommendedDegreesOrCourses: ['B.BA in Finance / B.Sc in Finance'],
        learningResources: [
          { title: 'Corporate Finance Institute (CFI) Courses', type: 'Platform', url: 'https://corporatefinanceinstitute.com' }
        ]
      }
    ]
  }
];

// ==========================================
// 4. ARTS & HUMANITIES MOCK DATA
// ==========================================
export const MOCK_ROADMAPS_ARTS: RoadmapPathway[] = [
  {
    id: 'path-arts-1',
    title: 'Clinical Psychology & Cognitive Therapy',
    type: 'traditional',
    subtitle: 'B.A. / B.Sc Psychology → M.Sc / M.Phil Clinical Psychology',
    matchPercentage: 93,
    overview: 'A compassionate, academic path focused on human behavior, diagnostics, mental health research, and therapeutic care.',
    suitabilityReason: 'Suited for your empathy, strong communication, and fascination with cognitive and behavioral science.',
    entryLevelSalary: '₹5 - 9 LPA ($50,000 - $70,000 / yr)',
    midCareerSalary: '₹14 - 30 LPA ($100,000 - $160,000 / yr)',
    growthOutlook: '+26% Expanding Health Infrastructure',
    stabilityScore: 9.4,
    steps: [
      {
        id: 'arts-1-step-1',
        phaseTitle: 'Phase 1: Board Exam Sprint & CUET UG Prep',
        timeframe: 'Months 1 - 12',
        description: 'Study Sociology, Psychology, and English while preparing for central university admissions.',
        keyMilestones: [
          'Achieve 90%+ in 12th Board Exams',
          'Pass CUET UG with top scores for DU, BHU, or AUD'
        ],
        skillsToAcquire: [
          { name: 'Basic Psychology & Human Behaviour', difficulty: 'Beginner' },
          { name: 'Active Listening & Counseling Basics', difficulty: 'Beginner' },
          { name: 'Social Research Methodology', difficulty: 'Beginner' }
        ],
        entranceExamsOrCerts: [
          { name: 'CUET UG (Psychology)', type: 'Exam', details: 'Central Universities Admission Test' }
        ],
        recommendedDegreesOrCourses: ['B.A. (Hons) in Psychology / Applied Psychology'],
        learningResources: [
          { title: 'CrashCourse Psychology (YouTube)', type: 'Free Course', url: 'https://youtube.com' }
        ]
      }
    ]
  },
  {
    id: 'path-arts-2',
    title: 'UX Research & Product Strategy',
    type: 'tech_skill_first',
    subtitle: 'B.A. Humanities + UX Methods + Figma + Interactive Design',
    matchPercentage: 90,
    overview: 'Bridges social sciences (psychology, sociology) with digital products, researching how users think and interact with software.',
    suitabilityReason: 'Appeals to analytical writing skills, interest in user behavior, and technology integration.',
    entryLevelSalary: '₹8 - 14 LPA ($65,000 - $90,000 / yr)',
    midCareerSalary: '₹22 - 45 LPA ($130,000 - $190,000 / yr)',
    growthOutlook: '+30% Industry Need for Digital Experience',
    stabilityScore: 8.5,
    steps: [
      {
        id: 'arts-2-step-1',
        phaseTitle: 'Phase 1: Research Methodology & UX Foundations',
        timeframe: 'Months 1 - 12',
        description: 'Learn standard user interview techniques, survey designs, and layout prototyping using Figma.',
        keyMilestones: [
          'Publish 2 user research case studies on Medium / Behance',
          'Master Figma wireframing and prototyping basics'
        ],
        skillsToAcquire: [
          { name: 'UX Research & Interviewing', difficulty: 'Intermediate' },
          { name: 'Figma & Wireframing', difficulty: 'Beginner' },
          { name: 'Cognitive Psychology Basics', difficulty: 'Beginner' }
        ],
        entranceExamsOrCerts: [
          { name: 'Google UX Design Professional Certificate', type: 'Cert', details: 'Meta & Google Academy Cert' }
        ],
        recommendedDegreesOrCourses: ['B.A. in Cognitive Science / Psychology / Sociology'],
        learningResources: [
          { title: 'Interaction Design Foundation (IxDF)', type: 'Platform', url: 'https://interaction-design.org' }
        ]
      }
    ]
  }
];

// ==========================================
// 5. DESIGN & MEDIA MOCK DATA
// ==========================================
export const MOCK_ROADMAPS_DESIGN: RoadmapPathway[] = [
  {
    id: 'path-des-1',
    title: 'Interaction & Product UI/UX Design',
    type: 'traditional',
    subtitle: 'B.Des / M.Des Product Design → Tech Product Design Associate',
    matchPercentage: 95,
    overview: 'Formal design school education mastering typography, visual hierarchy, ergonomics, and interactive digital interfaces.',
    suitabilityReason: 'Perfect for combining visual creativity, artistic sensibilities, and software interaction principles.',
    entryLevelSalary: '₹8 - 16 LPA ($70,000 - $100,000 / yr)',
    midCareerSalary: '₹25 - 55 LPA ($140,000 - $220,000 / yr)',
    growthOutlook: '+28% Expanding Design Demand',
    stabilityScore: 8.9,
    steps: [
      {
        id: 'des-1-step-1',
        phaseTitle: 'Phase 1: Design Portfolios & NID / UCEED Sprint',
        timeframe: 'Months 1 - 12 (Grade 12)',
        description: 'Build a diverse physical and digital art portfolio while preparing for design entrance exams.',
        keyMilestones: [
          'Score 80%+ in 12th Boards',
          'Pass UCEED / NID DAT Entrance Test',
          'Upload 10 high-quality projects to Behance'
        ],
        skillsToAcquire: [
          { name: 'Visual Design & Sketching', difficulty: 'Intermediate' },
          { name: 'Figma & Vector Design', difficulty: 'Beginner' },
          { name: 'Design Thinking & Ideation', difficulty: 'Beginner' }
        ],
        entranceExamsOrCerts: [
          { name: 'UCEED', type: 'Exam', details: 'Undergraduate Common Entrance Examination for Design (IITs)' },
          { name: 'NID DAT', type: 'Exam', details: 'National Institute of Design Admissions Test' },
          { name: 'NATA', type: 'Exam', details: 'National Aptitude Test in Architecture (Alternative)' }
        ],
        recommendedDegreesOrCourses: ['B.Des in Communication Design / Interaction Design'],
        learningResources: [
          { title: 'Figma Learn Portal Courses', type: 'Free Course', url: 'https://figma.com/resource-library' }
        ]
      }
    ]
  },
  {
    id: 'path-des-2',
    title: 'Game Art & XR (Augmented / Virtual Reality) Design',
    type: 'tech_skill_first',
    subtitle: 'Bootcamp / Portfolio-focused Path + Blender + Unity Engine',
    matchPercentage: 92,
    overview: 'A skill-first path bypassing traditional degree lengths by mastering 3D modeling, texturing, and game engine layout.',
    suitabilityReason: 'Great fit for high tech interest, game enthusiast, and early freelancer aspirations.',
    entryLevelSalary: '₹7 - 13 LPA ($60,000 - $85,000 / yr)',
    midCareerSalary: '₹20 - 45 LPA ($110,000 - $170,000 / yr)',
    growthOutlook: '+35% Rapid Metaverse & Gaming Expansion',
    stabilityScore: 8.2,
    steps: [
      {
        id: 'des-2-step-1',
        phaseTitle: 'Phase 1: 3D Assets & Blender Fundamentals',
        timeframe: 'Months 1 - 12',
        description: 'Learn mesh modeling, material shaders, and animation pipelines inside Blender.',
        keyMilestones: [
          'Publish 5 complex 3D renders on ArtStation',
          'Develop 2 interactive environments in Unity'
        ],
        skillsToAcquire: [
          { name: 'Blender 3D Modeling', difficulty: 'Intermediate' },
          { name: 'Unity Engine & C# scripting', difficulty: 'Beginner' },
          { name: 'Texturing & PBR materials', difficulty: 'Beginner' }
        ],
        entranceExamsOrCerts: [
          { name: 'Unity Certified Associate', type: 'Cert', details: 'Official game engine validation' }
        ],
        recommendedDegreesOrCourses: ['Diploma in Game Art & 3D Animation'],
        learningResources: [
          { title: 'Blender Guru Donut Tutorial Series', type: 'Free Course', url: 'https://youtube.com' }
        ]
      }
    ]
  }
];

// ==========================================
// 6. LAW MOCK DATA
// ==========================================
export const MOCK_ROADMAPS_LAW: RoadmapPathway[] = [
  {
    id: 'path-law-1',
    title: 'Corporate & Technology Mergers Law',
    type: 'traditional',
    subtitle: 'BA LLB (5-Year Integrated) → Corporate Associate / Tech Policy Counsel',
    matchPercentage: 96,
    overview: 'Formal legal studies mastering corporate jurisprudence, data protection regulations, and legal compliance.',
    suitabilityReason: 'Matches strong critical thinking, debating skills, and desire for corporate governance roles.',
    entryLevelSalary: '₹10 - 18 LPA ($80,000 - $110,000 / yr)',
    midCareerSalary: '₹28 - 65 LPA ($160,000 - $240,000 / yr)',
    growthOutlook: '+20% High Demand in Tech Compliance',
    stabilityScore: 9.5,
    steps: [
      {
        id: 'law-1-step-1',
        phaseTitle: 'Phase 1: CLAT Preparation & LLB Admissions',
        timeframe: 'Months 1 - 12',
        description: 'Focus on English comprehension, Legal Reasoning, Logical Aptitude, and cracking the national exam.',
        keyMilestones: [
          'Pass 12th Board Exams with 85%+',
          'Clear CLAT / AILET with top ranks',
          'Secure admission in Tier-1 National Law University (NLU)'
        ],
        skillsToAcquire: [
          { name: 'Legal Reasoning & Logic', difficulty: 'Intermediate' },
          { name: 'Critical Reading & Grammar', difficulty: 'Advanced' },
          { name: 'Public Speaking & Debate', difficulty: 'Intermediate' }
        ],
        entranceExamsOrCerts: [
          { name: 'CLAT', type: 'Exam', details: 'Common Law Admission Test for National Law Universities' },
          { name: 'AILET', type: 'Exam', details: 'All India Law Entrance Test (NLU Delhi)' }
        ],
        recommendedDegreesOrCourses: ['B.A. LL.B. / B.BA LL.B. (Integrated 5 Years)'],
        learningResources: [
          { title: 'Lawctopus Legal Education Academy', type: 'Platform', url: 'https://lawctopus.com' }
        ]
      }
    ]
  }
];

// ==========================================
// 7. VOCATIONAL MOCK DATA
// ==========================================
export const MOCK_ROADMAPS_VOCATIONAL: RoadmapPathway[] = [
  {
    id: 'path-voc-1',
    title: 'Renewable Energy & Solar Systems Architect',
    type: 'traditional',
    subtitle: 'Vocational Diploma → Solar System Planner / Smart Grid Installer',
    matchPercentage: 94,
    overview: 'Hands-on training in solar panel engineering, installation configurations, battery cells, and green energy networks.',
    suitabilityReason: 'Matches mechanical aptitude, interest in green energy, and practical troubleshooting skills.',
    entryLevelSalary: '₹5 - 8 LPA ($45,000 - $65,000 / yr)',
    midCareerSalary: '₹12 - 25 LPA ($90,000 - $140,000 / yr)',
    growthOutlook: '+38% High Growth Green Sector',
    stabilityScore: 9.0,
    steps: [
      {
        id: 'voc-1-step-1',
        phaseTitle: 'Phase 1: Practical Electrical Training & Solar Basics',
        timeframe: 'Months 1 - 12',
        description: 'Learn electrical safety, wire systems, AC/DC currents, and photovoltaic panel structure.',
        keyMilestones: [
          'Earn State Electrical Safety License',
          'Complete 2 solar array installation projects under supervision'
        ],
        skillsToAcquire: [
          { name: 'Electrical Safety & Diagnostics', difficulty: 'Intermediate' },
          { name: 'Photovoltaic Assembly', difficulty: 'Intermediate' },
          { name: 'AutoCAD Drafting for Solar', difficulty: 'Beginner' }
        ],
        entranceExamsOrCerts: [
          { name: 'State Licensing Examination', type: 'Exam', details: 'Certified Electrician License' }
        ],
        recommendedDegreesOrCourses: ['Vocational Diploma in Electrical Systems / Renewable Energy'],
        learningResources: [
          { title: 'NABCEP Associate Solar Prep', type: 'Platform', url: 'https://nabcep.org' }
        ]
      }
    ]
  },
  {
    id: 'path-voc-2',
    title: 'Smart Home & Industrial IoT Specialist',
    type: 'tech_skill_first',
    subtitle: 'Hands-on Skill Certification + Micro-controllers + Network Setup',
    matchPercentage: 92,
    overview: 'Rapid skill pathway focused on smart sensors, home automation setups, PLC programming, and security protocols.',
    suitabilityReason: 'Best for early hands-on deployment, field-service work, and IoT integrations.',
    entryLevelSalary: '₹6 - 10 LPA ($50,000 - $75,000 / yr)',
    midCareerSalary: '₹15 - 32 LPA ($100,000 - $160,000 / yr)',
    growthOutlook: '+32% IoT Proliferation Rate',
    stabilityScore: 8.6,
    steps: [
      {
        id: 'voc-2-step-1',
        phaseTitle: 'Phase 1: Micro-controllers & Networking Fundamentals',
        timeframe: 'Months 1 - 6',
        description: 'Learn Arduino programming, smart routers, Zigbee protocols, and sensor mapping.',
        keyMilestones: [
          'Deploy a fully automated smart-lighting setup in 3 rooms',
          'Earn Cisco Certified Network Associate (CCNA) certification'
        ],
        skillsToAcquire: [
          { name: 'Network Configuration & WiFi 6', difficulty: 'Intermediate' },
          { name: 'Micro-controllers (Raspberry Pi/Arduino)', difficulty: 'Intermediate' },
          { name: 'Smart Protocol Configuration', difficulty: 'Beginner' }
        ],
        entranceExamsOrCerts: [
          { name: 'CCNA', type: 'Cert', details: 'Cisco Certified Network Associate' }
        ],
        recommendedDegreesOrCourses: ['Industrial Automation certification program'],
        learningResources: [
          { title: 'Arduino Project Hub Guides', type: 'Free Course', url: 'https://create.arduino.cc/projecthub' }
        ]
      }
    ]
  }
];

// ==========================================
// 8. GLOBAL FALLBACK RESOLVER
// ==========================================
export function getFallbackRoadmaps(stream: string): RoadmapPathway[] {
  const norm = stream.toLowerCase();
  
  if (norm.includes('pcb') || norm.includes('biology') || norm.includes('medical') || norm.includes('health')) {
    return MOCK_ROADMAPS_PCB;
  }
  if (norm.includes('commerce') || norm.includes('finance') || norm.includes('accounting') || norm.includes('business')) {
    return MOCK_ROADMAPS_COMMERCE;
  }
  if (norm.includes('arts') || norm.includes('humanities') || norm.includes('social') || norm.includes('psychology')) {
    return MOCK_ROADMAPS_ARTS;
  }
  if (norm.includes('design') || norm.includes('media') || norm.includes('graphics') || norm.includes('creative') || norm.includes('game')) {
    return MOCK_ROADMAPS_DESIGN;
  }
  if (norm.includes('law') || norm.includes('legal') || norm.includes('clat')) {
    return MOCK_ROADMAPS_LAW;
  }
  if (norm.includes('vocational') || norm.includes('electrical') || norm.includes('practical') || norm.includes('mechanic') || norm.includes('solar') || norm.includes('iot')) {
    return MOCK_ROADMAPS_VOCATIONAL;
  }
  
  return MOCK_ROADMAPS_HIGH_SCHOOL;
}

// ==========================================
// 9. EXPANDED PARENT BRIEFS DATABASE
// ==========================================
export const MOCK_PARENT_BRIEFS: Record<string, ParentBrief> = {
  // PCM / CS
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
      'Encourage focus on 12th grade Physics & Mathematics board/entrance preparation.',
      'Support registration for entrance exams (JEE, CUET, SAT, State CETs).',
      'Provide a reliable laptop (16GB RAM recommended for coding projects).'
    ],
    automationRiskRating: 'Very Low'
  },
  'path-hs-2': {
    pathwayId: 'path-hs-2',
    pathwayTitle: 'Full-Stack Software Engineer & Cloud Architect',
    targetAudience: 'Parent',
    executiveSummary: 'Focuses on practical, skill-first engineering. It aims to get students building software and landing paying internships early via cloud certifications and bootcamp style practices alongside college.',
    whyThisCareer: 'Software engineering forms the operational spine of modern enterprise. Web applications, database networks, and cloud operations require continuous development and optimization.',
    industryStabilityGrowth: 'Standard web development expands at a stable 24% annual rate. Continuous digital transformations ensure that businesses of all sizes require dedicated backend and cloud specialists.',
    financialROI: 'Starting packages average ₹10-18 LPA, scaling to ₹30-60 LPA for senior architects inside 5-6 years.',
    formalDegreeBacking: 'Backed by BCA, B.Sc Computer Science, or B.Tech degrees and global certifications from AWS and Meta.',
    parentActionPlan: [
      'Facilitate access to stable, high-speed broadband internet.',
      'Allow time for weekend open-source contributions and portfolio hackathons.',
      'Support cloud certification registration fees (AWS Architect exam).'
    ],
    automationRiskRating: 'Low'
  },
  'path-hs-3': {
    pathwayId: 'path-hs-3',
    pathwayTitle: 'Quantum Computing & Hardware Innovation',
    targetAudience: 'Parent',
    executiveSummary: 'An elite, interdisciplinary pathway combining Advanced Physics and Computer Hardware to build Next-Gen processing chips and quantum networks.',
    whyThisCareer: 'As standard computers approach physical limitations, quantum systems are the next technological frontier. It requires rare, deep competence in hardware physics.',
    industryStabilityGrowth: 'A highly secure, high-barrier niche. High-tech companies and national agencies fund these units heavily, creating lifetime career routes.',
    financialROI: 'Entry salaries are among the highest: ₹15-28 LPA, growing to ₹45-90 LPA for specialized researchers.',
    formalDegreeBacking: 'Backed by elite Physics Honors or Engineering Physics degrees (IITs, IISc, global labs) and IBM Developer Certifications.',
    parentActionPlan: [
      'Support student interest in advanced mathematics, physics, and matrix algebra.',
      'Encourage enrollment in specialized research internships.',
      'Prepare for higher education pathways (M.Tech or PhD focus).'
    ],
    automationRiskRating: 'Very Low'
  },

  // PCB / Bio
  'path-pcb-1': {
    pathwayId: 'path-pcb-1',
    pathwayTitle: 'Medical Practice & HealthTech Integration',
    targetAudience: 'Parent',
    executiveSummary: 'This pathway combines the prestigious 5.5-year MBBS clinical education with modern digital healthcare tools, preparing the student to be a future-ready medical specialist.',
    whyThisCareer: 'Medical practitioners provide critical diagnostic, surgical, and therapeutic services. Integrating digital medical tools ensures they lead next-generation hospitals and diagnostic centers.',
    industryStabilityGrowth: 'Extremely high stability. Healthcare demand is independent of economic recessions, and global clinical expansion is currently expanding at a steady +22% rate.',
    financialROI: 'Long timeline but highly lucrative. Starting salaries as clinical residents range from ₹9 to ₹15 LPA, expanding to ₹24 to ₹55 LPA upon completing MD postgraduation.',
    formalDegreeBacking: 'Grounded in the MCI/NMC accredited MBBS degree, accessed via the NEET exam, followed by state licensing and NEXT certifications.',
    parentActionPlan: [
      'Provide a distraction-free, quiet environment for rigorous NEET PG/UG studies.',
      'Support registration for national pre-med boards and NEET examinations.',
      'Reassure and support the student during the lengthy 5.5-year MBBS academic timeline.'
    ],
    automationRiskRating: 'Very Low'
  },
  'path-pcb-2': {
    pathwayId: 'path-pcb-2',
    pathwayTitle: 'Bioinformatics & Computational Genomics Analyst',
    targetAudience: 'Parent',
    executiveSummary: 'A fast-growing interdisciplinary career merging biology with computer science, focusing on parsing DNA genomes, vaccine modeling, and molecular research.',
    whyThisCareer: 'Bioinformatics technicians write scripts to filter genomic sequences. This replaces manual lab work, allowing rapid biological research breakthroughs.',
    industryStabilityGrowth: 'Annual sector growth is +28%. High demand in pharma R&D labs, agricultural science firms, and biomedical data facilities.',
    financialROI: 'Strong ROI: Starting salaries of ₹8-14 LPA, expanding to ₹20-45 LPA with 5 years experience.',
    formalDegreeBacking: 'Backed by accredited B.Sc Biotech, B.Tech Bioinformatics, or M.Sc computational biology courses.',
    parentActionPlan: [
      'Support parallel programming courses (Python and data analytics).',
      'Encourage participation in bioinformatics research labs during college.',
      'Invest in standard computing setups to run database modeling programs.'
    ],
    automationRiskRating: 'Very Low'
  },

  // Commerce
  'path-comm-1': {
    pathwayId: 'path-comm-1',
    pathwayTitle: 'Chartered Accountancy & Strategic Audit',
    targetAudience: 'Parent',
    executiveSummary: 'Represents the pinnacle of corporate finance and auditing. Backed by the ICAI, this path offers stellar corporate respect, career stability, and excellent independent advisory options.',
    whyThisCareer: 'Chartered Accountants review balance sheets, file tax returns, and act as primary financial advisors for corporate boards and national entities.',
    industryStabilityGrowth: 'Highest stability. Legal audit compliance is mandatory by corporate law, meaning firms require CAs even during recessions.',
    financialROI: 'Stellar starting salaries of ₹8-15 LPA. Successful CA partners or consultants earn well over ₹22-50 LPA, with uncapped consulting limits.',
    formalDegreeBacking: 'Governed by the Institute of Chartered Accountants of India (ICAI) via Foundation, Intermediate, and Final exams.',
    parentActionPlan: [
      'Acquire standard ICAI study materials and reference guides early.',
      'Support the student during the mandatory 2-year practical articleship training.',
      'Provide emotional support for handling the challenging CA final exams.'
    ],
    automationRiskRating: 'Very Low'
  },
  'path-comm-2': {
    pathwayId: 'path-comm-2',
    pathwayTitle: 'FinTech & Quantitative Risk Analyst',
    targetAudience: 'Parent',
    executiveSummary: 'A modern, tech-enabled commerce path. It integrates investment banking, stock market analytics, algorithmic trade scripts, and blockchain ledger accounting.',
    whyThisCareer: 'Fintech analysts deploy algorithms to manage currency portfolios and evaluate systemic risk, bridging corporate finances with AI systems.',
    industryStabilityGrowth: 'Expanding at +35% annual rate. Highly prioritized by investment banks, digital wallets, and stock trading firms.',
    financialROI: 'Excellent early ROI: Starting ranges are ₹9-16 LPA, growing to ₹25-60 LPA as senior risk officers.',
    formalDegreeBacking: 'Backed by B.BA Finance, B.Com, or B.Sc Finance degrees and official certifications (NISM/CFP/CFA).',
    parentActionPlan: [
      'Encourage parallel certification programs like CFA or NISM Series.',
      'Provide access to standard finance textbooks and algorithmic trade simulators.',
      'Ensure access to a reliable computer system for financial valuation modeling.'
    ],
    automationRiskRating: 'Low'
  },

  // Arts
  'path-arts-1': {
    pathwayId: 'path-arts-1',
    pathwayTitle: 'Clinical Psychology & Cognitive Therapy',
    targetAudience: 'Parent',
    executiveSummary: 'A prestigious, direct healthcare path. It prepares the student to run a private mental health clinic or lead institutional psychiatric care.',
    whyThisCareer: 'Psychologists diagnose cognitive behavioral issues and deploy therapeutic plans. Highly crucial for corporate health and clinical facilities.',
    industryStabilityGrowth: 'Increasing awareness of mental wellness has expanded medical psychology demand by 26% annually.',
    financialROI: 'Starting packages range from ₹5 to ₹9 LPA, scaling to ₹14 to ₹30 LPA as licensed clinical psychologists.',
    formalDegreeBacking: 'Grounded in standard B.A./M.A. Psychology degrees, backed by RCI (Rehabilitation Council of India) license.',
    parentActionPlan: [
      'Prepare for a continuous academic path including B.A., M.A. and specialized licensing.',
      'Help locate accredited clinical internships at local general hospitals.',
      'Support the student in developing strong empathy and active listening skills.'
    ],
    automationRiskRating: 'Very Low'
  },
  'path-arts-2': {
    pathwayId: 'path-arts-2',
    pathwayTitle: 'UX Research & Product Strategy',
    targetAudience: 'Parent',
    executiveSummary: 'Translates social sciences (understanding how groups think) into high-paying tech jobs, helping companies build user-friendly software applications.',
    whyThisCareer: 'User Experience Researchers interview clients, run focus groups, and map user behavior to improve product designs.',
    industryStabilityGrowth: 'As global services move online, user engagement is key, generating a +30% growth rate in research roles.',
    financialROI: 'High ROI: Average starting salary of ₹8-14 LPA, expanding to ₹22-45 LPA for senior strategy leads.',
    formalDegreeBacking: 'Supported by B.A. Sociology, B.A. Psychology, and certifications from Google or design institutes.',
    parentActionPlan: [
      'Support registration for certified UX bootcamps or professional courses.',
      'Provide access to basic design assets and survey analytics toolkits.',
      'Encourage the student to publish case studies and review user research blogs.'
    ],
    automationRiskRating: 'Low'
  },

  // Design
  'path-des-1': {
    pathwayId: 'path-des-1',
    pathwayTitle: 'Interaction & Product UI/UX Design',
    targetAudience: 'Parent',
    executiveSummary: 'Prepares the student to build digital interfaces and visual frameworks for apps and services at design schools.',
    whyThisCareer: 'Designers structure visual hierarchy, colors, button styles, and interactive user maps for mobile and desktop apps.',
    industryStabilityGrowth: '+28% steady sector growth. As consumer apps compete on elegance, visual engineers are highly sought after.',
    financialROI: 'Outstanding ROI: Starts at ₹8-16 LPA, growing to ₹25-55 LPA as design team directors.',
    formalDegreeBacking: 'Acquired via UCEED, NID DAT, or NATA exams, leading to B.Des/M.Des from premier national institutes (IITs, NIDs).',
    parentActionPlan: [
      'Support portfolio coaching and exam registration fees (UCEED/NID).',
      'Provide a graphics-focused laptop or digital drawing tablet (stylus support).',
      'Encourage the student to observe daily digital interfaces and curate design layouts.'
    ],
    automationRiskRating: 'Low'
  },
  'path-des-2': {
    pathwayId: 'path-des-2',
    pathwayTitle: 'Game Art & XR (Augmented / Virtual Reality) Design',
    targetAudience: 'Parent',
    executiveSummary: 'Focuses on 3D virtual modeling, augmented reality visual mapping, and layout rendering for global gaming studios and metaverse services.',
    whyThisCareer: 'XR designers sculpt 3D models and layout VR maps, ensuring smooth immersive experiences in educational apps or games.',
    industryStabilityGrowth: 'Hyper-expansion (+35%) driven by mobile gaming networks, spatial computing headsets, and metaverse architectures.',
    financialROI: 'Excellent fast-track ROI: Starting salaries of ₹7-13 LPA, growing to ₹20-45 LPA as lead game artists.',
    formalDegreeBacking: 'Validated by specialized design diplomas and official game engine certifications (Unity/Unreal).',
    parentActionPlan: [
      'Support certified courses in 3D tools like Blender, Unity, and Maya.',
      'Invest in a graphics-heavy computer setup suitable for rendering 3D graphics.',
      'Encourage participation in local game-jam events and online design portfolios.'
    ],
    automationRiskRating: 'Moderate'
  },

  // Law
  'path-law-1': {
    pathwayId: 'path-law-1',
    pathwayTitle: 'Corporate & Technology Mergers Law',
    targetAudience: 'Parent',
    executiveSummary: 'An elite path in corporate law. It focuses on contract drafting, data privacy, legal audits, and tech company policy regulations.',
    whyThisCareer: 'Corporate Lawyers ensure business operations comply with national laws, negotiate mergers, and draft data privacy disclosures.',
    industryStabilityGrowth: '+20% expansion. Technology regulations are becoming more complex, making tech corporate compliance highly stable.',
    financialROI: 'High starting packages at top corporate firms (₹10-18 LPA), scaling to ₹28-65 LPA as senior legal counsel.',
    formalDegreeBacking: 'Secured via CLAT or AILET entrance examinations, leading to 5-year integrated BA LLB/BBA LLB degrees at National Law Universities.',
    parentActionPlan: [
      'Invest in CLAT test series, legal textbooks, and logical reasoning worksheets.',
      'Encourage public speaking, reading comprehensions, and analytical writing.',
      'Help locate internships at district courts or law firms during college semesters.'
    ],
    automationRiskRating: 'Very Low'
  },

  // Vocational
  'path-voc-1': {
    pathwayId: 'path-voc-1',
    pathwayTitle: 'Renewable Energy & Solar Systems Architect',
    targetAudience: 'Parent',
    executiveSummary: 'A practical, high-demand path focused on green energy. It prepares the student to design, install, and manage solar array systems.',
    whyThisCareer: 'Green energy engineers run power calculations, design solar setups for complexes, and install battery grids.',
    industryStabilityGrowth: 'High growth (+38%) as countries and municipalities push to meet carbon-neutral goals over the next decades.',
    financialROI: 'Strong early ROI: Starting packages of ₹5-8 LPA, growing to ₹12-25 LPA as certified green energy operators.',
    formalDegreeBacking: 'Backed by vocational diplomas, electrical board safety certifications, and certified solar operator licenses.',
    parentActionPlan: [
      'Support registrations for electrical safety and solar training programs.',
      'Provide basic safety equipment and diagnostic toolsets during training.',
      'Locate hands-on apprenticeship opportunities at renewable energy utility firms.'
    ],
    automationRiskRating: 'Very Low'
  },
  'path-voc-2': {
    pathwayId: 'path-voc-2',
    pathwayTitle: 'Smart Home & Industrial IoT Specialist',
    targetAudience: 'Parent',
    executiveSummary: 'Focuses on integrating smart sensors, home automation setups, security configurations, and robotics maintenance.',
    whyThisCareer: 'IoT technicians program micro-controllers (PLC/Arduino) to automate buildings and manage device networks.',
    industryStabilityGrowth: 'IoT systems are expanding at a rapid +32% pace, creating a massive shortage of technicians who can work in the field.',
    financialROI: 'Starting ranges are ₹6-10 LPA, growing to ₹15-32 LPA for senior industrial automation contractors.',
    formalDegreeBacking: 'Validated by technical trade certifications, CCNA networking, and micro-controller coursework.',
    parentActionPlan: [
      'Encourage building home projects (smart lighting, automated gates).',
      'Support Cisco CCNA and PLC programming certification fees.',
      'Invest in basic sensor electronics kits (Arduino/Raspberry Pi) for practice.'
    ],
    automationRiskRating: 'Low'
  }
};
