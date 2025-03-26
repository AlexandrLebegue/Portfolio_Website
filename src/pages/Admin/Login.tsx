import React, { useState, FormEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: ${({ theme }) => theme.space.xl};
`;

const LoginCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.dark}99;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.space.xl};
  width: 100%;
  max-width: 400px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const LoginTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.space.xl};
  text-align: center;
`;

const LoginForm = styled.form`
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

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.ui.border};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.status.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.space.sm};
  text-align: center;
`;

const BackLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: ${({ theme }) => theme.space.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-decoration: none;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;

interface LocationState {
  from?: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state, or default to admin dashboard
  const from = (location.state as LocationState)?.from || '/admin/blog';
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      return;
    }
    
    try {
      console.log('Attempting to login with:', username, password);
      await login({ username, password });
      console.log('Login successful, navigating to:', from);
      navigate(from, { replace: true });
    } catch (err) {
      // Error is handled by the useAuth hook
      console.error('Login failed:', err);
    }
  };
  
  return (
    <LoginContainer>
      <LoginCard>
        <LoginTitle>Administration</LoginTitle>
        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Nom d'utilisateur</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </SubmitButton>
        </LoginForm>
        
        <BackLink to="/blog">Retour au blog</BackLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;