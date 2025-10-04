import { Marquee } from "@/components/ui/marquee";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { SparklesText } from "@/components/ui/sparkles-text";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  Brain,
  Code,
  Rocket,
  Sparkles,
  Zap,
  Star,
  Heart,
  Database,
  Globe,
  Shield,
  Terminal,
  Package
} from "lucide-react";

export const metadata = {
  title: "MagicUI Showcase - Component Reference",
  description: "A comprehensive showcase of MagicUI components for design reference",
};

const technologies = [
  { icon: Code, name: "TypeScript" },
  { icon: Globe, name: "React" },
  { icon: Rocket, name: "Next.js" },
  { icon: Database, name: "PostgreSQL" },
  { icon: Shield, name: "Security" },
  { icon: Terminal, name: "Node.js" },
  { icon: Package, name: "Docker" },
  { icon: Brain, name: "AI/ML" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP Engineering at TechCorp",
    content: "The attention to detail and thoughtful architecture makes every project a success.",
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO at StartupXYZ",
    content: "Exceptional leadership and technical vision. Builds systems that truly scale.",
  },
  {
    name: "Emily Watson",
    role: "Product Manager",
    content: "A rare combination of technical depth and product thinking.",
  },
  {
    name: "David Kim",
    role: "Senior Developer",
    content: "Learning from JP has accelerated my growth as an engineer exponentially.",
  },
  {
    name: "Lisa Johnson",
    role: "Designer",
    content: "Creates beautiful experiences that users love and developers can maintain.",
  },
  {
    name: "Alex Turner",
    role: "Founder",
    content: "Turned our ambitious vision into reality with elegant, scalable solutions.",
  },
];

