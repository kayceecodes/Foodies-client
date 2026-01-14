'use client'
import React, {
  createContext,
  useContext,
  ReactNode,
  JSX
} from 'react';
import { User, AuthContextType, LoginRequest, SignupRequest, AuthSuccessResponse } from '../../types/auth';
import {
  useCurrentUserQuery,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} from './useAuthQueries';
import { QueryObserverRefetchErrorResult } from '@tanstack/react-query';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({children}: AuthProviderProps): JSX.Element {
    // Explicitly type the query result
    const { data: user, isLoading: loading, } = useCurrentUserQuery();
    const { mutateAsync: loginMutate } = useLoginMutation();
    const { mutateAsync: signupMutate } = useSignupMutation();
    const { mutateAsync: logoutMutate } = useLogoutMutation();

    const login = async (loginRequest: LoginRequest): Promise<AuthSuccessResponse> => {
        return await loginMutate(loginRequest);
    };

    const signup = async (signupRequest: SignupRequest): Promise<AuthSuccessResponse> => {
        return await signupMutate(signupRequest);
    };

    const logout = async (): Promise<void> => {
        await logoutMutate();
    };

    const value: AuthContextType = {
        user: user ?? null, // ensure user is never undefined
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user, // explicitly check if user exists
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}