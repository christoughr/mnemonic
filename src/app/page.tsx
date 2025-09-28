'use client';

import { useState } from 'react';
import { SearchInterface } from '@/components/SearchInterface';
import { AdminPanel } from '@/components/AdminPanel';
import { StatsPanel } from '@/components/StatsPanel';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'search' | 'admin' | 'stats'>('search');

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🧠 AI Knowledge Search
          </h1>
          <p className="text-lg text-gray-600">
            Search across your Slack and Notion with AI-powered answers
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'search'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Search
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'admin'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'stats'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Stats
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'search' && <SearchInterface />}
          {activeTab === 'admin' && <AdminPanel />}
          {activeTab === 'stats' && <StatsPanel />}
        </div>
      </div>
    </main>
  );
}