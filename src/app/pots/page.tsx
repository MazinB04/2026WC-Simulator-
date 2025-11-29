import React from 'react';
import Link from 'next/link';
import { PotsDisplay } from '@/components/PotsDisplay';

export default function PotsPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Hero Section */}
            <div className="bg-slate-900 text-white py-8 px-4 shadow-xl relative overflow-hidden mb-8">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600"></div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="flex justify-center mb-6">
                        <img
                            src="/world_cup_2026_logo.png"
                            alt="FIFA World Cup 2026 Logo"
                            className="h-24 md:h-32 object-contain drop-shadow-2xl"
                        />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
                        TOURNAMENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">POTS</span>
                    </h1>

                    <div className="flex justify-center">
                        <Link
                            href="/"
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-full border border-white/20 transition-all active:scale-95 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            BACK TO SIMULATOR
                        </Link>
                    </div>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            </div>

            <div className="max-w-[1600px] mx-auto p-4 md:p-8">
                <PotsDisplay />
            </div>

            <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm mt-auto">
                <p>© 2025 World Cup Simulator. Not affiliated with FIFA.</p>
            </footer>
        </main>
    );
}
