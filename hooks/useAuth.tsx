'use client'
import React, { 
  useState, 
  useEffect, 
  createContext, 
  useContext, 
  ReactNode,
  useCallback 
} from 'react';
import { User, AuthContextType, LoginRequest, SignupRequest, AuthSuccessResponse } from '../types/auth';
import * as authService from '../utils/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({children}: AuthProviderProps): JSX.Element {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const checkAuthStatus = useCallback(async (): Promise<void> => {
        try {
            const user = await authService.getCurrentUser();
            setUser(user);
        }
        catch(error) {
            console.log('Auth check error: ', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [])

    const login = useCallback(async ({email, password}: LoginRequest): Promise<AuthSuccessResponse> => {
        try {
            const result = await authService.loginUser({email, password} as LoginRequest)

            if (result.success) {
                await checkAuthStatus();
            }
            return result;
        } catch(error) {
            throw(error);
        }
    }, [checkAuthStatus]);

    const signup = useCallback(async (signupRequest: SignupRequest) => {
        try {
            const result = await authService.signupUser(signupRequest);
            if (result.success) {
                await checkAuthStatus();
            }

            return result;
        }
        catch(error) {
            throw error;
        }
    },[]);

    const logout = useCallback(async () => {
        try {
            const result = await authService.logoutUser();
            setUser(null);
            console.log("Called useAuth logout");
            console.log("User object: ", user);
        } catch(error) {
            console.log('Log out error: ', error);
            setUser(null);
        }
    },[]);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    const value: AuthContextType = {
        user,
        loading,
        login,
        signup,
        logout,
        checkAuthStatus,
        isAuthenticated: user !== null,
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