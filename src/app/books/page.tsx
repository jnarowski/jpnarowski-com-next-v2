import { getAllBooks } from "@/lib/books";
import { BookCard } from "@/components/book-card";

export const metadata = {
  title: "Books - JP Narowski",
  description:
    "A curated collection of my favorite books on leadership, philosophy, business, and personal development.",
};

export default function BooksPage() {
  const books = getAllBooks();

  return (
    <div className="container-small mx-auto px-4 md:px-8 py-8 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            Books
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            A collection of books that have shaped my thinking on leadership,
            productivity, philosophy, and life. Each one offers unique insights
            worth exploring.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
