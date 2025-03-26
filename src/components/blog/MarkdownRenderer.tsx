import React from 'react';
import styled from 'styled-components';

// Note: In a real implementation, we would use a library like react-markdown
// For now, we'll create a simple renderer that handles basic markdown

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownContainer = styled.div`
  line-height: ${({ theme }) => theme.lineHeights.loose};
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: ${({ theme }) => theme.space.xl};
    margin-bottom: ${({ theme }) => theme.space.md};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
  
  h1 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
  
  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    padding-bottom: ${({ theme }) => theme.space.sm};
    border-bottom: 1px solid ${({ theme }) => theme.colors.ui.border};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.space.md};
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  ul, ol {
    margin-bottom: ${({ theme }) => theme.space.md};
    padding-left: ${({ theme }) => theme.space.xl};
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.space.xs};
  }
  
  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    padding-left: ${({ theme }) => theme.space.md};
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
  
  code {
    font-family: ${({ theme }) => theme.fonts.code};
    background-color: ${({ theme }) => theme.colors.background.code};
    padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-size: 0.9em;
  }
  
  pre {
    background-color: ${({ theme }) => theme.colors.background.code};
    padding: ${({ theme }) => theme.space.md};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow-x: auto;
    margin-bottom: ${({ theme }) => theme.space.md};
    
    code {
      background-color: transparent;
      padding: 0;
      border-radius: 0;
    }
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    margin: ${({ theme }) => theme.space.md} 0;
  }
  
  hr {
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.ui.border};
    margin: ${({ theme }) => theme.space.xl} 0;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: ${({ theme }) => theme.space.md};
    
    th, td {
      border: 1px solid ${({ theme }) => theme.colors.ui.border};
      padding: ${({ theme }) => theme.space.sm};
    }
    
    th {
      background-color: ${({ theme }) => theme.colors.background.dark};
      font-weight: ${({ theme }) => theme.fontWeights.semibold};
    }
    
    tr:nth-child(even) {
      background-color: ${({ theme }) => theme.colors.background.dark}50;
    }
  }
`;

/**
 * Simple markdown renderer component
 * In a real implementation, we would use a library like react-markdown
 */
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {
  // This is a very simplified markdown renderer
  // In a real implementation, we would use a library like react-markdown
  
  // For now, we'll just render the content as HTML
  // This is not safe for production use as it can lead to XSS vulnerabilities
  // But it's sufficient for demonstration purposes
  return (
    <MarkdownContainer 
      className={className} 
      dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(content) }} 
    />
  );
};

/**
 * Very simple markdown to HTML converter
 * This is not a complete markdown parser, just a simple example
 */
function simpleMarkdownToHtml(markdown: string): string {
  let html = markdown;
  
  // Convert headers
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  
  // Convert paragraphs
  html = html.replace(/^(?!<h[1-6]|<ul|<ol|<li|<blockquote|<pre)(.+)$/gm, '<p>$1</p>');
  
  // Convert bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // Convert links
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  
  // Convert unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.+<\/li>\n)+/g, '<ul>$&</ul>');
  
  // Convert ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.+<\/li>\n)+/g, '<ol>$&</ol>');
  
  // Convert code blocks (using a workaround for the 's' flag which requires ES2018)
  html = html.replace(/```([\s\S]+?)```/g, '<pre><code>$1</code></pre>');
  
  // Convert inline code
  html = html.replace(/`(.+?)`/g, '<code>$1</code>');
  
  // Convert blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>');
  
  // Convert horizontal rules
  html = html.replace(/^---$/gm, '<hr>');
  
  return html;
}

export default MarkdownRenderer;