'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function About() {
  const [showApp, setShowApp] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  if (!showApp) {
    return (
      <>
        <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center">
          {/* Enhanced Background gradient with animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black animate-gradient"></div>
          
          {/* Navigation */}
          <div className="absolute top-4 left-4 right-4 sm:top-8 sm:left-8 sm:right-8 flex justify-between items-center z-20">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-black rounded-full"></div>
              </div>
              <span className="font-semibold text-white group-hover:text-gray-300 transition-colors duration-300 text-sm sm:text-base">mnemonic.fyi</span>
            </Link>
            <div className="hidden sm:flex space-x-6">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link>
              <Link href="/features" className="text-gray-400 hover:text-white transition-colors duration-300">Features</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</Link>
              <button
                onClick={() => setShowApp(true)}
                className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Try Demo
              </button>
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
            <div className="absolute top-16 left-4 right-4 bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 z-30 sm:hidden">
              <div className="p-4 space-y-4">
                <Link 
                  href="/" 
                  className="block text-gray-400 hover:text-white transition-colors duration-300 py-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/features" 
                  className="block text-gray-400 hover:text-white transition-colors duration-300 py-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Features
                </Link>
                <Link 
                  href="/contact" 
                  className="block text-gray-400 hover:text-white transition-colors duration-300 py-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Contact
                </Link>
                <button
                  onClick={() => {
                    setShowApp(true);
                    setShowMobileMenu(false);
                  }}
                  className="w-full bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  Try Demo
                </button>
              </div>
            </div>
          )}
          
          {/* Main content */}
          <div className="relative z-10 text-center px-3 sm:px-6 max-w-4xl mx-auto pb-8">
            {/* Logo */}
            <div className="mb-6 sm:mb-8 lg:mb-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32 mx-auto mb-4 sm:mb-6 lg:mb-8 relative animate-float-slow">
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

            {/* Brand */}
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-2 sm:mb-3 lg:mb-4 animate-text-glow">
                <span className="text-white">About</span>
                <span className="text-gray-400"> mnemonic.fyi</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-2xl text-gray-300 font-light">
                The Future of Team Knowledge
              </p>
            </div>

            {/* Story */}
            <div className="text-left max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-12">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-800">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 lg:mb-6 text-blue-400">Our Story</h2>
                <p className="text-gray-300 leading-relaxed mb-3 sm:mb-4 lg:mb-6 text-sm sm:text-base">
                  In today&apos;s fast-paced work environment, teams are drowning in information scattered across 
                  Slack channels, Notion pages, and countless other tools. We built mnemonic.fyi to solve 
                  this exact problem.
                </p>
                <p className="text-gray-300 leading-relaxed mb-3 sm:mb-4 lg:mb-6 text-sm sm:text-base">
                  Our AI-powered platform transforms your team&apos;s scattered knowledge into intelligent, 
                  searchable insights. No more hunting through endless threads or documents – just ask 
                  a question and get the answer you need, instantly.
                </p>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  We believe that every team deserves access to their collective wisdom, and we&apos;re making 
                  that vision a reality through cutting-edge AI and thoughtful design.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto mb-6 sm:mb-8 lg:mb-12">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-800 hover:border-blue-500 transition-colors duration-300">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 lg:mb-4 text-green-400">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  To democratize access to organizational knowledge by making every piece of information 
                  instantly searchable and understandable through AI.
                </p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-800 hover:border-yellow-500 transition-colors duration-300">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 lg:mb-4 text-yellow-400">Our Vision</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  A world where no knowledge is lost, no question goes unanswered, and teams can focus 
                  on what matters most: building amazing things together.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mb-8 sm:mb-12 lg:mb-16">
              <button
                onClick={() => setShowApp(true)}
                className="bg-white text-black px-6 sm:px-8 lg:px-12 py-2.5 sm:py-3 lg:py-4 rounded-full text-sm sm:text-base lg:text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl animate-shimmer"
              >
                Experience the Future →
              </button>
            </div>
          </div>

          {/* Enhanced Floating elements - Hidden on mobile for performance */}
          <div className="hidden sm:block absolute top-20 left-10 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse animate-float"></div>
          <div className="hidden sm:block absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-pulse delay-1000 animate-bounce"></div>
          <div className="hidden sm:block absolute bottom-40 left-20 w-3 h-3 bg-gray-600 rounded-full opacity-30 animate-pulse delay-2000 animate-float"></div>
          <div className="hidden sm:block absolute bottom-20 right-10 w-1 h-1 bg-yellow-400 rounded-full opacity-50 animate-pulse delay-500 animate-bounce"></div>
        </div>

        </div>
        
        {/* Footer - moved outside main container */}
        <div className="bg-black text-center px-4 py-6 border-t border-gray-800">
          <p className="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-2 leading-tight">
            Built with Next.js • Powered by OpenAI • Stored in Supabase
          </p>
          <p className="text-gray-600 text-xs flex items-center justify-center gap-1 leading-tight">
            Made with <span className="text-red-500 animate-pulse">❤️</span> by the mnemonic.fyi team
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About mnemonic.fyi</h1>
          <p className="text-xl text-gray-600 mb-8">Coming soon...</p>
          <button
            onClick={() => setShowApp(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            ← Back to About
          </button>
        </div>
      </div>
    </div>
  );
}
