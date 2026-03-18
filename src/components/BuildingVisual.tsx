/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { BuildingLevel } from '../types';
import { BUILDING_LEVELS } from '../constants';

interface BuildingVisualProps {
  level: number;
}

export const BuildingVisual: React.FC<BuildingVisualProps> = ({ level }) => {
  const levelInfo = BUILDING_LEVELS.find(l => level >= l.min && level <= l.max) || BUILDING_LEVELS[0];
  const type = levelInfo.type;

  const getBuildingContent = () => {
    switch (type) {
      case 'Hut':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full fill-accent-orange">
            <path d="M10 90 L50 10 L90 90 Z" />
            <rect x="40" y="60" width="20" height="30" fill="#333" />
          </svg>
        );
      case 'House':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full fill-accent-blue">
            <rect x="20" y="40" width="60" height="50" />
            <path d="M10 40 L50 10 L90 40 Z" fill="#FF6B00" />
            <rect x="40" y="60" width="20" height="30" fill="#333" />
          </svg>
        );
      case 'Building':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full fill-accent-green">
            <rect x="25" y="20" width="50" height="70" />
            {[...Array(6)].map((_, i) => (
              <rect key={i} x={30 + (i % 2) * 25} y={30 + Math.floor(i / 2) * 20} width="15" height="10" fill="#333" />
            ))}
          </svg>
        );
      case 'Tower':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full fill-accent-blue">
            <rect x="30" y="10" width="40" height="80" />
            <rect x="25" y="80" width="50" height="10" />
            {[...Array(12)].map((_, i) => (
              <rect key={i} x={35 + (i % 2) * 20} y={15 + Math.floor(i / 2) * 12} width="10" height="8" fill="#333" />
            ))}
            <path d="M50 0 L55 10 L45 10 Z" fill="#FF6B00" />
          </svg>
        );
      case 'Skyscraper':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full fill-accent-blue">
            <rect x="35" y="5" width="30" height="85" />
            <rect x="30" y="85" width="40" height="5" />
            {[...Array(20)].map((_, i) => (
              <rect key={i} x={38 + (i % 2) * 15} y={10 + Math.floor(i / 2) * 8} width="8" height="5" fill="#333" />
            ))}
            <rect x="48" y="0" width="4" height="10" fill="#FF6B00" />
            <circle cx="50" cy="0" r="2" fill="#39FF14" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-48 h-48 mx-auto flex items-end justify-center">
      <motion.div
        key={type}
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 12 }}
        className="w-full h-full"
      >
        {getBuildingContent()}
      </motion.div>
      <div className="absolute -bottom-4 w-full h-1 bg-white/20 rounded-full blur-sm" />
    </div>
  );
};
