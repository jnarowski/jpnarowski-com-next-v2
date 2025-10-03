import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} JP Narowski. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/jnarowski"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[var(--accent-purple)] transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/johnpaulnarowski/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[var(--accent-purple)] transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="mailto:jp@sourceborn.com"
              className="text-muted-foreground hover:text-[var(--accent-purple)] transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
