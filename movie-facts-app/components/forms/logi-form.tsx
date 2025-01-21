'use client';

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

export function LoginForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8,
        ease: "easeOut"
      }}
      className="w-full max-w-md perspective-1000"
    >
      <motion.div
        whileHover={{ scale: 1.02, rotateX: 5 }}
        transition={{ duration: 0.2 }}
        className="bg-black/20 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl"
      >
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8 space-y-3"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Movie Profile
          </h1>
          <p className="text-white/60">Continue with Google to get started</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            className="w-full bg-white hover:bg-white/90 text-black text-lg h-12"
            onClick={() => signIn('google')}
          >
            Sign in with Google
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}