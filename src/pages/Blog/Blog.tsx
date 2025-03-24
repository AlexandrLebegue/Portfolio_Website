import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// This is placeholder data that will be replaced with actual blog content
const blogPostsData = [
  {
    id: 1,
    slug: 'spacecraft-control-systems',
    title: 'Modern Approaches to Spacecraft Control Systems',
    excerpt: 'An exploration of recent advancements in spacecraft control systems and their applications in autonomous navigation.',
    date: '2023-12-15',
    category: 'Aerospace',
    tags: ['Spacecraft', 'Control Systems', 'Autonomy'],
    coverImage: '🛰️',
  },
  {
    id: 2,
    slug: 'react-performance-optimization',
    title: 'Performance Optimization Techniques for React Applications',
    excerpt: 'A deep dive into strategies for improving the performance of React applications, from code splitting to memoization.',
    date: '2023-11-02',
    category: 'Web Development',
    tags: ['React', 'JavaScript', 'Performance', 'Optimization'],
    coverImage: '⚛️',
  },
  {
    id: 3,
    slug: 'machine-learning-aerospace',
    title: 'Applications of Machine Learning in Aerospace Engineering',
    excerpt: 'How machine learning algorithms are revolutionizing aerospace engineering, from design optimization to predictive maintenance.',
    date: '2023-09-18',
    category: 'Data Science',
    tags: ['Machine Learning', 'Aerospace', 'AI', 'Engineering'],
    coverImage: '🤖',
  },
  {
    id: 4,
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices for Large-Scale Applications',
    excerpt: 'Essential patterns and practices for maintaining type safety and code quality in large TypeScript projects.',
    date: '2023-08-05',
    category: 'Web Development',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    coverImage: '📝',
  },
  {
    id: 5,
    slug: 'orbital-mechanics-basics',
    title: 'Understanding the Basics of Orbital Mechanics',
    excerpt: 'A beginner-friendly introduction to the fundamental principles of orbital mechanics and their practical applications.',
    date: '2023-07-12',
    category: 'Aerospace',
    tags: ['Orbital Mechanics', 'Physics', 'Space'],
    coverImage: '🪐',
  },
  {
    id: 6,
    slug: 'data-visualization-d3',
    title: 'Creating Interactive Data Visualizations with D3.js',
    excerpt: 'A step-by-step guide to building interactive and informative data visualizations using D3.js and SVG.',
    date: '2023-06-20',
    category: 'Data Science',
    tags: ['Data Visualization', 'D3.js', 'JavaScript', 'SVG'],
    coverImage: '📊',
  },
];

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
`;

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 800px;
`;

const BlogContent = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
  }
`;

const BlogPosts = styled.div`
  flex: 3;
`;

const Sidebar = styled.aside`
  flex: 1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: -1;
  }
`;

const SidebarSection = styled.div`
  background-color: ${({ theme }) => theme.colors.background.dark}99;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.space.lg};
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const SidebarTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.md};
  position: relative;
  padding-bottom: ${({ theme }) => theme.space.sm};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CategoryItem = styled.li`
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const CategoryLink = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  padding: 0;
  text-align: left;
  cursor: pointer;
  color: ${({ theme, active }) => 
    active ? theme.colors.primary : theme.colors.text.secondary};
  font-weight: ${({ theme, active }) => 
    active ? theme.fontWeights.semibold : theme.fontWeights.regular};
  transition: color ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TagsCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.xs};
`;

const TagButton = styled.button<{ active: boolean }>`
  background-color: ${({ theme, active }) => 
    active ? theme.colors.primary : 'transparent'};
  color: ${({ theme, active }) => 
    active ? theme.colors.text.primary : theme.colors.text.secondary};
  border: 1px solid ${({ theme, active }) => 
    active ? theme.colors.primary : theme.colors.ui.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background-color: ${({ theme, active }) => 
      active ? theme.colors.primary : theme.colors.ui.hover};
    border-color: ${({ theme, active }) => 
      active ? theme.colors.primary : theme.colors.primary};
  }
`;

