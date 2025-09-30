'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SearchInterface } from '@/components/SearchInterface';
import { AdminPanel } from '@/components/AdminPanel';
import { StatsPanel } from '@/components/StatsPanel';
import { ProductHuntLanding } from '@/components/ProductHuntLanding';
import { DemoInterface } from '@/components/DemoInterface';
import { InvestorDashboard } from '@/components/InvestorDashboard';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'search' | 'admin' | 'stats' | 'demo' | 'investor'>('search');
  const [showApp, setShowApp] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Check for demo parameter
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('demo') === 'true') {
      setShowApp(true);
      setActiveTab('demo');
    }
  }, []);

  if (!showApp) {
    return <ProductHuntLanding />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* App Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full px-4 py-2 sm:py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              <button
                onClick={() => setShowApp(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors text-xs sm:text-sm lg:text-base"
              >
                ← Back
              </button>
              <div className="h-3 sm:h-4 lg:h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-white rounded-full"></div>
                </div>
                <span className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg">mnemonic.fyi</span>
              </div>
            </div>
            <div className="hidden sm:flex space-x-4 sm:space-x-6 lg:space-x-8">
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors text-xs sm:text-sm lg:text-base">About</Link>
              <Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors text-xs sm:text-sm lg:text-base">Features</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors text-xs sm:text-sm lg:text-base">Contact</Link>
            </div>
            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-300 p-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {showMobileMenu && (
          <div className="sm:hidden bg-white border-t border-gray-200 px-4 py-3">
            <div className="flex flex-col space-y-3">
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">About</Link>
              <Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Features</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Contact</Link>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full px-4 py-6 sm:py-8 lg:py-12">
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">
            AI Knowledge Search
          </h1>
          <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Search across your Slack and Notion with AI-powered answers
          </p>
        </div>

        <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 w-full max-w-2xl">
            <div className="grid grid-cols-5 gap-1">
              <button
                onClick={() => setActiveTab('search')}
                className={`px-2 sm:px-3 lg:px-4 py-2 rounded-md font-medium transition-colors text-xs sm:text-sm lg:text-base ${
                  activeTab === 'search'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Search
              </button>
              <button
                onClick={() => setActiveTab('demo')}
                className={`px-2 sm:px-3 lg:px-4 py-2 rounded-md font-medium transition-colors text-xs sm:text-sm lg:text-base ${
                  activeTab === 'demo'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Demo
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-2 sm:px-3 lg:px-4 py-2 rounded-md font-medium transition-colors text-xs sm:text-sm lg:text-base ${
                  activeTab === 'admin'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-2 sm:px-3 lg:px-4 py-2 rounded-md font-medium transition-colors text-xs sm:text-sm lg:text-base ${
                  activeTab === 'stats'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Stats
              </button>
              <button
                onClick={() => setActiveTab('investor')}
                className={`px-2 sm:px-3 lg:px-4 py-2 rounded-md font-medium transition-colors text-xs sm:text-sm lg:text-base ${
                  activeTab === 'investor'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Investor
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          {activeTab === 'search' && <SearchInterface />}
          {activeTab === 'demo' && <DemoInterface />}
          {activeTab === 'admin' && <AdminPanel />}
          {activeTab === 'stats' && <StatsPanel />}
          {activeTab === 'investor' && <InvestorDashboard />}
        </div>
      </div>
    </div>
  );
}