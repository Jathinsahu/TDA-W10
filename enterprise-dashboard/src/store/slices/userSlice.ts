import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  totalUsers: number;
}

const initialState: UserState = {
  users: [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'active', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'active', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'inactive', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Manager', status: 'active', avatar: 'https://i.pravatar.cc/150?img=5' },
  ],
  currentUser: null,
  loading: false,
  error: null,
  totalUsers: 5,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.totalUsers = action.payload.length;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.totalUsers++;
    },
    updateUser: (state, action: PayloadAction<{ id: string; data: Partial<User> }>) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload.data };
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
      state.totalUsers--;
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  setCurrentUser,
  setLoading,
  setError,
} = userSlice.actions;

export default userSlice.reducer;
