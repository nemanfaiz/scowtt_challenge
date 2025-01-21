import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { MovieForm } from "@/components/forms/movie-form";
import { UserProfile } from "@/components/profile/user-profile";
import { authOptions } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user) {
    redirect("/");
  }

  if (user.isFirstLogin || !user.favoriteMovie) {
    return (
        <MovieForm />
    );
  }

  const userData = {
    name: session.user.name || null,
    email: session.user.email || null,
    image: session.user.image || null,
  };

  return (
    <div className="container mx-auto py-8">
      <UserProfile 
        user={userData}
        favoriteMovie={user.favoriteMovie} 
      />
    </div>
  );
}