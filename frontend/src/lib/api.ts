import { AuthResponse } from './types';

const API_BASE = import.meta.env.VITE_API_URL || '';

let accessTokenInMemory: string | null = null;

export function setAccessToken(token: string | null) {
  accessTokenInMemory = token;
}

export function getAccessToken(): string | null {
  return accessTokenInMemory;
}

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
  retryOn401?: boolean;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { skipAuth = false, retryOn401 = true, ...fetchOptions } = options;

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;

  const headers = new Headers(fetchOptions.headers || {});
  if (!headers.has('Content-Type') && !(fetchOptions.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (!skipAuth && accessTokenInMemory) {
    headers.set('Authorization', `Bearer ${accessTokenInMemory}`);
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
    credentials: 'include', // Includes httpOnly cookies
  });

  // If unauthorized and retry is allowed, try silent refresh
  if (response.status === 401 && retryOn401 && !endpoint.includes('/api/auth/refresh') && !endpoint.includes('/api/auth/login')) {
    try {
      const refreshRes = await fetch(`${API_BASE}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (refreshRes.ok) {
        const refreshData: AuthResponse = await refreshRes.json();
        if (refreshData.accessToken) {
          setAccessToken(refreshData.accessToken);
          // Retry original request with new token
          return apiRequest<T>(endpoint, { ...options, retryOn401: false });
        }
      }
    } catch {
      // Refresh failed
      setAccessToken(null);
    }
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    const error: any = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data as T;
}
