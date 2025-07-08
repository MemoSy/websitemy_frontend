const API_BASE_URL = 'https://backend-three-tawny-29.vercel.app'; // Adjust to your backend URL

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatSession {
  sessionId: string;
  messages: ChatMessage[];
  keywords?: string[];
}

// Generate a unique session ID
export const generateSessionId = (): string => {
  return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Extract keywords from messages for analytics
export const extractKeywords = (messages: ChatMessage[]): string[] => {
  const keywords: string[] = [];
  const commonKeywords = [
    'سعر', 'أسعار', 'تكلفة', 'مشروع', 'مشاريع', 'تقنية', 'تقنيات',
    'تطوير', 'تصميم', 'ويب', 'موقع', 'مواقع', 'تطبيق', 'تطبيقات',
    'تجارة', 'إلكترونية', 'متجر', 'متاجر', 'بيانات', 'قاعدة',
    'أندرويد', 'iOS', 'React', 'Angular', 'Vue', 'JavaScript',
    'Python', 'Node.js', 'MongoDB', 'MySQL'
  ];

  messages.forEach(message => {
    if (message.isUser) {
      const text = message.text.toLowerCase();
      commonKeywords.forEach(keyword => {
        if (text.includes(keyword.toLowerCase()) && !keywords.includes(keyword)) {
          keywords.push(keyword);
        }
      });
    }
  });

  return keywords;
};

// Save chat session
export const saveChatSession = async (sessionData: ChatSession): Promise<void> => {
  try {
    const keywords = extractKeywords(sessionData.messages);
    
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: sessionData.sessionId,
        messages: sessionData.messages,
        keywords,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save chat session');
    }
  } catch (error) {
    console.error('Error saving chat session:', error);
  }
};

// Update existing chat session
export const updateChatSession = async (sessionId: string, messages: ChatMessage[]): Promise<void> => {
  try {
    const keywords = extractKeywords(messages);
    
    const response = await fetch(`${API_BASE_URL}/chat/session/${sessionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        keywords,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update chat session');
    }
  } catch (error) {
    console.error('Error updating chat session:', error);
  }
};

// Add a single message to existing chat
export const addMessageToChat = async (sessionId: string, message: ChatMessage): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/session/${sessionId}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error('Failed to add message to chat');
    }
  } catch (error) {
    console.error('Error adding message to chat:', error);
  }
};

// Get chat session by ID
export const getChatSession = async (sessionId: string): Promise<ChatSession | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/session/${sessionId}`);
    
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching chat session:', error);
    return null;
  }
};

// Get chat analytics
export const getChatAnalytics = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/analytics`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch chat analytics');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching chat analytics:', error);
    return null;
  }
};
