# Portfolio Website - Project Structure

This document outlines the recommended project structure for the portfolio website.

## Directory Structure

```
portfolio-website/
├── .github/
│   └── workflows/           # GitHub Actions workflows
├── public/                  # Static assets
│   ├── favicon.ico
│   ├── index.html
│   ├── robots.txt
│   └── assets/
│       └── images/          # Static images (logos, etc.)
├── src/
│   ├── assets/              # Images, fonts, etc.
│   │   ├── images/          # Dynamic images used in components
│   │   ├── fonts/           # Custom fonts
│   │   └── icons/           # SVG icons
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Shared components
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── CodeBlock/   # For code syntax highlighting
│   │   │   ├── Icon/
│   │   │   └── ...
│   │   ├── layout/          # Layout components
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Navigation/
│   │   │   └── ...
│   │   └── sections/        # Page section components
│   │       ├── Hero/
│   │       ├── ProjectList/
│   │       ├── Skills/
│   │       └── ...
│   ├── hooks/               # Custom React hooks
│   │   ├── useGitHubApi.ts
│   │   ├── useBlogPosts.ts
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── Home/
│   │   ├── Projects/
│   │   │   ├── index.tsx    # Projects list page
│   │   │   └── [id].tsx     # Project detail page
│   │   ├── CV/
│   │   ├── About/
│   │   ├── Blog/
│   │   │   ├── index.tsx    # Blog list page
│   │   │   └── [slug].tsx   # Blog post page
│   │   └── Contact/
│   ├── services/            # API services
│   │   ├── github.ts        # GitHub API integration
│   │   └── blog.ts          # Blog content service
│   ├── types/               # TypeScript type definitions
│   │   ├── github.types.ts
│   │   ├── blog.types.ts
│   │   └── ...
│   ├── utils/               # Utility functions
│   │   ├── api.ts           # API helpers
│   │   ├── date.ts          # Date formatting
│   │   └── ...
│   ├── context/             # React Context providers
│   │   ├── ThemeContext.tsx # Theme provider
│   │   └── ...
│   ├── styles/              # Global styles
│   │   ├── theme.ts         # Theme variables
│   │   ├── global.ts        # Global styles
│   │   └── ...
│   ├── App.tsx              # Main App component
│   └── index.tsx            # Entry point
├── content/                 # Blog content (markdown files)
│   ├── posts/               # Blog posts
│   │   ├── 2023-01-01-first-post.md
│   │   └── ...
│   └── assets/              # Blog-specific assets
│       └── images/          # Images used in blog posts
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose configuration
├── .env.example             # Example environment variables
├── .gitignore               # Git ignore file
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

## Key Files and Their Purpose

### Configuration Files

- **package.json**: Defines project dependencies, scripts, and metadata
- **tsconfig.json**: TypeScript configuration
- **Dockerfile**: Instructions for building the Docker container
- **docker-compose.yml**: Multi-container Docker configuration
- **.env.example**: Template for environment variables

### Core Application Files

- **src/index.tsx**: Application entry point
- **src/App.tsx**: Main application component, sets up routing
- **src/styles/theme.ts**: Theme configuration for consistent styling

### GitHub Integration

- **src/services/github.ts**: Service for interacting with GitHub API
- **src/hooks/useGitHubApi.ts**: Custom hook for GitHub data fetching
- **src/components/sections/ProjectList/**: Components for displaying GitHub projects

### Blog Implementation

- **content/posts/**: Markdown files for blog posts
- **src/services/blog.ts**: Service for parsing and fetching blog content
- **src/pages/Blog/**: Blog list and detail page components

### Infrastructure

- **.github/workflows/**: CI/CD pipeline configuration
- **Dockerfile**: Container configuration
- **docker-compose.yml**: Development and production environment setup

## Naming Conventions

- **Components**: PascalCase (e.g., `ProjectCard.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useGitHubApi.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types/Interfaces**: PascalCase (e.g., `GitHubRepo.ts`)
- **Blog posts**: YYYY-MM-DD-kebab-case-title.md

## Import Organization

Recommended import order:
1. React and third-party libraries
2. Components
3. Hooks
4. Services
5. Utils
6. Types
7. Assets/styles

Example:
```typescript
// External dependencies
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Components
import { ProjectCard } from 'components/common/ProjectCard';

// Hooks
import { useGitHubApi } from 'hooks/useGitHubApi';

// Services
import { fetchRepository } from 'services/github';

// Utils
import { formatDate } from 'utils/date';

// Types
import { Repository } from 'types/github.types';

// Styles
import { Container, Title } from './styles';