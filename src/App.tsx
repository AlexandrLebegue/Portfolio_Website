import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeProvider from './context/ThemeProvider';
import Layout from './components/layout/Layout/Layout';

// Pages
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import CV from './pages/CV/CV';
import About from './pages/About/About';
import Blog from './pages/Blog/Blog';
import Contact from './pages/Contact/Contact';

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
            <Route path="/contact" element={<Contact />} />
            {/* Add a catch-all route for 404 pages later */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
