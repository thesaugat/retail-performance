/**
 * Sales Data Utility Functions
 * Helper functions for processing tournament sales data
 */

/**
 * Parse CSV data string into array of objects
 * @param {string} csvData - Raw CSV string
 * @returns {Array} Array of match objects
 */
export const parseCSVData = (csvData) => {
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return {
      Date: values[0],
      Group: values[1],
      No: values[2],
      Matches: values[3],
      Team1: values[4],
      Team2: values[5],
      Team1Sales: parseFloat(values[6]),
      Team2Sales: parseFloat(values[7]),
      Winner: values[8],
      Loser: values[9],
      Winner_1: parseFloat(values[10]),
      Loser_2: parseFloat(values[11]),
      TotalWinner: parseFloat(values[12]),
      TotalLoser: parseFloat(values[13])
    };
  });
};

/**
 * Calculate group statistics
 * @param {Array} matches - Array of match data
 * @returns {Object} Group statistics
 */
export const calculateGroupStats = (matches) => {
  const groupStats = {};
  
  matches.forEach(match => {
    const group = match.Group;
    const matchSales = match.Team1Sales + match.Team2Sales;
    const margin = Math.abs(match.Team1Sales - match.Team2Sales);

    if (!groupStats[group]) {
      groupStats[group] = {
        group,
        groupNumber: parseInt(group.replace('Group ', '')),
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

    groupStats[group].totalSales += matchSales;
    groupStats[group].matches += 1;
    groupStats[group].highestMatch = Math.max(groupStats[group].highestMatch, matchSales);
    groupStats[group].lowestMatch = Math.min(groupStats[group].lowestMatch, matchSales);
    groupStats[group].stores.add(match.Team1);
    groupStats[group].stores.add(match.Team2);
    groupStats[group].totalMargin += margin;
    groupStats[group].closestMatch = Math.min(groupStats[group].closestMatch, margin);
  });

  // Calculate derived metrics
  Object.values(groupStats).forEach(group => {
    group.avgSalesPerMatch = group.totalSales / group.matches;
    group.avgMargin = group.totalMargin / group.matches;
    group.storeCount = group.stores.size;
    group.competitiveness = group.avgMargin / group.avgSalesPerMatch * 100;
  });

  return Object.values(groupStats).sort((a, b) => a.groupNumber - b.groupNumber);
};

/**
 * Calculate store performance metrics
 * @param {Array} matches - Array of match data
 * @returns {Array} Store performance data
 */
export const calculateStorePerformance = (matches) => {
  const storePerformance = {};

  matches.forEach(match => {
    [match.Team1, match.Team2].forEach((store, idx) => {
      const sales = idx === 0 ? match.Team1Sales : match.Team2Sales;
      const isWinner = store === match.Winner;

      if (!storePerformance[store]) {
        storePerformance[store] = {
          store,
          group: match.Group,
          groupNumber: parseInt(match.Group.replace('Group ', '')),
          totalSales: 0,
          matches: 0,
          wins: 0,
          losses: 0,
          avgSales: 0,
          points: 0,
          bestPerformance: 0,
          worstPerformance: Infinity
        };
      }

      storePerformance[store].totalSales += sales;
      storePerformance[store].matches += 1;
      storePerformance[store].bestPerformance = Math.max(
        storePerformance[store].bestPerformance,
        sales
      );
      storePerformance[store].worstPerformance = Math.min(
        storePerformance[store].worstPerformance,
        sales
      );

      if (isWinner) {
        storePerformance[store].wins += 1;
        storePerformance[store].points += 3;
      } else {
        storePerformance[store].losses += 1;
      }
    });
  });

  // Calculate derived metrics
  Object.values(storePerformance).forEach(store => {
    store.avgSales = store.totalSales / store.matches;
    store.winRate = ((store.wins / store.matches) * 100).toFixed(1);
    store.consistency = (
      ((store.bestPerformance - store.worstPerformance) / store.avgSales) * 100
    ).toFixed(1);
  });

  return Object.values(storePerformance);
};

/**
 * Format currency
 * @param {number} value - Number to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value) => {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  }
  return `$${value.toFixed(0)}`;
};

/**
 * Get color for ranking
 * @param {number} rank - Rank position (0-indexed)
 * @returns {string} Color class
 */
export const getRankColor = (rank) => {
  if (rank === 0) return 'text-yellow-400';
  if (rank === 1) return 'text-gray-300';
  if (rank === 2) return 'text-orange-400';
  return 'text-purple-300';
};

/**
 * Get competitiveness level
 * @param {number} competitiveness - Competitiveness score
 * @returns {Object} Level info
 */
export const getCompetitivenessLevel = (competitiveness) => {
  const adjusted = 100 - competitiveness;
  
  if (adjusted >= 90) {
    return { level: 'Very High', color: 'text-green-400' };
  }
  if (adjusted >= 70) {
    return { level: 'High', color: 'text-yellow-400' };
  }
  return { level: 'Moderate', color: 'text-red-400' };
};
