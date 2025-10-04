import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Code,
  Brain,
  Coffee,
  Sparkles,
  Quote,
  Terminal,
  Layers,
  Globe,
  Lock,
  TrendingUp,
  Users,
  Target,
  Rocket,
  Heart,
  Star,
  ChevronRight,
  Check,
  X,
  AlertCircle,
  CheckCircle2,
  Inbox,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Send,
  Download,
  Play,
  Pause,
  Volume2,
  Settings,
  Search,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Cpu,
  Database,
  Cloud,
  Shield,
  Smartphone,
  Monitor,
  Package,
  GitBranch,
  BookOpen,
  Lightbulb,
  Compass,
  Award,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Design Experiments - Content Block Exploration",
  description:
    "Exploring diverse content layouts beyond cards - a fusion of tech and zen aesthetics.",
};

export default function ExperimentsPage() {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero - Full Bleed with Animated Gradient */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.58_0.09_150/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.58_0.09_150/0.1),transparent_50%)]" />

        <div className="container-small mx-auto px-4 md:px-8 py-16 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Design Laboratory
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-[0.95] tracking-tight">
              Beyond the{" "}
              <span className="bg-gradient-to-r from-primary via-primary/70 to-primary/50 bg-clip-text text-transparent">
                Ordinary
              </span>
            </h1>
            <p className="text-xl md:text-3xl text-muted-foreground mb-10 leading-relaxed max-w-3xl">
              A collection of experimental layouts exploring the intersection of minimalist zen and modern tech design.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="group text-base px-8">
                Start Exploring
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8">
                View Documentation
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse delay-700" />
      </section>

      {/* Diagonal Split Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-background transform -skew-y-3 origin-top-left" />
        <div className="container-small mx-auto px-4 md:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Design that{" "}
                <span className="italic text-primary">flows</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Breaking free from rigid boxes and straight lines. Let your content breathe with layouts that feel natural and organic.
              </p>
              <div className="flex flex-col gap-4">
                {["Fluid layouts", "Natural rhythms", "Organic spacing"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-foreground/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl transform rotate-3 hover:rotate-6 transition-transform duration-500" />
              <div className="absolute inset-4 bg-background rounded-3xl shadow-2xl flex items-center justify-center">
                <Layers className="h-24 w-24 text-primary/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee / Ticker Tape */}
      <section className="py-12 bg-primary/5 border-y border-primary/10 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4">
              {["Innovation", "Simplicity", "Performance", "Craft", "Excellence", "Zen"].map((word) => (
                <div key={word} className="flex items-center gap-8">
                  <span className="text-2xl font-bold text-foreground/40">{word}</span>
                  <Star className="h-4 w-4 text-primary/40" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Pull Quote - Large Typography */}
      <section className="py-32 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 text-[20rem] font-bold text-primary/5 select-none">&ldquo;</div>
        <div className="container-small mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <blockquote className="text-3xl md:text-6xl font-bold leading-tight text-foreground/90 mb-8">
              The best design is invisible. It guides without commanding.
            </blockquote>
            <cite className="text-xl text-muted-foreground not-italic">
              — Philosophy of Calm Tech
            </cite>
          </div>
        </div>
      </section>

      {/* Overlapping Cards with Depth */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container-small mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Layered Thinking</h2>
            <p className="text-xl text-muted-foreground">
              Ideas that build on each other
            </p>
          </div>

          <div className="relative h-[600px] max-w-4xl mx-auto">
            {[
              { title: "Foundation", icon: Database, color: "from-blue-500/20 to-blue-500/5", top: "0", left: "0", rotate: "-2" },
              { title: "Architecture", icon: Layers, color: "from-purple-500/20 to-purple-500/5", top: "12", left: "12", rotate: "1" },
              { title: "Interface", icon: Monitor, color: "from-green-500/20 to-green-500/5", top: "24", left: "24", rotate: "-1" },
            ].map((card, i) => (
              <div
                key={i}
                className={`absolute w-full md:w-96 h-80 bg-gradient-to-br ${card.color} backdrop-blur-sm border border-border rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer hover:z-50 hover:scale-105`}
                style={{
                  top: `${card.top}%`,
                  left: `${card.left}%`,
                  transform: `rotate(${card.rotate}deg)`,
                }}
              >
                <card.icon className="h-16 w-16 text-primary mb-6" />
                <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Each layer adds depth and meaning to the whole.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zigzag Alternating Layout */}
      <section className="py-24">
        <div className="container-small mx-auto px-4 md:px-8">
          <div className="space-y-32">
            {[
              { title: "Speed Matters", desc: "Every millisecond counts. Performance isn't just technical—it's user respect.", icon: Zap, align: "left" },
              { title: "Think Deep", desc: "Simple surfaces hide complex depths. Master the art of progressive disclosure.", icon: Brain, align: "right" },
              { title: "Stay Curious", desc: "The best engineers never stop learning. Embrace the unknown.", icon: Lightbulb, align: "left" },
            ].map((item, i) => (
              <div
                key={i}
                className={`grid md:grid-cols-2 gap-16 items-center ${item.align === "right" ? "md:flex-row-reverse" : ""}`}
              >
                <div className={item.align === "right" ? "md:order-2" : ""}>
                  <div className="inline-block p-4 bg-primary/10 rounded-2xl mb-6">
                    <item.icon className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-4xl font-bold mb-6">{item.title}</h3>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className={`relative h-96 ${item.align === "right" ? "md:order-1" : ""}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-primary/20 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-24 bg-muted/20">
        <div className="container-small mx-auto px-4 md:px-8">
          <h2 className="text-5xl font-bold mb-16 text-center">Inspiration Gallery</h2>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              { height: "h-64", title: "Minimalism", color: "from-red-500/10 to-red-500/5" },
              { height: "h-80", title: "Typography", color: "from-blue-500/10 to-blue-500/5" },
              { height: "h-48", title: "Color", color: "from-green-500/10 to-green-500/5" },
              { height: "h-96", title: "Spacing", color: "from-purple-500/10 to-purple-500/5" },
              { height: "h-56", title: "Motion", color: "from-orange-500/10 to-orange-500/5" },
              { height: "h-72", title: "Hierarchy", color: "from-pink-500/10 to-pink-500/5" },
              { height: "h-64", title: "Contrast", color: "from-teal-500/10 to-teal-500/5" },
              { height: "h-80", title: "Balance", color: "from-indigo-500/10 to-indigo-500/5" },
            ].map((item, i) => (
              <div
                key={i}
                className={`${item.height} bg-gradient-to-br ${item.color} rounded-2xl p-8 border border-border hover:border-primary transition-all duration-300 break-inside-avoid`}
              >
                <h3 className="text-2xl font-bold">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Blocks - Asymmetric Grid */}
      <section className="py-24">
        <div className="container-small mx-auto px-4 md:px-8">
          <div className="mb-16">
            <h2 className="text-5xl font-bold mb-6">Core Principles</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Every design decision serves a purpose. Here&apos;s what guides our approach.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-8 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 p-12 hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <Zap className="h-16 w-16 text-primary mb-8" />
                <h3 className="text-4xl font-bold mb-6">Purposeful Speed</h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Performance isn&apos;t just technical—it&apos;s a form of respect for the user&apos;s time. Every millisecond matters.
                </p>
              </div>
            </div>

            <div className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary/50 to-secondary/30 p-8 hover:shadow-xl transition-all duration-500">
              <Brain className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Think Deep</h3>
              <p className="text-muted-foreground">
                Simple surfaces, complex depths.
              </p>
            </div>

            <div className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/50 to-accent/30 p-8 hover:shadow-xl transition-all duration-500">
              <Coffee className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Tea & Tech</h3>
              <p className="text-muted-foreground">
                Mindful moments between keystrokes.
              </p>
            </div>

            <div className="md:col-span-8 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-muted/80 to-muted/40 p-12 hover:shadow-2xl transition-all duration-500">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <Code className="h-16 w-16 text-primary mb-8" />
                <h3 className="text-4xl font-bold mb-6">Craft with Care</h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Code is poetry written for machines but read by humans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Glowing Text Effect */}
      <section className="py-32 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.58_0.09_150/0.1),transparent_70%)]" />
        <div className="container-small mx-auto px-4 md:px-8 text-center relative z-10">
          <h2 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent drop-shadow-[0_0_30px_oklch(0.58_0.09_150/0.3)]">
            Ultrathink
          </h2>
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
            Deep focus. Clear thinking. Elegant solutions.
          </p>
        </div>
      </section>

      {/* Timeline with Connecting Lines - Vertical */}
      <section className="py-24 bg-muted/10">
        <div className="container-small mx-auto px-4 md:px-8">
          <h2 className="text-5xl font-bold mb-16 text-center">The Journey</h2>

          <div className="max-w-3xl mx-auto relative">
            {/* Connecting Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20" />

            <div className="space-y-16">
              {[
                { year: "2009", title: "First Line of Code", desc: "Started with HTML and CSS, building simple websites." },
                { year: "2011", title: "Founded KarmaCRM", desc: "Built and scaled to 6,000 daily active users." },
                { year: "2016", title: "Co-founded Clickflow", desc: "Marketing tech for SEO optimization." },
                { year: "2020", title: "Head of Engineering", desc: "Joined Spectora to lead engineering team." },
                { year: "2025", title: "AI Era", desc: "Exploring the frontier of AI-first development." },
              ].map((item, i) => (
                <div key={i} className="relative pl-24">
                  <div className="absolute left-0 w-16 h-16 bg-primary/10 border-4 border-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{item.year}</span>
                  </div>
                  <div className="bg-background border border-border rounded-2xl p-8 hover:shadow-xl hover:border-primary transition-all duration-300">
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid - Different Styles */}
      <section className="py-24">
        <div className="container-small mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group cursor-pointer">
              <div className="text-7xl font-bold bg-gradient-to-br from-primary to-primary/50 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                15+
              </div>
              <div className="text-lg text-muted-foreground">Years Coding</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-7xl font-bold bg-gradient-to-br from-primary to-primary/50 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                6K+
              </div>
              <div className="text-lg text-muted-foreground">Daily Users</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-7xl font-bold bg-gradient-to-br from-primary to-primary/50 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                100%
              </div>
              <div className="text-lg text-muted-foreground">Commitment</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-7xl font-bold bg-gradient-to-br from-primary to-primary/50 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                ∞
              </div>
              <div className="text-lg text-muted-foreground">Learning</div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Snap */}
      <section className="py-24 bg-gradient-to-br from-muted/30 to-background">
        <div className="container-small mx-auto px-4 md:px-8">
          <div className="mb-12">
            <h2 className="text-5xl font-bold mb-4">Process</h2>
            <p className="text-xl text-muted-foreground">
              How we build great products
            </p>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin">
            {[
              { phase: "01", title: "Discovery", desc: "Understanding the problem space deeply before writing code.", icon: Compass },
              { phase: "02", title: "Design", desc: "Sketching solutions that balance needs with constraints.", icon: Target },
              { phase: "03", title: "Build", desc: "Crafting robust, maintainable code.", icon: Code },
              { phase: "04", title: "Test", desc: "Ensuring quality through rigorous testing.", icon: CheckCircle2 },
              { phase: "05", title: "Deploy", desc: "Shipping with confidence.", icon: Rocket },
              { phase: "06", title: "Iterate", desc: "Learning from users and improving.", icon: TrendingUp },
            ].map((item) => (
              <div
                key={item.phase}
                className="flex-shrink-0 w-96 snap-center group"
              >
                <div className="rounded-3xl border-2 border-border bg-background p-10 h-full hover:border-primary transition-all duration-300 hover:shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-6xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                      {item.phase}
                    </div>
                    <item.icon className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Icon Grid Showcase */}
      <section className="py-24">
        <div className="container-small mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Tech Stack</h2>
            <p className="text-xl text-muted-foreground">
              Tools and technologies I work with
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {[
              { icon: Code, label: "TypeScript" },
              { icon: Globe, label: "React" },
              { icon: Terminal, label: "Node.js" },
              { icon: Database, label: "PostgreSQL" },
              { icon: Cloud, label: "AWS" },
              { icon: GitBranch, label: "Git" },
              { icon: Cpu, label: "Next.js" },
              { icon: Package, label: "Docker" },
              { icon: Shield, label: "Auth" },
              { icon: Activity, label: "Analytics" },
              { icon: Rocket, label: "Vercel" },
              { icon: Brain, label: "AI/ML" },
            ].map((item, i) => (
              <div
                key={i}
                className="aspect-square bg-muted/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-primary/10 hover:scale-105 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary group"
              >
                <item.icon className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-xs text-center font-medium text-muted-foreground group-hover:text-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Screen Comparison */}
      <section className="py-24 bg-muted/20">
        <div className="container-small mx-auto px-4 md:px-8">
          <h2 className="text-5xl font-bold mb-16 text-center">Before & After</h2>

          <div className="grid md:grid-cols-2 gap-1 max-w-5xl mx-auto bg-border rounded-3xl overflow-hidden">
            <div className="bg-background p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-600 rounded-full mb-6">
                <X className="h-4 w-4" />
                <span className="text-sm font-medium">Before</span>
              </div>
              <h3 className="text-3xl font-bold mb-6">Card Hell</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Repetitive card layouts everywhere</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>No visual hierarchy or interest</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Boring, predictable design</span>
                </li>
              </ul>
            </div>
            <div className="bg-primary/5 p-12 border-l-4 border-primary">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full mb-6">
                <Check className="h-4 w-4" />
                <span className="text-sm font-medium">After</span>
              </div>
              <h3 className="text-3xl font-bold mb-6">Diverse Layouts</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Varied content blocks and layouts</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Clear hierarchy and flow</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Engaging, memorable experience</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers - Zen Style */}
      <section className="py-24">
        <div className="container-small mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Simple Pricing</h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Starter", price: "$9", features: ["1 Project", "Basic Support", "1GB Storage"], popular: false },
              { name: "Pro", price: "$29", features: ["10 Projects", "Priority Support", "10GB Storage", "Advanced Analytics"], popular: true },
              { name: "Enterprise", price: "$99", features: ["Unlimited Projects", "24/7 Support", "100GB Storage", "Custom Integration", "Dedicated Manager"], popular: false },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-3xl p-8 ${
                  plan.popular
                    ? "bg-primary/5 border-2 border-primary scale-105 shadow-2xl"
                    : "bg-muted/30 border border-border"
                } transition-all duration-300 hover:shadow-xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Slider Style */}
      <section className="py-24 bg-gradient-to-br from-muted/30 to-background">
        <div className="container-small mx-auto px-4 md:px-8">
          <h2 className="text-5xl font-bold mb-16 text-center">What People Say</h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-background rounded-3xl p-12 shadow-2xl border border-border">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  <p className="text-2xl leading-relaxed text-foreground/90 mb-6">
                    &ldquo;JP&apos;s approach to engineering leadership is refreshing. He builds systems that scale and teams that thrive.&rdquo;
                  </p>
                  <div>
                    <div className="font-bold">Sarah Chen</div>
                    <div className="text-sm text-muted-foreground">VP of Engineering, TechCorp</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup - Beautiful */}
      <section className="py-24">
        <div className="container-small mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-8">
              <Mail className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-5xl font-bold mb-6">Stay in the Loop</h2>
            <p className="text-xl text-muted-foreground mb-10">
              Get weekly insights on AI, engineering, and building great products. No spam, ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-6 py-4 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button size="lg" className="px-8">
                Subscribe
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Join 2,000+ subscribers. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Logo Cloud / Social Proof */}
      <section className="py-24 bg-muted/20">
        <div className="container-small mx-auto px-4 md:px-8">
          <p className="text-center text-sm font-medium text-muted-foreground mb-12 uppercase tracking-wider">
            Trusted by teams at
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-60">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-16 bg-muted rounded-xl flex items-center justify-center hover:opacity-100 transition-opacity"
              >
                <span className="text-2xl font-bold text-muted-foreground">LOGO</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image + Text - Magazine Layout (Reversed) */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container-small mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-block px-3 py-1.5 mb-6 bg-primary/10 rounded-full">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  Philosophy
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-8 leading-tight">
                Building with Intention
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                In a world of endless features and constant updates, I believe in building things that matter. Technology should enhance human capability, not replace human judgment.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                This means writing code that&apos;s maintainable, designing interfaces that respect cognitive load, and making decisions that prioritize long-term value.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group font-medium text-lg"
              >
                <span>Learn more about my approach</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group order-1 md:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent z-10" />
              <div className="absolute inset-0 bg-muted group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <Sparkles className="h-32 w-32 text-primary/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid - Mixed Content */}
      <section className="py-24">
        <div className="container-small mx-auto px-4 md:px-8">
          <div className="mb-16">
            <h2 className="text-5xl font-bold mb-6">Current Focus</h2>
            <p className="text-xl text-muted-foreground">
              What I&apos;m exploring and building right now
            </p>
          </div>

          <div className="grid md:grid-cols-6 gap-6">
            <div className="md:col-span-4 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-border p-10 hover:shadow-xl transition-all">
              <Brain className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-3xl font-bold mb-4">AI-First Development</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Exploring how LLMs and agents are fundamentally changing software development. From code generation to product design, AI is becoming a collaborative partner.
              </p>
            </div>

            <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-gradient-to-br from-muted to-muted/50 border border-border p-10 flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <Coffee className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-3xl font-bold mb-4">Tea Rituals</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Currently brewing: Gyokuro, Sencha, and experimenting with fermented teas.
                </p>
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed">
                The ritual of tea preparation mirrors good code: patience, precision, and attention to detail.
              </div>
            </div>

            <div className="md:col-span-2 rounded-3xl bg-gradient-to-br from-accent to-accent/50 border border-border p-10 hover:shadow-xl transition-all">
              <Github className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Open Source</h3>
              <p className="text-muted-foreground leading-relaxed">
                Contributing to the tools that make modern development possible.
              </p>
            </div>

            <div className="md:col-span-4 rounded-3xl bg-gradient-to-br from-secondary to-secondary/50 border border-border p-10 hover:shadow-xl transition-all">
              <Users className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-3xl font-bold mb-4">Engineering Leadership</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Building self-managing teams that ship quality software. Creating systems where I&apos;m no longer the bottleneck.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase - Large Images */}
      <section className="py-24 bg-muted/20">
        <div className="container-small mx-auto px-4 md:px-8">
          <div className="space-y-24">
            {[
              { title: "Project Alpha", desc: "Building the next generation of developer tools", tag: "AI-Powered" },
              { title: "Project Beta", desc: "Reimagining team collaboration", tag: "Collaboration" },
            ].map((project, i) => (
              <div key={i} className="group">
                <div className="relative h-[500px] rounded-3xl overflow-hidden mb-8 bg-gradient-to-br from-primary/20 to-primary/5">
                  <div className="absolute inset-0 bg-muted group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Rocket className="h-32 w-32 text-primary/40" />
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="inline-block px-3 py-1 mb-3 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      {project.tag}
                    </div>
                    <h3 className="text-4xl font-bold mb-3">{project.title}</h3>
                    <p className="text-xl text-muted-foreground">{project.desc}</p>
                  </div>
                  <Button variant="ghost" size="lg" className="group">
                    View Project
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Code Block Showcase */}
      <section className="py-24">
        <div className="container-small mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Beautiful Code</h2>
            <p className="text-xl text-muted-foreground">
              Clean, readable, maintainable
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-muted/50 rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-border bg-muted/80">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 text-center text-sm text-muted-foreground font-mono">
                  example.ts
                </div>
              </div>
              <div className="p-8 font-mono text-sm">
                <pre className="text-foreground/90">
                  <code>{`const buildGreatProducts = async () => {
  const idea = await brainstorm();
  const design = refine(idea);
  const code = craft(design);
  return ship(code);
};`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette Showcase */}
      <section className="py-24 bg-muted/20">
        <div className="container-small mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Color Harmony</h2>
            <p className="text-xl text-muted-foreground">
              Earth tones meet tech precision
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { name: "Primary", color: "bg-primary" },
              { name: "Secondary", color: "bg-secondary" },
              { name: "Accent", color: "bg-accent" },
              { name: "Muted", color: "bg-muted" },
              { name: "Background", color: "bg-background border border-border" },
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className={`aspect-square ${item.color} rounded-2xl mb-4 group-hover:scale-105 transition-transform shadow-lg`} />
                <h3 className="text-center font-medium">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Visualization Mockup */}
      <section className="py-24">
        <div className="container-small mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Insights at a Glance</h2>
            <p className="text-xl text-muted-foreground">
              Making data beautiful and actionable
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BarChart3, label: "Performance", value: "+32%", trend: "up" },
              { icon: PieChart, label: "Efficiency", value: "94%", trend: "up" },
              { icon: Activity, label: "Uptime", value: "99.9%", trend: "stable" },
            ].map((stat, i) => (
              <div key={i} className="bg-muted/30 rounded-3xl p-8 border border-border hover:border-primary transition-all">
                <div className="flex items-center justify-between mb-6">
                  <stat.icon className="h-8 w-8 text-primary" />
                  <div className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-muted-foreground"}`}>
                    {stat.trend === "up" ? "↑" : "→"}
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Badge Collection */}
      <section className="py-24 bg-gradient-to-br from-muted/30 to-background">
        <div className="container-small mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Certifications & Awards</h2>
          </div>

          <div className="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
            {[
              "AWS Certified",
              "React Expert",
              "TypeScript Pro",
              "Node.js Master",
              "System Design",
              "Leadership",
              "Agile",
              "DevOps",
              "Security",
              "Performance",
            ].map((badge, i) => (
              <div
                key={i}
                className="px-6 py-3 bg-primary/10 border border-primary/30 text-primary rounded-full hover:bg-primary hover:text-white transition-all cursor-pointer font-medium"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Full Width with Gradient */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.58_0.09_150/0.15),transparent_70%)]" />

        <div className="container-small mx-auto px-4 md:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Let&apos;s Build Something{" "}
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                Extraordinary
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              Whether you&apos;re looking to collaborate on a project, discuss AI and software engineering, or just want to chat about tea—I&apos;d love to connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-lg px-10 py-6">
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10 py-6">
                Read My Articles
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links - Icon Grid */}
      <section className="py-16 bg-muted/20">
        <div className="container-small mx-auto px-4 md:px-8">
          <div className="flex justify-center gap-6">
            {[
              { icon: Github, href: "https://github.com/jnarowski" },
              { icon: Twitter, href: "#" },
              { icon: Linkedin, href: "https://linkedin.com/in/johnpaulnarowski" },
              { icon: Mail, href: "mailto:jp@sourceborn.com" },
            ].map((social, i) => (
              <Link
                key={i}
                href={social.href}
                className="w-14 h-14 bg-background border border-border rounded-full flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all group"
              >
                <social.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Separator */}
      <section className="py-16">
        <div className="container-small mx-auto px-4 md:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>Designed with intention. Built with care.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
