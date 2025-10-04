# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

JP Narowski's personal site - a blog-first Next.js application focused on AI content with clean Apple-inspired design and purple accent colors (Geoffrey Huntley style).

## Development Commands

**Development server:**
```bash
pnpm dev
```
Runs Next.js with Turbopack at http://localhost:3000

**Build:**
```bash
pnpm build
```
Production build with Turbopack

**Lint:**
```bash
pnpm lint
```
Runs ESLint

**Package manager:** This project uses pnpm (v10.18.0+)

## Architecture

### Framework & Routing
- Next.js 15 with App Router
- File-based routing in `src/app/`
- Routes: `/`, `/about`, `/articles`, `/articles/[slug]`, `/speaking`, `/experiments`

### Content Management
Blog articles are managed as MDX/Markdown files:
- **Location**: `content/articles/*.mdx`
- **Parsing**: Uses `gray-matter` for frontmatter + `reading-time` for estimates
- **Required frontmatter**: `title`, `description`, `date`, `tags`, `published`
- **Blog utilities**: `src/lib/blog.ts` provides `getAllArticles()` and `getArticleBySlug()`
- Articles are auto-sorted by date (newest first) and filtered by `published: true`

### Styling & Components
- **CSS Framework**: Tailwind CSS v4
- **UI Components**: shadcn/ui with "new-york" style
- **Theme**: Dark mode via `next-themes` with system detection
- **Fonts**: Geist Sans and Geist Mono
- **Icons**: Lucide React
- **Component path aliases**: `@/*` maps to `src/*`

### Layout Structure
- **Root Layout** (`src/app/layout.tsx`): Wraps all pages with Navigation, Footer, and ThemeProvider
- **Navigation**: Sticky header with theme toggle
- **Footer**: Social links (GitHub, LinkedIn, Email)
- **Theme**: System-aware dark/light mode switching

### Path Aliases
```typescript
@/components → src/components
@/lib → src/lib
@/utils → src/lib/utils
@/ui → src/components/ui
```

## Adding Blog Articles

1. Create new file: `content/articles/your-article-slug.mdx`
2. Add frontmatter:
```mdx
---
title: "Your Article Title"
description: "Brief description"
date: "2025-10-04"
tags: ["AI", "Tutorial"]
published: true
coverImage: "/covers/image.jpg" # optional
---

# Your content here
```
3. Article automatically appears on `/articles` when `published: true`

## Design System

- **Accent color**: Purple/magenta (see `globals.css` for custom colors)
- **Base palette**: Neutral with dark mode support
- **Design principles**: Apple-inspired minimalism with generous whitespace
- **Typography**: Clear hierarchy using Geist fonts

## MDX Configuration

- **Config**: `next.config.ts` enables MDX page extensions
- **Components**: Custom MDX components defined in `mdx-components.tsx`
- **Rendering**: Articles use Next.js dynamic rendering with `getArticleBySlug()`

## Key Files

- `src/lib/blog.ts` - Core blog article fetching/parsing logic
- `src/app/layout.tsx` - Root layout with theme provider
- `src/app/globals.css` - Global styles and design tokens
- `components.json` - shadcn/ui configuration
- `content/articles/` - Blog article source files
