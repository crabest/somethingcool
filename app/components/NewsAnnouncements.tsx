import { Link } from "@remix-run/react";
import { useState } from "react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'update' | 'event' | 'maintenance' | 'general';
  image?: string;
  priority?: boolean;
}

export function NewsAnnouncements() {
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
                ${type === 'all' ? 'bg-emerald-500/20 text-emerald-400' : getTypeStyles(type as Announcement['type'])}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div 
            key={announcement.id}
            className={`relative rounded-lg border transition-all duration-200
              ${expandedId === announcement.id 
                ? 'border-emerald-400/50 bg-black/50' 
                : 'border-gray-800 bg-black/30 hover:border-emerald-400/30'}`}
          >
            {announcement.priority && (
              <div className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                Important
              </div>
            )}
            
            <div 
              className="cursor-pointer p-4"
              onClick={() => setExpandedId(expandedId === announcement.id ? null : announcement.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs ${getTypeStyles(announcement.type)}`}>
                    {announcement.type}
                  </span>
                  <h3 className="font-minecraft text-lg text-white">{announcement.title}</h3>
                </div>
                <span className="text-sm text-gray-400">{formatDate(announcement.date)}</span>
              </div>
              
              <div className={`mt-2 ${expandedId === announcement.id ? '' : 'line-clamp-2'}`}>
                {announcement.image && expandedId === announcement.id && (
                  <img 
                    src={announcement.image} 
                    alt={announcement.title}
                    className="mb-4 rounded-lg"
                  />
                )}
                <p className="text-gray-300">{announcement.content}</p>
              </div>
              
              <div className="mt-2 text-sm text-emerald-400">
                {expandedId === announcement.id ? 'Show less' : 'Read more'}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Link 
        to="/announcements"
        className="mt-6 block text-center font-minecraft text-sm text-emerald-400 transition-colors hover:text-emerald-300"
      >
        View All Announcements →
      </Link>
    </div>
  );
}

function getTypeStyles(type: Announcement['type']) {
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
const announcements: Announcement[] = [
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