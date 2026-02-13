# Books Directory

This directory contains multiple GitBook-styled book sites, each as a separate Gatsby project. Each book automatically pulls its content from a GitHub repository during build.

## Current Books

- **agentic-design-patterns**: Learning journey through Agentic Design Patterns
  - URL: `/blog/agentic-design-patterns/`
  - Source: https://github.com/saint1729/agentic-design-patterns

## Adding a New Book

Follow these steps to add a new book to the portfolio:

### 1. Create Book Directory

```bash
cd books
mkdir new-book-name
cd new-book-name
```

### 2. Copy Template Files

```bash
# Copy structure from existing book
cp -r ../agentic-design-patterns/{config.js,gatsby-config.js,gatsby-node.js,package.json,src} .
```

### 3. Update Book Configuration

#### `config.js`
```javascript
const config = {
  gatsby: {
    pathPrefix: '/blog/new-book-name',  // UPDATE THIS
    siteUrl: 'https://saint1729.me',
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logo: '/blog/new-book-name/logo.jpg',  // UPDATE THIS
    logoLink: 'https://saint1729.me',
    title: "Your Book Title",  // UPDATE THIS
    githubUrl: 'https://github.com/yourusername/your-repo',  // UPDATE THIS
    // ... rest of config
  },
  sidebar: {
    forcedNavOrder: [
      '/introduction',
      // ADD YOUR CHAPTER PATHS HERE
    ],
    // ... rest of config
  },
  siteMetadata: {
    title: 'Your Book Title | Sai Nikhil Thirandas',  // UPDATE THIS
    description: 'Your book description',  // UPDATE THIS
    docsLocation: 'https://github.com/yourusername/your-repo/tree/main',  // UPDATE THIS
    // ... rest of metadata
  },
};
```

#### `gatsby-config.js`
Update the gatsby-source-git configuration:
```javascript
{
  resolve: 'gatsby-source-git',
  options: {
    name: 'your-book-source',  // UPDATE THIS
    remote: 'https://github.com/yourusername/your-repo.git',  // UPDATE THIS
    branch: 'main',
    local: `${__dirname}/.cache/your-book-repo`,  // UPDATE THIS
  }
}
```

#### `package.json`
Update name and description:
```json
{
  "name": "your-book-name",
  "description": "Your book description",
  // ... rest stays the same
}
```

### 4. Create Content Structure

```bash
mkdir -p content static
```

Create `content/index.mdx` (book homepage):
```markdown
---
title: "Your Book Title"
---

# Your Book Title

Your book introduction and overview.

## Chapters

List your chapters here.
```

Create `content/introduction.md` if you want a separate introduction page.

### 5. Add Logo

```bash
cp ../../src/images/profile.jpg static/logo.jpg
# Or use your own logo image
```

### 6. Update Root Build Scripts

Edit `/package.json` in the root directory:

Add build and copy scripts:
```json
"build:book:new-book-name": "cd books/new-book-name && npm install --legacy-peer-deps && npm run build",
"copy:book:new-book-name": "mkdir -p public/blog/new-book-name && cp -r books/new-book-name/public/* public/blog/new-book-name/"
```

Update aggregate scripts:
```json
"build:books": "npm run build:book:agentic-design-patterns && npm run build:book:new-book-name",
"copy:books": "npm run copy:book:agentic-design-patterns && npm run copy:book:new-book-name"
```

### 7. Add Blog Post Entry

Create `content/blog/new-book-name/index.md` in the root:
```markdown
---
title: Your Book Title
date: '2026-02-12T12:00:00.00Z'
description: 'Brief description of your book'
---

Your blog post content linking to the book...

Visit the [Your Book Title](/blog/new-book-name/) to explore all chapters.
```

### 8. Install Dependencies

```bash
cd books/new-book-name
npm install --legacy-peer-deps
```

### 9. Test Build

```bash
# Test book build
cd books/new-book-name
npm run build

# Test full site build
cd ../..
npm run build

# Serve and test
npm run serve -- -p 9001
# Visit: http://localhost:9001/blog/new-book-name/
```

## Book Repository Requirements

Your GitHub repository should have this structure:

```
your-book-repo/
├── README.md                  # Will become introduction.md
└── chapters/
    ├── chapter_01/
    │   └── topic-name.md
    ├── chapter_02/
    │   └── topic-name.md
    └── ...
```

Each chapter markdown file should have frontmatter:
```markdown
---
title: "Chapter Title"
---

# Chapter Title

Your content here...
```

## How Content Sync Works

1. **Build Time**: When you run `npm run build`, gatsby-source-git clones your GitHub repository to `.cache/`
2. **Pre-Bootstrap**: The book's `gatsby-node.js` copies content from the cloned repo to `content/`
3. **Processing**: Gatsby processes the markdown files and builds the site
4. **Output**: Book site is built to `public/` and copied to root's `public/blog/<book-name>/`

**Result**: Content is always fresh from GitHub on every build - no manual copying needed!

## Development Workflow

```bash
# Work on specific book
cd books/your-book
npm run develop -- -p 9000

# Build everything
cd ../..
npm run build

# Deploy
git add .
git commit -m "Add new book"
git push origin main
```

## Notes

- All books use Gatsby 4.x with gatsby-gitbook-starter theme
- Books are independent projects with their own dependencies
- Each book requires `npm install --legacy-peer-deps`
- Path prefix must match: `/blog/<book-name>/`
- Logo path must include prefix: `/blog/<book-name>/logo.jpg`
- Content automatically syncs from GitHub on each build
