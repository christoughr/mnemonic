'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Features() {
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
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About</Link>
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
                  href="/about" 
                  className="block text-gray-400 hover:text-white transition-colors duration-300 py-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  About
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
          <div className="relative z-10 text-center px-3 sm:px-6 max-w-6xl mx-auto pb-8">
            {/* Header */}
            <div className="mb-6 sm:mb-8 lg:mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 animate-text-glow">
                <span className="text-white">Features</span>
                <span className="text-gray-400"> & Capabilities</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
                Discover how mnemonic.fyi transforms your team&apos;s knowledge into actionable insights
              </p>
            </div>

            {/* Core Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
              {/* Smart Search */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-800 hover:border-blue-500 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-600 rounded-2xl mx-auto mb-3 sm:mb-4 lg:mb-6 flex items-center justify-center group-hover:bg-blue-500 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 lg:mb-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">Smart Search</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base group-hover:text-gray-200 transition-colors duration-300">
                  AI-powered semantic search that understands context and intent, not just keywords. 
                  Find exactly what you&apos;re looking for across all your knowledge sources.
                </p>
              </div>

              {/* Instant Answers */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-800 hover:border-yellow-500 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-yellow-600 rounded-2xl mx-auto mb-3 sm:mb-4 lg:mb-6 flex items-center justify-center group-hover:bg-yellow-500 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 lg:mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">Instant Answers</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base group-hover:text-gray-200 transition-colors duration-300">
                  Get summarized, contextual answers instead of raw search results. Our AI analyzes 
                  and synthesizes information to give you exactly what you need to know.
                </p>
              </div>

              {/* Expert Finder */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-800 hover:border-green-500 transition-all duration-300 group hover:scale-105">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-600 rounded-2xl mx-auto mb-3 sm:mb-4 lg:mb-6 flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 lg:mb-4 text-green-400">Expert Finder</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Identify team members with relevant expertise for any topic. Connect with the right 
                  person instantly based on their knowledge and contributions.
                </p>
              </div>

              {/* Slack Integration */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-800 hover:border-purple-500 transition-all duration-300 group hover:scale-105">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-purple-600 rounded-2xl mx-auto mb-3 sm:mb-4 lg:mb-6 flex items-center justify-center group-hover:bg-purple-500 transition-colors duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52-2.523A2.528 2.528 0 0 1 5.042 10.12h2.52v2.522a2.528 2.528 0 0 1-2.52 2.523zm0-6.323a2.528 2.528 0 0 1-2.52-2.522A2.528 2.528 0 0 1 5.042 3.797h2.52v2.522a2.528 2.528 0 0 1-2.52 2.523zm6.323 0a2.528 2.528 0 0 1-2.523-2.522A2.528 2.528 0 0 1 11.365 3.797h2.522v2.522a2.528 2.528 0 0 1-2.522 2.523zm0 6.323a2.528 2.528 0 0 1-2.523-2.523A2.528 2.528 0 0 1 11.365 10.12h2.522v2.522a2.528 2.528 0 0 1-2.522 2.523z"/>
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 lg:mb-4 text-purple-400">Slack Integration</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Seamlessly connect your Slack workspace to index conversations, files, and knowledge 
                  shared across all channels and direct messages.
                </p>
              </div>

              {/* Notion Integration */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-800 hover:border-pink-500 transition-all duration-300 group hover:scale-105">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-pink-600 rounded-2xl mx-auto mb-3 sm:mb-4 lg:mb-6 flex items-center justify-center group-hover:bg-pink-500 transition-colors duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.177-.794c1.635-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.746.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.68-1.632z"/>
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 lg:mb-4 text-pink-400">Notion Integration</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Index all your Notion pages, databases, and documentation. Turn your team&apos;s 
                  knowledge base into a searchable, AI-powered resource.
                </p>
              </div>

              {/* Real-time Updates */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-800 hover:border-red-500 transition-all duration-300 group hover:scale-105">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-red-600 rounded-2xl mx-auto mb-3 sm:mb-4 lg:mb-6 flex items-center justify-center group-hover:bg-red-500 transition-colors duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 lg:mb-4 text-red-400">Real-time Updates</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Your knowledge base stays current with automatic updates. New conversations, 
                  documents, and changes are indexed in real-time.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-800 max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 lg:mb-4 text-white">Ready to Transform Your Team&apos;s Knowledge?</h2>
              <p className="text-gray-300 mb-4 sm:mb-6 lg:mb-8 text-sm sm:text-base">
                Experience the power of AI-driven knowledge search. Get started with a free demo today.
              </p>
              <button
                onClick={() => setShowApp(true)}
                className="bg-white text-black px-6 sm:px-8 lg:px-12 py-2.5 sm:py-3 lg:py-4 rounded-full text-sm sm:text-base lg:text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl animate-shimmer"
              >
                Start Your Demo →
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Features</h1>
          <p className="text-xl text-gray-600 mb-8">Coming soon...</p>
          <button
            onClick={() => setShowApp(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            ← Back to Features
          </button>
        </div>
      </div>
    </div>
  );
}
