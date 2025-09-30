'use client';

import { useState, useEffect } from 'react';
import { StatsSkeleton } from './LoadingSkeleton';

interface KnowledgeStats {
  totalItems: number;
  slackItems: number;
  notionItems: number;
  lastUpdated: string;
}

export function StatsPanel() {
  const [stats, setStats] = useState<KnowledgeStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        setError('Failed to fetch stats');
      }
    } catch (err) {
      setError('Failed to fetch stats');
      console.error('Stats fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return <StatsSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
        <p className="text-red-800 text-sm sm:text-base">{error}</p>
        <button
          onClick={fetchStats}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm sm:text-base"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
        <p className="text-gray-600 text-sm sm:text-base">No stats available</p>
      </div>
    );
  }

  const slackPercentage = stats.totalItems > 0 ? Math.round((stats.slackItems / stats.totalItems) * 100) : 0;
  const notionPercentage = stats.totalItems > 0 ? Math.round((stats.notionItems / stats.totalItems) * 100) : 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Knowledge Base Stats</h2>
        <p className="text-gray-600 text-sm sm:text-base">Overview of your team&apos;s knowledge repository</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Total Items */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.totalItems.toLocaleString()}</p>
            </div>
            <div className="text-2xl sm:text-3xl">📚</div>
          </div>
        </div>

        {/* Slack Items */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Slack Messages</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">{stats.slackItems.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{slackPercentage}% of total</p>
            </div>
            <div className="text-2xl sm:text-3xl">💬</div>
          </div>
        </div>

        {/* Notion Items */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Notion Pages</p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-600">{stats.notionItems.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{notionPercentage}% of total</p>
            </div>
            <div className="text-2xl sm:text-3xl">📝</div>
          </div>
        </div>
      </div>

      {/* Distribution Chart */}
      {stats.totalItems > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Content Distribution</h3>
          <div className="space-y-2 sm:space-y-3">
            <div>
              <div className="flex justify-between text-xs sm:text-sm mb-1">
                <span className="text-gray-600">Slack Messages</span>
                <span className="text-gray-900">{stats.slackItems} ({slackPercentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${slackPercentage}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs sm:text-sm mb-1">
                <span className="text-gray-600">Notion Pages</span>
                <span className="text-gray-900">{stats.notionItems} ({notionPercentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${notionPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Last Updated</h3>
        <p className="text-gray-600 text-sm sm:text-base">
          {formatDate(stats.lastUpdated)}
        </p>
        <button
          onClick={fetchStats}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          Refresh Stats
        </button>
      </div>

      {/* Empty State */}
      {stats.totalItems === 0 && (
        <div className="bg-gray-50 rounded-lg p-6 sm:p-8 text-center">
          <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📊</div>
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No data yet</h3>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Start by ingesting data from Slack and Notion in the Admin panel.
          </p>
          <a
            href="#admin"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Go to Admin Panel
          </a>
        </div>
      )}
    </div>
  );
}
