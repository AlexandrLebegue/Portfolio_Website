import { BlogPost, BlogPostFrontmatter, BlogPostDraft } from '../types/blog.types';

/**
 * Service for managing blog posts
 */
class BlogService {
  private posts: BlogPost[] = [];
  private initialized = false;

  /**
   * Initialize the blog service by loading posts
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    try {
      await this.loadPosts();
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize blog service:', error);
      throw error;
    }
  }

  /**
   * Load all blog posts from the content directory
   */
  private async loadPosts(): Promise<void> {
    try {
      // In a real implementation, this would load markdown files from the content directory
      // For now, we'll use the hardcoded data from the Blog.tsx component
      const blogPostsData = [
        {
          id: '1',
          slug: 'spacecraft-control-systems',
          title: 'Modern Approaches to Spacecraft Control Systems',
          excerpt: 'An exploration of recent advancements in spacecraft control systems and their applications in autonomous navigation.',
          date: '2023-12-15',
          category: 'Aerospace',
          tags: ['Spacecraft', 'Control Systems', 'Autonomy'],
          coverImage: '🛰️',
          author: 'Alexandre Lebegue',
          content: '', // This would be loaded from the markdown file
        },
        {
          id: '2',
          slug: 'react-performance-optimization',
          title: 'Performance Optimization Techniques for React Applications',
          excerpt: 'A deep dive into strategies for improving the performance of React applications, from code splitting to memoization.',
          date: '2023-11-02',
          category: 'Web Development',
          tags: ['React', 'JavaScript', 'Performance', 'Optimization'],
          coverImage: '⚛️',
          author: 'Alexandre Lebegue',
          content: '', // This would be loaded from the markdown file
        },
        // Add more posts here
      ];
      
      // In a real implementation, we would load the content from the markdown files
      // For each post, we would:
      // 1. Read the markdown file
      // 2. Parse the frontmatter
      // 3. Extract the content
      // 4. Create a BlogPost object
      
      this.posts = blogPostsData;
      
      // Sort posts by date (newest first)
      this.posts.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } catch (error) {
      console.error('Failed to load blog posts:', error);
      throw error;
    }
  }

  /**
   * Get all blog posts
   */
  async getPosts(): Promise<BlogPost[]> {
    if (!this.initialized) {
      await this.initialize();
    }
    return this.posts;
  }

  /**
   * Get a blog post by slug
   */
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    if (!this.initialized) {
      await this.initialize();
    }
    return this.posts.find(post => post.slug === slug) || null;
  }

  /**
   * Create a new blog post
   */
  async createPost(post: BlogPostDraft): Promise<BlogPost> {
    if (!this.initialized) {
      await this.initialize();
    }
    
    // Generate a slug if not provided
    const slug = post.slug || this.generateSlug(post.title);
    
    // Generate a unique ID
    const id = Date.now().toString();
    
    const newPost: BlogPost = {
      ...post,
      id,
      slug,
      date: post.date || new Date().toISOString().split('T')[0],
    };
    
    // In a real implementation, we would:
    // 1. Create a new markdown file in the content directory
    // 2. Write the frontmatter and content to the file
    
    // Add the post to the in-memory array
    this.posts.unshift(newPost);
    
    return newPost;
  }

  /**
   * Update an existing blog post
   */
  async updatePost(slug: string, updates: Partial<BlogPostDraft>): Promise<BlogPost | null> {
    if (!this.initialized) {
      await this.initialize();
    }
    
    const index = this.posts.findIndex(post => post.slug === slug);
    if (index === -1) return null;
    
    // Generate a new slug if the title was updated and no slug was provided
    const newSlug = updates.title && !updates.slug
      ? this.generateSlug(updates.title)
      : updates.slug || slug;
    
    const updatedPost: BlogPost = {
      ...this.posts[index],
      ...updates,
      slug: newSlug,
    };
    
    // In a real implementation, we would:
    // 1. Update the markdown file in the content directory
    // 2. If the slug changed, rename the file
    
    // Update the post in the in-memory array
    this.posts[index] = updatedPost;
    
    return updatedPost;
  }

  /**
   * Delete a blog post
   */
  async deletePost(slug: string): Promise<boolean> {
    if (!this.initialized) {
      await this.initialize();
    }
    
    const index = this.posts.findIndex(post => post.slug === slug);
    if (index === -1) return false;
    
    // In a real implementation, we would:
    // 1. Delete the markdown file from the content directory
    
    // Remove the post from the in-memory array
    this.posts.splice(index, 1);
    
    return true;
  }

  /**
   * Generate a slug from a title
   */
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
      .trim();
  }

  /**
   * Parse frontmatter from markdown content
   */
  private parseFrontmatter(markdown: string): { frontmatter: BlogPostFrontmatter, content: string } {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);
    
    if (!match) {
      throw new Error('Invalid markdown format: frontmatter not found');
    }
    
    const [, frontmatterStr, content] = match;
    
    // Parse frontmatter
    const frontmatter: Record<string, any> = {};
    const lines = frontmatterStr.split('\n');
    
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;
      
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      // Parse arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          frontmatter[key] = JSON.parse(value);
        } catch {
          // If parsing fails, store as string
          frontmatter[key] = value;
        }
      } else {
        frontmatter[key] = value;
      }
    }
    
    return {
      frontmatter: frontmatter as BlogPostFrontmatter,
      content: content.trim(),
    };
  }

  /**
   * Generate markdown content with frontmatter
   */
  private generateMarkdown(post: BlogPost): string {
    const { content, ...frontmatter } = post;
    
    // Convert frontmatter to YAML format
    let markdown = '---\n';
    
    for (const [key, value] of Object.entries(frontmatter)) {
      if (key === 'id') continue; // Skip ID
      
      if (Array.isArray(value)) {
        markdown += `${key}: [${value.map(v => `"${v}"`).join(', ')}]\n`;
      } else if (typeof value === 'string') {
        markdown += `${key}: "${value}"\n`;
      } else {
        markdown += `${key}: ${value}\n`;
      }
    }
    
    markdown += '---\n\n';
    markdown += content;
    
    return markdown;
  }
}

// Create a singleton instance
const blogService = new BlogService();

export default blogService;