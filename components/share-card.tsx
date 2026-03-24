"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Combo } from "@/lib/combo-datasets";
import type { Mood } from "@/lib/moods";
import { shareCombo } from "@/lib/share-utils";

interface ShareCardProps {
  combo: Combo;
  mood: Mood;
  onClose: () => void;
}

export function ShareCard({ combo, mood, onClose }: ShareCardProps) {
  const [toast, setToast] = useState<string | null>(null);

  const handleShare = async () => {
    const result = await shareCombo(combo);
    if (result === "copied") {
      setToast("¡Copiado!");
      setTimeout(() => setToast(null), 2000);
    } else if (result === "failed") {
      setToast("No se pudo compartir");
      setTimeout(() => setToast(null), 2000);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Card */}
      <motion.div
        className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: `linear-gradient(160deg, ${mood.gradient[0]}, ${mood.gradient[1]})`,
        }}
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-4 p-6 sm:p-8">
          {/* Header */}
          <span className="text-5xl">{mood.emoji}</span>
          <h2 className="text-2xl font-bold text-white text-center">
            {combo.name}
          </h2>
          <p className="text-white/80 text-sm italic text-center">
            &ldquo;{combo.message}&rdquo;
          </p>

          {/* Items */}
          <div className="flex flex-col gap-2 w-full">
            {combo.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-white text-sm"
              >
                <span className="text-lg">{item.emoji}</span>
                <span className="font-medium">{item.name}</span>
                <span className="text-white/60">— {item.description}</span>
              </div>
            ))}
          </div>

          {/* Score */}
          <div className="flex items-center gap-2 mt-2">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center border-3 border-white/30"
              style={{
                background: `linear-gradient(135deg, ${mood.gradient[0]}80, ${mood.gradient[1]}80)`,
              }}
            >
              <span className="text-white font-bold text-sm">
                {combo.matchScore}%
              </span>
            </div>
            <span className="text-white/70 text-xs uppercase tracking-wider">
              match
            </span>
          </div>

          {/* Footer */}
          <div className="w-full pt-4 mt-2 border-t border-white/20">
            <p className="text-white/50 text-xs text-center">
              AI Combo Experience
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-4 pt-0">
          <motion.button
            onClick={handleShare}
            className="flex-1 py-3 min-h-[44px] rounded-full text-white font-bold text-sm cursor-pointer"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            📤 Compartir
          </motion.button>
          <motion.button
            onClick={onClose}
            className="flex-1 py-3 min-h-[44px] rounded-full text-sm cursor-pointer"
            style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            Cerrar
          </motion.button>
        </div>
      </motion.div>

      {/* Toast */}
      {toast && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-white rounded-full text-gray-900 font-medium text-sm shadow-lg z-60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {toast}
        </motion.div>
      )}
    </motion.div>
  );
}
