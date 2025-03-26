import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BlogPost } from '../../types/blog.types';
import { useAuth } from '../../hooks/useAuth';
import blogService from '../../services/blog';
import BlogPostEditor from '../../components/admin/BlogPostEditor';

const DashboardContainer = styled.div`
  padding: ${({ theme }) => theme.space.xl} 0;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
`;

const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  color: ${({ theme }) => theme.colors.text.secondary};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.ui.hover};
  }
`;

const DangerButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.status.error};
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.status.error}dd;
  }
`;

const PostsTable = styled.div`
  background-color: ${({ theme }) => theme.colors.background.dark}99;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  padding: ${({ theme }) => theme.space.md};
  background-color: ${({ theme }) => theme.colors.background.dark};
  border-bottom: 1px solid ${({ theme }) => theme.colors.ui.border};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const TableHeaderCell = styled.div`
  padding: ${({ theme }) => theme.space.sm};
  
  &:last-child {
    text-align: right;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    &:nth-child(2) {
      display: none;
    }
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  padding: ${({ theme }) => theme.space.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.ui.border};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.ui.hover};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const TableCell = styled.div`
  padding: ${({ theme }) => theme.space.sm};
  display: flex;
  align-items: center;
  
  &:last-child {
    justify-content: flex-end;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    &:nth-child(2) {
      display: none;
    }
  }
`;

const PostTitle = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const PostCategory = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
`;

const PostDate = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.space.xs};
  margin-left: ${({ theme }) => theme.space.xs};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.ui.hover};
  }
  
  &.delete:hover {
    color: ${({ theme }) => theme.colors.status.error};
  }
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

const EmptyMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.space.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const BlogDashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);
  
  // Fetch posts from the blog service
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchedPosts = await blogService.getPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch blog posts'));
    } finally {
      setLoading(false);
    }
  };
  
  // Handle creating a new post
  const handleCreatePost = () => {
    setEditingPost(null);
    setIsCreating(true);
  };
  
  // Handle editing a post
  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsCreating(false);
  };
  
  // Handle deleting a post
  const handleDeletePost = async (slug: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      return;
    }
    
    try {
      const success = await blogService.deletePost(slug);
      if (success) {
        setPosts(posts.filter(post => post.slug !== slug));
      } else {
        throw new Error('Failed to delete post');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Erreur lors de la suppression de l\'article');
    }
  };
  
  // Handle saving a post (create or update)
  const handleSavePost = (savedPost: BlogPost) => {
    if (editingPost) {
      // Update existing post in the list
      setPosts(posts.map(post => post.id === savedPost.id ? savedPost : post));
    } else {
      // Add new post to the list
      setPosts([savedPost, ...posts]);
    }
    
    setEditingPost(null);
    setIsCreating(false);
  };
  
  // Handle canceling edit/create
  const handleCancelEdit = () => {
    setEditingPost(null);
    setIsCreating(false);
  };
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/blog');
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  return (
    <DashboardContainer>
      <DashboardHeader>
        <Title>Administration du Blog</Title>
        <ButtonGroup>
          <PrimaryButton onClick={handleCreatePost}>Nouvel Article</PrimaryButton>
          <SecondaryButton onClick={handleLogout}>Déconnexion</SecondaryButton>
        </ButtonGroup>
      </DashboardHeader>
      
      {isCreating || editingPost ? (
        <BlogPostEditor
          post={editingPost || undefined}
          onSave={handleSavePost}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          {loading ? (
            <LoadingMessage>Chargement des articles...</LoadingMessage>
          ) : error ? (
            <ErrorMessage>
              <h2>Erreur lors du chargement des articles</h2>
              <p>{error.message}</p>
            </ErrorMessage>
          ) : posts.length === 0 ? (
            <EmptyMessage>
              <p>Aucun article n'a été publié.</p>
              <PrimaryButton onClick={handleCreatePost}>Créer un article</PrimaryButton>
            </EmptyMessage>
          ) : (
            <PostsTable>
              <TableHeader>
                <TableHeaderCell>Titre</TableHeaderCell>
                <TableHeaderCell>Catégorie</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableHeader>
              
              {posts.map(post => (
                <TableRow key={post.id}>
                  <TableCell>
                    <PostTitle>{post.title}</PostTitle>
                  </TableCell>
                  <TableCell>
                    <PostCategory>{post.category}</PostCategory>
                  </TableCell>
                  <TableCell>
                    <PostDate>{formatDate(post.date)}</PostDate>
                  </TableCell>
                  <TableCell>
                    <ActionButton 
                      onClick={() => handleEditPost(post)}
                      aria-label={`Modifier ${post.title}`}
                    >
                      ✏️
                    </ActionButton>
                    <ActionButton 
                      className="delete"
                      onClick={() => handleDeletePost(post.slug)}
                      aria-label={`Supprimer ${post.title}`}
                    >
                      🗑️
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </PostsTable>
          )}
        </>
      )}
    </DashboardContainer>
  );
};

export default BlogDashboard;