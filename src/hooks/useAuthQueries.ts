// hooks/useAuthQueries.ts - USE AUTH FUNCTIONS
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { loginUser, signupUser, logoutUser, getCurrentUser } from '../../utils/auth';

export const AUTH_QUERY_KEYS = {
  currentUser: ['currentUser'] as const,
  isAuthenticated: ['isAuthenticated'] as const,
} as const;

export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.currentUser,
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
    },
  });
};

export const useSignupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEYS.currentUser, null);
      queryClient.clear(); // Clear all queries
    },
  });
};