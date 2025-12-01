import React, { useState, useMemo, useEffect } from 'react';
import { LayoutDashboard, Table, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { fetchSalesData } from '../api/salesApi';
import { processAnalytics } from '../utils/analytics';
import DashboardTab from './DashboardTab';
import StandingsTab from './StandingsTab';
import Footer from './Footer';
import logo from '../assets/logo.png';

const Dashboard = () => {
    const [selectedMetric, setSelectedMetric] = useState('totalSales');
    const [rawData, setRawData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [standingsGroupFilter, setStandingsGroupFilter] = useState('all');

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchSalesData();
            setRawData(data);
            setLastUpdated(new Date());
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const analytics = useMemo(() => processAnalytics(rawData), [rawData]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-purple-400 animate-spin mx-auto mb-4" />
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Loading Dashboard...</h2>
                    <p className="text-sm md:text-base text-purple-200">Fetching latest sales data</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 max-w-md w-full">
                    <AlertCircle className="w-12 h-12 md:w-16 md:h-16 text-red-400 mx-auto mb-4" />
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2 text-center">Error Loading Data</h2>
                    <p className="text-sm md:text-base text-purple-200 mb-4 text-center">{error}</p>
                    <p className="text-xs md:text-sm text-purple-300 mb-6 text-center">
                        Make sure you're running: <code className="bg-black/30 px-2 py-1 rounded text-xs">npm run dev</code>
                    </p>
                    <button
                        onClick={fetchData}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={20} />
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (rawData.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 mx-auto mb-4" />
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2">No Data Available</h2>
                    <p className="text-sm md:text-base text-purple-200">No sales data found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-3 sm:p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">

                {/* Header - Mobile Optimized */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 border border-white/20 shadow-2xl">
                    {/* Logo and Title Section */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3">
                        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 md:gap-4 w-full sm:flex-1">
                            {/* Logo */}
                            <img
                                src={logo}
                                alt="StarPhones SPL Logo"
                                className="w-28 h-12 sm:w-36 sm:h-14 md:w-40 md:h-16 object-contain animate-pulse drop-shadow-[0_0_12px_rgba(34,197,94,0.6)]"
                            />

                            {/* Title Section */}
                            <div className="text-center sm:text-left flex-1 min-w-0">
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight mb-1">
                                    Sales Tournament Analytics
                                </h1>
                                <p className="text-purple-200 text-xs sm:text-sm md:text-base">Live Data from StarPhones SPL</p>
                                {lastUpdated && (
                                    <p className="text-purple-300 text-[10px] sm:text-xs mt-1">
                                        Last updated: {lastUpdated.toLocaleString()}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Refresh Button */}
                        <button
                            onClick={fetchData}
                            disabled={loading}
                            className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg border border-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
                        >
                            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                            Refresh
                        </button>
                    </div>

                    {/* Tabs - Mobile Optimized */}
                    <div className="flex gap-2 mt-3 sm:mt-4">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-lg font-semibold transition-all text-xs sm:text-sm md:text-base ${activeTab === 'dashboard'
                                    ? 'bg-purple-600 text-white shadow-lg'
                                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                                }`}
                        >
                            <LayoutDashboard size={16} className="sm:w-[18px] sm:h-[18px]" />
                            <span className="hidden xs:inline">Dashboard</span>
                            <span className="xs:hidden">Dash</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('standings')}
                            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-lg font-semibold transition-all text-xs sm:text-sm md:text-base ${activeTab === 'standings'
                                    ? 'bg-purple-600 text-white shadow-lg'
                                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                                }`}
                        >
                            <Table size={16} className="sm:w-[18px] sm:h-[18px]" />
                            <span className="hidden xs:inline">Standings</span>
                            <span className="xs:hidden">Groups</span>
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'dashboard' && (
                    <DashboardTab
                        analytics={analytics}
                        selectedMetric={selectedMetric}
                        setSelectedMetric={setSelectedMetric}
                    />
                )}

                {activeTab === 'standings' && (
                    <StandingsTab
                        analytics={analytics}
                        standingsGroupFilter={standingsGroupFilter}
                        setStandingsGroupFilter={setStandingsGroupFilter}
                    />
                )}

                {/* Footer Component */}
                <Footer lastUpdated={lastUpdated} />
            </div>
        </div>
    );
};

export default Dashboard;