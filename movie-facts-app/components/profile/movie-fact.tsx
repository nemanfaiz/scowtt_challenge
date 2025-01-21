'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MovieFactProps {
  movieFact: string;
  isLoading: boolean;
  onRefresh: () => void;
}

export function MovieFact({ movieFact, isLoading, onRefresh }: MovieFactProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Movie Fact</h3>
        <Button 
          onClick={onRefresh} 
          variant="ghost" 
          size="sm"
          disabled={isLoading}
          className="hover:bg-primary/5"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          <span className="ml-2">{isLoading ? 'Loading...' : 'Refresh'}</span>
        </Button>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={movieFact || 'loading'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-primary/10"
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary/60" />
            </div>
          ) : (
            <p className="text-secondary-foreground leading-relaxed">{movieFact}</p>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}