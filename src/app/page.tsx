'use client';

import React, { useState } from 'react';
import { simulateDraw } from '@/lib/drawAlgorithm';
import { Group } from '@/lib/types';
import { GroupCard } from '@/components/GroupCard';
import Link from 'next/link';

const INITIAL_GROUPS: Group[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map(name => ({
  name,
  teams: []
}));

export default function Home() {
  const [groups, setGroups] = useState<Group[]>(INITIAL_GROUPS);
  const [isDrawing, setIsDrawing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showToast, setShowToast] = useState(false);

  const handleDraw = () => {
    setIsDrawing(true);
    setError(null);

    setTimeout(() => {
      try {
        const result = simulateDraw();
        setGroups(result);
      } catch (e) {
        console.error(e);
        setError('Failed to generate a valid draw. Please try again.');
      } finally {
        setIsDrawing(false);
      }
    }, 600);
  };

  const handleReset = () => {
    setGroups(INITIAL_GROUPS);
    setError(null);
  };

  const handleShare = async () => {
    if (groups[0].teams.length === 0) return;

    const text = groups.map(g =>
      `Group ${g.name}\n${g.teams.map(t => `${t.name} (${(t.iso2 || '??').toUpperCase()})`).join('\n')}`
    ).join('\n\n');

    const shareText = `🏆 FIFA World Cup 2026 Draw Simulation\n\n${text}\n\nSimulate yours at: https://2026wc-simulator.netlify.app`;

    try {
      await navigator.clipboard.writeText(shareText);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-fade-in-down">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          <span className="font-bold">Draw copied to clipboard!</span>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-12 px-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-6">
            <img
              src="/world_cup_2026_logo.png"
              alt="FIFA World Cup 2026 Logo"
              className="h-32 md:h-40 object-contain drop-shadow-2xl"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            FIFA WORLD CUP <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">2026</span>
          </h1>
          <p className="text-xl text-slate-300 font-light tracking-wide uppercase mb-8">
            Official Draw Simulator
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <button
              onClick={handleDraw}
              disabled={isDrawing}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-blue-900/50 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isDrawing ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  SIMULATING...
                </span>
              ) : 'START DRAW'}
            </button>
            <button
              onClick={handleReset}
              disabled={isDrawing}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-10 rounded-full border border-white/20 transition-all active:scale-95"
            >
              RESET
            </button>
            <button
              onClick={handleShare}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-purple-900/50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
              SHARE
            </button>
            <Link
              href="/pots"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-emerald-900/50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              VIEW POTS
            </Link>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-8">
        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded shadow-sm flex items-center gap-3">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p className="font-medium">{error}</p>
          </div>
        )}

        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">GROUPS</h2>
            <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">12 Groups • 48 Teams</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {groups.map((group) => (
              <GroupCard key={group.name} group={group} />
            ))}
          </div>
        </div>


      </div>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>© 2025 World Cup Simulator. Not affiliated with FIFA.</p>
      </footer>
    </main>
  );
}
