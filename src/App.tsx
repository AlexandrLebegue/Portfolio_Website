import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeProvider from './context/ThemeProvider';
import Layout from './components/layout/Layout/Layout';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Pages
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import CV from './pages/CV/CV';
import About from './pages/About/About';
import Blog from './pages/Blog/Blog';
import BlogPost from './pages/Blog/BlogPost';
import Contact from './pages/Contact/Contact';

// Admin Pages
import Login from './pages/Admin/Login';
import BlogDashboard from './pages/Admin/BlogDashboard';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/toto" element={<BlogDashboard />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/blog"
              element={
                <ProtectedRoute>
                  <BlogDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Add a catch-all route for 404 pages later */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
