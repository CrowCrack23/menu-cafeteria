"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ComboActionsProps {
  onRegenerate: () => void;
  onCustomize: () => void;
  onShare: () => void;
}

export function ComboActions({ onRegenerate, onCustomize, onShare }: ComboActionsProps) {
  return (
    <motion.div
      className="flex flex-col gap-3 w-full max-w-xs sm:max-w-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <motion.button
        onClick={onRegenerate}
        className="flex items-center justify-center gap-2 w-full py-3.5 min-h-[48px] rounded-full backdrop-blur-sm text-white font-bold text-base cursor-pointer"
        style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        🔄 Otro combo
      </motion.button>
      <motion.button
        onClick={onCustomize}
        className="flex items-center justify-center gap-2 w-full py-3.5 min-h-[48px] rounded-full backdrop-blur-sm text-white font-medium text-base cursor-pointer"
        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        ✏️ Personalizar
      </motion.button>
      <motion.button
        onClick={onShare}
        className="flex items-center justify-center gap-2 w-full py-3.5 min-h-[48px] rounded-full backdrop-blur-sm text-white font-medium text-base cursor-pointer"
        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        📤 Compartir
      </motion.button>
      <Link href="/">
        <motion.div
          className="flex items-center justify-center gap-2 w-full py-3.5 min-h-[48px] rounded-full text-sm cursor-pointer"
          style={{ color: "rgba(255,255,255,0.7)" }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          ← Cambiar mood
        </motion.div>
      </Link>
    </motion.div>
  );
}
