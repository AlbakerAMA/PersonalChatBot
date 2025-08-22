import { NextApiRequest, NextApiResponse } from 'next';
import { searchGoogleDocuments } from '@/lib/googleDocs';

// Custom GPT-OSS LLM wrapper for OpenRouter
class GPTOSSLLM {
  async call(prompt: string): Promise<string> {
    try {
      const response = await fetch(process.env.GPT_OSS_API_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GPT_OSS_API_KEY}`,
          'HTTP-Referer': 'http://localhost:3000', 
          'X-Title': 'PersonalChatBot' 
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo', // You can change this to other models available on OpenRouter
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`OpenRouter API error ${response.status}:`, errorText);
        throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        return data.choices[0].message.content.trim();
      }
      
      return 'No response generated from the AI model.';
    } catch (error) {
      console.error('GPT-OSS API error:', error);
      return 'Sorry, I encountered an error while processing your request. Please check the server logs for details.';
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check if Google Docs environment variables are configured
    if (!process.env.GPT_OSS_API_URL || !process.env.GPT_OSS_API_KEY) {
      return res.status(500).json({ 
        error: 'GPT-OSS API not configured. Please check your environment variables.' 
      });
    }

    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_FOLDER_ID) {
      return res.status(500).json({ 
        error: 'Google Docs integration not configured. Please check your Google credentials.' 
      });
    }

    // Search for relevant documents from Google Docs
    const relevantDocs = await searchGoogleDocuments(message);
    
    // Create context-aware prompt
    const prompt = `You are a helpful AI assistant that can answer questions based on documents from the user's Google Drive.
    
Document content from Google Drive:
${relevantDocs}

User question: ${message}

Please provide a helpful and accurate response based on the Google Drive documents above. If the documents contain relevant information, use it to answer the question. If not, let the user know that the information isn't available in their documents.`;
    
    
    const llm = new GPTOSSLLM();
    const result = await llm.call(prompt);

    res.status(200).json({ reply: result });
  } catch (error) {
    console.error('Chat handler error:', error);
    res.status(500).json({ 
      error: 'Something went wrong. Please check your configuration and try again.' 
    });
  }
}