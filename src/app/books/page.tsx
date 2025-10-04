import { getAllBooks } from "@/lib/books";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Books - JP Narowski",
  description:
    "A curated collection of my favorite books on leadership, philosophy, business, and personal development.",
};

export default function BooksPage() {
  const books = getAllBooks();

  return (
    <div className="container-small mx-auto px-4 md:px-8 py-8 md:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            Books
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            A collection of books that have shaped my thinking on leadership,
            productivity, philosophy, and life. Each one offers unique insights
            worth exploring.
          </p>
        </div>

        {/* Books List */}
        <div className="space-y-0">
          {books.map((book, index) => {
            const authorDisplay = Array.isArray(book.author)
              ? book.author.join(", ")
              : book.author;

            return (
              <div key={book.id}>
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-6 py-8 group hover:bg-muted/30 transition-colors -mx-4 px-4 md:-mx-6 md:px-6"
                >
                  {/* Book Cover */}
                  <div className="flex-shrink-0 w-24 md:w-32">
                    <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-md">
                      <Image
                        src={book.coverImage}
                        alt={`Cover of ${book.title}`}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold mb-1 group-hover:text-[var(--accent-purple)] transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground">
                        {authorDisplay}
                      </p>
                    </div>

                    {book.notes && (
                      <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                        {book.notes}
                      </p>
                    )}

                    <div className="flex items-center gap-3 pt-2">
                      {book.category && (
                        <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                          {book.category}
                        </span>
                      )}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="h-3 w-3" />
                        <span>View on Amazon</span>
                      </div>
                    </div>
                  </div>
                </a>
                {index < books.length - 1 && (
                  <div className="border-b border-border" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
