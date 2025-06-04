'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

export function useAuthenticatedApi() {
  const { getAccessTokenSilently, isAuthenticated, user, loginWithRedirect } = useAuth0();

  const apiCall = useCallback(async (
    endpoint: string, 
    options: RequestInit = {}
  ) => {
    if (!isAuthenticated) {
      // Store current page to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      loginWithRedirect();
      return;
    }

    try {
      const accessToken = await getAccessTokenSilently();
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        ...options.headers,
      };

      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      if (response.status === 401) {
        // Token might be expired, try to refresh
        loginWithRedirect();
        return;
      }

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  }, [isAuthenticated, getAccessTokenSilently, loginWithRedirect]);

  return {
    user,
    isAuthenticated,
    apiCall,
  };
}