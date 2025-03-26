import React, { useState, useEffect, FormEvent } from 'react';
import styled from 'styled-components';
import { BlogPost, BlogPostDraft } from '../../types/blog.types';
import blogService from '../../services/blog';

interface BlogPostEditorProps {
  post?: BlogPost;
  onSave: (savedPost: BlogPost) => void;
  onCancel: () => void;
}

const EditorContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.dark}99;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.space.xl};
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const EditorForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.space.md};
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

const Textarea = styled.textarea`
  padding: ${({ theme }) => theme.space.md};
  background-color: ${({ theme }) => theme.colors.background.code};
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.code};
  min-height: 200px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}30;
  }
`;

const TagsInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.xs};
  margin-top: ${({ theme }) => theme.space.xs};
`;

const Tag = styled.div`
  background-color: ${({ theme }) => theme.colors.background.code};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const TagRemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.status.error};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${({ theme }) => theme.colors.status.error};
  }
`;

const AddTagInput = styled.input`
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  background-color: ${({ theme }) => theme.colors.background.code};
  border: 1px dashed ${({ theme }) => theme.colors.ui.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  min-width: 100px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.xl};
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  color: ${({ theme }) => theme.colors.text.secondary};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.ui.hover};
  }
`;

const SaveButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.ui.border};
    cursor: not-allowed;
  }
`;

const PreviewContainer = styled.div`
  margin-top: ${({ theme }) => theme.space.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.ui.border};
  padding-top: ${({ theme }) => theme.space.xl};
`;

const PreviewTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({ post, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize form with post data if editing an existing post
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setExcerpt(post.excerpt);
      setCategory(post.category);
      setTags([...post.tags]);
      setCoverImage(post.coverImage);
    } else {
      // Default values for a new post
      setTitle('');
      setContent('');
      setExcerpt('');
      setCategory('');
      setTags([]);
      setCoverImage('📝'); // Default emoji
    }
  }, [post]);
  
  // Handle adding a new tag
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };
  
  // Handle removing a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Handle new tag input keydown
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !category) {
      setError('Please fill in all required fields');
      return;
    }
    
    setSaving(true);
    setError(null);
    
    try {
      const postData: BlogPostDraft = {
        title,
        content,
        excerpt: excerpt || title, // Use title as excerpt if not provided
        category,
        tags,
        coverImage: coverImage || '📝',
        date: post?.date || new Date().toISOString().split('T')[0],
        author: post?.author || 'Alexandre Lebegue',
      };
      
      let savedPost: BlogPost;
      
      if (post) {
        // Update existing post
        const updated = await blogService.updatePost(post.slug, postData);
        if (!updated) {
          throw new Error('Failed to update post');
        }
        savedPost = updated;
      } else {
        // Create new post
        savedPost = await blogService.createPost(postData);
      }
      
      onSave(savedPost);
    } catch (err) {
      console.error('Error saving post:', err);
      setError(err instanceof Error ? err.message : 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <EditorContainer>
      <EditorForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Titre *</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="excerpt">Extrait</Label>
          <Input
            id="excerpt"
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Brève description de l'article"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="category">Catégorie *</Label>
          <Input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="coverImage">Image de couverture (emoji ou URL)</Label>
          <Input
            id="coverImage"
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="🚀"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Tags</Label>
          <TagsInput>
            {tags.map(tag => (
              <Tag key={tag}>
                {tag}
                <TagRemoveButton 
                  type="button" 
                  onClick={() => handleRemoveTag(tag)}
                  aria-label={`Remove tag ${tag}`}
                >
                  ✕
                </TagRemoveButton>
              </Tag>
            ))}
            <AddTagInput
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleTagKeyDown}
              onBlur={handleAddTag}
              placeholder="Ajouter un tag..."
            />
          </TagsInput>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="content">Contenu (Markdown) *</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </FormGroup>
        
        {error && <div style={{ color: 'red' }}>{error}</div>}
        
        <ButtonGroup>
          <CancelButton type="button" onClick={onCancel}>
            Annuler
          </CancelButton>
          <SaveButton type="submit" disabled={saving}>
            {saving ? 'Enregistrement...' : post ? 'Mettre à jour' : 'Publier'}
          </SaveButton>
        </ButtonGroup>
      </EditorForm>
    </EditorContainer>
  );
};

export default BlogPostEditor;