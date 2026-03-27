import React from 'react';
import AnimateIn from '../../components/AnimateIn/AnimateIn';

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="mb-8">
        <AnimateIn type="fadeDown" delay={0}>
          <h1 className="text-4xl mb-4">Contactez-Moi</h1>
        </AnimateIn>
        <AnimateIn type="fadeUp" delay={100}>
          <p className="text-lg max-w-[800px] text-gray-500 dark:text-text-secondary-dark">
            Je suis toujours ouvert à discuter de nouveaux projets, opportunités ou collaborations.
            N'hésitez pas à me contacter via l'un des canaux ci-dessous.
          </p>
        </AnimateIn>
      </div>

      {/* Contact Content */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Contact Info */}
        <div className="flex-1">
          <AnimateIn type="fadeUp" delay={150}>
            <p className="text-text-dark dark:text-text-primary-dark leading-relaxed">
              Que vous ayez une question sur mon travail, que vous souhaitiez discuter d'un projet potentiel,
              ou simplement dire bonjour, je serais ravi d'avoir de vos nouvelles. Je suis actuellement ouvert à
              des opportunités de freelance dans le développement d'agents IA.
            </p>
          </AnimateIn>

          <div className="mt-8 space-y-6">
            {[
              { icon: '✉️', title: 'Courriel', href: 'mailto:contact@alexandrelebegue.com', text: 'alexandrelebegue12@gmail.com' },
              { icon: '🔗', title: 'LinkedIn', href: 'https://www.linkedin.com/in/alexandre-lebegue-6a3718151/', text: 'linkedin.com/in/alexandrlebegue', external: true },
              { icon: '💻', title: 'GitHub', href: 'https://github.com/AlexandrLebegue', text: 'github.com/AlexandrLebegue', external: true },
            ].map((method, index) => (
              <AnimateIn key={method.title} type="fadeLeft" delay={200 + index * 150}>
                <div>
                  <h3 className="text-lg mb-2 flex items-center gap-2">
                    <span className="text-xl text-primary">{method.icon}</span>
                    {method.title}
                  </h3>
                  <a
                    href={method.href}
                    {...(method.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-center gap-2 no-underline transition-colors duration-200
                      text-text-dark dark:text-text-primary-dark hover:text-primary"
                  >
                    {method.text}
                  </a>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>

        {/* Contact Image */}
        <AnimateIn type="scale" delay={300} className="flex-1 flex justify-center items-center md:block hidden">
          <div className="w-full max-w-[400px] h-[400px] rounded-lg relative overflow-hidden
            flex items-center justify-center text-5xl
            bg-gray-100 dark:bg-bg-code">
            <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent z-0" />
            <span className="relative z-10">📡</span>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
};

export default Contact;
