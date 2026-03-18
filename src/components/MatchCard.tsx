/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Match } from '../types';
import { format } from 'date-fns';

interface MatchCardProps {
  match: Match;
  onPredict: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onPredict }) => {
  const isLive = match.status === 'live';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-3xl p-6 mb-6 relative overflow-hidden"
    >
      {isLive && (
        <div className="absolute top-0 right-0 bg-accent-orange px-4 py-1 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest">
          Live Match
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full glass flex items-center justify-center p-2">
            <img src={match.team1Logo} alt={match.team1} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          <span className="font-black text-lg">{match.team1}</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-white/30 font-black text-2xl italic">VS</span>
          <span className="text-[10px] text-white/50 uppercase tracking-widest mt-2">{match.venue.split(',')[0]}</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full glass flex items-center justify-center p-2">
            <img src={match.team2Logo} alt={match.team2} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          <span className="font-black text-lg">{match.team2}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-center">
          <span className="text-xs text-white/60 uppercase tracking-widest">
            {isLive ? 'Match in Progress' : format(new Date(match.startTime), 'EEE, MMM d • h:mm a')}
          </span>
        </div>
        
        <button
          onClick={onPredict}
          className="w-full py-4 bg-accent-blue text-black font-black uppercase tracking-widest rounded-2xl neon-glow-blue active:scale-95 transition-transform"
        >
          Start Predicting
        </button>
      </div>
    </motion.div>
  );
};
