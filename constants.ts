import { Product } from './types';

export const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/test_eVq5kCfUW55C0LXduf4ZG00";

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Freelance OS 2.0 (Notion)',
    description: 'The ultimate dashboard for client management, invoices, and AI project planning.',
    price: 49,
    image: 'https://picsum.photos/400/300?grayscale&blur=2',
    tags: ['Notion', 'System']
  },
  {
    id: 'p2',
    title: '2025 AI Content Workflow',
    description: 'A complete system of prompts and automations to scale your content marketing.',
    price: 39,
    image: 'https://picsum.photos/400/301?grayscale&blur=2',
    tags: ['AI', 'Marketing']
  },
  {
    id: 'p3',
    title: 'Niche Community Builder',
    description: 'Guide + Templates for launching a profitable paid community in 2025.',
    price: 59,
    image: 'https://picsum.photos/400/302?grayscale&blur=2',
    tags: ['Community', 'Guide']
  },
  {
    id: 'p4',
    title: 'Digital Product Launchpad',
    description: 'Checklists and roadmaps to go from idea to first sale in 7 days.',
    price: 29,
    image: 'https://picsum.photos/400/303?grayscale&blur=2',
    tags: ['Business', 'Starter']
  }
];

export const AGENT_PROMPTS = {
  BOOK_OUTLINE: `Generate a professional, clean 7-chapter outline for a beginner eBook titled 'The Absolute Beginner's Guide to Stress-Free Small Business Bookkeeping.' 
  
  Structure requirements:
  - Cover basic income/expense tracking.
  - Essential tax compliance for small startups.
  - A final actionable checklist.
  - Tone: Professional, encouraging, and actionable.
  
  Output format: Markdown with clear headers.`,
  
  PRODUCT_IDEAS: `Based on the latest 2025 market analysis, generate 10 "ready-to-launch" digital product ideas.
  
  Use this context for high-performing trends:
  - **Online Courses**: "AI for small business", "Freelance writing basics" (Micro-learning).
  - **Templates**: Notion dashboards for specific niches (e.g., "Budget planner for college students", "Content Calendar for Realtors").
  - **Stock Media**: Authentic B-roll, Lo-fi background music packs.
  - **AI Tools**: Prompt packs for specific industries.
  
  Output as a structured Markdown table with columns: 
  | Product Idea | Target Niche | Why It Sells (2025) | Est. Price |`,
  
  MARKETING_STRATEGY: `Act as a senior growth hacker. Generate a "Nonstop Sales" launch sequence for a digital product in 2025.
  
  Include:
  1. **The Hook**: A controversial or high-curiosity social media post (LinkedIn/X style).
  2. **The Funnel**: A simple low-ticket to high-ticket value ladder.
  3. **The Scarcity**: A 48-hour bonus offer idea.
  
  Output as clean Markdown.`
};