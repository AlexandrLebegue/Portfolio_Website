import React from 'react';
import AnimateIn from '../../components/AnimateIn/AnimateIn';

const About: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="mb-8">
        <AnimateIn type="fadeDown" delay={0}>
          <h1 className="text-4xl mb-4">À Propos de Moi</h1>
        </AnimateIn>
        <AnimateIn type="fadeUp" delay={100}>
          <p className="text-lg max-w-[800px] text-gray-500 dark:text-text-secondary-dark">
            Ingénieur logiciel embarqué mais surtout développeur passionné en technologies IA
          </p>
        </AnimateIn>
      </div>

      {/* Profile Section */}
      <section className="mb-10">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-[2]">
            <AnimateIn type="fadeRight" delay={0}>
              <h2 className="section-title">Mon Parcours</h2>
            </AnimateIn>
            <AnimateIn type="fadeUp" delay={100}>
              <p className="mb-4 leading-relaxed text-text-dark dark:text-text-primary-dark">
                Je suis Alexandre Lebegue, un ingénieur logiciel embarqué animé par une passion profonde pour le développement de technologies
                de pointe qui repoussent les limites du possible. Mon parcours a été guidé par une fascination pour l'exploration spatiale
                et les innovations technologiques. Cette passion m'a conduit à poursuivre des études en ingénierie logicielle, où j'ai découvert
                la joie de créer et de partager mes connaissances avec les autres. Chaque projet est pour moi une opportunité de contribuer
                à un l'avenir et de laisser une marque dans le monde.
              </p>
            </AnimateIn>
            <AnimateIn type="fadeUp" delay={200}>
              <p className="mb-4 leading-relaxed text-text-dark dark:text-text-primary-dark">
                Tout au long de ma carrière, j'ai eu l'opportunité de combiner mes compétences techniques avec ma créativité sur divers projets.
                En commençant par le développement d'un simulateur de voûte céleste, j'ai découvert la puissance du C++ (et la joie des fuites mémoires ...). Ma contribution à la création de viseurs d'étoiles
                m'a enseigné le développement dans des environnements contraints en C.
                Participer au lancement de l'usine logicielle pour l'intégration continue m'a offert une vue d'ensemble sur le cycle de développement.
                Actuellement, je travaille sur l'utilisation des LLMs pour l'aide au développement, afin de continuer à développer mes compétences.
              </p>
            </AnimateIn>
            <AnimateIn type="fadeUp" delay={300}>
              <p className="mb-4 leading-relaxed text-text-dark dark:text-text-primary-dark">
                Je crois que l'intersection entre l'ingénierie aérospatiale et le développement logiciel
                offre d'énormes opportunités d'innovation. Qu'il s'agisse de développer des outils de simulation
                pour la dynamique spatiale, de créer des systèmes de contrôle, ou
                de construire des plateformes de visualisation de données complexes,
                je suis toujours enthousiaste à l'idée de relever de nouveaux défis.
              </p>
            </AnimateIn>
          </div>

          <AnimateIn type="fadeLeft" delay={200} className="flex-1 flex justify-center items-start md:order-none -order-1 md:mb-0 mb-6">
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
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-10">
        <AnimateIn type="fadeRight">
          <h2 className="section-title">Compétences & Expertise</h2>
        </AnimateIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Développement Logiciel',
              skills: ['Python', 'C/C++ 11', 'Cmake / GCC / MSVC'],
            },
            {
              title: 'Intelligence Artificielle',
              skills: ["Développement d'agents avec outils", 'Apprentissage Automatique', 'Apprentissage par renforcement', 'Visualisation de Données'],
            },
            {
              title: 'Outils & Technologies',
              skills: ['Git & SVN', 'Github & Tuleap', 'Jenkins & Github Workflow', 'Docker', 'Pipelines CI/CD', 'Google Cloud (en cours 🚸)'],
            },
          ].map((category, catIndex) => (
            <AnimateIn key={category.title} type="fadeUp" delay={catIndex * 150}>
              <div className="card p-6">
                <h3 className="text-lg mb-4 text-primary">{category.title}</h3>
                <ul className="list-none p-0 m-0">
                  {category.skills.map(skill => (
                    <li key={skill} className="flex items-center mb-2 text-text-dark dark:text-text-primary-dark">
                      <span className="text-primary mr-2">▹</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* Interests Section */}
      <section className="mb-10">
        <AnimateIn type="fadeRight">
          <h2 className="section-title">Intérêts & Passions</h2>
        </AnimateIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '🚀', title: 'Exploration Spatiale', description: "Fasciné par les défis et les possibilités de l'exploration au-delà de la Terre" },
            { icon: '🤖', title: 'Intelligence Artificielle', description: "Explorer le potentiel de l'IA pour résoudre des problèmes et aider au développement" },
            { icon: '📊', title: 'Visualisation de Données', description: "Créer des moyens intuitifs de comprendre et d'interagir avec des données complexes" },
            { icon: '🚙', title: 'Exploration terrestre', description: 'Rencontrer de nouvelles personnes, cultures et lieux.' },
          ].map((interest, index) => (
            <AnimateIn key={interest.title} type="scale" delay={index * 100}>
              <div className="flex flex-col items-center text-center">
                <div className="text-3xl mb-2">{interest.icon}</div>
                <h3 className="text-base mb-1">{interest.title}</h3>
                <p className="text-sm text-gray-500 dark:text-text-secondary-dark">
                  {interest.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
