'use client';

import { useState } from 'react';

interface DemoResult {
  question: string;
  answer: string;
  sources: string[];
  expert: string;
}

const DEMO_DATA: DemoResult[] = [
  {
    question: "How do we handle customer onboarding?",
    answer: "Our customer onboarding process follows a 3-step approach: 1) Initial welcome call within 24 hours, 2) Setup of their workspace with pre-configured templates, and 3) 30-day check-in to ensure success. The process is documented in our Notion workspace and typically takes 2-3 weeks to complete.",
    sources: ["Notion: Customer Onboarding Guide", "Slack: #customer-success", "Notion: Process Documentation"],
    expert: "Sarah Chen (Customer Success Lead)"
  },
  {
    question: "What's our pricing strategy for enterprise clients?",
    answer: "For enterprise clients, we offer custom pricing starting at $50/user/month with volume discounts. Key features include: dedicated support, custom integrations, advanced analytics, and SLA guarantees. We typically negotiate 12-24 month contracts with enterprise clients.",
    sources: ["Slack: #sales-team", "Notion: Pricing Strategy", "Slack: #enterprise-deals"],
    expert: "Mike Rodriguez (VP of Sales)"
  },
  {
    question: "How do we handle security incidents?",
    answer: "Our security incident response follows a 4-step process: 1) Immediate assessment and containment, 2) Notification to security team and stakeholders, 3) Investigation and root cause analysis, and 4) Post-incident review and prevention measures. All incidents are logged in our security dashboard.",
    sources: ["Notion: Security Playbook", "Slack: #security-alerts", "Notion: Incident Response"],
    expert: "Alex Kim (Security Engineer)"
  }
];

export function DemoInterface() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<DemoResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Find best matching demo result
    const bestMatch = DEMO_DATA.find(item => 
      item.question.toLowerCase().includes(query.toLowerCase()) ||
      item.answer.toLowerCase().includes(query.toLowerCase())
    ) || DEMO_DATA[Math.floor(Math.random() * DEMO_DATA.length)];
    
    setResult(bestMatch);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          🚀 Try Our AI Knowledge Search
        </h2>
        
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about your team's knowledge... (e.g., 'How do we handle customer onboarding?')"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 pr-12"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="text-gray-400 mt-2">Searching through your knowledge base...</p>
          </div>
        )}

        {result && !isLoading && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Answer:</h3>
              <p className="text-gray-300 leading-relaxed">{result.answer}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">📚 Sources:</h3>
                <ul className="space-y-2">
                  {result.sources.map((source, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {source}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">👤 Expert:</h3>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-semibold">
                      {result.expert.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{result.expert}</p>
                    <p className="text-gray-400 text-sm">Click to message on Slack</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setResult(null);
                  setQuery('');
                }}
                className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Try Another Question
              </button>
            </div>
          </div>
        )}

        {!result && !isLoading && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <p className="text-lg font-medium text-white mb-2">Ready to search your knowledge?</p>
              <p className="text-sm text-gray-400">Try asking about processes, policies, or team expertise</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {DEMO_DATA.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(item.question)}
                  className="text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  <p className="text-white text-sm font-medium">{item.question}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
