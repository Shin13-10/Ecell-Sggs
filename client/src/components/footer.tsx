import { Link } from "wouter";
import { Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">E-Cell SGGSIET</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Empowering the next generation of entrepreneurs through innovation, education, and community building.
            </p>
            <div className="flex space-x-5 pt-2">
              <a
                href="https://www.instagram.com/sggsiet_ecell"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/10 p-2.5 rounded-full text-primary hover:bg-primary/20 hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/company/97036732"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/10 p-2.5 rounded-full text-primary hover:bg-primary/20 hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:ecell@sggs.ac.in"
                className="bg-primary/10 p-2.5 rounded-full text-primary hover:bg-primary/20 hover:scale-110 transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium block">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium block">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-foreground">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium block">
                  Articles & Guides
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium block">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-foreground">Contact Info</h4>
            <address className="not-italic text-sm text-muted-foreground space-y-3">
              <p>E-Cell Office, Admin Building</p>
              <p>SGGS Institute of Engineering & Technology</p>
              <p>Vishnupuri, Nanded, Maharashtra 431606</p>
              <div className="pt-2">
                <a href="mailto:ecell@sggs.ac.in" className="block hover:text-primary transition-colors">ecell@sggs.ac.in</a>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-border/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} E-Cell SGGS. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 