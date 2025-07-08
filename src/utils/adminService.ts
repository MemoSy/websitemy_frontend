const API_BASE_URL = 'https://backend-three-tawny-29.vercel.app'; // Adjust to your backend URL

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
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (data.success && data.token) {
      localStorage.setItem('adminToken', data.token);
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
    const token = localStorage.getItem('adminToken');
    if (!token) return true;

    await fetch(`${API_BASE_URL}/admin/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    localStorage.removeItem('adminToken');
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    localStorage.removeItem('adminToken');
    return true;
  }
};

export const verifyAdminToken = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) return false;

    const response = await fetch(`${API_BASE_URL}/admin/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
};

export const getAllChats = async (): Promise<ChatData[]> => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) throw new Error('No admin token');

    const response = await fetch(`${API_BASE_URL}/admin/chats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch chats');
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching chats:', error);
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
  return !!localStorage.getItem('adminToken');
};
