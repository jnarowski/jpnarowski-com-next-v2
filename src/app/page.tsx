import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllArticles } from "@/lib/blog";

export default function Home() {
  const articles = getAllArticles().slice(0, 3);

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-20">
      {/* Hero Section */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0">
            <Image
              src="/avatar-square.png"
              alt="JP Narowski"
              width={160}
              height={160}
              className="rounded-full"
              priority
            />
          </div>

          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              JP Narowski
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground mb-6">
              CTO, Founder, and Tea lover
            </p>

            <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Denver, CO</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>Head of Engineering at Spectora</span>
              </div>
            </div>

            <p className="text-lg text-foreground/90 mb-8 leading-relaxed">
              I&apos;m on a journey to become an AI influencer, sharing everything I learn about
              artificial intelligence, software engineering, and building products. I believe in
              learning in public and helping others navigate the rapidly evolving world of AI.
            </p>

            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href="/articles">
                  Read My Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">About Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest Articles</h2>
          <Button asChild variant="ghost">
            <Link href="/articles">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {articles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link key={article.slug} href={`/articles/${article.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow hover:border-[var(--accent-purple)] overflow-hidden p-0">
                  {article.coverImage && (
                    <div className="h-48 w-full overflow-hidden">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        width={600}
                        height={192}
                        className="w-full h-full object-cover object-left hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(article.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {" • "}
                        {article.readingTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground line-clamp-3 mb-4">
                        {article.description}
                      </p>
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                Articles coming soon! I&apos;m working on some exciting content about AI.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
