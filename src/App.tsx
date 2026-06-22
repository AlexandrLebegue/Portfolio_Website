import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n';
import ThemeProvider from './context/ThemeProvider';
import Layout from './components/layout/Layout/Layout';

// Pages
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import Projects from './pages/Projects/Projects';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Moi from './pages/Moi/Moi';
import LinkedInImport from './pages/LinkedInImport/LinkedInImport';

const App: React.FC = () => {
  return (
    // LanguageProvider enveloppe toute l'app (langue FR/EN partagee partout),
    // puis ThemeProvider gere le theme clair/sombre.
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:projectName" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/moi" element={<Moi />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/linkedin-import" element={<LinkedInImport />} />

              {/* Add a catch-all route for 404 pages later */}
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
