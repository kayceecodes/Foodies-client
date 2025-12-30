import { httpClient } from "./httpClient";
import { AuthError, AuthSuccessResponse, LoginRequest, LoginResponse, SignupRequest, SignupResponse, User } from "../types/auth"

export async function loginUser(loginRequest: LoginRequest) {
   try {
        const response = await httpClient.post<LoginResponse>("/api/auth/login", loginRequest);

        return {
          success: true,
          message: response.message || 'Login Successful'
        };
   } catch (error) {
      if (error instanceof AuthError) {
            throw error;
      }

      throw new AuthError(error instanceof Error ? error.message : 'Network Error', 500);
   }
}

export const signupUser = async (signupRequest: SignupRequest): Promise<AuthSuccessResponse> => {
   try {
        const response = await httpClient.post<SignupResponse>("/api/auth/register", signupRequest);

        return {
                success: true,
                message: response.message || 'Registration successful',
            };
    } catch (error) {
        if (error instanceof AuthError) {
            throw error;
        }
            throw new AuthError(error instanceof Error ? error.message : 'Network error during registration', 500);
    }
}

export const logoutUser = async (): Promise<AuthSuccessResponse> => {
    try {
        const response = await httpClient.post<object>("/api/auth/logout", {});

        return {
          success: true,
          message: response.message || 'Logged out successfully'
        };
    } catch (error) {
        if (error instanceof AuthError) {
            throw error;
        }
        throw new AuthError(error instanceof Error ? error.message : 'Network error during logout', 500);
    }
}

export const _logoutUser = async () => {
    const response = await httpClient.post<object>("/api/auth/logout", {});

    return response;
}

export async function getCurrentUser():Promise<User | null> {
   try {
      const response = await httpClient.get<User>('/api/users/me');

      if (!response.isSuccess || !response.data) {
         return null;
      }

      return response.data;
   } catch (error) {
      if (error instanceof AuthError && error.statusCode === 401)
        return null;

      console.error("Error getting current user", error);

      return null;
   }
}

export async function checkAuthentication(): Promise<boolean> {
   try {
      const response = await httpClient.get<any>("/api/auth/verify");

      console.log("API returned object key apiResult.isSuccess: ", response.isSuccess );
      return response.isSuccess;
   } catch {
      return false;
   }
}