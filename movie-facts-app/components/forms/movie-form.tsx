'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Film } from "lucide-react";

export function MovieForm() {
  const [movie, setMovie] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!movie.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/user/favorite-movie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movie: movie.trim() }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save movie');
      }

      toast({
        title: "Success!",
        description: "Your favorite movie has been saved.",
      });

      setTimeout(() => {
        router.refresh();
        router.push('/profile');
      }, 1000);
    } catch (error) {
      console.error('Error saving movie:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save your favorite movie. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
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
        >
          <Card className="bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl">
            <CardHeader>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    delay: 0.3 
                  }}
                  className="mx-auto w-12 h-12 bg-white/5 rounded-full flex items-center justify-center"
                >
                  <Film className="w-6 h-6 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  What's your favorite movie?
                </h2>
              </motion.div>
            </CardHeader>
            <CardContent>
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Input
                    type="text"
                    value={movie}
                    onChange={(e) => setMovie(e.target.value)}
                    placeholder="Enter your favorite movie"
                    disabled={isLoading}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40
                             focus:border-white/20 focus:ring-white/10 h-12 text-lg"
                  />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-white/10 hover:bg-white/20 text-white h-12 text-lg
                             hover:text-white transition-all duration-200 [&>*]:text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Saving...</span>
                      </motion.div>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}