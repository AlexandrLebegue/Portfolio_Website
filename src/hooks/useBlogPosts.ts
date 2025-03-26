import { useState, useEffect } from 'react';
import { BlogPost } from '../types/blog.types';
import blogService from '../services/blog';

interface UseBlogPostsOptions {
  category?: string;
  tag?: string;
  search?: string;
}

interface UseBlogPostsResult {
  posts: BlogPost[];
  loading: boolean;
  error: Error | null;
  categories: string[];
  tags: string[];
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching and filtering blog posts
 */
export function useBlogPosts(options: UseBlogPostsOptions = {}): UseBlogPostsResult {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { category, tag, search } = options;
  
  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);
  
  // Filter posts when options or posts change
  useEffect(() => {
    filterPosts();
  }, [posts, category, tag, search]);
  
  // Fetch posts from the blog service
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchedPosts = await blogService.getPosts();
      setPosts(fetchedPosts);
      
      // Extract unique categories and tags
      const uniqueCategories = [...new Set(fetchedPosts.map(post => post.category))];
      const allTags = fetchedPosts.flatMap(post => post.tags);
      const uniqueTags = [...new Set(allTags)];
      
      setCategories(uniqueCategories);
      setTags(uniqueTags);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch blog posts'));
    } finally {
      setLoading(false);
    }
  };
  
  // Filter posts based on options
  const filterPosts = () => {
    let result = [...posts];
    
    // Filter by category
    if (category) {
      result = result.filter(post => post.category === category);
    }
    
    // Filter by tag
    if (tag) {
      result = result.filter(post => post.tags.includes(tag));
    }
    
    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredPosts(result);
  };
  
  return {
    posts: filteredPosts,
    loading,
    error,
    categories,
    tags,
    refetch: fetchPosts,
  };
}

/**
 * Hook for fetching a single blog post by slug
 */
export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const fetchedPost = await blogService.getPostBySlug(slug);
        setPost(fetchedPost);
        
        if (!fetchedPost) {
          setError(new Error(`Blog post not found: ${slug}`));
        }
      } catch (err) {
        console.error(`Error fetching blog post ${slug}:`, err);
        setError(err instanceof Error ? err : new Error(`Failed to fetch blog post: ${slug}`));
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [slug]);
  
  return { post, loading, error };
}