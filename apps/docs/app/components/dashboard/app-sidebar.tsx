"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Optional: For active state tracking
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Settings,
  Menu,
  X,
  User,
} from "lucide-react";

const items = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Resumes", href: "/resumes", icon: FileText },
  { title: "Interviews", href: "/interviews", icon: MessageSquare },
  { title: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Tracks current route to highlight active item

  const SidebarContent = () => (
    <div className="flex h-full flex-col justify-between bg-background px-4 py-6 border-r border-border/40">
      {/* Top Sectio: Logo & Nav */}

      <div className="space-y-6">
        <div className="px-3 py-2">
          <h2 className="font-semibold tracking-tight text-2xl border-b-2 border-primary pb-1 mb-4">
            InterviewAPI{" "}
          </h2>

          <p className="mt-1 text-xs font-medium text-muted-foreground/80">
            Your interview workflow
          </p>
        </div>

        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3
                  rounded-xl px-4 py-3
                  text-sm font-medium
                  transition-all duration-200 ease-in-out
                  ${
                    isActive
                      ? "bg-secondary text-secondary-foreground shadow-sm font-semibold"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  }
                `}
              >
                <item.icon
                  className={`h-4 w-4 ${isActive ? "text-primary" : ""}`}
                />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Modern User Profile Quick-Link */}
      <div className="border-t border-border/40 pt-4 px-2">
        <div className="flex items-center gap-3 rounded-xl p-2 hover:bg-accent/40 transition dynamic-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
            <User className="h-4 w-4 text-secondary-foreground" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold truncate">Alex Morgan</span>
            <span className="text-[10px] text-muted-foreground truncate">
              alex@interview.ai
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Navbar Header */}
      <div className="flex h-16 items-center justify-between border-b border-border/40 bg-background/80 px-4 backdrop-blur-md md:hidden fixed top-0 left-0 right-0 z-40">
        <h1 className="font-extrabold tracking-tight">Interview AI</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 hover:bg-accent focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          {/* Drawer Content */}
          <div className="relative flex w-full max-w-[280px] animate-in slide-in-from-left duration-200">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex h-screen w-64 flex-col sticky top-0">
        <SidebarContent />
      </aside>
    </>
  );
}
