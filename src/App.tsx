/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { MatchCard } from './components/MatchCard';
import { PredictionCard } from './components/PredictionCard';
import { Leaderboard } from './components/Leaderboard';
import { Profile } from './components/Profile';
import { BuildingVisual } from './components/BuildingVisual';
import { MOCK_MATCHES, MOCK_PREDICTIONS } from './constants';
import { User, Match, PredictionQuestion } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Flame, Trophy, TrendingUp } from 'lucide-react';

const INITIAL_USER: User = {
  id: 'u1',
  name: 'CricketFan_99',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CricketFan_99',
  points: 1250,
  level: 5,
  streak: 3,
  rank: 124,
  achievements: [
    { id: 'a1', title: 'Prediction Master', icon: '🏆', unlocked: true },
    { id: 'a2', title: 'Powerplay King', icon: '⚡', unlocked: true },
    { id: 'a3', title: 'Streak Starter', icon: '🔥', unlocked: true },
    { id: 'a4', title: 'Social Star', icon: '🌟', unlocked: false },
  ],
};

const MOCK_USERS: User[] = [
  { ...INITIAL_USER, id: 'u1', name: 'You', points: 1250, level: 5, rank: 124 },
  { id: 'u2', name: 'Rahul_IPL', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul', points: 2450, level: 12, streak: 8, rank: 1, achievements: [] },
  { id: 'u3', name: 'Priya_Cricket', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', points: 2100, level: 10, streak: 5, rank: 2, achievements: [] },
  { id: 'u4', name: 'Amit_K', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit', points: 1850, level: 8, streak: 4, rank: 3, achievements: [] },
  { id: 'u5', name: 'Sneha_RCB', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha', points: 1600, level: 7, streak: 2, rank: 4, achievements: [] },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [matches] = useState<Match[]>(MOCK_MATCHES);
  const [predictions] = useState<PredictionQuestion[]>(MOCK_PREDICTIONS);
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Persist user data
  useEffect(() => {
    const saved = localStorage.getItem('ipl_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('ipl_user', JSON.stringify(user));
  }, [user]);

  const handlePrediction = (optionId: string) => {
    // Simulate point gain
    const newPoints = user.points + 100;
    const newLevel = Math.floor(newPoints / 250);
    
    if (newLevel > user.level) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }

    setUser(prev => ({
      ...prev,
      points: newPoints,
      level: newLevel,
      streak: prev.streak + 1,
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="flex flex-col gap-6">
            <section className="glass rounded-3xl p-6 flex items-center justify-between relative overflow-hidden">
              <div className="flex flex-col gap-1 z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">My Arena</span>
                <h2 className="text-2xl font-black tracking-tighter">LEVEL {user.level}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-accent-orange">
                    <Flame size={14} />
                    <span className="text-xs font-black">{user.streak}</span>
                  </div>
                  <div className="flex items-center gap-1 text-accent-blue">
                    <TrendingUp size={14} />
                    <span className="text-xs font-black">{user.points}</span>
                  </div>
                </div>
              </div>
              <div className="w-24 h-24 z-10">
                <BuildingVisual level={user.level} />
              </div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-accent-blue/10 rounded-full blur-3xl" />
            </section>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-black uppercase tracking-widest">Today's Matches</h3>
                <span className="text-[10px] text-accent-blue font-black uppercase tracking-widest">View All</span>
              </div>
              {matches.map(match => (
                <MatchCard key={match.id} match={match} onPredict={() => setActiveTab('predict')} />
              ))}
            </section>
          </div>
        );
      case 'predict':
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 mb-4">
              <h2 className="text-2xl font-black tracking-tighter uppercase">Predict & Earn</h2>
              <p className="text-xs text-white/40 font-medium">Make your calls before the timer runs out!</p>
            </div>
            {predictions.map(pred => (
              <PredictionCard key={pred.id} prediction={pred} onAnswer={handlePrediction} />
            ))}
          </div>
        );
      case 'live':
        return (
          <div className="flex flex-col items-center justify-center py-12 gap-6 text-center">
            <div className="w-20 h-20 rounded-full bg-accent-orange/20 flex items-center justify-center animate-pulse">
              <Zap size={40} className="text-accent-orange" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-black tracking-tighter uppercase">Live Mode</h2>
              <p className="text-sm text-white/60 max-w-[200px]">Real-time predictions during the match start in 15:00</p>
            </div>
            <button className="px-8 py-3 glass rounded-full text-[10px] font-black uppercase tracking-widest border-accent-orange/30 text-accent-orange">
              Notify Me
            </button>
          </div>
        );
      case 'leaderboard':
        return (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-black tracking-tighter uppercase">Leaderboard</h2>
              <p className="text-xs text-white/40 font-medium">Compete with fans across the globe</p>
            </div>
            <Leaderboard users={MOCK_USERS} currentUser={user} />
          </div>
        );
      case 'profile':
        return <Profile user={user} />;
      default:
        return null;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      {/* Level Up Overlay */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="glass p-8 rounded-3xl flex flex-col items-center gap-4 neon-glow-blue border-accent-blue">
              <Trophy size={64} className="text-accent-blue" />
              <div className="text-center">
                <h2 className="text-3xl font-black tracking-tighter uppercase">Level Up!</h2>
                <p className="text-accent-blue font-black">You've reached Level {user.level}</p>
              </div>
              <div className="w-32 h-32">
                <BuildingVisual level={user.level} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
