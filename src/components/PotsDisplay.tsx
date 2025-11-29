import React from 'react';
import { POTS } from '@/lib/data';
import { TeamCard } from './TeamCard';

export const PotsDisplay: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[1, 2, 3, 4].map((potNum) => (
                <div key={potNum} className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                    <div className="bg-slate-100 p-3 border-b border-slate-200">
                        <h3 className="font-bold text-lg text-slate-800 text-center">Pot {potNum}</h3>
                    </div>
                    <div className="p-4 flex flex-col gap-2 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300">
                        {POTS[potNum as 1 | 2 | 3 | 4].map((team) => (
                            <TeamCard key={team.id} team={team} compact />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
