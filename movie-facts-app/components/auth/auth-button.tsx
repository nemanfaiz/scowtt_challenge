"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function AuthButton() {
  return (
    <Button 
      className="w-full bg-white hover:bg-white/90 text-black text-lg h-12"
      onClick={() => signIn('google')}
    >
      Sign in with Google
    </Button>
  );
}