# Deployment to GitHub Pages

This document explains how to deploy your Vue.js personal website to GitHub Pages.

## Prerequisites

1. Make sure you have a GitHub repository for your project
2. The `gh-pages` package is already installed as a dev dependency
3. The deploy script is already configured in `package.json`

## Deployment Steps

1. **Build and Deploy**:
   Run the following command to build your project and deploy it to GitHub Pages:
   ```bash
   npm run deploy
   ```

   This command will:
   - Build your Vue.js application for production
   - Deploy the contents of the `dist` folder to the `gh-pages` branch

2. **Configure GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select:
     - Branch: `gh-pages`
     - Folder: `/ (root)`
   - Click "Save"

3. **Access Your Site**:
   After deployment, your site will be available at:
   `https://[your-username].github.io/personal-website/`

## How It Works

- The `deploy` script in `package.json` runs `vite build` to create a production build
- Then it uses `gh-pages` to push the contents of the `dist` folder to the `gh-pages` branch
- GitHub Pages serves the content from the `gh-pages` branch

## Configuration Details

The `vite.config.ts` file is configured with:
```javascript
base: process.env.NODE_ENV === 'production' ? '/personal-website/' : './'
```

This ensures that:
- During development, assets use relative paths (for local file access)
- During production, assets use the correct base path for GitHub Pages

## Troubleshooting

If you encounter issues:

1. Make sure your repository name matches the base path in `vite.config.ts`
2. Check that the `gh-pages` branch was created successfully
3. Verify GitHub Pages settings in your repository
4. Ensure all dependencies are installed with `npm install`