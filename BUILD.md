# Build and Deployment Guide

## Overview

This portfolio site supports multiple GitBook-styled book sections. Currently includes "Agentic Design Patterns" at `/blog/agentic-design-patterns/`.

## Architecture

- **Main Portfolio Site**: Gatsby 2.x (Node 16.x required)
  - Source: Root directory
  - Output: `public/`
  
- **Book Sites**: Gatsby 4.x with gatsby-gitbook-starter
  - Source: `books/<book-name>/` directories
  - Each book pulls content automatically from its GitHub repository
  - Output: `books/<book-name>/public/` → copied to `public/blog/<book-name>/`

## Local Development

### Prerequisites

- Node.js v16.20.2 (use `nvm use 16.20.2`)
- npm

### Setup

```bash
# Install main portfolio dependencies
npm install

# Install book dependencies (each book separately)
cd books/agentic-design-patterns
npm install --legacy-peer-deps
cd ../..
```

### Development Servers

```bash
# Portfolio site (port 8000)
npm run develop

# Individual book site (port 9000)
cd books/agentic-design-patterns && npm run develop -- -p 9000
```

Note: Sites can run simultaneously on different ports for development.

## Build Process

### Full Build (Recommended)

```bash
npm run build
```

This runs commands in sequence:
1. `npm run build:portfolio` - Builds the main portfolio site
2. `npm run build:books` - Builds all book sites
3. `npm run copy:books` - Copies all book outputs to respective paths in `public/`

### Individual Book Build

```bash
# Build specific book
npm run build:book:agentic-design-patterns

# Copy specific book to public
npm run copy:book:agentic-design-patterns
```

## Content Updates

**Content is automatically pulled from GitHub repositories during each build!**

### How It Works

Each book is configured with `gatsby-source-git` to pull content directly from its GitHub repository:

1. During build, `gatsby-source-git` clones the repository to `.cache/`
2. The book's `gatsby-node.js` copies content from the cloned repo to `content/`
3. Gatsby processes the markdown files and builds the site
4. No manual content copying needed!

### Adding a New Book

1. **Create book directory structure**:
   ```bash
   mkdir -p books/new-book-name
   cd books/new-book-name
   ```

2. **Copy template from existing book**:
   ```bash
   cp -r ../agentic-design-patterns/{config.js,gatsby-config.js,gatsby-node.js,package.json,src} .
   ```

3. **Update configurations**:
   - `config.js`: Update title, GitHub URL, sidebar navigation, pathPrefix
   - `gatsby-config.js`: Update gatsby-source-git remote URL
   - `package.json`: Update name and description

4. **Create initial content structure**:
   ```bash
   mkdir -p content static
   # Add your index.mdx and introduction.md
   ```

5. **Add build scripts to root package.json**:
   ```json
   "build:book:new-book-name": "cd books/new-book-name && npm install --legacy-peer-deps && npm run build",
   "copy:book:new-book-name": "mkdir -p public/blog/new-book-name && cp -r books/new-book-name/public/* public/blog/new-book-name/"
   ```

6. **Update build:books and copy:books scripts**:
   ```json
   "build:books": "npm run build:book:agentic-design-patterns && npm run build:book:new-book-name",
   "copy:books": "npm run copy:book:agentic-design-patterns && npm run copy:book:new-book-name"
   ```

7. **Add blog post entry**:
   Create `content/blog/new-book-name/index.md` linking to your book

## Content Workflow

### Automatic Updates
- **On every build**, content is automatically pulled from GitHub
- No manual copying needed
- Just push updates to your GitHub repository and rebuild

### Manual Content Editing
If you want to edit content locally before pushing:
1. Edit files in `books/<book-name>/content/`
2. Test with local development server
3. Push changes to your GitHub repository
4. Next build will use the updated GitHub content

## Deployment

### GitHub Pages (Recommended)

The site is configured for automatic deployment:

```bash
# Build the complete site
npm run build

# Commit and push
git add .
git commit -m "Update site"
git push origin main

# GitHub Actions handles deployment
```

### Manual Deployment

```bash
# 1. Build everything
npm run build

# 2. Deploy the public/ directory
npx gh-pages -d public
```

## Testing Before Deployment

```bash
# Build and serve locally
npm run build
npm run serve -- -p 9001

# Test URLs:
# - Portfolio: http://localhost:9001/
# - Books: http://localhost:9001/blog/<book-name>/
```

## Troubleshooting

### Node Version Issues

```bash
# Ensure you're using Node 16.x
nvm use 16.20.2

# Or install it
nvm install 16.20.2
```

### Build Failures

```bash
# Clear all caches
npm run clean
cd book && npm run clean && cd ..

# Rebuild
npm run build
```

### Book Dependencies Issues

```bash
# Reinstall with legacy peer deps
cd book
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## File Structure

```
saint1729.github.io/
├── book/                          # Book site (Gatsby 4.x)
│   ├── config.js                  # Book configuration
│   ├── content/                   # Chapter markdown files
│   │   ├── index.mdx             # Book homepage
│   │   ├── introduction.md       # Introduction page
│   │   └── chapter_XX/           # Chapter directories
│   ├── gatsby-config.js          # Gatsby configuration
│   ├── package.json              # Book dependencies
│   └── src/                      # Book theme source
├── content/                       # Portfolio blog posts
├── src/                          # Portfolio source
├── gatsby-config.js              # Main site configuration
├── gatsby-node.js                # Build-time logic
├── package.json                  # Main dependencies
└── public/                       # Build output (gitignored)
    ├── index.html                # Portfolio pages
    └── blog/
        └── agentic-design-patterns/  # Book site (copied)
```

## Important Notes

- Book uses Gatsby 4.x while main portfolio uses Gatsby 2.x
- Both require Node 16.x for compatibility
- Book is built with `--prefix-paths` to ensure proper routing at `/blog/agentic-design-patterns/`
- `--legacy-peer-deps` flag is required for book installation due to plugin version conflicts
- Content updates are automatic on rebuild as gatsby-source-git fetches latest from GitHub
