import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './typedHooks';
import { loginSuccess, logout, updateUser } from '../store/slices/authSlice';
interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  avatar?: string;
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading, error } = useAppSelector((state: any) => state.auth);

  const login = useCallback(async () => {
    // Auto-login with mock credentials
    dispatch(loginSuccess({
      user: {
        id: '1',
        username: 'admin',
        email: 'admin@enterprise.com',
        role: 'admin',
        avatar: 'https://i.pravatar.cc/150?img=12',
      },
      token: 'mock-jwt-token-12345',
    }));
  }, [dispatch]);

  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    if (user && data) {
      dispatch(updateUser(data));
    }
  }, [dispatch, user]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout: logoutUser,
    updateProfile,
  };
};
