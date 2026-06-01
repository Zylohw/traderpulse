'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Award, Star, Zap, Target } from 'lucide-react';

interface GamificationData {
  xp: number;
  level: number;
  badges: string[];
  progress: number;
}

export default function Dashboard() {
  const [gamification, setGamification] = useState<GamificationData>({
    xp: 0,
    level: 1,
    badges: [],
    progress: 0,
  });

  useEffect(() => {
    // Simular carga de datos de gamificación
    const loadData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/gamification');
        if (response.ok) {
          const data = await response.json();
          setGamification(data);
        }
      } catch (error) {
        console.error('Error loading gamification data:', error);
      }
    };
    loadData();
  }, []);

  const addXP = (amount: number) => {
    setGamification(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      const progress = (newXP % 100);
      
      // Check for new badges
      const newBadges = [...prev.badges];
      if (newXP >= 100 && !prev.badges.includes('First Steps')) {
        newBadges.push('First Steps');
      }
      if (newXP >= 500 && !prev.badges.includes('Rising Star')) {
        newBadges.push('Rising Star');
      }
      if (newXP >= 1000 && !prev.badges.includes('Master Trader')) {
        newBadges.push('Master Trader');
      }
      
      return {
        xp: newXP,
        level: newLevel,
        badges: newBadges,
        progress,
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <TrendingUp className="text-blue-400" />
            TraderPulse
          </h1>
          <p className="text-gray-400">AI-Powered Trading Dashboard</p>
        </div>

        {/* Gamification Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* XP Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Zap className="text-yellow-400" />
                Experience Points
              </h3>
              <span className="text-2xl font-bold text-yellow-400">{gamification.xp}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${gamification.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-400">{gamification.progress}% to next level</p>
          </div>

          {/* Level Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Star className="text-purple-400" />
                Current Level
              </h3>
              <span className="text-2xl font-bold text-purple-400">{gamification.level}</span>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.min(gamification.level, 5)
                      ? 'text-purple-400 fill-purple-400'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Badges Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Award className="text-green-400" />
                Badges Earned
              </h3>
              <span className="text-2xl font-bold text-green-400">{gamification.badges.length}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {gamification.badges.length > 0 ? (
                gamification.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30"
                  >
                    {badge}
                  </span>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No badges yet. Start trading!</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="text-blue-400" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => addXP(10)}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              Complete Task (+10 XP)
            </button>
            <button
              onClick={() => addXP(25)}
              className="px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
            >
              Win Trade (+25 XP)
            </button>
            <button
              onClick={() => addXP(50)}
              className="px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
            >
              Achievement (+50 XP)
            </button>
            <button
              onClick={() => addXP(100)}
              className="px-4 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-medium transition-colors"
            >
              Milestone (+100 XP)
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h4 className="text-gray-400 text-sm mb-2">Total Trades</h4>
            <p className="text-3xl font-bold">1,234</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h4 className="text-gray-400 text-sm mb-2">Win Rate</h4>
            <p className="text-3xl font-bold text-green-400">68.5%</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h4 className="text-gray-400 text-sm mb-2">Profit</h4>
            <p className="text-3xl font-bold text-blue-400">$12,450</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h4 className="text-gray-400 text-sm mb-2">AI Accuracy</h4>
            <p className="text-3xl font-bold text-purple-400">92.3%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
