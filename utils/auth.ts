import { ApiResult } from "../types/api";
import { AuthError, User } from "../types/auth"

export async function getCurrentUser():Promise<User | null> {
   try {
      const response = await fetch('/api/users/me', {
            credentials: 'include'
         }
      )       

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

export async function checkAuth() {
   try {
      const response = await fetch('/api/auth/verify', {
         credentials: 'include'
      })

      return response.ok;
   } catch(error) {
      return false;
   }
}

