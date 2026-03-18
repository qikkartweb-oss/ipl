/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { User, Achievement } from '../types';
import { BuildingVisual } from './BuildingVisual';
import { Award, Flame, TrendingUp } from 'lucide-react';

interface ProfileProps {
  user: User;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-full glass p-1 border-2 border-accent-blue neon-glow-blue">
          <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black tracking-tighter">{user.name}</h2>
          <span className="text-accent-blue font-black uppercase text-xs tracking-widest">Elite Predictor</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-4 flex flex-col items-center gap-1">
          <TrendingUp size={20} className="text-accent-blue" />
          <span className="text-lg font-black">{user.points}</span>
          <span className="text-[8px] text-white/40 uppercase font-black">Points</span>
        </div>
        <div className="glass rounded-2xl p-4 flex flex-col items-center gap-1">
          <Flame size={20} className="text-accent-orange" />
          <span className="text-lg font-black">{user.streak}</span>
          <span className="text-[8px] text-white/40 uppercase font-black">Streak</span>
        </div>
        <div className="glass rounded-2xl p-4 flex flex-col items-center gap-1">
          <Award size={20} className="text-accent-green" />
          <span className="text-lg font-black">#{user.rank}</span>
          <span className="text-[8px] text-white/40 uppercase font-black">Rank</span>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 flex flex-col items-center gap-4">
        <h3 className="text-sm font-black uppercase tracking-widest self-start">My Arena Building</h3>
        <BuildingVisual level={user.level} />
        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mt-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '65%' }}
            className="h-full bg-accent-blue neon-glow-blue"
          />
        </div>
        <div className="flex justify-between w-full text-[10px] font-black uppercase tracking-widest text-white/40">
          <span>Level {user.level}</span>
          <span>Next: Level {user.level + 1}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-black uppercase tracking-widest">Achievements</h3>
        <div className="grid grid-cols-2 gap-4">
          {user.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`glass rounded-2xl p-4 flex items-center gap-3 ${
                achievement.unlocked ? 'opacity-100' : 'opacity-30 grayscale'
              }`}
            >
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-xl">
                {achievement.icon}
              </div>
              <span className="text-[10px] font-bold uppercase leading-tight">{achievement.title}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => alert('Share feature coming soon! Generate shareable card...')}
        className="w-full py-4 glass rounded-2xl text-[10px] font-black uppercase tracking-widest border-accent-blue/30 text-accent-blue hover:bg-accent-blue/10 transition-colors mb-8"
      >
        Share My Progress
      </button>
    </div>
  );
};
