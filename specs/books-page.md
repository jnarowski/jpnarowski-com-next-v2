# Feature: Books Page

## Feature Description

A dedicated books page that showcases JP Narowski's favorite books of all time with a clean, visually appealing layout. The page will display book covers, titles, authors, and other relevant information sourced from Amazon. The design will follow the site's Apple-inspired minimalism with purple accent colors, creating an engaging reading list that visitors can explore. The page will include a reusable Book component that can be easily extended as more books are added over time.

## User Story

As a visitor to JP Narowski's personal website
I want to see a curated list of his favorite books with cover images and details
So that I can discover new books and understand what influences his thinking

## Problem Statement

The website currently lacks a way to share book recommendations and reading influences. Visitors who want to understand JP's interests, inspirations, and recommended reading have no dedicated space to discover these books. Without a books page, valuable content about personal development, business, and life philosophy remains unshared.

## Solution Statement

Create a dedicated `/books` route with a visually rich page that displays curated book recommendations. Each book will be presented as a card with its cover image, title, author, and optional metadata (rating, publication year, personal notes). The implementation will use a reusable Book component and data structure that makes it easy to add new books over time. The page will follow existing site patterns (similar to the articles page) while adapting the design for visual book covers. Amazon will serve as the source of truth for book metadata and cover images.

## Relevant Files

Use these files to implement the feature:

- `src/app/articles/page.tsx` - Reference for page layout patterns, card-based listings, and responsive design
- `src/components/ui/card.tsx` - Existing Card component for consistent styling
- `src/components/navigation.tsx` - Navigation component that needs a "Books" link added
- `src/lib/blog.ts` - Reference for data fetching pattern (to create similar `src/lib/books.ts`)
- `src/app/globals.css` - Global styles with purple accent colors
- `README.md` - Project overview and architecture documentation
- `CLAUDE.md` - Project-specific guidance and conventions

### New Files

- `src/app/books/page.tsx` - Main books page component
- `src/lib/books.ts` - Book data utilities and type definitions
- `src/components/book-card.tsx` - Reusable Book component for displaying individual books
- `public/books/` - Directory for storing downloaded book cover images

## Implementation Plan

### Phase 1: Foundation

Set up the basic infrastructure for the books feature including data types, utilities, and directory structure. Create a books data file that follows similar patterns to the blog articles system but adapted for book metadata. Download and organize book cover images from Amazon.

### Phase 2: Core Implementation

Build the Book component and Books page using the established design system. Implement responsive grid layouts that showcase book covers prominently while maintaining the site's clean aesthetic. Use shadcn/ui Card components and Tailwind CSS for consistent styling.

### Phase 3: Integration

Add the Books link to the navigation menu and ensure the page integrates seamlessly with the existing site structure. Test responsive behavior across devices and ensure the page follows the site's dark mode theming.

## Step by Step Tasks

### 1. Set up directory structure and download book covers

- Create `public/books/` directory for storing book cover images
- Use Puppeteer to navigate to Amazon pages for each book:
  - Extreme Ownership by Jocko Willink & Leif Babin
  - 4,000 Weeks by Oliver Burkeman
  - Die with Zero by Bill Perkins
  - Traction (EOS) by Gino Wickman
  - Positive Intelligence by Shirzad Chamine
  - Sapiens by Yuval Noah Harari
  - The Alchemist by Paulo Coelho
  - Multipliers by Liz Wiseman
- Download high-quality book cover images and save them with consistent naming (e.g., `extreme-ownership.jpg`)
- Verify all images are downloaded and properly sized

### 2. Create book data types and utilities

- Create `src/lib/books.ts` file
- Define `Book` interface with properties:
  - `id`: string (slug)
  - `title`: string
  - `author`: string | string[] (support multiple authors)
  - `coverImage`: string (path to image)
  - `amazonUrl`: string (link to Amazon page)
  - `rating?`: number (optional personal rating)
  - `dateRead?`: string (optional)
  - `notes?`: string (optional personal notes)
  - `category?`: string (optional)
- Create `getAllBooks()` function that returns hardcoded array of book data
- Create `getBookById(id: string)` function for future individual book pages
- Write unit tests for books utilities in `src/lib/books.test.ts`

### 3. Create the Book Card component

- Create `src/components/book-card.tsx`
- Design component to display:
  - Book cover image (prominent, using Next.js Image component)
  - Book title (bold, larger font)
  - Author name(s) (muted color)
  - Optional personal rating (stars or numerical)
  - Link to Amazon (external link with proper attributes)
- Use existing Card component from shadcn/ui
- Add hover effects (scale transform, border color change to purple)
- Ensure responsive design (stack on mobile, grid on desktop)
- Make the entire card clickable to Amazon
- Add proper accessibility attributes (alt text, aria-labels)

### 4. Create the Books page

- Create `src/app/books/page.tsx`
- Add page metadata (title, description) similar to articles page
- Create page header with title "Books" and descriptive subtitle
- Implement responsive grid layout:
  - Mobile: 1-2 columns
  - Tablet: 2-3 columns
  - Desktop: 3-4 columns
