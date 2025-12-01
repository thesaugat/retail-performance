import React from 'react';
import GroupStandingsTable from './GroupStandingsTable';

const StandingsTab = ({ analytics, standingsGroupFilter, setStandingsGroupFilter }) => {
    const filteredGroupStandings = standingsGroupFilter === 'all'
        ? Object.entries(analytics.groupStandings)
        : Object.entries(analytics.groupStandings).filter(([groupName]) => groupName === standingsGroupFilter);

    return (
        <>
            {/* Group Filter Buttons */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-2xl">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setStandingsGroupFilter('all')}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${standingsGroupFilter === 'all'
                                ? 'bg-purple-600 text-white shadow-lg'
                                : 'bg-white/10 text-purple-200 hover:bg-white/20'
                            }`}
                    >
                        All Groups
                    </button>
                    {analytics.groupStats.map((group) => (
                        <button
                            key={group.group}
                            onClick={() => setStandingsGroupFilter(group.group)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${standingsGroupFilter === group.group
                                    ? 'bg-purple-600 text-white shadow-lg'
                                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                                }`}
                        >
                            {group.group.replace('Group ', 'G')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Standings Tables */}
            <div className="grid grid-cols-1 gap-6">
                {filteredGroupStandings
                    .sort(([a], [b]) => {
                        const aNum = parseInt(a.replace('Group ', ''));
                        const bNum = parseInt(b.replace('Group ', ''));
                        return aNum - bNum;
                    })
                    .map(([groupName, standings]) => {
                        const groupInfo = analytics.groupStats.find(g => g.group === groupName);
                        return (
                            <GroupStandingsTable
                                key={groupName}
                                groupName={groupName}
                                standings={standings}
                                groupInfo={groupInfo}
                            />
                        );
                    })}
            </div>
        </>
    );
};

export default StandingsTab;