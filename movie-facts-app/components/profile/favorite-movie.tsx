'use client';

import { motion } from "framer-motion";
import { Film } from "lucide-react";

interface FavoriteMovieProps {
  movie: string;
}

export function FavoriteMovie({ movie }: FavoriteMovieProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-3"
    >
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Film className="h-4 w-4" />
        Favorite Movie
      </h3>
      <div className="bg-primary/5 p-4 rounded-lg">
        <p className="text-primary/80 font-medium">{movie}</p>
      </div>
    </motion.div>
  );
}