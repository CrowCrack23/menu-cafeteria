"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, Clock, Package } from "lucide-react";
import { useSessionStore } from "@/stores/session-store";

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/favoritos", label: "Guardados", icon: Heart, badge: "favorites" as const },
  { href: "/historial", label: "Historial", icon: Clock },
  { href: "/menu", label: "Stock", icon: Package },
];

export function BottomNav() {
  const pathname = usePathname();
  const favCount = useSessionStore((s) => s.favoriteComboIds.length);

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map(({ href, label, icon: Icon, badge }) => {
          const isActive = pathname === href;
          const count = badge === "favorites" ? favCount : 0;

          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-col items-center gap-0.5 py-2 px-3 min-w-[60px] text-center ${
                isActive ? "text-[#c2410c]" : "text-muted-foreground"
              }`}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 flex items-center justify-center px-1 rounded-full bg-[#c2410c] text-white text-[9px] font-bold">
                    {count}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
