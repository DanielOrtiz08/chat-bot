import { Handler } from '@netlify/functions';
import { OpenAI } from 'openai';

// This would typically come from environment variables
// For a real app, set this in Netlify environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

interface Message {
  role: string;
  content: string;
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse request body
    const { message, conversationHistory } = JSON.parse(event.body || '{}');
    
    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    // Format conversation history for OpenAI
    const formattedHistory: Message[] = conversationHistory.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    }));

    // Add system message to guide the model
    const systemMessage: Message = {
      role: 'system',
      content: 'You are a helpful assistant specializing in technology and information. Provide accurate, concise, and helpful responses about technology, programming, digital trends, and information sciences. Keep responses informative but concise.'
    };

    // Add user's current message
    const userMessage: Message = {
      role: 'user',
      content: message,
    };

    // Check if OpenAI API key is set
    if (!OPENAI_API_KEY) {
      // For development without API key, return a mock response
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "This is a mock response since no OpenAI API key is configured. In a production environment, I would connect to OpenAI to provide a real answer about: " + message
        }),
      };
    }

    // Prepare messages array with system message, history, and current message
    const messages = [systemMessage, ...formattedHistory, userMessage];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 1000,
    });

    // Extract response
    const responseMessage = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return {
      statusCode: 200,
      body: JSON.stringify({ message: responseMessage }),
    };
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

export { handler };