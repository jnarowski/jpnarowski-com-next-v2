import { Card, CardContent } from "@/components/ui/card";
import {
  Github,
  Linkedin,
  Mail,
  Mountain,
  ChefHat,
  BookOpen,
  Laptop,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "JP Narowski - Technology Entrepreneur and Engineering Leader",
  description:
    "Head of Engineering at Spectora, former CRM founder, and tech enthusiast who builds delightful applications and leads self-managing teams.",
};

export default function AboutPage() {
  return (
    <div className="container-small mx-auto px-4 md:px-8 py-8 md:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            About Me
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            CTO, Founder, and lifelong learner building at the intersection of
            AI and software engineering
          </p>
        </div>

        {/* Portrait and Introduction */}
        <section className="mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            <div className="flex-shrink-0 w-full md:w-auto">
              <Image
                src="/portrait.jpg"
                alt="JP Narowski"
                width={300}
                height={300}
                className="rounded-lg w-full md:w-[300px] h-auto"
              />
            </div>
            <div className="flex-1">
              <p className="text-base md:text-lg leading-relaxed text-foreground/90 mb-4">
                As the oldest of 6 kids, I always say that I &quot;Huckleberry
                Finn&apos;ed&quot; my way into entrepreneurship. I established
                an elaborate system of rewards to get my siblings to do my
                chores. They still claim to be owed a Coke. In my free time, I
                love to ski fast, cook, and read everything I can get my hands
                on.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-foreground/90 mb-4">
                From an early age, I was obsessed with computers. I got started
                by destroying and rebuilding them. That evolved into a deep
                passion for code, and a love for crafting applications that
                delight. Even after 15 years, I still wake up thrilled to tackle
                the challenges of aligning engaging user experiences with real
                business ROI.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-foreground/90">
                While the backbone of my experience lies within technical
                leadership, I have also built and sold companies as CEO.
                It&apos;s this unique blend of technology and business acumen
                that drives my leadership style. My goal is to constantly fire
                myself by creating self-managing teams, processes, and code.
              </p>
            </div>
          </div>
        </section>

        {/* Professional Background */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            Professional Background
          </h2>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <Image
                    src="/logos/spectora.jpg"
                    alt="Spectora"
                    width={60}
                    height={60}
                    className="rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold mb-2">
                      Spectora
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Head of Engineering | 2020 - Present
                    </p>
                    <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                      My current day job is Head of Engineering at Spectora. We
                      build some awesome, modern, All-in-One Home Inspection
                      Software. One of our customers said our software saved him
                      so much time that he is going to have another kid. No
                      joke. Talk about a strong value prop.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start pt-8 border-t">
                  <Image
                    src="/logos/clickflow.webp"
                    alt="Clickflow"
                    width={60}
                    height={60}
                    className="rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold mb-2">
                      Clickflow
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Co-Founder | 2016 - 2020
                    </p>
                    <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                      Marketing Tech A/B Testing for SEO.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start pt-8 border-t">
                  <Image
                    src="/logos/karmaSpeaker.png"
                    alt="KarmaCRM"
                    width={60}
                    height={60}
                    className="rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold mb-2">
                      KarmaCRM
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Founder & CTO | 2011 - 2019
                    </p>
                    <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                      I founded and grew karmaCRM (a B2B SaaS CRM) to over 6,000
                      daily active users and 25k in MRR.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Philosophy */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            My Philosophy
          </h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                I focus on creating{" "}
                <span className="font-semibold text-primary">
                  self-managing teams, processes, and code
                </span>
                . The intersection of technology and business is where I thrive,
                combining deep technical expertise with entrepreneurial drive. I
                believe great software should be both powerful and intuitive.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Interests */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            Personal Interests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <Mountain className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Skiing</h3>
                  <p className="text-sm text-muted-foreground">
                    Living in Denver gives me easy access to world-class slopes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <ChefHat className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Cooking</h3>
                  <p className="text-sm text-muted-foreground">
                    I love experimenting in the kitchen
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <BookOpen className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Reading</h3>
                  <p className="text-sm text-muted-foreground">
                    Always learning and expanding my perspective
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <Laptop className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Computer Technology</h3>
                  <p className="text-sm text-muted-foreground">
                    Still passionate about building and creating
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Early Career */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            Early Career
          </h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                My journey started with destroying and rebuilding computers
                (much to my parents&apos; dismay, I&apos;m sure). That hands-on
                curiosity evolved into a passion for coding and creating
                delightful user experiences. I developed my skills through
                experimentation and real-world projects, eventually founding my
                first significant venture, Amish Tables, which I ran as CEO from
                2003 to 2017.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            Get in Touch
          </h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm md:text-base text-foreground/90 mb-4 leading-relaxed">
                I&apos;m always interested in connecting with fellow builders,
                entrepreneurs, and AI enthusiasts.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link
                  href="https://github.com/jnarowski"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span>github.com/jnarowski</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/johnpaulnarowski/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>linkedin.com/in/johnpaulnarowski</span>
                </Link>
                <Link
                  href="mailto:jp@sourceborn.com"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>jp@sourceborn.com</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
