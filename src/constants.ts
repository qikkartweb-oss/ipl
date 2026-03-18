/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BuildingLevel } from './types';

export const BUILDING_LEVELS: { min: number; max: number; type: BuildingLevel }[] = [
  { min: 1, max: 3, type: 'Hut' },
  { min: 4, max: 7, type: 'House' },
  { min: 8, max: 12, type: 'Building' },
  { min: 13, max: 20, type: 'Tower' },
  { min: 21, max: 1000, type: 'Skyscraper' },
];

export const COLORS = {
  primary: '#0A0A0B',
  accentBlue: '#00D1FF',
  accentOrange: '#FF6B00',
  accentGreen: '#39FF14',
  cardBg: 'rgba(255, 255, 255, 0.05)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
};

export const MOCK_MATCHES = [
  {
    id: 'm1',
    team1: 'CSK',
    team2: 'MI',
    team1Logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/1200px-Chennai_Super_Kings_Logo.svg.png',
    team2Logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Mumbai_Indians_Logo.svg/1200px-Mumbai_Indians_Logo.svg.png',
    startTime: new Date().toISOString(),
    status: 'live' as const,
    venue: 'Wankhede Stadium, Mumbai',
  },
  {
    id: 'm2',
    team1: 'RCB',
    team2: 'KKR',
    team1Logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Royal_Challengers_Bangalore_Logo.svg/1200px-Royal_Challengers_Bangalore_Logo.svg.png',
    team2Logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Kolkata_Knight_Riders_Logo.svg/1200px-Kolkata_Knight_Riders_Logo.svg.png',
    startTime: new Date(Date.now() + 86400000).toISOString(),
    status: 'upcoming' as const,
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
  },
];

export const MOCK_PREDICTIONS = [
  {
    id: 'p1',
    question: 'Who will win today\'s match?',
    category: 'match' as const,
    endTime: new Date(Date.now() + 3600000).toISOString(),
    options: [
      { id: 'o1', label: 'CSK', points: 100 },
      { id: 'o2', label: 'MI', points: 100 },
    ],
  },
  {
    id: 'p2',
    question: 'Powerplay runs range for CSK?',
    category: 'powerplay' as const,
    endTime: new Date(Date.now() + 1800000).toISOString(),
    options: [
      { id: 'o3', label: '0-40', points: 150 },
      { id: 'o4', label: '41-55', points: 120 },
      { id: 'o5', label: '56+', points: 180 },
    ],
  },
];
