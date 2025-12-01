import React from 'react';
import { ComposedChart, Area, Bar, Line, PieChart, Pie, Cell, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Target, Store, Users, Calendar, Activity, Award } from 'lucide-react';
import StatCard from './StatCard';
import StoreSearchBar from './StoreSearchBar';

const DashboardOverview = ({
    analytics,
    selectedMetric,
    setSelectedMetric,
    searchQuery,
    setSearchQuery,
    filteredStores,
    showDropdown,
    setShowDropdown,
    onStoreSelect,
    topStores
}) => {
    const COLORS = ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#6366F1', '#14B8A6', '#F97316', '#84CC16'];

    const groupComparisonData = analytics.groupStats.map(g => ({
        group: g.group.replace('Group ', 'G'),
        totalSales: g.totalSales,
        avgMatch: g.avgSalesPerMatch,
        stores: g.storeCount,
        competitiveness: 100 - g.competitiveness
    }));

    return (
        <>
            {/* Search & Filter Bar */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-2xl relative z-50">
                <div className="flex flex-col md:flex-row gap-3">
                    <StoreSearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        filteredStores={filteredStores}
                        showDropdown={showDropdown}
                        setShowDropdown={setShowDropdown}
                        onStoreSelect={onStoreSelect}
                    />
                    <select
                        value={selectedMetric}
                        onChange={(e) => setSelectedMetric(e.target.value)}
                        className="bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
                    >
                        <option value="totalSales">Total Sales</option>
                        <option value="avgSales">Average Sales</option>
                        <option value="points">Points</option>
                        <option value="winRate">Win Rate</option>
                    </select>
                </div>
            </div>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard
                    title="Total Sales"
                    value={`$${(analytics.groupStats.reduce((sum, g) => sum + g.totalSales, 0) / 1000).toFixed(0)}K`}
                    icon={TrendingUp}
                    gradient="from-purple-500 to-purple-700"
                />
                <StatCard
                    title="Total Matches"
                    value={analytics.groupStats.reduce((sum, g) => sum + g.matches, 0)}
                    icon={Target}
                    gradient="from-pink-500 to-pink-700"
                />
                <StatCard
                    title="Active Stores"
                    value={analytics.storePerformance.length}
                    icon={Store}
                    gradient="from-blue-500 to-blue-700"
                />
                <StatCard
                    title="Groups"
                    value={analytics.groupStats.length}
                    icon={Users}
                    gradient="from-emerald-500 to-emerald-700"
                />
                <StatCard
                    title="Days"
                    value={analytics.dailyPerformance.length}
                    icon={Calendar}
                    gradient="from-orange-500 to-orange-700"
                />
            </div>

            {/* Comparison Chart */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Activity className="text-yellow-400" />
                    Group Performance Comparison
                </h2>
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={groupComparisonData}>
                        <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.3} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="group" stroke="#fff" />
                        <YAxis yAxisId="left" stroke="#fff" />
                        <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(0,0,0,0.9)',
                                border: 'none',
                                borderRadius: '12px',
                                color: '#fff',
                                padding: '12px'
                            }}
                            formatter={(value, name) => {
                                if (name === 'totalSales') return [`$${value.toFixed(0)}`, 'Total Sales'];
                                if (name === 'avgMatch') return [`$${value.toFixed(0)}`, 'Avg Match'];
                                if (name === 'competitiveness') return [`${value.toFixed(1)}%`, 'Competitive Index'];
                                return [value, name];
                            }}
                        />
                        <Legend />
                        <Area yAxisId="left" type="monotone" dataKey="totalSales" fill="url(#colorSales)" stroke="#8B5CF6" strokeWidth={2} name="Total Sales" />
                        <Bar yAxisId="left" dataKey="avgMatch" fill="#EC4899" name="Avg Match Sales" radius={[8, 8, 0, 0]} />
                        <Line yAxisId="right" type="monotone" dataKey="competitiveness" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 5 }} name="Competitive Index" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* Distribution Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-4">Sales Distribution</h2>
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie
                                data={analytics.groupStats}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ group, percent }) => `${group.replace('Group ', 'G')}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={120}
                                dataKey="totalSales"
                            >
                                {analytics.groupStats.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
                                formatter={(value) => `$${value.toFixed(0)}`}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-4">Daily Performance Trend</h2>
                    <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={analytics.dailyPerformance}>
                            <defs>
                                <linearGradient id="colorDaily" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="date" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
                                formatter={(value) => `$${value.toFixed(0)}`}
                            />
                            <Area type="monotone" dataKey="totalSales" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorDaily)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Award className="text-yellow-400" />
                    Top 10 Performing Stores
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topStores.map((store, index) => (
                        <div
                            key={store.store}
                            onClick={() => onStoreSelect(store)}
                            className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all hover:scale-105 cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full ${index === 0 ? 'bg-yellow-500 text-yellow-900' :
                                        index === 1 ? 'bg-gray-300 text-gray-800' :
                                            index === 2 ? 'bg-orange-500 text-orange-900' :
                                                'bg-purple-500/30 text-purple-300'
                                        }`}>
                                        #{index + 1}
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold text-sm">{store.store}</p>
                                        <p className="text-xs text-purple-200">{store.group}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-white">
                                        {selectedMetric === 'totalSales' && `$${(store.totalSales / 1000).toFixed(1)}K`}
                                        {selectedMetric === 'avgSales' && `$${store.avgSales.toFixed(0)}`}
                                        {selectedMetric === 'points' && `${store.points} pts`}
                                        {selectedMetric === 'winRate' && `${store.winRate}%`}
                                    </p>
                                    <p className="text-sm text-emerald-400">{store.wins}W-{store.losses}L</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DashboardOverview;