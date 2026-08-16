export type Post = {
  id: number;
  author: {
    name: string;
    headline: string;
    avatar: string;
  };
  content: string;
  image?: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  time: string;
  reactions: number;
  comments: number;
  reposts: number;
};

export const posts: Post[] = [
  {
    id: 1,
    author: {
      name: "Ayesha Khan",
      headline: "AI Product Manager · PIAIC",
      avatar: "https://i.pravatar.cc/100?img=47",
    },
    content:
      "Just shipped the v2 of our agentic workflow engine! We cut task turnaround time by 40% by moving from sequential prompts to a proper orchestrator with memory. The biggest lesson: instrument everything from day one.",
    image: {
      src: "https://picsum.photos/seed/engine/600/450",
      width: 600,
      height: 450,
      alt: "Agentic workflow engine dashboard",
    },
    time: "2h",
    reactions: 1240,
    comments: 87,
    reposts: 156,
  },
  {
    id: 2,
    author: {
      name: "Bilal Ahmed",
      headline: "Full-Stack Engineer · Cloud Native",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    content:
      "Hot take: TypeScript is not optional anymore for serious teams. The cost of 'it works on my machine' JS far outweighs the learning curve. Your future self debugging at 2am will thank you.",
    time: "5h",
    reactions: 892,
    comments: 143,
    reposts: 45,
  },
  {
    id: 3,
    author: {
      name: "Fatima Noor",
      headline: "Data Scientist · ML Engineer",
      avatar: "https://i.pravatar.cc/100?img=32",
    },
    content:
      "Visualizing 12 weeks of my learning journey in one chart. Compound interest works for skills too 📈",
    image: {
      src: "https://picsum.photos/seed/chart/600/750",
      width: 600,
      height: 750,
      alt: "Learning progress chart",
    },
    time: "1d",
    reactions: 2056,
    comments: 92,
    reposts: 210,
  },
  {
    id: 4,
    author: {
      name: "Hamza Tariq",
      headline: "DevOps Architect · Kubernetes",
      avatar: "https://i.pravatar.cc/100?img=68",
    },
    content:
      "Interviewed 30 engineers this quarter. The single biggest differentiator? Candidates who can explain why their system failed and how they diagnosed it. Failure postmortems > success stories.",
    time: "3h",
    reactions: 1640,
    comments: 218,
    reposts: 98,
  },
  {
    id: 5,
    author: {
      name: "Zainab Sheikh",
      headline: "UX Designer · Design Systems",
      avatar: "https://i.pravatar.cc/100?img=45",
    },
    content:
      "Design is not just what it looks like — it's how it works. Just ran a usability test that overturned 3 assumptions our team held for months. Talk to users, not to spreadsheets.",
    image: {
      src: "https://picsum.photos/seed/design/600/400",
      width: 600,
      height: 400,
      alt: "UX design wireframes",
    },
    time: "8h",
    reactions: 731,
    comments: 64,
    reposts: 33,
  },
  {
    id: 6,
    author: {
      name: "Omar Farooq",
      headline: "Startup Founder · EdTech",
      avatar: "https://i.pravatar.cc/100?img=59",
    },
    content:
      "Year one recap: 14 customers, 3 pivots, 0 regrets. The pivot that saved us was listening to our earliest users and rebuilding the onboarding flow. Metrics lie; conversations don't.",
    image: {
      src: "https://picsum.photos/seed/startup/600/800",
      width: 600,
      height: 800,
      alt: "Startup team whiteboard session",
    },
    time: "12h",
    reactions: 3102,
    comments: 176,
    reposts: 342,
  },
  {
    id: 7,
    author: {
      name: "Sarah Malik",
      headline: "Frontend Lead · React Specialist",
      avatar: "https://i.pravatar.cc/100?img=20",
    },
    content:
      "We reduced our bundle size by 58% this sprint. What worked: route-level code splitting, tree-shaking icons, and deleting dead code mercilessly. Performance is a feature, not an afterthought.",
    time: "4h",
    reactions: 980,
    comments: 51,
    reposts: 76,
  },
  {
    id: 8,
    author: {
      name: "Usman Raza",
      headline: "Blockchain Engineer · Web3",
      avatar: "https://i.pravatar.cc/100?img=53",
    },
    content: "The cloud is just someone else's computer, but done right it's magic.",
    time: "6h",
    reactions: 415,
    comments: 22,
    reposts: 18,
  },
  {
    id: 9,
    author: {
      name: "Hira Imran",
      headline: "Product Owner · Agile Coach",
      avatar: "https://i.pravatar.cc/100?img=26",
    },
    content:
      "Stop the sprints to ship features nobody asked for. We switched to outcome-based planning and the team has never been happier. Velocity without direction is just busywork.",
    image: {
      src: "https://picsum.photos/seed/agile/600/500",
      width: 600,
      height: 500,
      alt: "Agile planning board",
    },
    time: "1d",
    reactions: 1180,
    comments: 130,
    reposts: 88,
  },
  {
    id: 10,
    author: {
      name: "Ali Hassan",
      headline: "Security Researcher · OSCP",
      avatar: "https://i.pravatar.cc/100?img=15",
    },
    content:
      "If you build software, you're a security person whether you like it or not. Start with the OWASP Top 10, not with fancy tooling. The cheapest vulnerability is the one you never ship.",
    time: "9h",
    reactions: 1530,
    comments: 117,
    reposts: 205,
  },
  {
    id: 11,
    author: {
      name: "Mariam Qureshi",
      headline: "MLOps Engineer · LLMs",
      avatar: "https://i.pravatar.cc/100?img=40",
    },
    content:
      "Prompt engineering tip: give the model a persona AND a format. Works better than raw instruction for structured outputs. Saved our eval scores from 0.78 to 0.86 across 3 benchmarks.",
    image: {
      src: "https://picsum.photos/seed/llm/600/380",
      width: 600,
      height: 380,
      alt: "LLM prompt evaluation results",
    },
    time: "2d",
    reactions: 2210,
    comments: 148,
    reposts: 267,
  },
  {
    id: 12,
    author: {
      name: "Daniyal Baig",
      headline: "Mobile Developer · Flutter",
      avatar: "https://i.pravatar.cc/100?img=11",
    },
    content:
      "Shipped to production 3 times this week with zero rollbacks. The secret: small PRs, strong review culture, and tests that actually test behavior instead of implementation.",
    time: "7h",
    reactions: 645,
    comments: 38,
    reposts: 29,
  },
];