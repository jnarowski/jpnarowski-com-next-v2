"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/articles", label: "Articles" },
    { href: "/speaking", label: "Speaking" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full pt-4 md:pt-6">
        <div className="container-small mx-auto px-4 md:px-8">
          <div className="flex h-14 md:h-16 items-center justify-between px-4 md:px-6 rounded-full border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg shadow-black/5">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">JP Narowski</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-all hover:text-primary relative ${
                    pathname === link.href
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
              <div className="h-6 w-px bg-border" />
              <ThemeToggle />
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-3">
              <ThemeToggle />
              <div className="h-6 w-px bg-border" />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-40 md:hidden">
          <div className="rounded-3xl border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-xl shadow-black/10 p-6">
            <nav className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium transition-colors hover:text-primary py-3 px-4 rounded-xl ${
                    pathname === link.href
                      ? "text-primary font-semibold bg-primary/10"
                      : "text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
