import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Calendar, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Speaking & Podcasts - JP Narowski",
  description: "Podcast appearances and talks on tech, entrepreneurship, and building successful businesses.",
};

const podcasts = [
  {
    name: "Mixergy Podcast",
    date: "January 2019",
    topic: "CRM for Speakers Passes $30k in MRR",
    host: "Nathan Latka",
    description:
      "A deep dive into how KarmaCRM grew to over $30,000 in monthly recurring revenue, focusing on the speaker and event management market.",
    url: null, // Add URL if available
  },
  {
    name: "Sustainable Success Podcast",
    date: "May 2018",
    topic: "How to Achieve Work Life Harmony",
    host: "Chris Salem",
    description:
      "Discussion about balancing entrepreneurship with personal life, maintaining sustainable business practices, and creating harmony between work and life.",
    url: null, // Add URL if available
  },
  {
    name: "Crack the Customer Code Podcast",
    date: "August 2017",
    topic: "John-Paul Narowski, KarmaCRM",
    host: null,
    description:
      "An interview about building KarmaCRM, understanding customer needs, and creating software that solves real business problems.",
    url: null, // Add URL if available
  },
];

export default function SpeakingPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <Mic className="h-8 w-8 md:h-10 md:w-10 text-[var(--accent-purple)]" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Speaking & Podcasts</h1>
          </div>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8">
            I&apos;ve been interviewed for a number of podcasts and given talks on tech, entrepreneurship,
            and building successful businesses.
          </p>
          <div className="w-full max-w-2xl">
            <Image
              src="/jp-speaking.jpg"
              alt="JP Narowski Speaking"
              width={800}
              height={533}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>

        {/* Podcasts Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Podcast Appearances</h2>
          <div className="space-y-6">
            {podcasts.map((podcast, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl md:text-2xl mb-2">{podcast.name}</CardTitle>
                      <CardDescription className="flex flex-col gap-1">
                        <span className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3.5 w-3.5" />
                          {podcast.date}
                        </span>
                        {podcast.host && (
                          <span className="text-sm">Hosted by {podcast.host}</span>
                        )}
                      </CardDescription>
                    </div>
                    {podcast.url && (
                      <Link
                        href={podcast.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent-purple)] hover:text-[var(--accent-purple-dark)] transition-colors flex items-center gap-1"
                      >
                        <span className="text-sm font-medium">Listen</span>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-2 text-base md:text-lg">{podcast.topic}</h3>
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed">{podcast.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Future Speaking */}
        <section>
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-xl md:text-2xl font-bold mb-4">Future Speaking</h2>
              <p className="text-sm md:text-base text-foreground/90 mb-4 leading-relaxed">
                I&apos;m currently focusing on AI and building in public. I love sharing my experiences
                with entrepreneurship, technical leadership, and the evolving AI landscape.
              </p>
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                If you&apos;re interested in having me on your podcast or speak at your event, please{" "}
                <Link
                  href="mailto:jp@sourceborn.com"
                  className="text-[var(--accent-purple)] hover:text-[var(--accent-purple-dark)] underline underline-offset-4 font-medium"
                >
                  reach out to jp@sourceborn.com
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
