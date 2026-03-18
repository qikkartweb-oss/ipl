/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BuildingLevel = 'Hut' | 'House' | 'Building' | 'Tower' | 'Skyscraper';

export interface User {
  id: string;
  name: string;
  avatar: string;
  points: number;
  level: number;
  streak: number;
  rank: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
}

export interface Match {
  id: string;
  team1: string;
  team2: string;
  team1Logo: string;
  team2Logo: string;
  startTime: string;
  status: 'upcoming' | 'live' | 'finished';
  venue: string;
}

export interface PredictionOption {
  id: string;
  label: string;
  points: number;
}

export interface PredictionQuestion {
  id: string;
  question: string;
  options: PredictionOption[];
  endTime: string;
  category: 'match' | 'powerplay' | 'player';
}

export interface LivePrediction {
  id: string;
  question: string;
  options: PredictionOption[];
  secondsLeft: number;
}
