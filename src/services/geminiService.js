import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPTS = {
  EXPLAIN: `You are MDRLearning AI, a highly intelligent and empathetic tutor. 
Your goal is to explain complex academic concepts in a way that is easy to understand.
Use analogies, break down topics into steps, and encourage the student.
If the student asks about a specific subject, tailor your explanation to that field.`,
  
  QUIZ: `You are MDRLearning AI, a Socratic tutor. 
Instead of giving answers directly, you test the student's knowledge.
Ask one question at a time related to their topic. 
Wait for their response, provide constructive feedback, and then move to the next question.
Your goal is to help them prepare for exams through active recall.`,
  
  SUMMARY: `You are MDRLearning AI, a master of synthesis. 
Your task is to take academic materials or topics and provide clear, structured, and concise summaries.
Use bullet points, bold key terms, and highlight the most important takeaways.
Ensure the summary is high-density but readable.`
};

export const chatWithAI = async (messages, mode = 'EXPLAIN', subject = 'General') => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: `${SYSTEM_PROMPTS[mode]} The current subject is: ${subject}.`
    });

    const chat = model.startChat({
      history: messages.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
    });

    const result = await chat.sendMessage(messages[messages.length - 1].content);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
