import React, { ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PageTransition from '../../PageTransition/PageTransition';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 flex flex-col">
        <div className="flex-1 w-full max-w-[1200px] mx-auto px-4 py-8">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
