import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/blog";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} - JP Narowski`,
    description: article.description,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="container-small mx-auto px-4 md:px-8 py-8 md:py-16">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <div className="mb-8 md:mb-12">
          <Button variant="ghost" asChild className="pl-0">
            <Link href="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readingTime}
            </span>
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <Separator className="my-6 md:my-8" />
        </header>

        {/* Cover Image */}
        {article.coverImage && (
          <div className="mb-8 md:mb-12">
            <Image
              src={article.coverImage}
              alt={article.title}
              width={1200}
              height={630}
              className="rounded-lg w-full h-auto"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-base md:prose-lg max-w-none">
          <MDXRemote source={article.content} />
        </div>

        {/* Article Footer */}
        <footer className="mt-12 md:mt-16 pt-8 border-t">
          <Button variant="outline" asChild>
            <Link href="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              View All Articles
            </Link>
          </Button>
        </footer>
      </div>
    </article>
  );
}
