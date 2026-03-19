import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MetricCard {
  id: string;
  title: string;
  value: number | string;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

interface ChartDataPoint {
  name: string;
  value: number;
  target?: number;
  previous?: number;
}

interface DashboardState {
  metrics: MetricCard[];
  revenueData: ChartDataPoint[];
  userData: ChartDataPoint[];
  performanceData: ChartDataPoint[];
  recentActivities: any[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

const initialState: DashboardState = {
  metrics: [
    { id: '1', title: 'Total Revenue', value: '$124,563', change: 12.5, changeType: 'positive', icon: 'attach_money' },
    { id: '2', title: 'Active Users', value: '8,432', change: 8.2, changeType: 'positive', icon: 'people' },
    { id: '3', title: 'Orders', value: '1,234', change: -2.4, changeType: 'negative', icon: 'shopping_cart' },
    { id: '4', title: 'Conversion Rate', value: '3.24%', change: 0.8, changeType: 'positive', icon: 'trending_up' },
  ],
  revenueData: [
    { name: 'Mon', value: 4000, target: 3800, previous: 3500 },
    { name: 'Tue', value: 3000, target: 3200, previous: 2800 },
    { name: 'Wed', value: 5000, target: 4500, previous: 4200 },
    { name: 'Thu', value: 2780, target: 3000, previous: 2600 },
    { name: 'Fri', value: 1890, target: 2000, previous: 1800 },
    { name: 'Sat', value: 2390, target: 2200, previous: 2100 },
    { name: 'Sun', value: 3490, target: 3200, previous: 3000 },
  ],
  userData: [
    { name: 'Mon', value: 2400 },
    { name: 'Tue', value: 1398 },
    { name: 'Wed', value: 9800 },
    { name: 'Thu', value: 3908 },
    { name: 'Fri', value: 4800 },
    { name: 'Sat', value: 3800 },
    { name: 'Sun', value: 4300 },
  ],
  performanceData: [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ],
  recentActivities: [
    { id: '1', user: 'John Doe', action: 'Created new project', time: '2 minutes ago', type: 'create' },
    { id: '2', user: 'Sarah Smith', action: 'Updated dashboard settings', time: '15 minutes ago', type: 'update' },
    { id: '3', user: 'Mike Johnson', action: 'Deleted old reports', time: '1 hour ago', type: 'delete' },
    { id: '4', user: 'Emily Brown', action: 'Exported analytics data', time: '2 hours ago', type: 'export' },
    { id: '5', user: 'Alex Wilson', action: 'Added new team member', time: '3 hours ago', type: 'create' },
  ],
  loading: false,
  error: null,
  lastUpdated: new Date(),
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setMetrics: (state, action: PayloadAction<MetricCard[]>) => {
      state.metrics = action.payload;
      state.lastUpdated = new Date();
    },
    addMetric: (state, action: PayloadAction<MetricCard>) => {
      state.metrics.push(action.payload);
      state.lastUpdated = new Date();
    },
    updateMetric: (state, action: PayloadAction<{ id: string; data: Partial<MetricCard> }>) => {
      const index = state.metrics.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.metrics[index] = { ...state.metrics[index], ...action.payload.data };
        state.lastUpdated = new Date();
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    refreshData: (state) => {
      state.lastUpdated = new Date();
    },
  },
});

export const {
  setMetrics,
  addMetric,
  updateMetric,
  setLoading,
  setError,
  refreshData,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
