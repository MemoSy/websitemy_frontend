# AI Chat Integration with Gemini API

This guide explains how to integrate the AI Chat feature with Google's Gemini API for more advanced responses.

## 🚀 Current Implementation

The AI Chat is currently working with a mock response system that has knowledge of all your projects. It can answer questions about:

- Project prices and costs
- Technologies used
- Project categories
- Specific project details
- Development timelines
- Company information

## 🔧 To Integrate with Real Gemini API

### 1. Install Required Packages

```bash
npm install @google/generative-ai
```

### 2. Get Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your environment variables

### 3. Create .env File

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

### 4. Update aiUtils.ts

Replace the `callGeminiAPI` function in `src/utils/aiUtils.ts`:

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const callGeminiAPI = async (message: string, context: AIKnowledgeBase): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
    You are an AI assistant for WebSiteMy, a web development company. 
    You have access to the following information about the company and its projects:
    
    Company Info: ${JSON.stringify(context.companyInfo, null, 2)}
    Projects: ${JSON.stringify(context.projects, null, 2)}
    Categories: ${JSON.stringify(context.categories, null, 2)}
    
    User Question: ${message}
    
    Please provide a helpful, accurate response in Arabic. Focus on the company's projects, 
    services, and capabilities. Be professional and informative.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    // Fallback to mock response
    return generateAIResponse(message);
  }
};
```

### 5. Update AIChat.tsx

Replace the mock API call in `src/pages/AIChat.tsx`:

```typescript
// Replace the setTimeout with actual API call
const aiResponseText = await callGeminiAPI(inputText, generateKnowledgeBase());
const aiResponse: Message = {
  id: (Date.now() + 1).toString(),
  text: aiResponseText,
  isUser: false,
  timestamp: new Date()
};

setMessages(prev => [...prev, aiResponse]);
setIsLoading(false);
```

## 📊 Project Data Structure

Each project now includes `aiData` field with:

```typescript
interface AIProjectData {
  price: string;                    // Project cost
  clientType: string;              // Type of client
  complexity: "بسيط" | "متوسط" | "متقدم" | "معقد";
  teamSize: string;                // Development team size
  keyFeatures: string[];           // Main project features
  clientFeedback: string;          // Client testimonial
  maintenance?: string;            // Maintenance info
  specialRequirements?: string[];  // Special requirements
}
```

## 🎯 Features

✅ **Current Features:**
- Mock AI responses with project knowledge
- Chat interface with message history
- Real-time typing indicators
- Responsive design
- Quick action buttons

🔄 **With Gemini Integration:**
- More natural conversations
- Better context understanding
- Dynamic response generation
- Multilingual support
- Advanced reasoning

## 🚀 Usage Examples

Users can ask questions like:

- "ما سعر تطوير متجر إلكتروني؟"
- "أريد معرفة مشاريع التجارة الإلكترونية"
- "كم تستغرق مدة تطوير موقع؟"
- "ما هي التقنيات المستخدمة؟"
- "أريد رؤية مشروع شكاوي حلب"

## 📝 Notes

- The current implementation works perfectly without API integration
- All project data is included in the AI knowledge base
- The system is ready for Gemini API integration when needed
- Mock responses are comprehensive and cover all project information
