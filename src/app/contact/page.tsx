'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
  const [showApp, setShowApp] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

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
              <Link href="/features" className="text-gray-400 hover:text-white transition-colors duration-300">Features</Link>
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
                  href="/features" 
                  className="block text-gray-400 hover:text-white transition-colors duration-300 py-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Features
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
          <div className="relative z-10 px-3 sm:px-6 max-w-4xl mx-auto w-full pb-8">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 animate-text-glow">
                <span className="text-white">Get in</span>
                <span className="text-gray-400"> Touch</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
                Have questions about mnemonic.fyi? We&apos;d love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
              {/* Contact Info */}
              <div className="space-y-6 sm:space-y-8">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-800 hover:border-blue-500 transition-all duration-300 group hover:scale-105">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-5 lg:mb-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">Contact Information</h2>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center space-x-3 sm:space-x-4 group/item hover:scale-105 transition-all duration-300">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover/item:bg-blue-500 transition-colors duration-300 group-hover/item:scale-110">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover/item:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm sm:text-base group-hover/item:text-blue-300 transition-colors duration-300">Email</h3>
                        <p className="text-gray-400 text-sm sm:text-base group-hover/item:text-gray-300 transition-colors duration-300">support@mnemonic.fyi</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Location</h3>
                        <p className="text-gray-400">Seoul, South Korea</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Response Time</h3>
                        <p className="text-gray-400">Within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-800">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-5 lg:mb-6 text-yellow-400">Why Choose Us?</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">AI-powered knowledge search that actually works</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Seamless integration with Slack and Notion</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Enterprise-grade security and privacy</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">24/7 support and onboarding assistance</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-800">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-5 lg:mb-6 text-green-400">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Tell us about your team's knowledge management needs..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-16 mb-8 sm:mb-12 lg:mb-16">
              <button
                onClick={() => setShowApp(true)}
                className="bg-white text-black px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl animate-shimmer"
              >
                Try Our Demo →
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 mb-8">Coming soon...</p>
          <button
            onClick={() => setShowApp(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            ← Back to Contact
          </button>
        </div>
      </div>
    </div>
  );
}
