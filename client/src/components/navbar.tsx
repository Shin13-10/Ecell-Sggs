import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Mail } from "lucide-react";

import { useState } from "react";
import { cn } from "@/lib/utils";

import ecellWhiteLogo from "@/assets/Tabicon.png";
import ecellBlackLogo from "@/assets/tabicon2.png";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { href: "/events", label: "Events" },
    { href: "/team", label: "Team" },
    { href: "/resources", label: "Resources" },
    { href: "/gallery", label: "Gallery" },
  ];

  const isHome = location === '/';

  return (
    <nav className={cn(
      "z-40 w-full transition-all duration-300",
      isHome
        ? "absolute top-0 border-b-0 bg-transparent backdrop-blur-[2px]"
        : "relative top-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-background/80 dark:border-border/50"
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="mr-4 flex items-center">
          <Link href="/">
            {isHome ? (
              <img src={ecellWhiteLogo} alt="E-Cell Logo" className="h-9 w-auto object-contain cursor-pointer" />
            ) : (
              <>
                <img src={ecellBlackLogo} alt="E-Cell Logo" className="h-9 w-auto object-contain cursor-pointer dark:hidden" />
                <img src={ecellWhiteLogo} alt="E-Cell Logo" className="h-9 w-auto object-contain cursor-pointer hidden dark:block" />
              </>
            )}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={cn(
                "transition-all duration-300 py-1",
                location === link.href
                  ? "text-primary font-bold border-b-2 border-primary"
                  : isHome
                    ? "text-white/90 hover:text-primary hover:border-b-2 hover:border-primary/50"
                    : "text-foreground/70 hover:text-primary hover:border-b-2 hover:border-primary/50"
              )}>
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">


          <Link href="/contact" className="hidden md:inline-flex">
            <Button
              size="sm"
              className="rounded-full group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <Mail className="mr-1 h-4 w-4" />
                Contact Us
              </span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500 dark:bg-white/10" />
            </Button>
          </Link>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border dark:border-border/50">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    location === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-primary/5 hover:text-primary"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </div>
              </Link>
            ))}
            <Link href="/contact">
              <div
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:bg-primary/5 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Us
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}