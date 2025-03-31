import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Store - QWMC" },
    { name: "description", content: "Support QWMC by purchasing ranks and perks" },
  ];
};

interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'ranks' | 'cosmetics' | 'boosters' | 'keys';
  features: string[];
  popular?: boolean;
}

const STORE_ITEMS: StoreItem[] = [
  {
    id: "vip-rank",
    name: "VIP Rank",
    description: "Get exclusive perks and features with VIP rank",
    price: 9.99,
    category: 'ranks',
    features: [
      "Colored name in chat",
      "Access to /fly command",
      "2 home locations",
      "Priority queue access"
    ],
    popular: true
  },
  {
    id: "mvp-rank",
    name: "MVP Rank",
    description: "Premium features and exclusive benefits",
    price: 19.99,
    category: 'ranks',
    features: [
      "All VIP features",
      "Custom join messages",
      "5 home locations",
      "Access to particle effects",
      "Priority support"
    ]
  },
  {
    id: "particle-pack",
    name: "Particle Effects",
    description: "Show off with cool particle effects",
    price: 4.99,
    category: 'cosmetics',
    features: [
      "Hearts particle effect",
      "Flame trails",
      "Rainbow spiral",
      "Custom combinations"
    ]
  },
  {
    id: "xp-booster",
    name: "XP Booster",
    description: "2x XP for 24 hours",
    price: 2.99,
    category: 'boosters',
    features: [
      "Double XP gain",
      "24-hour duration",
      "Works with all activities",
      "Stackable with other boosters"
    ]
  }
];

const CATEGORIES = {
  ranks: {
    name: "Ranks",
    icon: "👑",
    description: "Unlock exclusive features and perks"
  },
  cosmetics: {
    name: "Cosmetics",
    icon: "✨",
    description: "Stand out with unique visual effects"
  },
  boosters: {
    name: "Boosters",
    icon: "🚀",
    description: "Accelerate your progress"
  },
  keys: {
    name: "Crate Keys",
    icon: "🗝️",
    description: "Open special crates for rewards"
  }
} as const;

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof CATEGORIES | 'all'>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'popular'>('popular');

  const filteredItems = STORE_ITEMS
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900/50 to-black/50">
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-minecraft text-5xl text-emerald-400 mb-4">
            QWMC Store
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Support the server and get awesome perks to enhance your gameplay experience
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full font-minecraft text-sm transition-all
              ${selectedCategory === 'all' 
                ? 'bg-emerald-500 text-white' 
                : 'bg-black/30 text-gray-400 hover:bg-black/50 hover:text-emerald-400'
              }`}
          >
            All Items
          </button>
          {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-minecraft text-sm transition-all
                ${selectedCategory === category 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-black/30 text-gray-400 hover:bg-black/50 hover:text-emerald-400'
                }`}
            >
              <span>{CATEGORIES[category].icon}</span>
              {CATEGORIES[category].name}
            </button>
          ))}
        </div>

        {/* Sorting and Results Count */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 px-4">
          <p className="text-gray-400">
            Showing {filteredItems.length} items
          </p>
          <div className="flex items-center gap-3">
            <span className="text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-black/30 border border-gray-800 rounded-lg px-4 py-2 text-gray-300
                focus:outline-none focus:border-emerald-500"
            >
              <option value="popular">Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Store Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="group relative rounded-xl border border-gray-800 bg-black/30 p-8
                transition-all duration-300 hover:border-emerald-500/30 hover:bg-black/50"
            >
              {item.popular && (
                <div className="absolute -top-3 -right-3 bg-emerald-500 text-white px-4 py-1 
                  rounded-full text-sm font-minecraft animate-pulse">
                  Popular
                </div>
              )}
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="text-2xl" title={CATEGORIES[item.category].name}>
                  {CATEGORIES[item.category].icon}
                </span>
              </div>

              <div className="text-center">
                <h3 className="font-minecraft text-2xl text-white mb-3 mt-4">
                  {item.name}
                </h3>
                <p className="text-gray-400 mb-6">
                  {item.description}
                </p>
                
                <div className="space-y-3 mb-8 text-left">
                  {item.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-300">
                      <span className="text-emerald-400 text-lg">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-800">
                  <span className="text-3xl font-minecraft text-emerald-400">
                    ${item.price}
                  </span>
                  <button 
                    className="minecraft-button bg-emerald-600 hover:bg-emerald-700 
                      transition-all duration-300 transform group-hover:scale-105"
                    onClick={() => window.open('https://store.qwmc.net', '_blank')}
                  >
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section - Updated styling */}
        <div className="mt-24 rounded-xl border border-gray-800 bg-black/30 p-12">
          <h2 className="font-minecraft text-3xl text-emerald-400 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How do I receive my purchase?",
                answer: "After completing your purchase, rewards are automatically applied to your account within 5 minutes."
              },
              {
                question: "Are purchases permanent?",
                answer: "Yes, all rank purchases and cosmetics are permanent additions to your account."
              },
              {
                question: "Need help with a purchase?",
                answer: "Contact our support team through Discord or create a support ticket for assistance."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="rounded-lg border border-gray-800 bg-black/30 p-6 
                  transition-all hover:border-emerald-500/30"
              >
                <h3 className="font-minecraft text-white text-lg mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 