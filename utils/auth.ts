import { ApiResult } from "../types/api";
import { AuthError, AuthSuccessResponse, LoginRequest, LoginResponse, SignupRequest, SignupResponse, User } from "../types/auth"
import { API_BASE_URL,  } from '../constants/api';


export async function loginUser(loginRequest: LoginRequest) {    
   try {
        const response = await fetch(API_BASE_URL + "/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(loginRequest)
        })

        let apiResult: ApiResult<LoginResponse>;
        try {
            apiResult = await response.json();
        } catch(jsonError) {
            throw new AuthError('Invalid server response', response.status);
        }

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

export const signupUser = async (signupRequest: SignupRequest): Promise<AuthSuccessResponse> => {
   try {
        const response = await fetch(API_BASE_URL + "/api/auth/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
      },
        credentials: 'include',
        body: JSON.stringify(signupRequest),
      });

        let apiResult: ApiResult<SignupResponse>;
        try {
            apiResult = await response.json();
        } catch(jsonError) {
            throw new AuthError('Invalid server response', response.status);
        }

        if (!response.ok || !apiResult.isSuccess) {
            const errors = apiResult.errors?.join("\n");
            throw new AuthError(
                  errors || 'Registration failed',
                  response.status
            );
        }

        return { 
                success: true, 
                message: apiResult.message || 'Registration successful', 
            };
    } catch (error) {
        if (error instanceof AuthError) {
            throw error;
        }
            throw new AuthError('Network error during registration', 500);
    }
}

export const logoutUser = async (): Promise<AuthSuccessResponse> => {
    try {
        const response = await fetch(API_BASE_URL + "/api/auth/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        let apiResult: ApiResult<object>;
        try {
            apiResult = await response.json();
        } catch {
            throw new AuthError('Invalid server response', response.status);
        }

        if (!response.ok) {
            throw new AuthError(apiResult.message || 'Failed to log out', response.status);
        }

        return { success: true, message: apiResult.message || 'Logged out successfully' };
    } catch (error) {
        if (error instanceof AuthError) {
            throw error;
        }
        throw new AuthError('Network error during logout', 500);
    }
}

export const _logoutUser = async () => {
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
        },
        credentials: 'include',
      });       

      if (!response.ok) {
        if (response.status === 401) {
            throw new AuthError("Failed to get current user data: ", response.status)
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
      console.log("API returned object key apiResult.isSuccess: ", apiResult.isSuccess );
      return apiResult.isSuccess;
   } catch {
      return false;
   }
}

