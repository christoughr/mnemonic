'use client';

import { useState } from 'react';
import { useSearchHistory } from '@/hooks/useSearchHistory';

interface SearchHistoryProps {
  onSelectQuery: (query: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function SearchHistory({ onSelectQuery, isOpen, onClose }: SearchHistoryProps) {
  const { history, removeFromHistory, clearHistory } = useSearchHistory();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  if (!isOpen || history.length === 0) return null;

  const handleSelectQuery = (query: string) => {
    onSelectQuery(query);
    onClose();
  };

  const handleClearHistory = () => {
    clearHistory();
    setShowClearConfirm(false);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Recent Searches</h3>
          <div className="flex items-center space-x-2">
            {!showClearConfirm ? (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
            ) : (
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleClearHistory}
                  className="text-xs text-red-600 hover:text-red-700"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="py-1">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 group"
          >
            <button
              onClick={() => handleSelectQuery(item.query)}
              className="flex-1 text-left text-sm text-gray-700 hover:text-gray-900 truncate"
            >
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">🔍</span>
                <span className="truncate">{item.query}</span>
                {item.resultCount && (
                  <span className="text-xs text-gray-500">
                    ({item.resultCount} results)
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {formatTime(item.timestamp)}
              </div>
            </button>
            <button
              onClick={() => removeFromHistory(item.id)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 p-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
