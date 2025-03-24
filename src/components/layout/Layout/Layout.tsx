import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Main = styled.main`
  min-height: 100vh;
  padding-top: 80px; /* Height of the header */
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space.md};
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Main>
        <Content>{children}</Content>
      </Main>
      <Footer />
    </>
  );
};

export default Layout;