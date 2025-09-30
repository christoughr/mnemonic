import React from 'react';

interface SearchFiltersProps {
  filters: {
    source: string[];
    dateRange: string;
    author: string;
  };
  onFiltersChange: (filters: { source: string[]; dateRange: string; author: string }) => void;
  availableSources: string[];
  availableAuthors: string[];
}

export function SearchFilters({ 
  filters, 
  onFiltersChange, 
  availableSources, 
  availableAuthors 
}: SearchFiltersProps) {
  const handleSourceChange = (source: string, checked: boolean) => {
    const newSources = checked 
      ? [...filters.source, source]
      : filters.source.filter(s => s !== source);
    
    onFiltersChange({ ...filters, source: newSources });
  };

  const handleDateRangeChange = (dateRange: string) => {
    onFiltersChange({ ...filters, dateRange });
  };

  const handleAuthorChange = (author: string) => {
    onFiltersChange({ ...filters, author });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Filters</h3>
      
      {/* Source Filter */}
      <div>
        <label className="text-xs font-medium text-gray-700 mb-2 block">Sources</label>
        <div className="space-y-2">
          {availableSources.map(source => (
            <label key={source} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.source.includes(source)}
                onChange={(e) => handleSourceChange(source, e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">{source}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Date Range Filter */}
      <div>
        <label className="text-xs font-medium text-gray-700 mb-2 block">Date Range</label>
        <select
          value={filters.dateRange}
          onChange={(e) => handleDateRangeChange(e.target.value)}
          className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Author Filter */}
      <div>
        <label className="text-xs font-medium text-gray-700 mb-2 block">Author</label>
        <select
          value={filters.author}
          onChange={(e) => handleAuthorChange(e.target.value)}
          className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Authors</option>
          {availableAuthors.map(author => (
            <option key={author} value={author}>{author}</option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => onFiltersChange({ source: [], dateRange: 'all', author: 'all' })}
        className="w-full text-xs text-gray-600 hover:text-gray-800 underline"
      >
        Clear All Filters
      </button>
    </div>
  );
}
