# JP Narowski Personal Site - Redesign Overview

## 🎨 Design System

### Colors
- **Accent Purple**: Custom purple/magenta accent color inspired by Geoffrey Huntley's site
- **Clean Palette**: Neutral base with Apple-inspired minimalism
- **Dark Mode**: Full dark mode support with smooth transitions

### Typography
- **Fonts**: Geist Sans and Geist Mono (system fonts)
- **Blog Typography**: Custom prose styles with generous spacing
- **Hierarchy**: Clear visual hierarchy with 5xl/6xl headlines

## 📁 Site Structure

```
/                    → Homepage with hero + featured articles
/about              → Personal story and background
/articles           → Blog listing (AI-focused content)
/articles/[slug]    → Individual blog posts with MDX
/speaking           → Podcast appearances and talks
```

## ✨ Key Features

### 1. Blog-First Design
- Primary focus on articles and AI content
- MDX support for rich blog posts with code highlighting
- Reading time estimates
- Tag system for categorization
- Featured articles on homepage

### 2. Clean, Professional Layout
- Responsive navigation with theme toggle
- Sticky header for easy navigation
- Footer with social links (GitHub, LinkedIn, Email)
- Card-based UI for content blocks

### 3. Content Management
- Markdown files in `content/` directory
- Easy to add new articles in `content/articles/`
- Frontmatter support for metadata
- Automatic reading time calculation
- Published/draft status

### 4. Design Elements
- Purple accent color for personality
- Generous whitespace (Apple-inspired)
- Hover effects and transitions
- Clean typography with system fonts
- Responsive grid layouts

## 🚀 Getting Started

### Development
```bash
npm run dev
```
Visit http://localhost:3000

### Build
```bash
npm run build
```

### Adding New Articles
1. Create a new `.mdx` file in `content/articles/`
2. Add frontmatter with title, description, date, tags
3. Write your content in Markdown/MDX
4. Article will automatically appear in the articles list

Example:
```mdx
---
title: "My Article Title"
description: "Brief description"
date: "2025-10-03"
tags: ["AI", "Tutorial"]
published: true
---

# Your content here
```

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Content**: MDX with gray-matter
- **Theme**: next-themes for dark mode
- **Typography**: Geist fonts (system fonts)
- **Icons**: Lucide React

## 📋 Content Extracted

All content from your current site has been extracted into markdown files:
- `content/home.md` - Homepage content
- `content/about.md` - About page content
- `content/speaking.md` - Speaking/podcasts
- `content/work-experience.md` - Professional history
- `content/articles/welcome-to-my-ai-journey.mdx` - Sample first article

## 🎯 Next Steps

1. **Add More Articles**: Create MDX files in `content/articles/`
2. **Customize Colors**: Adjust the purple accent in `src/app/globals.css`
3. **Add Images**: Place images in `public/` directory
4. **Update Content**: Edit the markdown files to reflect your latest info
5. **Deploy**: Deploy to Vercel or your preferred hosting

## 🎨 Design Inspiration

- **Apple**: Clean, minimalist design with generous whitespace
- **Geoffrey Huntley**: Purple/magenta accent color and personality
- **Blog-First**: Content is king, designed for reading and learning

## 📱 Responsive Design

- Mobile-first approach
- Responsive navigation
- Adaptive grid layouts
- Touch-friendly buttons and links

---

**Built with ❤️ using Next.js, shadcn/ui, and Tailwind CSS**
