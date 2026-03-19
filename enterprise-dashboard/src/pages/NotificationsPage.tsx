import React from 'react';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleIcon from '@mui/icons-material/Circle';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import { useAppSelector, useAppDispatch } from '../hooks/typedHooks';
import { markAsRead, markAllAsRead, removeNotification } from '../store/slices/notificationSlice';

const NotificationsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notifications, unreadCount } = useAppSelector((state) => state.notifications);

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const handleRemove = (id: string) => {
    dispatch(removeNotification(id));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Notifications</Typography>
        <Button
          variant="outlined"
          onClick={handleMarkAllAsRead}
          disabled={unreadCount === 0}
        >
          Mark All as Read
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Badge badgeContent={unreadCount} color="error">
                  <Typography variant="h6">
                    {unreadCount} Unread Notification{unreadCount !== 1 ? 's' : ''}
                  </Typography>
                </Badge>
              </Box>
              <List>
                {notifications.map((notification) => (
                  <ListItem
                    key={notification.id}
                    sx={{
                      bgcolor: notification.read ? 'transparent' : 'action.hover',
                      borderRadius: 1,
                      mb: 1,
                    }}
                    secondaryAction={
                      <>
                        {!notification.read && (
                          <IconButton
                            edge="end"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <CheckCircleIcon />
                          </IconButton>
                        )}
                        <IconButton
                          edge="end"
                          onClick={() => handleRemove(notification.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CircleIcon
                            sx={{
                              fontSize: 8,
                              color: notification.read ? 'text.secondary' : 'primary.main',
                            }}
                          />
                          <Typography variant="subtitle1">{notification.title}</Typography>
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2">{notification.message}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(notification.timestamp).toLocaleString()}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notification Settings
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Configure your notification preferences to stay updated with important alerts and updates.
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Notification Types
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="System Updates" secondary="New features and improvements" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="User Activities" secondary="Team member actions" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Data Sync" secondary="Synchronization status" />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotificationsPage;
