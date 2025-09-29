'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SearchInterface } from '@/components/SearchInterface';
import { AdminPanel } from '@/components/AdminPanel';
import { StatsPanel } from '@/components/StatsPanel';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'search' | 'admin' | 'stats'>('search');
  const [showApp, setShowApp] = useState(false);

  if (!showApp) {
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center">
          {/* Enhanced Background gradient with animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black animate-gradient"></div>
          
          {/* Navigation */}
          <div className="absolute top-4 left-4 right-4 sm:top-8 sm:left-8 sm:right-8 flex justify-between items-center z-20">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-black rounded-full"></div>
              </div>
              <span className="font-semibold text-white text-sm sm:text-base">mnemonic.fyi</span>
            </div>
            <div className="hidden sm:flex space-x-6">
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About</Link>
              <Link href="/features" className="text-gray-400 hover:text-white transition-colors duration-300">Features</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</Link>
            </div>
            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button className="text-gray-400 hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto">
            {/* Logo */}
            <div className="mb-8 sm:mb-12">
              <div className="w-20 h-20 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 relative animate-float">
                {/* Eye-inspired logo */}
                <div className="w-full h-full border-2 sm:border-4 border-white rounded-full relative animate-pulse-glow">
                  {/* Outer ring with angular cuts */}
                  <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-white"></div>
                  
                  {/* Inner eye shape */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {/* Iris */}
                    <div className="w-12 h-12 sm:w-20 sm:h-20 bg-white rounded-full relative overflow-hidden">
                      {/* Pupil */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-12 sm:h-12 bg-black rounded-full"></div>
                      {/* Highlight */}
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-4 w-2 h-2 sm:w-4 sm:h-4 bg-white rounded-full opacity-80"></div>
                    </div>
                  </div>
                  
                  {/* Eyelid effect */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-black rounded-t-full opacity-20"></div>
                </div>
              </div>
            </div>

            {/* Brand */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-6xl font-bold mb-3 sm:mb-4">
                <span className="text-white">mnemonic</span>
                <span className="text-gray-400">.fyi</span>
              </h1>
              <p className="text-lg sm:text-2xl text-gray-300 font-light">
                AI Knowledge Search
              </p>
            </div>

            {/* Tagline */}
            <p className="text-base sm:text-xl text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
              Transform your team&apos;s scattered knowledge into intelligent answers. 
              Search across Slack and Notion with AI-powered insights that actually understand context.
            </p>

            {/* CTA Button */}
            <button
              onClick={() => setShowApp(true)}
              className="bg-white text-black px-8 sm:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Try Demo →
            </button>

            {/* Features */}
            <div className="mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-4">
              <div className="text-center group hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-800 rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors duration-300">Smart Search</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">AI-powered semantic search across all your knowledge sources</p>
              </div>
              
              <div className="text-center group hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-800 rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center group-hover:bg-yellow-600 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-yellow-400 transition-colors duration-300">Instant Answers</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Get summarized, contextual answers instead of raw search results</p>
              </div>
              
              <div className="text-center group hover:scale-105 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-800 rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center group-hover:bg-green-600 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-green-400 transition-colors duration-300">Expert Finder</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Identify team members with relevant expertise for any topic</p>
              </div>
            </div>
          </div>

          {/* Enhanced Floating elements - Hidden on mobile for performance */}
          <div className="hidden sm:block absolute top-20 left-10 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse animate-float"></div>
          <div className="hidden sm:block absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-pulse delay-1000 animate-bounce"></div>
          <div className="hidden sm:block absolute bottom-40 left-20 w-3 h-3 bg-gray-600 rounded-full opacity-30 animate-pulse delay-2000 animate-float"></div>
          <div className="hidden sm:block absolute bottom-20 right-10 w-1 h-1 bg-yellow-400 rounded-full opacity-50 animate-pulse delay-500 animate-bounce"></div>
          <div className="hidden sm:block absolute top-60 left-1/4 w-1 h-1 bg-green-400 rounded-full opacity-30 animate-pulse delay-700 animate-float"></div>
          <div className="hidden sm:block absolute bottom-60 right-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-40 animate-pulse delay-1500 animate-bounce"></div>
          <div className="hidden sm:block absolute top-1/3 left-1/3 w-1 h-1 bg-pink-400 rounded-full opacity-50 animate-pulse delay-300 animate-float"></div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-center px-4">
          <p className="text-gray-500 text-xs sm:text-sm mb-2">
            Built with Next.js • Powered by OpenAI • Stored in Supabase
          </p>
          <p className="text-gray-600 text-xs flex items-center justify-center gap-1">
            Made with <span className="text-red-500 animate-pulse">❤️</span> by the mnemonic.fyi team
          </p>
        </div>
      </div>
    );
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
                <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-black rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-white rounded-full"></div>
                </div>
                <span className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base">mnemonic.fyi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-4 sm:py-6 lg:py-8">
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">
            AI Knowledge Search
          </h1>
          <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Search across your Slack and Notion with AI-powered answers
          </p>
        </div>

        <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 w-full max-w-sm sm:max-w-md">
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => setActiveTab('search')}
                className={`px-2 sm:px-3 lg:px-6 py-2 rounded-md font-medium transition-colors text-xs sm:text-sm lg:text-base ${
                  activeTab === 'search'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Search
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-2 sm:px-3 lg:px-6 py-2 rounded-md font-medium transition-colors text-xs sm:text-sm lg:text-base ${
                  activeTab === 'admin'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-2 sm:px-3 lg:px-6 py-2 rounded-md font-medium transition-colors text-xs sm:text-sm lg:text-base ${
                  activeTab === 'stats'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Stats
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          {activeTab === 'search' && <SearchInterface />}
          {activeTab === 'admin' && <AdminPanel />}
          {activeTab === 'stats' && <StatsPanel />}
        </div>
      </div>
    </div>
  );
}