- Map over books from `getAllBooks()` and render BookCard components
- Add generous spacing between cards
- Follow container patterns from articles page (`container-small`, proper padding)
- Add empty state for when no books exist (though won't be needed initially)

### 5. Add Books link to navigation

- Edit `src/components/navigation.tsx`
- Add new link object to the `links` array:
  - `href: "/books"`
  - `label: "Books"`
  - `icon: BookOpen` (import from lucide-react)
- Verify link appears in both desktop and mobile navigation
- Test active state highlighting when on /books route
- Ensure navigation remains responsive and styled consistently

### 6. Polish and styling refinements

- Review page against design inspiration (Patrick Collison, Simon Eskildsen examples)
- Ensure book covers are properly sized and maintain aspect ratio
- Add subtle animations (hover states, transitions)
- Verify purple accent colors are used appropriately
- Check dark mode compatibility for all components
- Ensure proper spacing and typography hierarchy
- Optimize images for web (compression, proper formats)

### 7. Run validation commands

- Execute `pnpm lint` to ensure no linting errors
- Execute `pnpm build` to verify production build succeeds
- Execute `pnpm dev` and manually test:
  - Navigate to /books page
  - Verify all book covers load correctly
  - Test responsive behavior at different breakpoints
  - Test dark/light mode switching
  - Test navigation highlighting
  - Click book cards and verify Amazon links open correctly
  - Test on mobile viewport
- Run all existing tests to ensure no regressions: `pnpm test`

## Testing Strategy

### Unit Tests

- **books.ts utilities**:
  - Test `getAllBooks()` returns correct number of books
  - Test `getAllBooks()` returns books with all required fields
  - Test `getBookById()` returns correct book for valid ID
  - Test `getBookById()` returns null for invalid ID
  - Test author field handles both string and array formats

### Integration Tests

- **Books page rendering**:
  - Test page renders without errors
  - Test correct number of BookCard components are rendered
  - Test page metadata is set correctly
  - Test empty state displays when no books (if implemented)

- **Navigation integration**:
  - Test Books link appears in navigation
  - Test Books link navigates to /books
  - Test active state is applied when on books page

### Edge Cases

- Very long book titles (ensure text wrapping)
- Multiple authors (ensure proper formatting)
- Missing optional fields (rating, notes, dateRead)
- Books without cover images (fallback behavior)
- Slow image loading (loading states)
- Small viewport widths (mobile responsiveness)
- Very large viewport widths (max-width constraints)

## Acceptance Criteria

- [ ] Books page is accessible at `/books` route
- [ ] Navigation includes "Books" link with BookOpen icon
- [ ] Page displays all 8 initial books with proper cover images
- [ ] Each book card shows: cover image, title, author(s)
- [ ] Book cards link to Amazon product pages
- [ ] Page is fully responsive (mobile, tablet, desktop)
- [ ] Dark mode works correctly on books page
- [ ] Hover effects work on book cards (purple accent)
- [ ] Images are optimized and load quickly
- [ ] Page follows site's design system and Apple-inspired aesthetic
- [ ] All linting passes with zero errors
- [ ] Production build succeeds with zero errors
- [ ] All existing tests pass (zero regressions)
- [ ] New unit tests pass for books utilities

## Validation Commands

Execute every command to validate the feature works correctly with zero regressions.

- `pnpm lint` - Run linting to validate the feature works with zero regressions
- `pnpm build` - Build the project to ensure no build errors
- `pnpm test` - Run tests to validate the feature works with zero regressions
- `pnpm dev` - Start development server and manually verify:
  - Navigate to http://localhost:3000/books
  - Verify all book covers display correctly
  - Click each book card to verify Amazon links
  - Test responsive design at 375px, 768px, 1024px, 1440px widths
  - Toggle dark/light mode and verify styling
  - Verify navigation "Books" link works and highlights correctly

## Notes

### Design Inspiration Findings

From research of personal book pages:

1. **Patrick Collison** (patrickcollison.com/bookshelf):
   - Simple list format with book titles as links
   - Color-coded highlights for particularly great books
   - Minimal design with focus on content
   - Reading chart showing books per year

2. **Simon Eskildsen** (sirupsen.com/books):
   - Chronological list with star ratings
   - Date read displayed
   - Clean typography-focused design
   - Integration with Goodreads
   - Reading chart visualization

3. **Best practices identified**:
   - Prominent book cover images are engaging
   - Star ratings help convey recommendations
   - Author names should be clear
   - Links to purchase/learn more are valuable
   - Grid layouts work well for visual book covers
   - Personal notes/quotes add unique value

### Technical Considerations

- **Image optimization**: Use Next.js Image component for automatic optimization
- **External links**: Use `target="_blank" rel="noopener noreferrer"` for Amazon links
- **Accessibility**: Include proper alt text for book covers, ARIA labels for links
- **Performance**: Lazy load images below the fold
- **Future extensibility**:
  - Could add filtering by category
  - Could add search functionality
  - Could add "currently reading" section
  - Could integrate with Goodreads API
  - Individual book pages with detailed notes/reviews

### Amazon Integration Notes

- Amazon product pages provide:
  - High-quality cover images
  - Author information
  - Ratings and reviews
  - ISBN and publication details
- For this initial version, we'll manually curate book data
- Future enhancement could use Amazon Product Advertising API for dynamic data
- Book cover images should be downloaded and self-hosted to avoid external dependencies

### Future Enhancements

- Add "Currently Reading" section at the top
- Add filtering by category (Business, Philosophy, Self-Help, etc.)
- Add search functionality
- Create individual book pages with detailed reviews/notes
- Add reading statistics (books per year, favorite genres)
- Add quotes from books
- Integration with Goodreads or Literal.club APIs
- Add affiliate links for revenue generation
- Add "Want to Read" section
