import React from 'react';
import { LinkedInProfile } from '../../types/linkedin-import.types';

interface ProfileHeroProps {
  profile: LinkedInProfile;
  photo?: string;
  aiSummary?: string;
}

const ProfileHero: React.FC<ProfileHeroProps> = ({ profile, photo, aiSummary }) => {
  return (
    <div className="w-full bg-gradient-primary py-12 px-8 md:py-8 md:px-6 rounded-lg mb-10 shadow-lg">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-8 md:text-left text-center">
        {/* Photo */}
        {photo && (
          <div className="flex-shrink-0">
            <img
              src={photo}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="w-[180px] h-[180px] md:w-[150px] md:h-[150px] rounded-full
                border-[5px] border-white object-cover shadow-xl"
            />
          </div>
        )}

        {/* Info */}
        <div className="flex-1 text-white">
          <h1 className="text-4xl md:text-3xl font-bold mb-2 text-white">
            {profile.firstName} {profile.lastName}
          </h1>
          <h2 className="text-xl md:text-lg font-medium mb-4 text-text-light opacity-95">
            {profile.headline}
          </h2>

          {profile.geoLocation && (
            <div className="text-base mb-6 flex items-center gap-2 opacity-90
              md:justify-start justify-center text-text-light">
              <span className="text-lg">📍</span>
              {profile.geoLocation}
            </div>
          )}

          {/* AI Summary */}
          {aiSummary && (
            <div className="bg-white/15 backdrop-blur-sm p-6 rounded-md mt-6
              border-l-4 border-l-accent">
              <span className="text-xl mr-2">✨ <b>AI - Resume</b></span>
              <p className="text-base leading-relaxed text-white m-0 font-medium opacity-95 mt-2">
                {aiSummary}
              </p>
            </div>
          )}

          {/* Summary */}
          {profile.summary && (
            <p className="text-base md:text-sm leading-relaxed text-text-light opacity-90 mt-6 max-w-[800px]">
              {profile.summary}
            </p>
          )}

          {/* Links */}
          {(profile.websites || profile.twitterHandles) && (
            <div className="flex flex-wrap gap-4 mt-6 md:justify-start justify-center">
              {profile.websites && profile.websites.split(',').map((website, index) => (
                <a
                  key={index}
                  href={website.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium
                    bg-white/10 text-white border border-white/20 no-underline
                    transition-all duration-200
                    hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-md"
                >
                  🔗 {getDomainFromUrl(website.trim())}
                </a>
              ))}
              {profile.twitterHandles && (
                <a
                  href={`https://twitter.com/${profile.twitterHandles.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium
                    bg-white/10 text-white border border-white/20 no-underline
                    transition-all duration-200
                    hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-md"
                >
                  🐦 Twitter
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function getDomainFromUrl(url: string): string {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
}

export default ProfileHero;
