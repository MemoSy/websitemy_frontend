const API_BASE_URL = (
  import.meta.env.VITE_BACKEND_URL || 'https://websitemy-backend.vercel.app'
).replace(/\/$/, '');

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
  visitorKey?: string;
  clientFingerprint?: string;
  deviceInfo?: Record<string, any>;
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
  reviewStatus?: string;
  adminNote?: string;
  leadStatus?: string;
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
  console.log('🚪 adminLogout called');
  try {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    if (!token) {
      console.log('ℹ️ No token to logout');
      localStorage.removeItem('adminToken');
      sessionStorage.removeItem('adminToken');
      return true;
    }

    console.log('👋 Logging out with token:', token.substring(0, 20) + '...');
    
    try {
      await fetch(`${API_BASE_URL}/admin/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      console.log('📤 Logout request sent to backend');
    } catch (fetchError) {
      console.warn('⚠️ Backend logout request failed (continuing anyway):', fetchError);
    }

    localStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminToken');
    console.log('✅ Token removed from storage');
    console.log('✅ Logout successful');
    return true;
  } catch (error) {
    console.error('❌ Logout error:', error);
    localStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminToken');
    return true;
  }
};

export const verifyAdminToken = async (): Promise<boolean> => {
  // No verification needed - if token exists, it's valid
  const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
  return !!token;
};

export const getAllChats = async (): Promise<ChatData[]> => {
  const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
  if (!token) {
    throw new Error('NO_TOKEN');
  }

  console.log('📤 Fetching chats...');
  const response = await fetchWithTimeout(
    `${API_BASE_URL}/admin/chats`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
    },
    15000
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch chats: ${response.status}`);
  }

  const result = await response.json();
  console.log('✅ Fetched', result.data?.length || 0, 'chats');
  return result.data || [];
};

export const updateChatReview = async (
  sessionId: string,
  data: Pick<ChatData, 'reviewStatus' | 'leadStatus' | 'adminNote'>
): Promise<ChatData> => {
  const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
  if (!token) {
    throw new Error('NO_TOKEN');
  }

  const response = await fetchWithTimeout(
    `${API_BASE_URL}/admin/chats/${encodeURIComponent(sessionId)}/review`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(data),
    },
    15000
  );

  if (!response.ok) {
    throw new Error(`Failed to update chat review: ${response.status}`);
  }

  const result = await response.json();
  return result.data;
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
