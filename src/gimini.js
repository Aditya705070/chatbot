
import { GoogleGenAI } from '@google/genai';

let API_KEY = import.meta.env.VITE_API_KEY;

async function main(prompt) {
  const ai = new GoogleGenAI({
    apiKey: API_KEY,
  });

  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    responseMimeType: 'text/plain',
    maxTokens: 20, 
   };

  const model = 'gemini-1.5-flash'; // Replace with an available model

  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt, // Replace with your prompt
        },
      ],
    },
  ];

  try {
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let fullResponse = '';
    for await (const chunk of response) {
      fullResponse += chunk.text;
    }
    const limitedResponse = fullResponse.split(' ').slice(0, 20).join(' ');
    // console.log('Full AI Response:', fullResponse);
    return limitedResponse;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return null;
  }
}

export default main;


