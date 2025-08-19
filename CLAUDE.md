# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Vue 3 personal website built with Vite, TypeScript, and Pinia for state management. The site has multiple pages including Home, Notes, Blogs, and Interests sections. Each section now features pagination and detailed content views.

## Project Structure
- `src/main.ts` - Application entry point
- `src/App.vue` - Main application component with navigation
- `src/router/` - Vue Router configuration
- `src/stores/` - Pinia stores for state management
- `src/views/` - Page components organized by section
- `src/components/` - Reusable UI components

## Key Technologies
- Vue 3 with Composition API
- TypeScript
- Vite build tool
- Vue Router for navigation
- Pinia for state management
- ESLint and Prettier for code quality

## Common Development Commands
```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Type check
npm run type-check

# Lint and fix issues
npm run lint

# Format code
npm run format
```

## Architecture Notes
- State management is handled by Pinia stores in `src/stores/`
- Routing is configured in `src/router/index.ts` with lazy-loaded views
- All views are located in `src/views/` and organized by section
- Components use the Composition API with `<script setup>` syntax
- CSS is scoped to components to prevent style conflicts
- Alias `@` is configured to point to `src/` directory
- Each section (Notes, Blogs, Interests) implements pagination with 5 items per page
- Detailed views are implemented as child routes for each section
- Pagination controls include Previous/Next buttons and page numbering

## Development Workflow
1. For new features, create components in `src/components/` or views in `src/views/`
2. For state management, extend the store in `src/stores/website.ts`
3. For routing, add new routes in `src/router/index.ts`
4. Always run `npm run lint` and `npm run type-check` before committing

## Recent Enhancements
- Implemented pagination for Notes, Blogs, and Interests sections (5 items per page)
- Added detailed view components for each section:
  - `src/views/Notes/NoteDetailView.vue`
  - `src/views/Blogs/BlogDetailView.vue`
  - `src/views/Interests/InterestDetailView.vue`
- Configured child routes in the router for detailed content views
- Enhanced content in the store with more realistic and substantial data
- Added pagination controls with Previous/Next buttons and page numbering
- Implemented navigation between list views and detailed views