export default function MagicUIShowcase() {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero with Animated Grid Pattern */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <AnimatedGridPattern
          className="absolute inset-0 opacity-30"
          numSquares={30}
          maxOpacity={0.2}
          duration={3}
        />
        <div className="container mx-auto px-4 md:px-8 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <SparklesText className="text-6xl md:text-8xl font-bold mb-6">
              MagicUI Showcase
            </SparklesText>
            <p className="text-xl md:text-3xl text-muted-foreground mb-10 leading-relaxed">
              A comprehensive reference of animated UI components for modern web applications
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <ShimmerButton className="px-8 py-6 text-lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Get Started
              </ShimmerButton>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 md:px-8 mb-16">
          <h2 className="text-5xl font-bold mb-4 text-center">Marquee Component</h2>
          <p className="text-xl text-muted-foreground text-center">
            Smooth infinite scrolling for showcasing content
          </p>
        </div>

        {/* Technology Marquee */}
        <div className="mb-8">
          <Marquee className="py-6" pauseOnHover>
            {technologies.map((tech, i) => (
              <div
                key={i}
                className="mx-6 flex flex-col items-center gap-3 px-8 py-6 bg-background border border-border rounded-2xl hover:border-primary transition-all"
              >
                <tech.icon className="h-12 w-12 text-primary" />
                <span className="text-sm font-medium">{tech.name}</span>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Testimonials Marquee - Reverse */}
        <div>
          <Marquee className="py-6" reverse pauseOnHover>
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="mx-6 w-[400px] px-8 py-6 bg-background border border-border rounded-2xl hover:border-primary transition-all"
              >
                <p className="text-foreground/90 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <div className="font-bold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Bento Grid Layout</h2>
            <p className="text-xl text-muted-foreground">
              Asymmetric grid layouts for feature showcases
            </p>
          </div>

          <BentoGrid className="max-w-6xl mx-auto">
            <BentoCard
              name="AI-First Development"
              className="md:col-span-2 md:row-span-2"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
              }
              Icon={Brain}
              description="Exploring how LLMs are transforming software development, from code generation to product design."
              href="#"
              cta="Learn more"
            />

            <BentoCard
              name="Performance"
              className="md:col-span-1"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5" />
              }
              Icon={Zap}
              description="Every millisecond matters. Built for speed."
              href="#"
              cta="View metrics"
            />

            <BentoCard
              name="Beautiful Code"
              className="md:col-span-1"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-500/5" />
              }
              Icon={Code}
              description="Clean, maintainable, and elegant solutions."
              href="#"
              cta="See examples"
            />

            <BentoCard
              name="Rapid Deployment"
              className="md:col-span-1"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-500/5" />
              }
              Icon={Rocket}
              description="Ship features fast without sacrificing quality."
              href="#"
              cta="Deploy now"
            />

            <BentoCard
              name="Innovation"
              className="md:col-span-1"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-500/5" />
              }
              Icon={Sparkles}
              description="Pushing boundaries with cutting-edge tech."
              href="#"
              cta="Explore"
            />
          </BentoGrid>
        </div>
      </section>

      {/* Text Reveal Section */}
      <section className="py-32 bg-muted/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Text Reveal Animation</h2>
            <p className="text-xl text-muted-foreground">
              Scroll to reveal dramatic text animations
            </p>
          </div>

          <TextReveal>
            Building the future of software, one line of code at a time. Empowering teams to create exceptional products that users love.
          </TextReveal>
        </div>
      </section>

      {/* Shimmer Buttons */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Shimmer Buttons</h2>
            <p className="text-xl text-muted-foreground">
              Eye-catching animated buttons for CTAs
            </p>
          </div>

          <div className="flex flex-wrap gap-6 justify-center">
            <ShimmerButton className="px-8 py-4">
              Default Shimmer
            </ShimmerButton>

            <ShimmerButton className="px-8 py-4" shimmerColor="#8b5cf6">
              <Star className="mr-2 h-5 w-5" />
              Purple Shimmer
            </ShimmerButton>

            <ShimmerButton className="px-8 py-4" shimmerColor="#ec4899">
              <Heart className="mr-2 h-5 w-5" />
              Pink Shimmer
            </ShimmerButton>
          </div>
        </div>
      </section>

      {/* Sparkles Text Variations */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Sparkles Text</h2>
            <p className="text-xl text-muted-foreground">
              Add magical sparkle effects to any text
            </p>
          </div>

          <div className="space-y-12 max-w-4xl mx-auto">
            <div className="text-center">
              <SparklesText className="text-6xl font-bold">
                Innovation at Scale
              </SparklesText>
            </div>

            <div className="text-center">
              <SparklesText className="text-5xl font-bold" sparklesCount={8}>
                Crafted with Care
              </SparklesText>
            </div>

            <div className="text-center">
              <SparklesText className="text-4xl font-bold">
                The Future is Now
              </SparklesText>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Grid Pattern Backgrounds */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Animated Grid Pattern</h2>
            <p className="text-xl text-muted-foreground">
              Dynamic background animations for depth
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="relative h-80 rounded-3xl overflow-hidden border border-border">
              <AnimatedGridPattern
                className="absolute inset-0"
                numSquares={20}
                maxOpacity={0.3}
                duration={2}
              />
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center">
                  <Zap className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">Fast Animation</h3>
                </div>
              </div>
            </div>

            <div className="relative h-80 rounded-3xl overflow-hidden border border-border">
              <AnimatedGridPattern
                className="absolute inset-0"
                numSquares={40}
                maxOpacity={0.2}
                duration={5}
              />
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center">
                  <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">Slow Animation</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guide */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-8 text-center">Component Usage</h2>

            <div className="space-y-8">
              <div className="bg-background rounded-2xl p-8 border border-border">
                <h3 className="text-2xl font-bold mb-4">Marquee</h3>
                <p className="text-muted-foreground mb-4">
                  Perfect for showcasing technologies, testimonials, or any repeating content.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                  <code>{`<Marquee pauseOnHover reverse>
  {items.map(item => <Card key={item.id} />)}
</Marquee>`}</code>
                </div>
              </div>

              <div className="bg-background rounded-2xl p-8 border border-border">
                <h3 className="text-2xl font-bold mb-4">Bento Grid</h3>
                <p className="text-muted-foreground mb-4">
                  Create asymmetric feature showcases with varied card sizes.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                  <code>{`<BentoGrid>
  <BentoCard className="md:col-span-2" ... />
  <BentoCard className="md:col-span-1" ... />
</BentoGrid>`}</code>
                </div>
              </div>

              <div className="bg-background rounded-2xl p-8 border border-border">
                <h3 className="text-2xl font-bold mb-4">Shimmer Button</h3>
                <p className="text-muted-foreground mb-4">
                  High-impact CTAs with animated shimmer effects.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                  <code>{`<ShimmerButton shimmerColor="#8b5cf6">
  Click Me
</ShimmerButton>`}</code>
                </div>
              </div>

              <div className="bg-background rounded-2xl p-8 border border-border">
                <h3 className="text-2xl font-bold mb-4">Sparkles Text</h3>
                <p className="text-muted-foreground mb-4">
                  Add magical sparkle animations to headlines.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                  <code>{`<SparklesText
  text="Amazing Title"
  sparklesCount={10}
/>`}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <AnimatedGridPattern
          className="absolute inset-0 opacity-20"
          numSquares={50}
          maxOpacity={0.15}
          duration={4}
        />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <SparklesText className="text-6xl md:text-7xl font-bold mb-8">
            Ready to Build?
          </SparklesText>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Use these components as reference for creating engaging, animated user experiences
          </p>
          <ShimmerButton className="px-10 py-6 text-lg">
            <Rocket className="mr-2 h-5 w-5" />
            Start Building
          </ShimmerButton>
        </div>
      </section>
    </div>
  );
}
