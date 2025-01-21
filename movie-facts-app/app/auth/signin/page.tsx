import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthButton } from "@/components/auth/auth-button";
import { authOptions } from "@/lib/auth";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Welcome to Movie Profile</h1>
        <p className="text-gray-500">Please sign in to continue</p>
        <AuthButton />
      </div>
    </div>
  );
}