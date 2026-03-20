import React, { memo } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';

interface Activity {
  id: string;
  user: string;
  action: string;
  time: string;
  type: 'create' | 'update' | 'delete' | 'export';
}

interface RecentActivityProps {
  activities: Activity[];
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'create':
      return '#4caf50';
    case 'update':
      return '#2196f3';
    case 'delete':
      return '#f44336';
    case 'export':
      return '#ff9800';
    default:
      return '#9e9e9e';
  }
};

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <List sx={{ width: '100%' }}>
      {activities.map((activity) => (
        <ListItem
          key={activity.id}
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: getTypeColor(activity.type) }}>
              <CircleIcon sx={{ fontSize: 12 }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${activity.user} - ${activity.action}`}
            secondary={activity.time}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default memo(RecentActivity);
