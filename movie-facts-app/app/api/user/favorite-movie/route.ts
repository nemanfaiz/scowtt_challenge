import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

type MovieRequest = {
  movie: string;
};

async function validateSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error('Not authenticated');
  }
  return session.user.email;
}

async function validateRequest(req: Request): Promise<string> {
  const data = await req.json();
  if (!data.movie) {
    throw new Error('Movie title is required');
  }
  return data.movie;
}

async function updateUserFavoriteMovie(email: string, movie: string) {
  return prisma.user.update({
    where: { email },
    data: {
      favoriteMovie: movie,
      isFirstLogin: false,
    },
  });
}

export async function POST(req: Request) {
  try {
    const userEmail = await validateSession();
    const movieTitle = await validateRequest(req);
    const updatedUser = await updateUserFavoriteMovie(userEmail, movieTitle);

    return NextResponse.json({
      success: true,
      user: updatedUser
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    const status = message === 'Not authenticated' ? 401 : 400;

    console.error('Error in favorite movie update:', message);
    return NextResponse.json({ error: message }, { status });
  }
}