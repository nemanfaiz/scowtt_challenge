// lib/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function getMovieFact(movieName: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a movie expert who provides interesting and lesser-known facts about movies."
        },
        {
          role: "user",
          content: `Tell me one interesting fact about the movie "${movieName}". Keep it brief and engaging.`
        }
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content || "No fact available.";
  } catch (error) {
    console.error('Error getting movie fact:', error);
    return "Unable to fetch movie fact at this time.";
  }
}