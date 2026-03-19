import React, { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAppSelector } from '../hooks/typedHooks';
import RevenueChart from '../components/organisms/RevenueChart';
import UserActivityChart from '../components/organisms/UserActivityChart';
import MetricCard from '../components/molecules/MetricCard';
import RecentActivity from '../components/organisms/RecentActivity';
import PerformanceTable from '../components/organisms/PerformanceTable';

const DashboardPage: React.FC = () => {
  const { metrics, revenueData, userData, recentActivities, performanceData } = useAppSelector(
    (state) => state.dashboard
  );

  // useMemo calculations removed - not needed for display

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3} mb={3}>
        {metrics.map((metric) => (
          <Grid key={metric.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <MetricCard {...metric} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mb={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue Analytics
              </Typography>
              <RevenueChart data={revenueData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Activity
              </Typography>
              <UserActivityChart data={userData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <RecentActivity activities={recentActivities} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Metrics
              </Typography>
              <PerformanceTable data={performanceData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
