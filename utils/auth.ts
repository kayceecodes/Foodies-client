import { ApiResult } from "../types/api";
import { AuthError, AuthSuccessResponse, LoginRequest, LoginResponse, RegisterRequest, User } from "../types/auth"
import { API_BASE_URL,  } from '../constants/api';


export async function login(loginRequest: LoginRequest) {    
   try {
      const response = await fetch(API_BASE_URL + "/api/auth/login", {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(loginRequest)
      })

      const apiResult: ApiResult<LoginResponse> = await response.json().catch(() => {});

      if(!response.ok) {
               throw new AuthError(apiResult.message || 'Failed to log in', response.status);
      }

   return { success: true, message: apiResult.message || 'Login Successful' };
   } catch (error) {

      if (error instanceof AuthError) {
            throw error;
      }

      throw new AuthError('Network Error', 500);
   }
}

export const register = async (userData: RegisterRequest): Promise<AuthSuccessResponse> => {
   try {
        const response = await fetch(API_BASE_URL + "/api/auth/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
      },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

        const apiResult: ApiResult<null> = await response.json().catch(() => ({}));
        
        if (!response.ok || !apiResult.isSuccess) {
            throw new AuthError(
                  apiResult.message || 'Registration failed',
                  response.status
            );
        }

        return { success: true, message: apiResult.message || 'Registration successful' };
    } catch (error) {
        if (error instanceof AuthError) {
            throw error;
        }
            throw new AuthError('Network error during registration', 500);
    }
}

export const logout = async () => {
    const response = await fetch(API_BASE_URL + "/api/auth/logout", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        credentials: 'include',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to log out');
    }

    return response.json();
}

export async function getCurrentUser():Promise<User | null> {
   try {
      const response = await fetch(API_BASE_URL + '/api/users/me', {
            method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        credentials: 'include',
   }});       

      if (!response.ok) {
        if (response.status === 401) {
            throw new AuthError("Failed to login", response.status)
         } 
      }
      const apiResult: ApiResult<User> = await response.json();
      
      if (!apiResult.isSuccess || !apiResult.data) {
         return null;
      }

      return apiResult.data;
   } catch (error) {
      if (error instanceof AuthError && error.statusCode === 401) 
        return null; 
      
      console.error("Error getting current user", error);

      return null;
   }
}

export async function checkAuthentication(): Promise<boolean> {
   try {
      const response = await fetch(API_BASE_URL + "/api/auth/verify", {
         credentials: 'include'
      });

      if (!response.ok) {
         return false;
      }

      // Optionally parse the response to get more info
      const apiResult: ApiResult<any> = await response.json();
      return apiResult.isSuccess;
   } catch {
      return false;
   }
}

