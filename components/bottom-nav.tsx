"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, Clock, Package } from "lucide-react";

const navItems = [
  { href: "/", label: "Combos", icon: Home },
  { href: "/favoritos", label: "Favoritos", icon: Heart },
  { href: "/historial", label: "Historial", icon: Clock },
  { href: "/menu", label: "Stock", icon: Package },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 min-w-[60px] text-center ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
