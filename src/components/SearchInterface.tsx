'use client';

import { useState } from 'react';

interface SearchResult {
  answer: string;
  sources: Array<{
    content: string;
    author: string;
    url: string;
    source: string;
  }>;
  bestExpert: {
    author: string;
    relevance: number;
    slackDmLink: string;
  };
}

export function SearchInterface() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to search. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="space-y-3 sm:space-y-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about your team's knowledge..."
            className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-20 sm:pr-24 text-base sm:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-1 sm:right-2 top-1 sm:top-2 bottom-1 sm:bottom-2 px-3 sm:px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base min-w-[60px] sm:min-w-[80px]"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-6 sm:py-8">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 sm:ml-3 text-gray-600 text-sm sm:text-base">Searching your knowledge base...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
          <p className="text-red-800 text-sm sm:text-base">{error}</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4 sm:space-y-6">
          {/* Answer */}
          <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Answer</h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{result.answer}</p>
          </div>

          {/* Best Expert */}
          {result.bestExpert.author !== 'No expert found' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-2">Best Expert</h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div>
                  <p className="text-blue-800 font-medium text-sm sm:text-base">{result.bestExpert.author}</p>
                  <p className="text-blue-600 text-xs sm:text-sm">
                    Relevance: {Math.round(result.bestExpert.relevance * 100)}%
                  </p>
                </div>
                {result.bestExpert.slackDmLink && (
                  <a
                    href={result.bestExpert.slackDmLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base w-full sm:w-auto text-center"
                  >
                    Ask Expert
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Sources */}
          {result.sources.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Sources</h3>
              <div className="space-y-3 sm:space-y-4">
                {result.sources.map((source, index) => (
                  <div key={index} className="border-l-4 border-gray-200 pl-3 sm:pl-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-1 sm:space-y-0">
                      <span className="text-xs sm:text-sm font-medium text-gray-600">
                        {source.source === 'slack' ? '💬 Slack' : '📝 Notion'} • {source.author}
                      </span>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm"
                      >
                        View Source
                      </a>
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm line-clamp-3">{source.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !result && !error && (
        <div className="text-center py-8 sm:py-12">
          <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🔍</div>
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Start searching your team&apos;s knowledge</h3>
          <p className="text-gray-600 text-sm sm:text-base px-4">
            Ask questions about policies, procedures, or anything your team has discussed.
          </p>
        </div>
      )}
    </div>
  );
}
