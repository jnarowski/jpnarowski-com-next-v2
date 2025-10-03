import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllArticles } from "@/lib/blog";
import { Calendar, Clock } from "lucide-react";

export const metadata = {
  title: "Articles - JP Narowski",
  description: "Exploring AI, software engineering, and building products. Learn from my journey as I share insights and tutorials.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-6">Articles</h1>
          <p className="text-xl text-muted-foreground">
            Exploring AI, software engineering, and building products. Join me on my journey as I learn and share.
          </p>
        </div>

        {/* Articles List */}
        {articles.length > 0 ? (
          <div className="space-y-6">
            {articles.map((article) => (
              <Link key={article.slug} href={`/articles/${article.slug}`} className="block group">
                <Card className="hover:shadow-lg transition-all hover:border-[var(--accent-purple)] overflow-hidden p-0">
                  <div className="md:flex md:h-full">
                    {article.coverImage && (
                      <div className="md:w-80 md:flex-shrink-0 h-48 md:h-auto overflow-hidden">
                        <Image
                          src={article.coverImage}
                          alt={article.title}
                          width={320}
                          height={192}
                          className="w-full h-full object-cover object-left group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col p-6">
                      <div className="mb-4">
                        <h3 className="text-2xl font-semibold mb-3 group-hover:text-[var(--accent-purple)] transition-colors">
                          {article.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(article.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {article.readingTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground/90 mb-4">{article.description}</p>
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag) => (
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
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground text-lg">
                Articles coming soon! I&apos;m working on some exciting content about AI and software engineering.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
