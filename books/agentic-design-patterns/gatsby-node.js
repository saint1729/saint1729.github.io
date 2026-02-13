const componentWithMDXScope = require('gatsby-plugin-mdx/component-with-mdx-scope');

const path = require('path');
const fs = require('fs-extra');

const startCase = require('lodash.startcase');

const config = require('./config');

exports.onPreInit = async ({ reporter }) => {
  const sourceRepo = path.join(__dirname, '.cache/agentic-design-patterns-repo');
  const contentDir = path.join(__dirname, 'content');
  
  // Clone or pull the repository
  console.log('Fetching latest content from GitHub...');
  
  if (!fs.existsSync(sourceRepo)) {
    // Clone the repository
    console.log('Cloning repository from GitHub...');
    const { execSync } = require('child_process');
    try {
      execSync(`git clone https://github.com/saint1729/agentic-design-patterns.git ${sourceRepo}`, {
        stdio: 'inherit'
      });
      console.log('✓ Repository cloned successfully');
    } catch (error) {
      console.error('Failed to clone repository:', error.message);
      reporter.panic('Failed to clone repository', error);
      return;
    }
  } else {
    // Pull latest changes
    console.log('Updating repository...');
    const { execSync } = require('child_process');
    try {
      // Reset any local changes first
      execSync('git reset --hard HEAD', {
        cwd: sourceRepo,
        stdio: 'pipe'
      });
      execSync('git pull', {
        cwd: sourceRepo,
        stdio: 'inherit'
      });
      console.log('✓ Repository updated successfully');
    } catch (error) {
      console.warn('Failed to update repository:', error.message);
      // Continue with existing content
    }
  }
  
  console.log('Syncing content from GitHub repository...');
  
  // Clear existing chapter content but keep index.mdx and introduction.md if they exist
  const existingFiles = fs.readdirSync(contentDir);
  const chapterDirs = existingFiles.filter(f => f.startsWith('chapter_'));
  chapterDirs.forEach(dir => {
    const dirPath = path.join(contentDir, dir);
    if (fs.existsSync(dirPath)) {
      console.log(`Removing existing chapter: ${dir}`);
      fs.removeSync(dirPath);
    }
  });
  
  // Copy chapters from source repo
  const sourceChaptersDir = path.join(sourceRepo, 'chapters');
  const sourceCodeDir = path.join(sourceRepo, 'code');
  
  if (!fs.existsSync(sourceChaptersDir)) {
    console.log('Warning: Chapters directory not found in source repository');
    return;
  }
  
  const chapters = fs.readdirSync(sourceChaptersDir).filter(f => f.startsWith('chapter_'));
  console.log(`Found ${chapters.length} chapters to process`);
  
  chapters.forEach(chapter => {
    console.log(`Processing ${chapter}...`);
    const src = path.join(sourceChaptersDir, chapter);
    const dest = path.join(contentDir, chapter);
    fs.copySync(src, dest);
    
    // Find the main markdown file in the chapter directory
    const chapterFiles = fs.readdirSync(dest);
    const mainMdFile = chapterFiles.find(f => f.endsWith('.md') && !f.includes('README'));
    
    if (!mainMdFile) {
      console.log(`  Warning: No main markdown file found in ${chapter}`);
      return;
    }
    
    const mdPath = path.join(dest, mainMdFile);
    let content = fs.readFileSync(mdPath, 'utf-8');
    
    // Check if there's corresponding code directory
    const codeChapterDir = path.join(sourceCodeDir, chapter);
    if (!fs.existsSync(codeChapterDir)) {
      console.log(`  No code directory found for ${chapter}`);
      return;
    }
    
    console.log(`  Adding code examples for ${chapter}...`);
    
    // Organize code files by framework
    const allFiles = fs.readdirSync(codeChapterDir);
    const codeFiles = allFiles
      .filter(f => f.endsWith('.py'))
      .map(filename => {
        const filePath = path.join(codeChapterDir, filename);
        const code = fs.readFileSync(filePath, 'utf-8');
        
        // Detect framework from filename
        let framework = 'langchain'; // default
        const lowerFilename = filename.toLowerCase();
        if (lowerFilename.includes('crewai')) {
          framework = 'crewai';
        } else if (lowerFilename.includes('google') || lowerFilename.includes('adk')) {
          framework = 'google_adk';
        } else if (lowerFilename.includes('langchain')) {
          framework = 'langchain';
        }
        
        console.log(`    Found code file: ${filename} (${framework})`);
        return { filename, code, framework };
      });
    
    if (codeFiles.length === 0) {
      console.log(`  No Python files found in ${chapter} code directory`);
      return;
    }
    
    // Group by framework
    const codeByFramework = {
      langchain: codeFiles.filter(f => f.framework === 'langchain'),
      crewai: codeFiles.filter(f => f.framework === 'crewai'),
      google_adk: codeFiles.filter(f => f.framework === 'google_adk')
    };
    
    // Append code sections
    content += '\n\n---\n\n# Code Examples\n\n';
    
    if (codeByFramework.langchain.length > 0) {
      content += '## LangChain Implementation\n\n';
      codeByFramework.langchain.forEach(({ filename, code }) => {
        content += `**${filename}**\n\n\`\`\`python\n${code}\n\`\`\`\n\n`;
      });
    }
    
    if (codeByFramework.crewai.length > 0) {
      content += '## CrewAI Implementation\n\n';
      codeByFramework.crewai.forEach(({ filename, code }) => {
        content += `**${filename}**\n\n\`\`\`python\n${code}\n\`\`\`\n\n`;
      });
    }
    
    if (codeByFramework.google_adk.length > 0) {
      content += '## Google ADK Implementation\n\n';
      codeByFramework.google_adk.forEach(({ filename, code }) => {
        content += `**${filename}**\n\n\`\`\`python\n${code}\n\`\`\`\n\n`;
      });
    }
    
    // Write the combined content
    fs.writeFileSync(mdPath, content);
    console.log(`  ✓ Updated ${mainMdFile} with code examples`);
  });
  
  // Remove README.md files from all chapter directories
  chapters.forEach(chapter => {
    const readmePath = path.join(contentDir, chapter, 'README.md');
    if (fs.existsSync(readmePath)) {
      fs.removeSync(readmePath);
      console.log(`  Removed ${chapter}/README.md`);
    }
  });
  
  console.log('✓ Content sync completed with code examples!');
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MdxFrontmatter {
      metaTitle: String
      metaDescription: String
    }
  `;
  createTypes(typeDefs);
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  fields {
                    id
                  }
                  tableOfContents
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors); // eslint-disable-line no-console
          reject(result.errors);
        }

        // Create blog posts pages.
        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug ? node.fields.slug : '/',
            component: path.resolve('./src/templates/docs.js'),
            context: {
              id: node.fields.id,
            },
          });
        });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
        buble: '@philpl/buble', // to reduce bundle size
      },
    },
  });
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-export-default-from',
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);

    let value = parent.relativePath.replace(parent.ext, '');

    if (value === 'index') {
      value = '';
    }

    if (config.gatsby && config.gatsby.trailingSlash) {
      createNodeField({
        name: `slug`,
        node,
        value: value === '' ? `/` : `/${value}/`,
      });
    } else {
      createNodeField({
        name: `slug`,
        node,
        value: `/${value}`,
      });
    }

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    });

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title || startCase(parent.name),
    });
  }
};
