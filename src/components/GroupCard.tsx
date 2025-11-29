import React from 'react';
import { Group } from '@/lib/types';
import { TeamCard } from './TeamCard';

interface GroupCardProps {
    group: Group;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600"></div>
                <h3 className="font-black text-2xl tracking-tight">GROUP {group.name}</h3>
            </div>
            <div className="p-4 flex flex-col gap-3 flex-grow bg-slate-50/50">
                {group.teams.map((team) => (
                    <TeamCard key={team.id} team={team} />
                ))}
                {Array.from({ length: 4 - group.teams.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-[62px] border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-sm font-medium bg-slate-50">
                        Slot {group.teams.length + i + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};
