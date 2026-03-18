/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PredictionQuestion } from '../types';
import { CheckCircle2, Clock } from 'lucide-react';

interface PredictionCardProps {
  prediction: PredictionQuestion;
  onAnswer: (optionId: string) => void;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ prediction, onAnswer }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (id: string) => {
    setSelectedId(id);
    setIsSubmitted(true);
    setTimeout(() => {
      onAnswer(id);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-3xl p-6 mb-6 relative overflow-hidden"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-accent-orange">
          <Clock size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Ends in 45:20</span>
        </div>
        <span className="text-[10px] text-white/40 uppercase tracking-widest font-black">
          {prediction.category}
        </span>
      </div>

      <h3 className="text-xl font-black mb-6 leading-tight tracking-tight">
        {prediction.question}
      </h3>

      <div className="grid grid-cols-1 gap-3">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            prediction.options.map((option) => (
              <motion.button
                key={option.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSubmit(option.id)}
                className="w-full py-4 px-6 glass rounded-2xl flex justify-between items-center hover:bg-white/10 transition-colors group"
              >
                <span className="font-bold text-sm">{option.label}</span>
                <span className="text-accent-green font-black text-xs">+{option.points} PTS</span>
              </motion.button>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-8 gap-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10 }}
              >
                <CheckCircle2 size={64} className="text-accent-green" />
              </motion.div>
              <span className="text-accent-green font-black uppercase tracking-widest">Prediction Locked!</span>
              <span className="text-white/40 text-xs text-center">You'll earn points if your prediction is correct.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
