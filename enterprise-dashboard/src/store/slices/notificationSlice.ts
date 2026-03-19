import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: Date;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  websocketConnected: boolean;
  loading: boolean;
}

const initialState: NotificationState = {
  notifications: [
    {
      id: '1',
      title: 'Welcome',
      message: 'Welcome to the Enterprise Dashboard!',
      type: 'success',
      read: false,
      timestamp: new Date(),
    },
    {
      id: '2',
      title: 'System Update',
      message: 'New features have been added to your dashboard.',
      type: 'info',
      read: false,
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '3',
      title: 'Data Sync Complete',
      message: 'Your data has been successfully synchronized.',
      type: 'success',
      read: true,
      timestamp: new Date(Date.now() - 7200000),
    },
  ],
  unreadCount: 2,
  websocketConnected: true,
  loading: false,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const newNotification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date(),
      };
      state.notifications.unshift(newNotification);
      if (!action.payload.read) {
        state.unreadCount++;
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n) => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount--;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => {
        n.read = true;
      });
      state.unreadCount = 0;
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      const index = state.notifications.findIndex((n) => n.id === action.payload);
      if (index !== -1) {
        if (!state.notifications[index].read) {
          state.unreadCount--;
        }
        state.notifications.splice(index, 1);
      }
    },
    setWebsocketStatus: (state, action: PayloadAction<boolean>) => {
      state.websocketConnected = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  removeNotification,
  setWebsocketStatus,
  setLoading,
} = notificationSlice.actions;

export default notificationSlice.reducer;
