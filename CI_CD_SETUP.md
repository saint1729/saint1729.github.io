# CI/CD Setup for Automatic Book Content Updates

This setup enables automatic rebuilding and deployment of your portfolio website whenever you push new chapters to the `agentic-design-patterns` repository.

## How It Works

1. **Push to Book Repo** → Triggers workflow in `agentic-design-patterns`
2. **Workflow Sends Event** → Notifies `saint1729.github.io` repo
3. **Portfolio Rebuilds** → Pulls latest book content from GitHub
4. **Deploys to GitHub Pages** → Your site updates automatically

## Setup Instructions

### Step 1: Create GitHub Personal Access Token

1. Go to **GitHub.com** → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens**
2. Click **Generate new token**
3. Configure token:
   - **Token name**: `Portfolio Rebuild Token`
   - **Expiration**: 90 days or 1 year (recommended)
   - **Repository access**: Select **Only select repositories** → Choose `saint1729.github.io`
4. Set **Repository permissions**:
   - ✅ **Contents**: Read and write
   - ✅ **Metadata**: Read-only (automatically selected)
5. Click **Generate token**
6. **Copy the token** (you won't see it again!)

### Step 2: Add Token as Secret in Book Repository

1. Go to **github.com/saint1729/agentic-design-patterns**
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `PORTFOLIO_REBUILD_TOKEN`
5. Value: Paste the token from Step 1
6. Click **Add secret**

### Step 3: Enable GitHub Pages in Portfolio Repository

1. Go to **github.com/saint1729/saint1729.github.io**
2. Navigate to **Settings** → **Pages**
3. Under **Build and deployment**:
   - Source: **GitHub Actions**
4. Save changes

### Step 4: Commit and Push Workflow Files

#### In Book Repository:
```bash
cd /Users/saint1729/Desktop/github/agentic-design-patterns
git add .github/workflows/trigger-portfolio-rebuild.yml
git commit -m "Add CI/CD workflow to trigger portfolio rebuild"
git push origin main
```

#### In Portfolio Repository:
```bash
cd /Users/saint1729/Desktop/github/saint1729.github.io
git add .github/workflows/deploy.yml
git commit -m "Add CI/CD workflow for automatic deployment"
git push origin main
```

## Testing the Setup

1. **Initial Deployment**: Push the portfolio workflow file (Step 4 above) → should trigger first build
2. **Test Book Update**: Make a change in `agentic-design-patterns/chapters/` and push
3. **Verify**: Check Actions tab in both repos to see workflows running
4. **Wait**: Build takes ~5-10 minutes, then check your live site

## Manual Triggers

You can also manually trigger a rebuild:

1. Go to **github.com/saint1729/saint1729.github.io**
2. Click **Actions** tab
3. Select **Deploy to GitHub Pages** workflow
4. Click **Run workflow** → **Run workflow**

## Workflow Files Created

- **Book Repo**: `.github/workflows/trigger-portfolio-rebuild.yml`
  - Triggers on push to `main` when `chapters/` or `README.md` changes
  - Sends `repository_dispatch` event to portfolio repo

- **Portfolio Repo**: `.github/workflows/deploy.yml`
  - Listens for `book-content-updated` events
  - Rebuilds site (automatically pulls latest book content via `gatsby-source-git`)
  - Deploys to GitHub Pages

## Troubleshooting

### Workflow Not Triggering
- Check that `PORTFOLIO_REBUILD_TOKEN` secret exists in book repo
- Verify token has **Contents: Read and write** permission for `saint1729.github.io`
- Ensure token hasn't expired
- Check Actions tab for error messages

### Build Failing
- Check Actions tab in portfolio repo for error details
- Common issues:
  - Node version mismatch (using Node 16 in workflow)
  - Memory issues (increased to 4GB in workflow)
  - Missing dependencies (workflow runs `npm ci`)

### Site Not Updating
- Verify GitHub Pages is set to "GitHub Actions" source
- Check deployment status in portfolio repo Actions tab
- Allow 5-10 minutes for build + CDN cache invalidation

## What Happens Now

✅ **Automatic**: Push chapters to book repo → site rebuilds automatically  
✅ **Auto-sync**: Every build pulls latest content from GitHub  
✅ **No manual steps**: No need to run build commands locally for deployment  
✅ **Keep local dev**: Still use `npm run build && npm run serve` for local testing
