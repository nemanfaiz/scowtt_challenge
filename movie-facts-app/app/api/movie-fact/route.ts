import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a movie expert. Provide one interesting and lesser-known fact about the given movie. Keep the response concise and engaging.`;

async function generateMovieFact(movie: string) {
  if (!movie?.trim()) {
    throw new Error('Movie title is required');
  }

  return await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { 
        role: "user", 
        content: `Tell me one interesting fact about the movie "${movie}". Respond with just the fact, no introductions.`
      }
    ],
    temperature: 1.0,
    max_tokens: 50,
    seed: Math.floor(Math.random() * 1000000), 
    presence_penalty: 0.6, 
    frequency_penalty: 0.6, 

  });
}

export async function POST(req: Request) {
  try {
    const { movie } = await req.json();

    if (!movie) {
      return NextResponse.json(
        { error: 'Movie title is required' },
        { status: 400 }
      );
    }

    const completion = await generateMovieFact(movie);
    const fact = completion.choices[0].message.content;

    return NextResponse.json({ fact });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate movie fact' },
      { status: 500 }
    );
  }
}