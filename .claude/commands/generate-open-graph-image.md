---
description: Generate Open Graph image for a Next.js page using Playwright screenshot
argument-hint: [page-url]
---

# Generate Open Graph Image

Generates a 1200x630 Open Graph image by screenshotting a Next.js page using the Playwright MCP server. The image is saved to the corresponding app directory following Next.js conventions.

## Variables

- $page-url: $1 (required) - Full URL to screenshot (e.g., `http://localhost:3000/articles/my-post`)

## Instructions

- The command takes a full URL as input (supports both localhost and production URLs)
- Screenshots are captured at 1200x630 pixels (standard OG image dimensions)
- Output file is named `opengraph-image.png` following Next.js conventions
- File is placed in the corresponding `src/app/[route]/` directory
- For root path `/`, save to `src/app/opengraph-image.png`
- For nested paths like `/articles/my-post`, save to `src/app/articles/[slug]/opengraph-image.png`
- The dev server is assumed to be running; Playwright will fail with connection error if not

## Workflow

1. **Parse the URL**
   - Extract the path from $page-url
   - Determine the correct app directory based on the route structure
   - For dynamic routes (e.g., `/articles/specific-post`), map to the dynamic route folder (e.g., `src/app/articles/[slug]/`)

2. **Verify target directory exists**
   - Check if the corresponding app directory exists
   - If the directory doesn't exist, STOP and inform the user that the route doesn't exist in the app directory

3. **Capture screenshot using Playwright**
   - Use `mcp__playwright__browser_navigate` to load $page-url
   - Use `mcp__playwright__browser_resize` to set viewport to 1200x630
   - Wait for page to fully load (use `mcp__playwright__browser_wait_for` if needed)
   - Use `mcp__playwright__browser_take_screenshot` with a simple filename (e.g., `og-temp.png`)
     - NOTE: Playwright saves to `.playwright-mcp/` directory and doesn't accept absolute paths
   - Move the screenshot from `.playwright-mcp/[filename]` to the target path using `mv` command

4. **Verify and report**
   - Confirm the file was created at the expected path using `ls -lh`
   - Report the full path to the generated image and file size
   - Remind user that Next.js will automatically use this image for OG tags

## Route Mapping Examples

Map URLs to app directories:

- `http://localhost:3000/` → `src/app/opengraph-image.png`
- `http://localhost:3000/about` → `src/app/about/opengraph-image.png`
- `http://localhost:3000/articles` → `src/app/articles/opengraph-image.png`
- `http://localhost:3000/articles/my-post` → `src/app/articles/[slug]/opengraph-image.png`
- `http://localhost:3000/experiments/tax-calculator` → `src/app/experiments/tax-calculator/opengraph-image.png`

## Common Pitfalls

- **Dev server not running**: Playwright will fail to connect. Remind user to run `pnpm dev` first.
- **Dynamic routes**: For paths like `/articles/specific-slug`, the image should go in `src/app/articles/[slug]/` (the template directory), not a specific slug directory.
- **Directory doesn't exist**: If the app directory structure doesn't match the URL, inform the user rather than creating directories.
- **Page not fully loaded**: Some pages may need additional wait time. Use `mcp__playwright__browser_wait_for` with time parameter if needed.
- **Playwright file restrictions**: The `browser_take_screenshot` tool only accepts relative filenames and saves to `.playwright-mcp/`. Always use a temp filename and move it afterward.

## Report

After successful generation, report:
```
✓ Generated Open Graph image: [full-path-to-file]
  Dimensions: 1200x630px
  File size: [file-size]
  Route: [extracted-route]

Next.js will automatically serve this image for og:image meta tags.
Preview at: [page-url]
```

If there are errors, provide clear guidance:
- Server connection issues → "Is your dev server running? Run `pnpm dev` first."
- Route not found → "The route [path] doesn't exist in src/app/. Create the route first."
- Screenshot issues → Report the Playwright error with context
