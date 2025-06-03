import axios from 'axios';
import { Message } from '../types/chat';

interface ChatResponse {
  message: string;
}

export const sendMessage = async (
  message: string,
  conversationHistory: Message[]
): Promise<ChatResponse> => {
  try {
    const response = await axios.post('/api/chat', {
      message,
      conversationHistory
    });
    
    return response.data;
  } catch (error) {
    console.error('Error in chat service:', error);
    throw error;
  }
};