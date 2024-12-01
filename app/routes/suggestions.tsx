import { useState } from "react";
import { useLanguage } from "~/contexts/LanguageContext";

interface Suggestion {
  id: string;
  title: string;
  description: string;
  category: 'gameplay' | 'features' | 'events' | 'other';
  status: 'pending' | 'approved' | 'implemented' | 'rejected';
  votes: number;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  comments: number;
}

export default function Suggestions() {
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Suggestion['category']>('gameplay');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('popular');

  return (
    <div className="min-h-screen bg-[url('/minecraft-bg.jpg')] bg-cover bg-center bg-fixed">
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-black/50 to-black/70">
        <div className="container mx-auto px-4 py-24">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-minecraft text-4xl text-emerald-400">
                Community Suggestions
              </h1>
              <p className="mt-2 text-gray-400">
                Help us improve the server by sharing your ideas
              </p>
            </div>

            <button
              onClick={() => setShowSuggestionModal(true)}
              className="minecraft-button bg-emerald-600 hover:bg-emerald-700"
            >
              + New Suggestion
            </button>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              {(['gameplay', 'features', 'events', 'other'] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-3 py-1 text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'text-gray-400 hover:bg-emerald-500/10 hover:text-emerald-400'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular')}
              className="minecraft-border rounded bg-black/50 px-3 py-1 text-sm text-white"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* Suggestions Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((suggestion) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </div>
      </div>

      {/* New Suggestion Modal */}
      {showSuggestionModal && (
        <NewSuggestionModal onClose={() => setShowSuggestionModal(false)} />
      )}
    </div>
  );
}

function SuggestionCard({ suggestion }: { suggestion: Suggestion }) {
  return (
    <div className="minecraft-border group bg-black/50 p-4 transition-all hover:border-emerald-400/30">
      <div className="flex items-start justify-between">
        <div>
          <span className={`rounded-full px-2 py-0.5 text-xs ${getCategoryStyle(suggestion.category)}`}>
            {suggestion.category}
          </span>
          <h3 className="mt-2 font-minecraft text-lg text-white">{suggestion.title}</h3>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-xs ${getStatusStyle(suggestion.status)}`}>
          {suggestion.status}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-400 line-clamp-3">{suggestion.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-emerald-500/20" />
          <span className="text-sm text-gray-400">{suggestion.author.name}</span>
        </div>
        <span className="text-sm text-gray-400">
          {new Date(suggestion.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-800 pt-4">
        <button className="flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300">
          <span>⬆️</span>
          {suggestion.votes} votes
        </button>
        <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-emerald-400">
          <span>💬</span>
          {suggestion.comments} comments
        </button>
      </div>
    </div>
  );
}

function NewSuggestionModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-6 font-minecraft text-2xl text-emerald-400">New Suggestion</h2>
        
        <form className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-gray-400">Title</label>
            <input
              type="text"
              className="minecraft-border w-full bg-black/50 p-2 text-white"
              placeholder="Enter your suggestion title"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">Category</label>
            <select className="minecraft-border w-full bg-black/50 p-2 text-white">
              <option value="gameplay">Gameplay</option>
              <option value="features">Features</option>
              <option value="events">Events</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">Description</label>
            <textarea
              className="minecraft-border min-h-[150px] w-full resize-y bg-black/50 p-2 text-white"
              placeholder="Describe your suggestion in detail..."
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700"
            >
              Submit Suggestion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function getCategoryStyle(category: Suggestion['category']) {
  switch (category) {
    case 'gameplay':
      return 'bg-blue-500/20 text-blue-400';
    case 'features':
      return 'bg-purple-500/20 text-purple-400';
    case 'events':
      return 'bg-yellow-500/20 text-yellow-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
}

function getStatusStyle(status: Suggestion['status']) {
  switch (status) {
    case 'approved':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'implemented':
      return 'bg-blue-500/20 text-blue-400';
    case 'rejected':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-yellow-500/20 text-yellow-400';
  }
}

// Mock data
const suggestions: Suggestion[] = [
  {
    id: '1',
    title: 'Add Custom Enchantments',
    description: 'It would be awesome to have unique enchantments that are exclusive to our server. For example: auto-smelting, multi-jump, or telekinesis.',
    category: 'features',
    status: 'pending',
    votes: 156,
    author: {
      name: 'MinecraftPro123',
    },
    createdAt: '2024-03-15',
    comments: 24,
  },
  // Add more mock suggestions...
]; 