/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, Trophy, Users, User, Zap } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'predict', icon: Zap, label: 'Predict' },
    { id: 'live', icon: Trophy, label: 'Live' },
    { id: 'leaderboard', icon: Users, label: 'Social' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-dark-bg relative overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center z-10">
        <h1 className="text-xl font-bold tracking-tighter">
          PREDICTION<span className="text-accent-blue">ARENA</span>
        </h1>
        <div className="flex items-center gap-2 glass px-3 py-1 rounded-full">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span className="text-xs font-medium uppercase tracking-widest">Live Now</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24 px-6">
        {children}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass border-t border-white/10 px-6 py-4 flex justify-between items-center z-20">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 transition-all duration-300",
                isActive ? "text-accent-blue scale-110" : "text-white/40 hover:text-white/60"
              )}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">{tab.label}</span>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-accent-blue neon-glow-blue" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
