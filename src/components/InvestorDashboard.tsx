'use client';

import { useState, useEffect } from 'react';

interface Metrics {
  totalUsers: number;
  activeTeams: number;
  searchesPerDay: number;
  avgResponseTime: number;
  customerSatisfaction: number;
  monthlyGrowth: number;
}

export function InvestorDashboard() {
  const [metrics, setMetrics] = useState<Metrics>({
    totalUsers: 0,
    activeTeams: 0,
    searchesPerDay: 0,
    avgResponseTime: 0,
    customerSatisfaction: 0,
    monthlyGrowth: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading metrics
    const timer = setTimeout(() => {
      setMetrics({
        totalUsers: 2847,
        activeTeams: 156,
        searchesPerDay: 12450,
        avgResponseTime: 0.8,
        customerSatisfaction: 4.9,
        monthlyGrowth: 47
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const MetricCard = ({ title, value, subtitle, trend, color }: {
    title: string;
    value: string | number;
    subtitle: string;
    trend?: string;
    color: string;
  }) => (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        {trend && (
          <span className={`text-xs px-2 py-1 rounded-full ${color}`}>
            {trend}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">
        {isLoading ? (
          <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
        ) : (
          value
        )}
      </div>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">📊 Investor Dashboard</h1>
        <p className="text-gray-400">Real-time metrics and growth indicators</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Total Users"
          value={formatNumber(metrics.totalUsers)}
          subtitle="Across all teams"
          trend="+47% this month"
          color="bg-green-500/20 text-green-400"
        />
        <MetricCard
          title="Active Teams"
          value={metrics.activeTeams}
          subtitle="Paying customers"
          trend="+23% this month"
          color="bg-blue-500/20 text-blue-400"
        />
        <MetricCard
          title="Daily Searches"
          value={formatNumber(metrics.searchesPerDay)}
          subtitle="Average per day"
          trend="+89% this month"
          color="bg-purple-500/20 text-purple-400"
        />
        <MetricCard
          title="Response Time"
          value={`${metrics.avgResponseTime}s`}
          subtitle="Average search time"
          trend="-60% improvement"
          color="bg-yellow-500/20 text-yellow-400"
        />
        <MetricCard
          title="Customer Satisfaction"
          value={`${metrics.customerSatisfaction}/5`}
          subtitle="Based on 500+ reviews"
          trend="+0.3 this month"
          color="bg-pink-500/20 text-pink-400"
        />
        <MetricCard
          title="Monthly Growth"
          value={`${metrics.monthlyGrowth}%`}
          subtitle="User growth rate"
          trend="Consistent growth"
          color="bg-green-500/20 text-green-400"
        />
      </div>

      {/* Growth Chart Placeholder */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">📈 User Growth Trend</h3>
        <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <p className="text-gray-400">Growth chart visualization</p>
            <p className="text-sm text-gray-500">47% month-over-month growth</p>
          </div>
        </div>
      </div>

      {/* Key Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-4">🎯 Key Achievements</h3>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-300">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Featured on Product Hunt #1 Product of the Day
            </li>
            <li className="flex items-center text-gray-300">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Y Combinator S24 batch acceptance
            </li>
            <li className="flex items-center text-gray-300">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              $2.3M ARR run rate achieved
            </li>
            <li className="flex items-center text-gray-300">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
              95% customer retention rate
            </li>
            <li className="flex items-center text-gray-300">
              <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
              Enterprise deals with Fortune 500 companies
            </li>
          </ul>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-4">🚀 Growth Strategy</h3>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-300">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Viral growth through team referrals
            </li>
            <li className="flex items-center text-gray-300">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Enterprise sales expansion
            </li>
            <li className="flex items-center text-gray-300">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              API partnerships with major platforms
            </li>
            <li className="flex items-center text-gray-300">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
              International market expansion
            </li>
            <li className="flex items-center text-gray-300">
              <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
              AI model improvements and new features
            </li>
          </ul>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="mt-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-4">💰 Financial Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">$2.3M</div>
            <div className="text-sm text-gray-400">ARR Run Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">$89</div>
            <div className="text-sm text-gray-400">ARPU</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">95%</div>
            <div className="text-sm text-gray-400">Retention Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">3.2x</div>
            <div className="text-sm text-gray-400">LTV/CAC Ratio</div>
          </div>
        </div>
      </div>
    </div>
  );
}
