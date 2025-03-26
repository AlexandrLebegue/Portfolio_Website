import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useBlogPost } from '../../hooks/useBlogPosts';
import BlogPostDetail from '../../components/blog/BlogPostDetail';

// Define the params type as a Record
interface BlogPostParams extends Record<string, string | undefined> {
  slug: string;
}

const BlogPostContainer = styled.div`
  padding: ${({ theme }) => theme.space.xl} 0;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.space.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.space.xl};
  color: ${({ theme }) => theme.colors.status.error};
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  margin-bottom: ${({ theme }) => theme.space.xl};
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

const BlogPost: React.FC = () => {
  const { slug } = useParams<BlogPostParams>();
  const navigate = useNavigate();
  const { post, loading, error } = useBlogPost(slug || '');
  
  const handleBack = () => {
    navigate('/blog');
  };
  
  return (
    <BlogPostContainer>
      <BackButton onClick={handleBack}>
        <span>←</span> Back to Blog
      </BackButton>
      
      {loading ? (
        <LoadingMessage>Loading blog post...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>
          <h2>Error Loading Blog Post</h2>
          <p>{error.message}</p>
          <p>The blog post you're looking for might not exist or there was an error loading it.</p>
        </ErrorMessage>
      ) : post ? (
        <BlogPostDetail post={post} />
      ) : (
        <ErrorMessage>
          <h2>Blog Post Not Found</h2>
          <p>The blog post you're looking for could not be found.</p>
        </ErrorMessage>
      )}
    </BlogPostContainer>
  );
};

export default BlogPost;