# 🚀 Professional Portfolio Website

A modern, responsive portfolio website for me, showcasing professional experience, GitHub projects, and technical blog posts.

## 📋 Project Overview

This portfolio website integrates GitHub projects and professional experience with the following key features:

- 💻 GitHub API integration to dynamically display repositories
- 📝 Detailed CV section with experience, skills, and education
- 🧑‍🚀 "About" section highlighting aerospace engineering background
- 🐳 Containerized architecture with Docker for easy deployment
- 🔄 CI/CD pipeline with GitHub Actions
- 🎨 Clean, modern, responsive design with tech/aerospace-inspired visuals
- 📱 Contact functionality with social media links
- 📚 Blog section for technical articles and insights

## 🛠️ Technology Stack

### 🖥️ Frontend
- **Framework**: ⚛️ React with TypeScript
- **State Management**: 🔄 React Context API
- **Styling**: 💅 Styled Components or Tailwind CSS
- **Routing**: 🧭 React Router
- **API Integration**: 📡 Axios or Fetch API
- **Blog**: 📝 React-Markdown with Prism.js for syntax highlighting
- **Testing**: 🧪 Jest and React Testing Library

### ⚙️ Infrastructure
- **Containerization**: 🐳 Docker with multi-stage builds
- **CI/CD**: 🔄 GitHub Actions
- **Deployment**: 🖥️ Self-hosted server with Nginx
- **SSL**: 🔒 Let's Encrypt
- **Version Control**: 📂 Git/GitHub

## 🏗️ Architecture

The application follows a modern React architecture with the following components:

- **Frontend**: ⚛️ React SPA with TypeScript
- **Backend Services**: 📡 GitHub API integration, Blog content management
- **Infrastructure**: 🐳 Docker containers, Nginx, CI/CD pipeline

Key technical considerations include:
- 🚦 GitHub API rate limiting and caching
- 📱 Responsive design for all device sizes
- ⚡ Performance optimization with code splitting and lazy loading
- 🔐 Security best practices

## 📁 Project Structure

The project follows a well-organized directory structure:

```
portfolio-website/
├── src/                    # Source code
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── context/            # React Context providers
│   ├── styles/             # Global styles
│   ├── App.tsx             # Main App component
│   └── index.tsx           # Entry point
├── content/                # Blog content (markdown files)
│   ├── posts/              # Blog posts
│   └── assets/             # Blog-specific assets
├── public/                 # Static assets
├── Dockerfile              # Docker configuration
└── .github/workflows/      # GitHub Actions workflows
```

## 📝 Blog Management

The blog uses a Git-based approach for content management (WIP 🚧):

- 📄 Markdown files stored directly in the repository
- 🏷️ Frontmatter metadata for title, date, tags, etc.
- 🔄 Git workflow for content creation and updates
- 🖌️ React-Markdown for rendering with syntax highlighting
- 📂 Organized directory structure for posts and assets

Advantages of this approach include:
- 📜 Full version control for all content
- 👨‍💻 Developer-friendly workflow
- 🔌 No external CMS dependencies
- 🧰 Content treated with the same rigor as code

## 🚢 Infrastructure and Deployment

The application is containerized with Docker and deployed using a CI/CD pipeline:

- 🐳 Multi-stage Dockerfile for optimized production builds
- 🔄 Nginx as a reverse proxy with SSL termination
- 🔒 Let's Encrypt for SSL certificates
- 🔄 GitHub Actions for automated testing, building, and deployment
- 📊 Monitoring and logging for production environment

## 🚦 Getting Started

### 💻 Development

You want to build your own Portfolio using this website as a template ? Great ! 
Follow theses instructions.

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies (make sur you have node js installed on your computer):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### 🐳 Docker Development

1. Build and run with Docker Compose:
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

### 🚀 Production Deployment

1. Build the Docker image:
   ```bash
   docker build -t portfolio-website .
   ```

2. Run with Docker Compose:
   ```bash
   docker-compose up -d
   ```

## 📄 License

[MIT](LICENSE)
