'use client';

import { motion } from "framer-motion";
import Image from "next/image";

interface ProfileHeaderProps {
  image: string | null;
  name: string | null;
  email: string | null;
}

export function ProfileHeader({ image, name, email }: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center space-x-4"
    >
      {image && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative w-[80px] h-[80px] rounded-full overflow-hidden ring-2 ring-primary/10"
        >
          <Image
            src={image}
            alt={name || "Profile"}
            fill
            sizes="80px"
            className="object-cover"
            priority
          />
        </motion.div>
      )}
      <div className="space-y-1">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold"
        >
          {name || 'User'}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground"
        >
          {email}
        </motion.p>
      </div>
    </motion.div>
  );
}