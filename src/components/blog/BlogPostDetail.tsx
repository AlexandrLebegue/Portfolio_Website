import React from 'react';
import styled from 'styled-components';
import { BlogPost } from '../../types/blog.types';
import MarkdownRenderer from './MarkdownRenderer';

interface BlogPostDetailProps {
  post: BlogPost;
}

const PostContainer = styled.article`
  max-width: 800px;
  margin: 0 auto;
`;

const PostHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const PostTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const PostMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const PostDate = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const PostAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const PostCategory = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const PostCoverImage = styled.div`
  font-size: 6rem;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space.xl};
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }
`;

const PostContent = styled(MarkdownRenderer)`
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const PostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.xs};
  margin-top: ${({ theme }) => theme.space.xl};
  padding-top: ${({ theme }) => theme.space.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.ui.border};
`;

const PostTag = styled.span`
  background-color: ${({ theme }) => theme.colors.background.code};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-family: ${({ theme }) => theme.fonts.code};
`;

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  return (
    <PostContainer>
      <PostHeader>
        <PostTitle>{post.title}</PostTitle>
        <PostMeta>
          <PostDate>
            <span>📅</span>
            <span>{formatDate(post.date)}</span>
          </PostDate>
          <PostAuthor>
            <span>👤</span>
            <span>{post.author}</span>
          </PostAuthor>
          <PostCategory>
            <span>📂</span>
            <span>{post.category}</span>
          </PostCategory>
        </PostMeta>
        
        <PostCoverImage>
          {post.coverImage.startsWith('http') ? (
            <img src={post.coverImage} alt={post.title} />
          ) : (
            <span>{post.coverImage}</span>
          )}
        </PostCoverImage>
      </PostHeader>
      
      <PostContent content={post.content} />
      
      <PostTags>
        {post.tags.map(tag => (
          <PostTag key={tag}>{tag}</PostTag>
        ))}
      </PostTags>
    </PostContainer>
  );
};

export default BlogPostDetail;