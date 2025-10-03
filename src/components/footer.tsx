import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden">
      {/* Zen Nature Illustration */}
      <div className="relative w-full h-64 md:h-80">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1400 320"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Sky gradient */}
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#e8f4f0', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          {/* Sky background */}
          <rect width="1400" height="320" fill="url(#skyGradient)" />

          {/* Rolling hills - background */}
          <ellipse cx="300" cy="280" rx="400" ry="120" fill="#8fbc8f" opacity="0.6" />
          <ellipse cx="800" cy="285" rx="450" ry="130" fill="#7fb87f" opacity="0.6" />
          <ellipse cx="1200" cy="280" rx="380" ry="115" fill="#8fbc8f" opacity="0.6" />

          {/* Foreground hills */}
          <ellipse cx="200" cy="300" rx="350" ry="100" fill="#6b9b6b" opacity="0.8" />
          <ellipse cx="700" cy="305" rx="450" ry="110" fill="#5a8a5a" opacity="0.8" />
          <ellipse cx="1100" cy="300" rx="400" ry="105" fill="#6b9b6b" opacity="0.8" />

          {/* Ground layer */}
          <rect y="280" width="1400" height="40" fill="#7a9b5a" />

          {/* Simple trees - left */}
          <g>
            {/* Tree 1 */}
            <rect x="150" y="240" width="18" height="50" fill="#6d5a47" rx="2" />
            <ellipse cx="159" cy="235" rx="35" ry="45" fill="#6b9b6b" />
            <ellipse cx="159" cy="225" rx="28" ry="35" fill="#7fb87f" />
          </g>

          <g>
            {/* Tree 2 - smaller */}
            <rect x="220" y="255" width="14" height="35" fill="#6d5a47" rx="2" />
            <ellipse cx="227" cy="250" rx="28" ry="35" fill="#6b9b6b" />
            <ellipse cx="227" cy="242" rx="22" ry="28" fill="#7fb87f" />
          </g>

          {/* Center trees */}
          <g>
            {/* Tree 3 */}
            <rect x="650" y="235" width="20" height="55" fill="#6d5a47" rx="2" />
            <ellipse cx="660" cy="230" rx="38" ry="48" fill="#6b9b6b" />
            <ellipse cx="660" cy="220" rx="30" ry="38" fill="#7fb87f" />
          </g>

          <g>
            {/* Tree 4 - smaller */}
            <rect x="730" y="250" width="15" height="40" fill="#6d5a47" rx="2" />
            <ellipse cx="737" cy="245" rx="30" ry="38" fill="#6b9b6b" />
            <ellipse cx="737" cy="237" rx="24" ry="30" fill="#7fb87f" />
          </g>

          {/* Right trees */}
          <g>
            {/* Tree 5 */}
            <rect x="1100" y="245" width="17" height="45" fill="#6d5a47" rx="2" />
            <ellipse cx="1108" cy="240" rx="32" ry="42" fill="#6b9b6b" />
            <ellipse cx="1108" cy="230" rx="26" ry="33" fill="#7fb87f" />
          </g>

          <g>
            {/* Tree 6 */}
            <rect x="1180" y="238" width="19" height="52" fill="#6d5a47" rx="2" />
            <ellipse cx="1189" cy="233" rx="36" ry="46" fill="#6b9b6b" />
            <ellipse cx="1189" cy="223" rx="28" ry="36" fill="#7fb87f" />
          </g>

          {/* Small bushes scattered */}
          <ellipse cx="350" cy="285" rx="25" ry="20" fill="#6b9b6b" opacity="0.9" />
          <ellipse cx="520" cy="288" rx="28" ry="22" fill="#7fb87f" opacity="0.9" />
          <ellipse cx="880" cy="287" rx="26" ry="21" fill="#6b9b6b" opacity="0.9" />
          <ellipse cx="1020" cy="286" rx="30" ry="23" fill="#7fb87f" opacity="0.9" />

          {/* Simple grass texture */}
          <g opacity="0.4">
            {Array.from({ length: 100 }).map((_, i) => {
              const x = i * 14;
              return (
                <line
                  key={i}
                  x1={x}
                  y1="280"
                  x2={x}
                  y2="275"
                  stroke="#5a7a4a"
                  strokeWidth="1"
                />
              );
            })}
          </g>

          {/* White clouds */}
          <g>
            <ellipse cx="250" cy="80" rx="45" ry="25" fill="white" opacity="0.9" />
            <ellipse cx="220" cy="85" rx="35" ry="20" fill="white" opacity="0.9" />
            <ellipse cx="280" cy="85" rx="38" ry="22" fill="white" opacity="0.9" />
          </g>

          <g>
            <ellipse cx="900" cy="100" rx="50" ry="28" fill="white" opacity="0.9" />
            <ellipse cx="870" cy="105" rx="38" ry="22" fill="white" opacity="0.9" />
            <ellipse cx="930" cy="106" rx="40" ry="24" fill="white" opacity="0.9" />
          </g>

          {/* Birds */}
          <g opacity="0.3" stroke="#4a5a4a" strokeWidth="1.5" fill="none">
            <path d="M 450,120 Q 455,115 460,120" />
            <path d="M 465,118 Q 470,113 475,118" />
            <path d="M 1050,90 Q 1055,85 1060,90" />
          </g>
        </svg>

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full container mx-auto px-4 md:px-8 pb-6 md:pb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-foreground/70 text-center md:text-left">
                © {new Date().getFullYear()} JP Narowski. All rights reserved.
              </div>

              <div className="flex items-center gap-4 md:gap-6">
                <Link
                  href="https://github.com/jnarowski"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/johnpaulnarowski/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="mailto:jp@sourceborn.com"
                  className="text-foreground/70 hover:text-primary transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
