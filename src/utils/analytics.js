// Data processing and analytics calculations

/**
 * Process raw match data into analytics
 */
export const processAnalytics = (rawData) => {
    if (rawData.length === 0) {
        return {
            groupStats: [],
            storePerformance: [],
            dailyPerformance: [],
            matchMargins: [],
            groupStandings: {}
        };
    }

    const groupStats = {};
    const storePerformance = {};
    const dailyPerformance = {};
    const matchMargins = [];

    // Process each match
    rawData.forEach(match => {
        const group = match.Group;
        const date = match.Date;
        const matchSales = match.Team1Sales + match.Team2Sales;
        const margin = Math.abs(match.Team1Sales - match.Team2Sales);

        // Initialize group stats
        if (!groupStats[group]) {
            groupStats[group] = {
                group,
                groupNumber: parseInt(group.replace('Group ', '')) || 0,
                totalSales: 0,
                matches: 0,
                avgSalesPerMatch: 0,
                highestMatch: 0,
                lowestMatch: Infinity,
                stores: new Set(),
                totalMargin: 0,
                closestMatch: Infinity
            };
        }

        // Update group stats
        groupStats[group].totalSales += matchSales;
        groupStats[group].matches += 1;
        groupStats[group].highestMatch = Math.max(groupStats[group].highestMatch, matchSales);
        groupStats[group].lowestMatch = Math.min(groupStats[group].lowestMatch, matchSales);
        groupStats[group].stores.add(match.Team1);
        groupStats[group].stores.add(match.Team2);
        groupStats[group].totalMargin += margin;
        groupStats[group].closestMatch = Math.min(groupStats[group].closestMatch, margin);

        // Process store performance
        [match.Team1, match.Team2].forEach((store, idx) => {
            const sales = idx === 0 ? match.Team1Sales : match.Team2Sales;
            const isWinner = store === match.Winner;

            if (!storePerformance[store]) {
                storePerformance[store] = {
                    store,
                    group,
                    groupNumber: parseInt(group.replace('Group ', '')) || 0,
                    totalSales: 0,
                    matches: 0,
                    wins: 0,
                    losses: 0,
                    avgSales: 0,
                    points: 0,
                    bestPerformance: 0,
                    worstPerformance: Infinity,
                    recentForm: []
                };
            }

            storePerformance[store].totalSales += sales;
            storePerformance[store].matches += 1;
            storePerformance[store].bestPerformance = Math.max(storePerformance[store].bestPerformance, sales);
            storePerformance[store].worstPerformance = Math.min(storePerformance[store].worstPerformance, sales);
            storePerformance[store].recentForm.push(isWinner ? 'W' : 'L');

            if (isWinner) {
                storePerformance[store].wins += 1;
                storePerformance[store].points += 3;
            } else {
                storePerformance[store].losses += 1;
            }
        });

        // Daily performance
        if (!dailyPerformance[date]) {
            dailyPerformance[date] = { date, totalSales: 0, matches: 0 };
        }
        dailyPerformance[date].totalSales += matchSales;
        dailyPerformance[date].matches += 1;

        matchMargins.push({ group, margin, matchSales });
    });

    // Calculate derived metrics for groups
    Object.values(groupStats).forEach(group => {
        group.avgSalesPerMatch = group.totalSales / group.matches;
        group.avgMargin = group.totalMargin / group.matches;
        group.storeCount = group.stores.size;
        group.competitiveness = group.avgMargin / group.avgSalesPerMatch * 100;
    });

    // Calculate derived metrics for stores
    Object.values(storePerformance).forEach(store => {
        store.avgSales = store.totalSales / store.matches;
        store.winRate = (store.wins / store.matches * 100).toFixed(1);
        store.consistency = ((store.bestPerformance - store.worstPerformance) / store.avgSales * 100).toFixed(1);
        store.recentForm = store.recentForm.slice(-5);
    });

    // Create group standings
    const groupStandings = {};
    Object.keys(groupStats).forEach(group => {
        groupStandings[group] = Object.values(storePerformance)
            .filter(s => s.group === group)
            .sort((a, b) => {
                if (b.points !== a.points) return b.points - a.points;
                if (b.wins !== a.wins) return b.wins - a.wins;
                return b.totalSales - a.totalSales;
            })
            .map((store, index) => ({
                ...store,
                position: index + 1,
                positionChange: 0
            }));
    });

    return {
        groupStats: Object.values(groupStats).sort((a, b) => a.groupNumber - b.groupNumber),
        storePerformance: Object.values(storePerformance),
        dailyPerformance: Object.values(dailyPerformance),
        matchMargins,
        groupStandings
    };
};