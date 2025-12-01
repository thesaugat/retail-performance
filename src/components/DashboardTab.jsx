import React, { useState, useMemo } from 'react';
import StoreDetailView from './StoreDetailView';
import DashboardOverview from './DashboardOverview';

const DashboardTab = ({ analytics, selectedMetric, setSelectedMetric }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStore, setSelectedStore] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    // Filter stores for search
    const filteredStores = useMemo(() => {
        if (!searchQuery) return [];
        return analytics.storePerformance
            .filter(store => store.store.toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, 10);
    }, [searchQuery, analytics.storePerformance]);

    // Top stores based on metric
    const topStores = useMemo(() => {
        return [...analytics.storePerformance]
            .sort((a, b) => b[selectedMetric] - a[selectedMetric])
            .slice(0, 10);
    }, [analytics.storePerformance, selectedMetric]);

    // Store selection handlers
    const handleStoreSelect = (store) => {
        setSelectedStore(store);
        setSearchQuery(store.store);
        setShowDropdown(false);
    };

    const handleClearStore = () => {
        setSelectedStore(null);
        setSearchQuery('');
        setShowDropdown(false);
    };

    // Calculate store analytics
    const storeAnalytics = useMemo(() => {
        if (!selectedStore) return null;

        const groupInfo = analytics.groupStats.find(g => g.group === selectedStore.group);
        const groupStandings = analytics.groupStandings[selectedStore.group] || [];
        const rankInGroup = groupStandings.findIndex(s => s.store === selectedStore.store) + 1;
        const allStores = [...analytics.storePerformance].sort((a, b) => b.totalSales - a.totalSales);
        const overallRank = allStores.findIndex(s => s.store === selectedStore.store) + 1;

        const radarData = [
            { metric: 'Sales', value: (selectedStore.totalSales / groupInfo.totalSales * 100).toFixed(0) },
            { metric: 'Win Rate', value: selectedStore.winRate },
            { metric: 'Avg Sales', value: (selectedStore.avgSales / groupInfo.avgSalesPerMatch * 100).toFixed(0) },
            { metric: 'Consistency', value: Math.max(0, 100 - parseFloat(selectedStore.consistency)) },
            { metric: 'Points', value: (selectedStore.points / (selectedStore.matches * 3) * 100).toFixed(0) }
        ];

        return { groupInfo, rankInGroup, overallRank, radarData, groupStandings };
    }, [selectedStore, analytics]);

    // Render store detail or overview
    if (selectedStore && storeAnalytics) {
        return (
            <StoreDetailView
                selectedStore={selectedStore}
                storeAnalytics={storeAnalytics}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredStores={filteredStores}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
                onStoreSelect={handleStoreSelect}
                onClear={handleClearStore}
            />
        );
    }

    return (
        <DashboardOverview
            analytics={analytics}
            selectedMetric={selectedMetric}
            setSelectedMetric={setSelectedMetric}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredStores={filteredStores}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            onStoreSelect={handleStoreSelect}
            topStores={topStores}
        />
    );
};

export default DashboardTab;