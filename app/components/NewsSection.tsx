import { useState } from "react";
import type { News } from "~/types/news";

import { Link } from "@remix-run/react";
import { useState } from "react";

export function NewsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="rounded-lg border border-gray-800 bg-black/50 p-6">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-minecraft text-3xl text-emerald-400">Latest News</h2>
        <div className="flex gap-2">
          {['all', 'event', 'update', 'maintenance'].map((type) => (
            <button
              key={type}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all
                ${type === 'all' ? 'bg-emerald-500/20 text-emerald-400' : getTypeStyles(type as News['type'])}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        {news.map((one_news) => (
          <div 
            key={one_news.id}
            className={`relative rounded-lg border transition-all duration-200
              ${expandedId === one_news.id 
                ? 'border-emerald-400/50 bg-black/50' 
                : 'border-gray-800 bg-black/30 hover:border-emerald-400/30'}`}
          >
            {one_news.priority && (
              <div className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                Important
              </div>
            )}
            
            <div 
              className="cursor-pointer p-4"
              onClick={() => setExpandedId(expandedId === one_news.id ? null : one_news.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs ${getTypeStyles(one_news.type)}`}>
                    {one_news.type}
                  </span>
                  <h3 className="font-minecraft text-lg text-white">{one_news.title}</h3>
                </div>
                <span className="text-sm text-gray-400">{formatDate(one_news.date)}</span>
              </div>
              
              <div className={`mt-2 ${expandedId === one_news.id ? '' : 'line-clamp-2'}`}>
                {one_news.image && expandedId === one_news.id && (
                  <img 
                    src={one_news.image} 
                    alt={one_news.title}
                    className="mb-4 rounded-lg"
                  />
                )}
                <p className="text-gray-300">{one_news.content}</p>
              </div>
              
              <div className="mt-2 text-sm text-emerald-400">
                {expandedId === one_news.id ? 'Show less' : 'Read more'}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Link 
        to="/news"
        className="mt-6 block text-center font-minecraft text-sm text-emerald-400 transition-colors hover:text-emerald-300"
      >
        View All News →
      </Link>
    </div>
  );
}

function getTypeStyles(type: News['type']) {
  switch (type) {
    case 'update':
      return 'bg-blue-500/20 text-blue-400';
    case 'event':
      return 'bg-purple-500/20 text-purple-400';
    case 'maintenance':
      return 'bg-yellow-500/20 text-yellow-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(date);
}

// Enhanced mock data
const news: News[] = [
  {
    id: '1',
    title: 'Summer Event Starting Soon!',
    content: 'Get ready for our biggest summer event yet! Starting next week, join us for amazing rewards, unique challenges, and limited-time cosmetics. Complete special quests to earn exclusive summer-themed items and participate in building contests with incredible prizes. Don\'t miss out on this exciting event!',
    date: '2024-03-15',
    type: 'event',
    image: '/summer-event.jpg',
    priority: true
  },
  {
    id: '2',
    title: 'Server Maintenance Notice',
    content: 'Scheduled maintenance on March 20th, 2-4 AM UTC. All servers will be temporarily offline while we implement important performance improvements and security updates. We appreciate your patience!',
    date: '2024-03-14',
    type: 'maintenance'
  },
  {
    id: '3',
    title: 'New Survival+ Game Mode Released',
    content: 'Experience Minecraft like never before with our new Survival+ game mode! Featuring custom enchantments, special abilities, and unique challenges. Discover new crafting recipes and explore enhanced world generation.',
    date: '2024-03-12',
    type: 'update',
    image: '/survival-plus.jpg'
  },
  {
    id: '4',
    title: 'Weekend Double XP Event',
    content: 'This weekend only: earn double XP across all game modes! Perfect time to level up your skills and unlock new abilities.',
    date: '2024-03-10',
    type: 'event'
  },
  {
    id: '1',
    title: 'Summer Event Starting Soon!',
    content: 'Get ready for our biggest summer event yet! Starting next week, join us for amazing rewards, unique challenges, and limited-time cosmetics. Complete special quests to earn exclusive summer-themed items and participate in building contests with incredible prizes. Don\'t miss out on this exciting event!',
    date: '2024-03-15',
    type: 'event',
    image: '/summer-event.jpg',
    priority: true
  },
  {
    id: '2',
    title: 'Server Maintenance Notice',
    content: 'Scheduled maintenance on March 20th, 2-4 AM UTC. All servers will be temporarily offline while we implement important performance improvements and security updates. We appreciate your patience!',
    date: '2024-03-14',
    type: 'maintenance'
  },
  {
    id: '3',
    title: 'New Survival+ Game Mode Released',
    content: 'Experience Minecraft like never before with our new Survival+ game mode! Featuring custom enchantments, special abilities, and unique challenges. Discover new crafting recipes and explore enhanced world generation.',
    date: '2024-03-12',
    type: 'update',
    image: '/survival-plus.jpg'
  },
  {
    id: '4',
    title: 'Weekend Double XP Event',
    content: 'This weekend only: earn double XP across all game modes! Perfect time to level up your skills and unlock new abilities.',
    date: '2024-03-10',
    type: 'event'
  }
]; 