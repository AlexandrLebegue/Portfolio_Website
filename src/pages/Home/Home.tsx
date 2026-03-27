import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFeaturedProjects from '../../hooks/useFeaturedProjects';
import AnimateIn from '../../components/AnimateIn/AnimateIn';

// Generate an array of stars with random properties
const generateStars = (count: number) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      size: Math.random() * 3 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    });
  }
  return stars;
};

// Stars background component
const StarBackground = () => {
  const [stars] = useState(() => generateStars(50));
  return (
    <>
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-accent animate-twinkle opacity-20 -z-10"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            boxShadow: `0 0 ${star.size * 2}px ${star.size / 2}px #00D8FF`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </>
  );
};

// Component to handle project image loading with fallback
interface ProjectImageContentProps {
  logoUrl: string;
  fallbackImage: string;
  name: string;
}

const ProjectImageContent: React.FC<ProjectImageContentProps> = ({ logoUrl, fallbackImage, name }) => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  useEffect(() => {
    const checkLogo = async () => {
      try {
        const response = await fetch(logoUrl);
        const text = await response.text();
        setLogoLoaded(response.ok && !text.includes("404: Not Found"));
      } catch { setLogoLoaded(false); }
    };
    checkLogo();
  }, [logoUrl]);
  return logoLoaded ? (
    <img src={logoUrl} alt={name} className="w-full h-full object-contain" />
  ) : <>{fallbackImage}</>;
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { projects: featuredProjects, loading, error } = useFeaturedProjects();

  const handleProjectClick = (projectName: string) => {
    navigate(`/projects/${projectName}`);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent -z-10" />
        <StarBackground />

        <AnimateIn type="fadeDown" delay={0} duration={800}>
          <h1 className="text-[clamp(2.5rem,5vw,3rem)] mb-4
            bg-gradient-to-br from-text-dark to-primary dark:from-text-primary-dark dark:to-primary
            bg-clip-text text-transparent">
            Alexandre Lebegue
          </h1>
        </AnimateIn>

        <AnimateIn type="fadeUp" delay={200} duration={800}>
          <h2 className="text-xl font-medium max-w-[600px] mb-8
            text-gray-500 dark:text-text-secondary-dark">
            Ingénieur logiciel embarqué & Dev-Ops passionné par les technologies qui repoussent les limites humaines
          </h2>
        </AnimateIn>

        <AnimateIn type="scale" delay={400} duration={600}>
          <Link to="/projects" className="btn-primary no-underline">
            Voir Mes Projets
          </Link>
        </AnimateIn>
      </section>

      {/* Featured Projects Section */}
      <section className="mt-10">
        <AnimateIn type="fadeLeft">
          <h2 className="section-title">Projets en Vedette</h2>
        </AnimateIn>

        {loading ? (
          <p className="text-gray-500 dark:text-text-secondary-dark">
            Chargement des projets en vedette...
          </p>
        ) : error ? (
          <p className="text-error">
            Erreur lors du chargement des projets.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <AnimateIn key={project.id} type="fadeUp" delay={index * 150} duration={600}>
                <div
                  onClick={() => handleProjectClick(project.name)}
                  className="card cursor-pointer overflow-hidden group"
                >
                  <div className="h-[180px] flex items-center justify-center text-3xl
                    bg-gray-100 dark:bg-bg-code">
                    <ProjectImageContent
                      logoUrl={`https://raw.githubusercontent.com/AlexandrLebegue/${project.name}/main/logo.png`}
                      fallbackImage={project.image}
                      name={project.name}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg mb-2">{project.name}</h3>
                    <p className="text-base mb-4 text-gray-500 dark:text-text-secondary-dark">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                      {project.language && !project.technologies.includes(project.language) && (
                        <span key={project.language} className="tech-tag">{project.language}</span>
                      )}
                    </div>
                    <Link
                      to={`/projects?repo=${project.name}`}
                      className="inline-flex items-center gap-1 text-primary font-medium
                        hover:underline no-underline"
                    >
                      Voir le Projet <span>→</span>
                    </Link>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="mt-10 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <AnimateIn type="fadeRight">
            <h2 className="section-title">À Propos de Moi</h2>
          </AnimateIn>
          <AnimateIn type="fadeUp" delay={100}>
            <p className="text-text-dark dark:text-text-primary-dark leading-relaxed">
              En tant qu'ingénieur passionné par le développement de technologies de pointe,
              je m'efforce de repousser les limites du possible. Fort d'une expertise en ingénierie
              et en développement logiciel, je conçois des solutions innovantes qui intègrent
              harmonieusement ces deux disciplines.
            </p>
          </AnimateIn>
          <AnimateIn type="fadeUp" delay={200}>
            <p className="text-text-dark dark:text-text-primary-dark leading-relaxed mt-4">
              Mon travail se concentre sur le développement logiciel, la recherche en IA et l'intégration continue,
              toujours avec un regard tourné vers l'innovation et l'implémentation pratique.
            </p>
          </AnimateIn>
          <AnimateIn type="scale" delay={300}>
            <Link to="/about" className="btn-primary no-underline mt-6 inline-block">
              En Savoir Plus Sur Moi
            </Link>
          </AnimateIn>
        </div>

        <AnimateIn type="fadeLeft" delay={200} className="flex-1 flex justify-center md:order-none -order-1">
          <div className="w-[300px] h-[300px] rounded-full overflow-hidden
            border-[3px] border-primary flex items-center justify-center text-4xl
            bg-gray-100 dark:bg-bg-code">
            <img
              src={require('../../assets/images/me.JPG')}
              alt="Alexandre Lebegue"
              className="w-full h-full object-cover"
            />
          </div>
        </AnimateIn>
      </section>
    </div>
  );
};

export default Home;
