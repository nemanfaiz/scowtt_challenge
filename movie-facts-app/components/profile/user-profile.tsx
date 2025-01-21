'use client';

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import { ProfileHeader } from "./profile-header";
import { FavoriteMovie } from "./favorite-movie";
import { MovieFact } from "./movie-fact";

interface UserProfileProps {
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
  favoriteMovie: string;
}

export function UserProfile({ user, favoriteMovie }: UserProfileProps) {
  const [movieFact, setMovieFact] = useState<string>("");
  const [isLoadingFact, setIsLoadingFact] = useState(false);
  const { toast } = useToast();

  const fetchMovieFact = async () => {
    setIsLoadingFact(true);
    try {
      const response = await fetch('/api/movie-fact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movie: favoriteMovie }),
      });

      if (!response.ok) throw new Error('Failed to fetch movie fact');
      const data = await response.json();
      setMovieFact(data.fact);
    } catch (error) {
      console.error('Error fetching movie fact:', error);
      toast({
        title: "Error",
        description: "Failed to fetch movie fact. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingFact(false);
    }
  };

  useEffect(() => {
    fetchMovieFact();
  }, [favoriteMovie]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl mx-auto p-4"
    >
      <Card className="overflow-hidden backdrop-blur-xl border-primary/10">
        <div className="p-6 space-y-8">
          <ProfileHeader 
            image={user.image}
            name={user.name}
            email={user.email}
          />
          
          <FavoriteMovie movie={favoriteMovie} />
          
          <MovieFact 
            movieFact={movieFact}
            isLoading={isLoadingFact}
            onRefresh={fetchMovieFact}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={() => signOut({ callbackUrl: "/" })}
              variant="destructive"
              className="w-full group"
            >
              <LogOut className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
              Sign Out
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}