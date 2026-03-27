import React from 'react';
import { useLinkedInProfile } from '../../hooks/useLinkedInProfile';

// Utility function to format dates
const formatExperienceDate = (date?: { month: number; year: number }): string => {
  if (!date) return '';
  const months = [
    'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
    'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'
  ];
  return `${months[date.month - 1]} ${date.year}`;
};

// Profile Header Component
const ProfileHeader: React.FC<{ profile: any }> = ({ profile }) => {
  if (!profile) return null;

  return (
    <section className="flex flex-col sm:flex-row gap-8 mb-8 p-8 rounded-lg border transition-colors duration-300
      bg-bg-code-light dark:bg-bg-code border-ui-border-light dark:border-ui-border">
      {/* Profile Image */}
      <div className="flex-shrink-0 flex justify-center items-start">
        <div
          className="w-[200px] h-[200px] rounded-full border-[3px] border-primary overflow-hidden
            flex items-center justify-center text-4xl bg-bg-dark"
          style={profile.profilePicture ? {
            backgroundImage: `url(${profile.profilePicture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          } : undefined}
        >
          {!profile.profilePicture && <span>👤</span>}
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-3xl m-0 text-text-dark dark:text-text-primary-dark">
          {profile.firstName} {profile.lastName}
        </h2>

        {profile.headline && (
          <h3 className="text-xl font-medium text-primary m-0">
            {profile.headline}
          </h3>
        )}

        {profile.location && (
          <p className="text-base m-0 flex items-center gap-1
            text-gray-500 dark:text-text-secondary-dark">
            📍 {profile.location}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="flex flex-col items-center p-2 rounded-md border
            bg-bg-light dark:bg-bg-dark border-ui-border-light dark:border-ui-border">
            <span className="text-xl font-bold text-primary">
              {profile.connectionCount || 0}
            </span>
            <span className="text-sm text-gray-500 dark:text-text-secondary-dark">Connexions</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-md border
            bg-bg-light dark:bg-bg-dark border-ui-border-light dark:border-ui-border">
            <span className="text-xl font-bold text-primary">
              {profile.followerCount || 0}
            </span>
            <span className="text-sm text-gray-500 dark:text-text-secondary-dark">Abonnés</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Moi component
const Moi: React.FC = () => {
  const { profile, loading, error, retry } = useLinkedInProfile();

  // Loading state
  if (loading && !profile) {
    return (
      <div className="flex flex-col gap-8 min-h-screen">
        <div className="mb-8">
          <h1 className="text-4xl mb-4 gradient-text">Moi</h1>
          <p className="text-lg max-w-[800px] text-gray-500 dark:text-text-secondary-dark">
            Mon profil professionnel LinkedIn
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-10 h-10 border-[3px] border-ui-border-light dark:border-ui-border
            border-t-primary rounded-full animate-spin-slow mb-4" />
          <p className="text-lg text-gray-500 dark:text-text-secondary-dark">
            Chargement de mon profil LinkedIn...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !profile) {
    return (
      <div className="flex flex-col gap-8 min-h-screen">
        <div className="mb-8">
          <h1 className="text-4xl mb-4 gradient-text">Moi</h1>
          <p className="text-lg max-w-[800px] text-gray-500 dark:text-text-secondary-dark">
            Mon profil professionnel LinkedIn
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center
          rounded-lg border bg-bg-code-light dark:bg-bg-code border-error">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-error mb-2">Erreur de chargement</h3>
          <p className="text-gray-500 dark:text-text-secondary-dark mb-6">
            Impossible de charger les données LinkedIn. Veuillez réessayer.
          </p>
          <p className="text-gray-500 dark:text-text-secondary-dark mb-6">
            <small>{error}</small>
          </p>
          <button
            onClick={retry}
            className="bg-primary text-white border-none px-6 py-4 rounded-md
              text-base font-medium cursor-pointer transition-all duration-200
              hover:bg-secondary hover:-translate-y-0.5 active:translate-y-0"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl mb-4 gradient-text">Moi</h1>
        <p className="text-lg max-w-[800px] text-gray-500 dark:text-text-secondary-dark">
          Mon profil professionnel LinkedIn - Découvrez mon parcours et mes compétences
        </p>
      </div>

      {/* Profile Header */}
      {profile?.profile && <ProfileHeader profile={profile.profile} />}

      {/* Professional Summary */}
      {profile?.profile?.summary && (
        <section className="mb-10">
          <h2 className="section-title">Résumé Professionnel</h2>
          <p className="text-text-dark dark:text-text-primary-dark leading-relaxed">
            {profile.profile.summary}
          </p>
        </section>
      )}

      {/* Experience Section */}
      {profile?.experience && profile.experience.length > 0 && (
        <section className="mb-10">
          <h2 className="section-title">Expérience Professionnelle</h2>
          <div className="flex flex-col gap-6">
            {profile.experience.map((exp) => (
              <div key={exp.id} className="card p-6 hover:border-primary">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  {/* Company Logo */}
                  <div
                    className="w-[60px] h-[60px] rounded-md border flex-shrink-0
                      flex items-center justify-center text-lg
                      bg-bg-dark border-ui-border-light dark:border-ui-border"
                    style={exp.companyLogo ? {
                      backgroundImage: `url(${exp.companyLogo})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    } : undefined}
                  >
                    {!exp.companyLogo && <span>🏢</span>}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold m-0 mb-1 text-text-dark dark:text-text-primary-dark">
                      {exp.title}
                    </h3>
                    <h4 className="text-lg font-medium m-0 mb-1 text-primary">
                      {exp.companyName}
                    </h4>
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500 dark:text-text-secondary-dark">
                      <span className="flex items-center gap-1">
                        📅 {formatExperienceDate(exp.startDate)} - {exp.isCurrent ? 'Présent' : formatExperienceDate(exp.endDate)}
                        {exp.isCurrent && (
                          <span className="bg-success text-white px-2 py-0.5 rounded-full text-xs font-medium uppercase ml-2">
                            Actuel
                          </span>
                        )}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1">📍 {exp.location}</span>
                      )}
                      {exp.employmentType && (
                        <span className="flex items-center gap-1">💼 {exp.employmentType}</span>
                      )}
                    </div>
                    {exp.description && (
                      <p className="m-0 leading-relaxed text-text-dark dark:text-text-primary-dark">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {profile?.education && profile.education.length > 0 && (
        <section className="mb-10">
          <h2 className="section-title">Formation</h2>
          <div className="flex flex-col gap-6">
            {profile.education.map((edu) => (
              <div key={edu.id} className="card p-6 hover:border-primary">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  {/* School Logo */}
                  <div
                    className="w-[60px] h-[60px] rounded-md border flex-shrink-0
                      flex items-center justify-center text-lg
                      bg-bg-dark border-ui-border-light dark:border-ui-border"
                    style={edu.schoolLogo ? {
                      backgroundImage: `url(${edu.schoolLogo})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    } : undefined}
                  >
                    {!edu.schoolLogo && <span>🎓</span>}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold m-0 mb-1 text-text-dark dark:text-text-primary-dark">
                      {edu.degree}
                    </h3>
                    <h4 className="text-lg font-medium m-0 mb-1 text-primary">
                      {edu.schoolName}
                    </h4>
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500 dark:text-text-secondary-dark">
                      {edu.fieldOfStudy && (
                        <span className="flex items-center gap-1">📚 {edu.fieldOfStudy}</span>
                      )}
                      <span className="flex items-center gap-1">
                        📅 {formatExperienceDate(edu.startDate)} - {formatExperienceDate(edu.endDate)}
                      </span>
                      {edu.grade && (
                        <span className="flex items-center gap-1">🏆 {edu.grade}</span>
                      )}
                    </div>
                    {edu.description && (
                      <p className="m-0 mb-2 leading-relaxed text-text-dark dark:text-text-primary-dark">
                        {edu.description}
                      </p>
                    )}
                    {edu.activities && (
                      <p className="m-0 text-sm leading-normal text-gray-500 dark:text-text-secondary-dark">
                        <strong>Activités:</strong> {edu.activities}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {profile?.skills && profile.skills.length > 0 && (
        <section className="mb-10">
          <h2 className="section-title">Compétences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.skills.map((skill) => (
              <div key={skill.id} className="card p-6 hover:border-primary">
                <h3 className="text-lg font-semibold m-0 mb-2 text-text-dark dark:text-text-primary-dark">
                  {skill.name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary text-white px-2 py-0.5 rounded-full text-sm font-medium">
                    {skill.endorsementCount}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-text-secondary-dark">
                    {skill.endorsementCount === 1 ? 'recommandation' : 'recommandations'}
                  </span>
                </div>
                {skill.endorsers && skill.endorsers.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {skill.endorsers.slice(0, 6).map((endorser) => (
                      <div
                        key={endorser.id}
                        title={`${endorser.firstName} ${endorser.lastName}`}
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs
                          bg-bg-dark border-ui-border-light dark:border-ui-border"
                        style={endorser.profilePicture ? {
                          backgroundImage: `url(${endorser.profilePicture})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        } : undefined}
                      >
                        {!endorser.profilePicture && <span>👤</span>}
                      </div>
                    ))}
                    {skill.endorsers.length > 6 && (
                      <div
                        title={`+${skill.endorsers.length - 6} autres`}
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs
                          bg-bg-dark border-ui-border-light dark:border-ui-border
                          text-gray-500 dark:text-text-secondary-dark"
                      >
                        +{skill.endorsers.length - 6}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact Section */}
      {profile?.contact && (
        <section className="mb-10">
          <h2 className="section-title">Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key: 'email', icon: '📧', label: 'Email', value: profile.contact.email, href: `mailto:${profile.contact.email}` },
              { key: 'phone', icon: '📞', label: 'Téléphone', value: profile.contact.phone, href: `tel:${profile.contact.phone}` },
              { key: 'website', icon: '🌐', label: 'Site Web', value: profile.contact.website, href: profile.contact.website, external: true },
              { key: 'github', icon: '💻', label: 'GitHub', value: profile.contact.github, href: profile.contact.github, external: true },
              { key: 'twitter', icon: '🐦', label: 'Twitter', value: profile.contact.twitter ? `@${profile.contact.twitter}` : null, href: `https://twitter.com/${profile.contact.twitter}`, external: true },
              { key: 'portfolio', icon: '🎨', label: 'Portfolio', value: profile.contact.portfolio, href: profile.contact.portfolio, external: true },
            ]
              .filter(item => item.value)
              .map(item => (
                <div key={item.key} className="card flex items-center gap-4 p-6 hover:border-primary">
                  <div className="w-12 h-12 rounded-md bg-primary flex items-center justify-center text-xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-medium m-0 mb-1 text-gray-500 dark:text-text-secondary-dark">
                      {item.label}
                    </h4>
                    <p className="text-lg font-medium m-0 break-all text-text-dark dark:text-text-primary-dark">
                      <a
                        href={item.href}
                        className="text-primary no-underline hover:text-secondary hover:underline transition-colors duration-200"
                        {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {item.value}
                      </a>
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Moi;
