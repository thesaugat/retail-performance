import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Trophy, Store, Crown } from 'lucide-react';

const GroupStandingsTable = ({ groupName, standings, groupInfo }) => {
    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Trophy className="text-yellow-400" size={28} />
                        {groupName}
                    </h3>
                    <p className="text-purple-200 text-sm mt-1">
                        {groupInfo?.matches || 0} matches played • {groupInfo?.storeCount || 0} stores
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-bold text-white">${(groupInfo?.totalSales / 1000 || 0).toFixed(0)}K</p>
                    <p className="text-purple-200 text-sm">Total Sales</p>
                </div>
            </div>

            {/* Mini Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-purple-200 text-xs mb-1">Avg Match</p>
                    <p className="text-white font-bold">${(groupInfo?.avgSalesPerMatch || 0).toFixed(0)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-purple-200 text-xs mb-1">Highest</p>
                    <p className="text-white font-bold">${(groupInfo?.highestMatch || 0).toFixed(0)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-purple-200 text-xs mb-1">Competitive</p>
                    <p className="text-white font-bold">{(100 - (groupInfo?.competitiveness || 0)).toFixed(0)}%</p>
                </div>
            </div>

            {/* Standings Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-white/30">
                            <th className="text-left py-3 px-2 text-purple-200 text-sm font-semibold w-12">#</th>
                            <th className="text-left py-3 px-4 text-purple-200 text-sm font-semibold">Store</th>
                            <th className="text-center py-3 px-2 text-purple-200 text-sm font-semibold">P</th>
                            <th className="text-center py-3 px-2 text-purple-200 text-sm font-semibold">W</th>
                            <th className="text-center py-3 px-2 text-purple-200 text-sm font-semibold">L</th>
                            <th className="text-right py-3 px-4 text-purple-200 text-sm font-semibold">Sales</th>
                            <th className="text-center py-3 px-4 text-purple-200 text-sm font-semibold">Form</th>
                            <th className="text-center py-3 px-2 text-purple-200 text-sm font-semibold">Pts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map((store) => (
                            <tr
                                key={store.store}
                                className={`border-b border-white/10 hover:bg-white/5 transition-all group ${store.position === 1 ? 'bg-yellow-500/10' :
                                    store.position === 2 ? 'bg-gray-400/10' :
                                        store.position === 3 ? 'bg-orange-500/10' : ''
                                    }`}
                            >
                                <td className="py-4 px-2">
                                    <div className="flex items-center justify-center">
                                        <span className={`font-bold text-lg ${store.position === 1 ? 'text-yellow-400' :
                                            store.position === 2 ? 'text-gray-300' :
                                                store.position === 3 ? 'text-orange-400' :
                                                    'text-purple-300'
                                            }`}>
                                            {store.position}
                                        </span>
                                        {store.position === 1 && <Crown className="text-yellow-400 ml-1" size={16} />}
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-2">
                                        <Store size={16} className="text-purple-400" />
                                        <span className="text-white font-semibold">{store.store}</span>
                                    </div>
                                </td>
                                <td className="text-center py-4 px-2 text-purple-200">{store.matches}</td>
                                <td className="text-center py-4 px-2 text-emerald-400 font-semibold">{store.wins}</td>
                                <td className="text-center py-4 px-2 text-red-400 font-semibold">{store.losses}</td>
                                <td className="text-right py-4 px-4">
                                    <div>
                                        <p className="text-white font-bold">${(store.totalSales / 1000).toFixed(1)}K</p>
                                        <p className="text-xs text-purple-300">${store.avgSales.toFixed(0)} avg</p>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center justify-center gap-1">
                                        {store.recentForm.map((result, idx) => (
                                            <div
                                                key={idx}
                                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${result === 'W'
                                                    ? 'bg-emerald-500 text-white'
                                                    : 'bg-red-500 text-white'
                                                    }`}
                                                title={result === 'W' ? 'Win' : 'Loss'}
                                            >
                                                {result}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="text-center py-4 px-2">
                                    <span className="bg-purple-600 text-white font-bold px-3 py-1 rounded-full text-sm">
                                        {store.points}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Performance Bar Chart */}
            {/* Performance Bar Chart */}
            <div className="mt-6">
                <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">
                    Store Performance Comparison
                </h4>

                <div className="w-full" style={{ minWidth: "0" }}>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart
                            data={standings}
                            layout="vertical"

                            // Smaller margins on mobile, normal on desktop
                            margin={{
                                top: 5,
                                right: 20,
                                left: window.innerWidth < 640 ? 50 : 100,
                                bottom: 5
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />

                            <XAxis
                                type="number"
                                stroke="#fff"
                                tick={{ fill: '#fff', fontSize: window.innerWidth < 640 ? 10 : 12 }}
                            />

                            <YAxis
                                type="category"
                                dataKey="store"
                                stroke="#fff"
                                tick={{ fill: '#fff', fontSize: window.innerWidth < 640 ? 10 : 12 }}
                                width={window.innerWidth < 640 ? 65 : 90}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(0,0,0,0.9)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                                formatter={(value) => [`$${value.toFixed(0)}`, 'Total Sales']}
                                cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                            />

                            <Bar
                                dataKey="totalSales"
                                radius={[0, 8, 8, 0]}
                                fill="#8B5CF6"
                            >
                                {standings.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            index === 0 ? '#FACC15' :
                                                index === 1 ? '#D1D5DB' :
                                                    index === 2 ? '#F97316' :
                                                        '#8B5CF6'
                                        }
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};

export default GroupStandingsTable;