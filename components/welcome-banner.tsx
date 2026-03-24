"use client";

import { motion } from "framer-motion";

interface WelcomeBannerProps {
  message: string;
  subtitle: string;
}

export function WelcomeBanner({ message, subtitle }: WelcomeBannerProps) {
  return (
    <motion.div
      className="text-center px-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-2xl sm:text-3xl font-bold text-white mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </motion.h1>
      <motion.p
        className="text-white/70 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
}
