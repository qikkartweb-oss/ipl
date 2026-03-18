/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { User } from '../types';

interface LeaderboardProps {
  users: User[];
  currentUser: User;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ users, currentUser }) => {
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar py-2">
        {['Daily', 'Match', 'Overall', 'Groups'].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              tab === 'Overall' ? 'bg-accent-blue text-black' : 'glass text-white/60'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {sortedUsers.map((user, index) => {
          const isCurrentUser = user.id === currentUser.id;
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`glass rounded-2xl p-4 flex items-center gap-4 ${
                isCurrentUser ? 'border-accent-blue/50 bg-accent-blue/5' : ''
              }`}
            >
              <span className={`w-6 font-black italic text-lg ${
                index === 0 ? 'text-accent-orange' : index === 1 ? 'text-white/70' : index === 2 ? 'text-white/40' : 'text-white/20'
              }`}>
                #{index + 1}
              </span>
              
              <div className="w-10 h-10 rounded-full overflow-hidden glass border border-white/10">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>

              <div className="flex-1 flex flex-col">
                <span className="font-bold text-sm tracking-tight">{user.name}</span>
                <span className="text-[10px] text-white/40 uppercase font-black">Level {user.level}</span>
              </div>

              <div className="text-right flex flex-col">
                <span className="text-accent-blue font-black text-sm">{user.points}</span>
                <span className="text-[8px] text-white/30 uppercase font-black">Points</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
