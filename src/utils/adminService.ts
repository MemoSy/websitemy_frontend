const API_BASE_URL = 'https://websitemy-backend.vercel.app'; // Adjust to your backend URL

// Fetch with timeout
const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface ChatData {
  _id: string;
  sessionId: string;
  userIP: string;
  userAgent: string;
  country: string;
  city: string;
  messages: Array<{
    id: string;
    text: string;
    isUser: boolean;
    timestamp: string;
  }>;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
  totalMessages: number;
  lastActivity: string;
}

// Admin authentication
export const adminLogin = async (credentials: AdminCredentials): Promise<AdminLoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (data.success && data.token) {
      // Store in both localStorage and sessionStorage for redundancy
      localStorage.setItem('adminToken', data.token);
      sessionStorage.setItem('adminToken', data.token);
      
      // Verify token was saved
      await new Promise(resolve => setTimeout(resolve, 50));
      const saved = localStorage.getItem('adminToken') === data.token;
      console.log('✅ Token saved successfully:', saved);
      if (!saved) {
        console.error('❌ Token not saved properly');
      }
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'حدث خطأ في الاتصال'
    };
  }
};

export const adminLogout = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    if (!token) {
      console.log('ℹ️ No token to logout');
      return true;
    }

    console.log('👋 Logging out...');
    await fetch(`${API_BASE_URL}/admin/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    localStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminToken');
    console.log('✅ Logout successful');
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    localStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminToken');
    return true;
  }
};

export const verifyAdminToken = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    if (!token) {
      console.log('❌ No token found for verification');
      return false;
    }

    console.log('🔐 Verifying token...');
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/admin/verify`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest',
        },
      },
      10000 // 10 second timeout
    );

    if (response.status === 401) {
      console.log('❌ Token verification failed: 401 Unauthorized');
      return false;
    }

    if (!response.ok) {
      console.log('❌ Token verification failed:', response.status);
      return false;
    }

    const data = await response.json();
    console.log('✅ Token verification result:', data.success);
    return data.success;
  } catch (error) {
    console.error('❌ Token verification error:', error);
    // Don't remove token on errors - let the app decide what to do
    // Return true on network errors to keep user logged in
    if (error instanceof Error && error.message === 'REQUEST_TIMEOUT') {
      console.log('⚠️ Timeout during verification - keeping user logged in');
      return true; // Keep user logged in on timeout
    }
    return false;
  }
};

export const getAllChats = async (): Promise<ChatData[]> => {
  try {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    if (!token) {
      console.log('❌ No token found in storage');
      throw new Error('NO_TOKEN');
    }

    console.log('📤 Fetching chats with token:', token.substring(0, 20) + '...');
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/admin/chats`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest',
        },
      },
      15000 // 15 second timeout
    );

    console.log('📥 Response status:', response.status);
    
    if (response.status === 401) {
      console.log('❌ 401 Unauthorized - Token rejected by /admin/chats');
      // Token expired or invalid - but don't remove yet, let the app handle it
      throw new Error('UNAUTHORIZED');
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch chats: ${response.status}`);
    }

    const result = await response.json();
    return result.data || [];
  } catch (error: any) {
    console.error('Error fetching chats:', error);
    if (error.name === 'AbortError') {
      throw new Error('REQUEST_TIMEOUT');
    }
    throw error;
  }
};

export const getAdminAnalytics = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) throw new Error('No admin token');

    const response = await fetch(`${API_BASE_URL}/admin/analytics`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch analytics');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};

export const isAdminLoggedIn = (): boolean => {
  const localToken = localStorage.getItem('adminToken');
  const sessionToken = sessionStorage.getItem('adminToken');
  
  // If one exists but not the other, sync them
  if (localToken && !sessionToken) {
    sessionStorage.setItem('adminToken', localToken);
  } else if (sessionToken && !localToken) {
    localStorage.setItem('adminToken', sessionToken);
  }
  
  return !!(localToken || sessionToken);
};
