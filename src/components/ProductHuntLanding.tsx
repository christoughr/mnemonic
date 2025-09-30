'use client';

import { useState } from 'react';
import Link from 'next/link';

export function ProductHuntLanding() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-gray-400 hover:text-white transition-colors duration-300 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          {showMobileMenu && (
            <div className="absolute top-16 left-4 right-4 bg-gray-900 rounded-lg p-4 z-30 sm:hidden">
              <div className="flex flex-col space-y-3">
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About</Link>
                <Link href="/features" className="text-gray-400 hover:text-white transition-colors duration-300">Features</Link>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</Link>
              </div>
            </div>
          )}

          <div className="relative z-10 text-center px-3 sm:px-6 max-w-6xl mx-auto pb-8">
            {/* Product Hunt Badge */}
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse">
                🚀 Now on Product Hunt!
                <span className="ml-2 text-xs bg-orange-600 px-2 py-1 rounded-full">#1 Today</span>
              </div>
            </div>

            {/* Logo Animation */}
            <div className="mb-6 sm:mb-8 lg:mb-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32 mx-auto mb-4 sm:mb-6 lg:mb-8 relative animate-float">
                <div className="w-full h-full border-2 sm:border-4 border-white rounded-full relative animate-pulse-glow">
                  <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-white"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-20 lg:h-20 bg-white rounded-full relative overflow-hidden">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 lg:w-12 lg:h-12 bg-black rounded-full"></div>
                      <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 lg:top-3 lg:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-4 lg:h-4 bg-white rounded-full opacity-80"></div>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-black rounded-t-full opacity-20"></div>
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-2 sm:mb-3 lg:mb-4">
                <span className="text-white">Never Lose</span><span className="text-gray-400"> Knowledge Again</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-2xl text-gray-300 font-light">AI-Powered Search for Slack & Notion</p>
            </div>

            {/* Value Proposition */}
            <p className="text-sm sm:text-base lg:text-xl text-gray-400 mb-6 sm:mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
              Stop hunting through endless Slack threads and Notion pages. Ask any question and get instant, intelligent answers from your team&apos;s collective knowledge.
            </p>

            {/* Social Proof */}
            <div className="mb-8 sm:mb-12 lg:mb-16">
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  <span>4.9/5 from 500+ teams</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Trusted by Y Combinator startups</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">⚡</span>
                  <span>Setup in 2 minutes</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mb-8 sm:mb-12 lg:mb-20">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => window.location.href = '/?demo=true'}
                  className="bg-white text-black px-6 sm:px-8 lg:px-12 py-2.5 sm:py-3 lg:py-4 rounded-full text-sm sm:text-base lg:text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  Try Free Demo →
                </button>
                <button 
                  onClick={() => window.open('https://www.loom.com/share/demo', '_blank')}
                  className="border border-gray-600 text-white px-6 sm:px-8 lg:px-12 py-2.5 sm:py-3 lg:py-4 rounded-full text-sm sm:text-base lg:text-lg font-semibold hover:border-white transition-all duration-300"
                >
                  Watch Demo (2 min)
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4">No credit card required • Free forever plan available</p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-2 sm:px-4">
              <div className="text-center group hover:scale-105 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gray-800 rounded-2xl mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1 sm:mb-2 group-hover:text-blue-400 transition-colors duration-300">Smart Search</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">AI-powered semantic search across all your knowledge sources</p>
              </div>
              <div className="text-center group hover:scale-105 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gray-800 rounded-2xl mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center group-hover:bg-yellow-600 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1 sm:mb-2 group-hover:text-yellow-400 transition-colors duration-300">Instant Answers</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Get summarized, contextual answers instead of raw search results</p>
              </div>
              <div className="text-center group hover:scale-105 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gray-800 rounded-2xl mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center group-hover:bg-green-600 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1 sm:mb-2 group-hover:text-green-400 transition-colors duration-300">Expert Finder</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Identify team members with relevant expertise for any topic</p>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="hidden sm:block absolute top-20 left-10 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse animate-float"></div>
          <div className="hidden sm:block absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-pulse delay-1000 animate-bounce"></div>
          <div className="hidden sm:block absolute bottom-40 left-20 w-3 h-3 bg-gray-600 rounded-full opacity-30 animate-pulse delay-2000 animate-float"></div>
          <div className="hidden sm:block absolute bottom-20 right-10 w-1 h-1 bg-yellow-400 rounded-full opacity-50 animate-pulse delay-500 animate-bounce"></div>
          <div className="hidden sm:block absolute top-60 left-1/4 w-1 h-1 bg-green-400 rounded-full opacity-30 animate-pulse delay-700 animate-float"></div>
          <div className="hidden sm:block absolute bottom-60 right-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-40 animate-pulse delay-1500 animate-bounce"></div>
          <div className="hidden sm:block absolute top-1/3 left-1/3 w-1 h-1 bg-pink-400 rounded-full opacity-50 animate-pulse delay-300 animate-float"></div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black text-center px-4 py-6 border-t border-gray-800">
        <p className="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-2 leading-tight">Built with Next.js • Powered by OpenAI • Stored in Supabase</p>
        <p className="text-gray-600 text-xs flex items-center justify-center gap-1 leading-tight">Made with <span className="text-red-500 animate-pulse">❤️</span> by the mnemonic.fyi team</p>
      </div>
    </>
  );
}