const SearchBox = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  padding-left: ${({ theme }) => theme.space.xl};
  background-color: ${({ theme }) => theme.colors.background.code};
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}30;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.space.sm};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.space.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled.article`
  background-color: ${({ theme }) => theme.colors.background.dark}99;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: transform ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const BlogCardImage = styled.div`
  height: 180px;
  background-color: ${({ theme }) => theme.colors.background.code};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
`;

const BlogCardContent = styled.div`
  padding: ${({ theme }) => theme.space.lg};
`;

const BlogCardCategory = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const BlogCardTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.sm};
  
  a {
    color: ${({ theme }) => theme.colors.text.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.normal};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const BlogCardExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const BlogCardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const BlogCardDate = styled.div``;

const BlogCardTags = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
`;

const BlogCardTag = styled.span`
  background-color: ${({ theme }) => theme.colors.background.code};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Extract unique categories and tags
  const categories = [...new Set(blogPostsData.map(post => post.category))];
  const allTags = blogPostsData.flatMap(post => post.tags);
  const uniqueTags = [...new Set(allTags)];
  
  // Filter blog posts based on search, category, and tag
  const filteredPosts = blogPostsData.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || post.category === selectedCategory;
    
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });
  
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
    <BlogContainer>
      <PageHeader>
        <Title>Blog</Title>
        <Subtitle>
          Thoughts, insights, and tutorials on aerospace engineering, software development, and data science
        </Subtitle>
      </PageHeader>
      
      <BlogContent>
        <BlogPosts>
          {filteredPosts.length === 0 ? (
            <p>No blog posts found matching your criteria.</p>
          ) : (
            <BlogGrid>
              {filteredPosts.map(post => (
                <BlogCard key={post.id}>
                  <BlogCardImage>{post.coverImage}</BlogCardImage>
                  <BlogCardContent>
                    <BlogCardCategory>{post.category}</BlogCardCategory>
                    <BlogCardTitle>
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </BlogCardTitle>
                    <BlogCardExcerpt>{post.excerpt}</BlogCardExcerpt>
                    <BlogCardMeta>
                      <BlogCardDate>{formatDate(post.date)}</BlogCardDate>
                      <BlogCardTags>
                        {post.tags.slice(0, 2).map(tag => (
                          <BlogCardTag key={tag}>{tag}</BlogCardTag>
                        ))}
                        {post.tags.length > 2 && <BlogCardTag>+{post.tags.length - 2}</BlogCardTag>}
                      </BlogCardTags>
                    </BlogCardMeta>
                  </BlogCardContent>
                </BlogCard>
              ))}
            </BlogGrid>
          )}
        </BlogPosts>
        
        <Sidebar>
          <SidebarSection>
            <SearchBox>
              <SearchIcon>🔍</SearchIcon>
              <SearchInput 
                type="text" 
                placeholder="Search blog posts..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBox>
          </SidebarSection>
          
          <SidebarSection>
            <SidebarTitle>Categories</SidebarTitle>
            <CategoryList>
              <CategoryItem>
                <CategoryLink 
                  active={selectedCategory === null}
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </CategoryLink>
              </CategoryItem>
              {categories.map(category => (
                <CategoryItem key={category}>
                  <CategoryLink 
                    active={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </CategoryLink>
                </CategoryItem>
              ))}
            </CategoryList>
          </SidebarSection>
          
          <SidebarSection>
            <SidebarTitle>Tags</SidebarTitle>
            <TagsCloud>
              <TagButton 
                active={selectedTag === null}
                onClick={() => setSelectedTag(null)}
              >
                All
              </TagButton>
              {uniqueTags.map(tag => (
                <TagButton 
                  key={tag} 
                  active={selectedTag === tag}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </TagButton>
              ))}
            </TagsCloud>
          </SidebarSection>
        </Sidebar>
      </BlogContent>
    </BlogContainer>
  );
};

export default Blog;