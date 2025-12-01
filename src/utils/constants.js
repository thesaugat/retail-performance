/**
 * Application Constants
 */

// Color palette for charts
export const CHART_COLORS = [
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#6366F1', // Indigo
  '#14B8A6', // Teal
  '#F97316', // Orange
  '#84CC16'  // Lime
];

// Gradient configurations for stat cards
export const CARD_GRADIENTS = {
  purple: 'from-purple-500 to-purple-700',
  pink: 'from-pink-500 to-pink-700',
  blue: 'from-blue-500 to-blue-700',
  emerald: 'from-emerald-500 to-emerald-700',
  orange: 'from-orange-500 to-orange-700'
};

// Competition metrics
export const POINTS_PER_WIN = 3;
export const POINTS_PER_LOSS = 0;

// Group tier descriptions
export const GROUP_TIERS = {
  premium: [1, 2, 3],
  midTier: [4, 5, 6],
  developing: [7, 8, 9, 10]
};

// Chart configurations
export const CHART_CONFIG = {
  colors: {
    grid: 'rgba(255,255,255,0.1)',
    axis: '#fff',
    tooltip: {
      background: 'rgba(0,0,0,0.9)',
      border: 'none',
      borderRadius: '12px'
    }
  },
  animation: {
    duration: 300
  }
};

// Metric options for filtering
export const METRIC_OPTIONS = [
  { value: 'totalSales', label: 'Total Sales' },
  { value: 'avgSales', label: 'Average Sales' },
  { value: 'points', label: 'Points' },
  { value: 'winRate', label: 'Win Rate' }
];

// Date range
export const TOURNAMENT_DATES = {
  start: '28/11/2025',
  end: '30/11/2025',
  duration: 3
};
