import React, { memo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RemoveIcon from '@mui/icons-material/Remove';

interface MetricCardProps {
  title: string;
  value: number | string;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, changeType, icon }) => {
  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return <TrendingUpIcon color="success" />;
      case 'negative':
        return <TrendingDownIcon color="error" />;
      default:
        return <RemoveIcon color="action" />;
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'success.main';
      case 'negative':
        return 'error.main';
      default:
        return 'text.secondary';
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" gutterBottom>
              {value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {getChangeIcon()}
              <Typography
                variant="body2"
                sx={{ color: getChangeColor() }}
              >
                {change > 0 ? '+' : ''}{change}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                vs last week
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default memo(MetricCard);
