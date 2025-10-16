import Link from "next/link";
import { Calculator, TrendingUp, ArrowRight, FlaskConical } from "lucide-react";

export const metadata = {
  title: "Labs - JP Narowski",
  description: "Experimental tools and interactive calculators for financial planning and analysis",
  openGraph: {
    title: "Labs & Tools - JP Narowski",
    description: "Interactive calculators for financial planning, tax strategy, and life optimization",
    type: "website",
    images: [
      {
        url: "/labs/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Labs - Experimental Tools and Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Labs & Tools - JP Narowski",
    description: "Interactive calculators for financial planning, tax strategy, and life optimization",
    images: ["/labs/opengraph-image"],
  },
};

export default function LabsPage() {
  const projects = [
    {
      title: "Tax Calculator",
      description:
        "Estimate your federal tax burden on large income events with various tax reduction strategies including business losses, real estate professional status, and oil & gas investments.",
      href: "/tools/tax-calculator",
      icon: Calculator,
      tags: ["Tax Planning", "Financial Tools", "2025 Tax Year"],
      featured: true,
    },
    {
      title: "Die With Zero",
      description:
        "Interactive financial planning tool based on Bill Perkins' Die With Zero philosophy. Optimize your spending and life experiences to maximize fulfillment.",
      href: "/die-with-zero",
      icon: TrendingUp,
      tags: ["Life Planning", "Financial Philosophy", "Optimization"],
      featured: true,
    },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
            <FlaskConical className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Experimental Projects
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Labs{" "}
            <span className="bg-gradient-to-r from-primary via-primary/70 to-primary/50 bg-clip-text text-transparent">
              & Tools
            </span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Interactive tools and calculators for financial planning, tax
            strategy, and life optimization. These projects combine technical
            implementation with practical financial concepts.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <Link
                key={project.href}
                href={project.href}
                className="group block p-6 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>

        {/* About Labs Section */}
        <div className="p-6 rounded-2xl bg-muted/30 border border-border">
          <h2 className="text-xl font-bold mb-3">About Labs</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              The Labs section features experimental tools and interactive
              calculators built to explore financial concepts through practical
              implementation. Each project combines technical depth with
              real-world applications.
            </p>
            <p>
              <strong className="text-foreground">Disclaimer:</strong> These
              tools are for educational and planning purposes only. They provide
              estimates and should not be considered professional advice.
              Always consult qualified professionals (CPAs, financial advisors,
              attorneys) for your specific situation.
            </p>
            <p>
              <strong className="text-foreground">Open Source:</strong> Many of
              these projects are built in the open and available for review.
              Feel free to examine the code, suggest improvements, or build
              upon these concepts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
