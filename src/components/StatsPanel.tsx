'use client';

import { useState, useEffect } from 'react';

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
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading stats...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-800">{error}</p>
        <button
          onClick={fetchStats}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-gray-50 rounded-lg p-6">
        <p className="text-gray-600">No stats available</p>
      </div>
    );
  }

  const slackPercentage = stats.totalItems > 0 ? Math.round((stats.slackItems / stats.totalItems) * 100) : 0;
  const notionPercentage = stats.totalItems > 0 ? Math.round((stats.notionItems / stats.totalItems) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Knowledge Base Stats</h2>
        <p className="text-gray-600">Overview of your team&apos;s knowledge repository</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Items */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalItems.toLocaleString()}</p>
            </div>
            <div className="text-3xl">📚</div>
          </div>
        </div>

        {/* Slack Items */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Slack Messages</p>
              <p className="text-3xl font-bold text-green-600">{stats.slackItems.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{slackPercentage}% of total</p>
            </div>
            <div className="text-3xl">💬</div>
          </div>
        </div>

        {/* Notion Items */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Notion Pages</p>
              <p className="text-3xl font-bold text-purple-600">{stats.notionItems.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{notionPercentage}% of total</p>
            </div>
            <div className="text-3xl">📝</div>
          </div>
        </div>
      </div>

      {/* Distribution Chart */}
      {stats.totalItems > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Distribution</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
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
              <div className="flex justify-between text-sm mb-1">
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
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Last Updated</h3>
        <p className="text-gray-600">
          {formatDate(stats.lastUpdated)}
        </p>
        <button
          onClick={fetchStats}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          Refresh Stats
        </button>
      </div>

      {/* Empty State */}
      {stats.totalItems === 0 && (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No data yet</h3>
          <p className="text-gray-600 mb-4">
            Start by ingesting data from Slack and Notion in the Admin panel.
          </p>
          <a
            href="#admin"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Admin Panel
          </a>
        </div>
      )}
    </div>
  );
}
