import React from 'react';
import { Team } from '@/lib/types';

interface TeamCardProps {
    team: Team;
    compact?: boolean;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team, compact = false }) => {
    const confColors: Record<string, string> = {
        UEFA: 'bg-blue-50 text-blue-700 border-blue-200',
        CONMEBOL: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        CONCACAF: 'bg-red-50 text-red-700 border-red-200',
        CAF: 'bg-green-50 text-green-700 border-green-200',
        AFC: 'bg-purple-50 text-purple-700 border-purple-200',
        OFC: 'bg-teal-50 text-teal-700 border-teal-200',
    };

    const colorClass = confColors[team.confederation] || 'bg-gray-50 text-gray-700 border-gray-200';

    return (
        <div className={`flex items-center gap-3 p-3 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow ${compact ? 'py-2' : ''}`}>
            {team.iso2 ? (
                <img
                    src={`https://flagcdn.com/w40/${team.iso2}.png`}
                    srcSet={`https://flagcdn.com/w80/${team.iso2}.png 2x`}
                    width="28"
                    height="20"
                    alt={`${team.name} flag`}
                    className="rounded border border-gray-100 object-cover shadow-sm"
                    style={{ width: '28px', height: '20px' }}
                />
            ) : (
                <div className="w-7 h-5 bg-gray-200 rounded flex items-center justify-center text-[10px] text-gray-500">?</div>
            )}

            <div className="flex flex-col leading-tight">
                <span className={`font-semibold text-slate-800 ${compact ? 'text-sm' : 'text-base'} truncate max-w-[120px] md:max-w-none`}>
                    {team.name}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full w-fit mt-0.5 border ${colorClass}`}>
                    {team.confederation}
                </span>
            </div>
        </div>
    );
};
