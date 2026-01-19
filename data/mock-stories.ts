import { formatTimeAgo } from '@/utils/time-format';

export interface Story {
  id: string;
  title: string;
  author: string;
  points: number;
  commentCount: number;
  timeAgo: string;
  timestamp: Date;
}

// Generate mock stories with realistic HackerNews-style data
const now = new Date();

export const mockStories: Story[] = [
  {
    id: '1',
    title: 'Show HN: Building a new type of database for real-time analytics',
    author: 'dbengineer',
    points: 342,
    commentCount: 89,
    timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
    timeAgo: formatTimeAgo(new Date(now.getTime() - 2 * 60 * 60 * 1000)),
  },
  {
    id: '2',
    title: 'The future of AI: What we learned from GPT-4',
    author: 'aifuture',
    points: 521,
    commentCount: 156,
    timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000), // 5 hours ago
    timeAgo: formatTimeAgo(new Date(now.getTime() - 5 * 60 * 60 * 1000)),
  },
  {
    id: '3',
    title: 'Why we switched from React to Vue (and back again)',
    author: 'frameworkdev',
    points: 287,
    commentCount: 203,
    timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    timeAgo: formatTimeAgo(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)),
  },
  {
    id: '4',
    title: 'The complete guide to system design interviews',
    author: 'interviewprep',
    points: 894,
    commentCount: 312,
    timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    timeAgo: formatTimeAgo(new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)),
  },
  {
    id: '5',
    title: 'How we reduced our AWS bill by 80%',
    author: 'costoptimizer',
    points: 456,
    commentCount: 127,
    timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
    timeAgo: formatTimeAgo(new Date(now.getTime() - 6 * 60 * 60 * 1000)),
  },
  {
    id: '6',
    title: 'Building a compiler from scratch in Rust',
    author: 'rustcompiler',
    points: 678,
    commentCount: 234,
    timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    timeAgo: formatTimeAgo(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)),
  },
  {
    id: '7',
    title: 'The hidden costs of microservices architecture',
    author: 'architect',
    points: 389,
    commentCount: 178,
    timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
    timeAgo: formatTimeAgo(new Date(now.getTime() - 4 * 60 * 60 * 1000)),
  },
  {
    id: '8',
    title: 'What I learned from building a startup in 2024',
    author: 'founder2024',
    points: 234,
    commentCount: 95,
    timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
    timeAgo: formatTimeAgo(new Date(now.getTime() - 1 * 60 * 60 * 1000)),
  },
];
