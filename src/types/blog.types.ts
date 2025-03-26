/**
 * Blog post types for the portfolio website
 */

/**
 * Represents a blog post with all its metadata and content
 */
export interface BlogPost {
  /** Unique identifier for the post */
  id: string;
  /** URL-friendly slug for the post */
  slug: string;
  /** Title of the blog post */
  title: string;
  /** Publication date in ISO format (YYYY-MM-DD) */
  date: string;
  /** Author of the post */
  author: string;
  /** Array of tags associated with the post */
  tags: string[];
  /** Category the post belongs to */
  category: string;
  /** Short description of the post for previews */
  excerpt: string;
  /** Path to the cover image */
  coverImage: string;
  /** Full markdown content of the post */
  content: string;
  /** Whether the post is a draft (not published yet) */
  isDraft?: boolean;
}

/**
 * Represents the frontmatter metadata of a blog post
 */
export interface BlogPostFrontmatter {
  title: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  excerpt: string;
  coverImage: string;
  isDraft?: boolean;
}

/**
 * Represents a blog post that is being edited in the admin interface
 */
export interface BlogPostDraft extends Omit<BlogPost, 'id' | 'slug'> {
  slug?: string;
}

/**
 * Authentication credentials for the admin interface
 */
export interface AdminCredentials {
  username: string;
  password: string;
}

/**
 * Admin user information
 */
export interface AdminUser {
  username: string;
  displayName: string;
}