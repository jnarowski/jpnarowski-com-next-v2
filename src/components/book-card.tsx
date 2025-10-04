import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import type { Book } from "@/lib/books";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const authorDisplay = Array.isArray(book.author)
    ? book.author.join(", ")
    : book.author;

  return (
    <a
      href={book.amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block group h-full"
      aria-label={`View ${book.title} on Amazon`}
    >
      <Card className="h-full overflow-hidden p-0 gap-0 hover:shadow-lg hover:scale-[1.02] hover:border-[var(--accent-purple)] transition-all duration-300">
        <div className="relative aspect-[2/3] overflow-hidden bg-muted">
          <Image
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        <div className="p-4 space-y-2 flex flex-col h-full">
          <h3 className="font-semibold text-base leading-snug line-clamp-2 group-hover:text-[var(--accent-purple)] transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {authorDisplay}
          </p>
          {book.notes && (
            <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3 flex-1">
              {book.notes}
            </p>
          )}
          <div className="flex items-center justify-between pt-2">
            {book.category && (
              <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                {book.category}
              </span>
            )}
            <div className="flex items-center gap-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
              <ExternalLink className="h-3 w-3" />
              <span>View on Amazon</span>
            </div>
          </div>
        </div>
      </Card>
    </a>
  );
}
