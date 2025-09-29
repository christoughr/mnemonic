'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function About() {
  const [showApp, setShowApp] = useState(false);

  if (!showApp) {
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center">
          {/* Enhanced Background gradient with animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black animate-gradient"></div>
          
          {/* Navigation */}
          <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-4 h-4 bg-black rounded-full"></div>
              </div>
              <span className="font-semibold text-white group-hover:text-gray-300 transition-colors duration-300">mnemonic.fyi</span>
            </Link>
            <div className="flex space-x-6">
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
          </div>
          
          {/* Main content */}
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            {/* Logo */}
            <div className="mb-12">
              <div className="w-32 h-32 mx-auto mb-8 relative animate-float-slow">
                <div className="w-full h-full border-4 border-white rounded-full relative animate-pulse-glow">
                  <div className="absolute inset-0 rounded-full border-4 border-white"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-20 bg-white rounded-full relative overflow-hidden">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black rounded-full"></div>
                      <div className="absolute top-3 left-4 w-4 h-4 bg-white rounded-full opacity-80"></div>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-black rounded-t-full opacity-20"></div>
                </div>
              </div>
            </div>

            {/* Brand */}
            <div className="mb-8">
              <h1 className="text-6xl font-bold mb-4 animate-text-glow">
                <span className="text-white">About</span>
                <span className="text-gray-400"> mnemonic.fyi</span>
              </h1>
              <p className="text-2xl text-gray-300 font-light">
                The Future of Team Knowledge
              </p>
            </div>

            {/* Story */}
            <div className="text-left max-w-3xl mx-auto mb-12">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-semibold mb-6 text-blue-400">Our Story</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  In today's fast-paced work environment, teams are drowning in information scattered across 
                  Slack channels, Notion pages, and countless other tools. We built mnemonic.fyi to solve 
                  this exact problem.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Our AI-powered platform transforms your team's scattered knowledge into intelligent, 
                  searchable insights. No more hunting through endless threads or documents – just ask 
                  a question and get the answer you need, instantly.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  We believe that every team deserves access to their collective wisdom, and we're making 
                  that vision a reality through cutting-edge AI and thoughtful design.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition-colors duration-300">
                <h3 className="text-xl font-semibold mb-4 text-green-400">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  To democratize access to organizational knowledge by making every piece of information 
                  instantly searchable and understandable through AI.
                </p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-yellow-500 transition-colors duration-300">
                <h3 className="text-xl font-semibold mb-4 text-yellow-400">Our Vision</h3>
                <p className="text-gray-300 leading-relaxed">
                  A world where no knowledge is lost, no question goes unanswered, and teams can focus 
                  on what matters most: building amazing things together.
                </p>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => setShowApp(true)}
              className="bg-white text-black px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl animate-shimmer"
            >
              Experience the Future →
            </button>
          </div>

          {/* Enhanced Floating elements */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse animate-float"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-pulse delay-1000 animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-3 h-3 bg-gray-600 rounded-full opacity-30 animate-pulse delay-2000 animate-float"></div>
          <div className="absolute bottom-20 right-10 w-1 h-1 bg-yellow-400 rounded-full opacity-50 animate-pulse delay-500 animate-bounce"></div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-gray-500 text-sm mb-2">
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
