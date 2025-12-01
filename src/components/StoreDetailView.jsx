import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer } from 'recharts';
import { Store, Users, Activity, Flame, Award, Target, TrendingUp } from 'lucide-react';
import StatCard from './StatCard';
import GroupStandingsTable from './GroupStandingsTable';
import StoreSearchBar from './StoreSearchBar';

const StoreDetailView = ({
    selectedStore,
    storeAnalytics,
    searchQuery,
    setSearchQuery,
    filteredStores,
    showDropdown,
    setShowDropdown,
    onStoreSelect,
    onClear
}) => {
    return (
        <>
            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-2xl relative z-50">
                <StoreSearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filteredStores={filteredStores}
                    showDropdown={showDropdown}
                    setShowDropdown={setShowDropdown}
                    onStoreSelect={onStoreSelect}
                    onClear={onClear}
                />
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Overall Rank"
                    value={`#${storeAnalytics.overallRank}`}
                    icon={Award}
                    gradient="from-yellow-500 to-orange-600"
                />
                <StatCard
                    title="Group Rank"
                    value={`#${storeAnalytics.rankInGroup} of ${storeAnalytics.groupInfo.storeCount}`}
                    icon={Target}
                    gradient="from-purple-500 to-purple-700"
                />
                <StatCard
                    title="Total Sales"
                    value={`$${(selectedStore.totalSales / 1000).toFixed(1)}K`}
                    icon={TrendingUp}
                    gradient="from-emerald-500 to-emerald-700"
                />
                <StatCard
                    title="Win Rate"
                    value={`${selectedStore.winRate}%`}
                    icon={Flame}
                    gradient="from-pink-500 to-pink-700"
                />
            </div>

            {/* Performance Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Stats List */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Store className="text-purple-400" />
                        Performance Stats
                    </h2>
                    <div className="space-y-4">
                        {[
                            { label: 'Matches Played', value: selectedStore.matches, color: 'text-white' },
                            { label: 'Wins', value: selectedStore.wins, color: 'text-emerald-400' },
                            { label: 'Losses', value: selectedStore.losses, color: 'text-red-400' },
                            { label: 'Points', value: selectedStore.points, color: 'text-white' },
                            { label: 'Average Sales', value: `$${selectedStore.avgSales.toFixed(0)}`, color: 'text-white' },
                            { label: 'Best Performance', value: `$${selectedStore.bestPerformance.toFixed(0)}`, color: 'text-emerald-400' },
                            { label: 'Worst Performance', value: `$${selectedStore.worstPerformance.toFixed(0)}`, color: 'text-red-400' }
                        ].map((stat) => (
                            <div key={stat.label} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-purple-200">{stat.label}</span>
                                <span className={`font-bold ${stat.color}`}>{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Radar Chart */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <Activity className="text-yellow-400" />
                        Performance Radar
                    </h2>
                    <ResponsiveContainer width="100%" height={350}>
                        <RadarChart data={storeAnalytics.radarData}>
                            <PolarGrid stroke="rgba(255,255,255,0.2)" />
                            <PolarAngleAxis dataKey="metric" tick={{ fill: '#fff', fontSize: 12 }} />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#fff' }} />
                            <Radar
                                name="Performance"
                                dataKey="value"
                                stroke="#8B5CF6"
                                fill="#8B5CF6"
                                fillOpacity={0.6}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(0,0,0,0.9)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                                formatter={(value) => `${value}%`}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Form */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Flame className="text-orange-400" />
                    Recent Form (Last 5 Matches)
                </h2>
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        {selectedStore.recentForm.map((result, idx) => (
                            <div
                                key={idx}
                                className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold ${result === 'W' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                                    }`}
                            >
                                {result}
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 text-purple-200">
                        <p className="text-sm">
                            {selectedStore.recentForm.filter(r => r === 'W').length} wins, {' '}
                            {selectedStore.recentForm.filter(r => r === 'L').length} losses in last 5 matches
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Users className="text-blue-400" />
                    {selectedStore.group} - Quick Stats
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                        <p className="text-purple-200 text-sm mb-1">Stores in Group</p>
                        <p className="text-white font-bold text-2xl">{storeAnalytics.groupInfo.storeCount}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                        <p className="text-purple-200 text-sm mb-1">Group Total Sales</p>
                        <p className="text-white font-bold text-2xl">${(storeAnalytics.groupInfo.totalSales / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                        <p className="text-purple-200 text-sm mb-1">Your Contribution</p>
                        <p className="text-white font-bold text-2xl">
                            {((selectedStore.totalSales / storeAnalytics.groupInfo.totalSales) * 100).toFixed(1)}%
                        </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                        <p className="text-purple-200 text-sm mb-1">vs Group Avg</p>
                        <p className={`font-bold text-2xl ${selectedStore.avgSales > storeAnalytics.groupInfo.avgSalesPerMatch
                            ? 'text-emerald-400' : 'text-red-400'
                            }`}>
                            {selectedStore.avgSales > storeAnalytics.groupInfo.avgSalesPerMatch ? '+' : ''}
                            {((selectedStore.avgSales - storeAnalytics.groupInfo.avgSalesPerMatch) / storeAnalytics.groupInfo.avgSalesPerMatch * 100).toFixed(1)}%
                        </p>
                    </div>
                </div>
            </div>

            {/* Group Standings Table */}
            <GroupStandingsTable
                groupName={selectedStore.group}
                standings={storeAnalytics.groupStandings}
                groupInfo={storeAnalytics.groupInfo}
            />
        </>
    );
};

export default StoreDetailView;