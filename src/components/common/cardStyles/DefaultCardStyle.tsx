import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ProjectCardStyleProps, TeamMemberCardStyleProps } from './types';
import { platformService } from '../../../services/platformService';
import { useI18n } from '../../../contexts/I18nContext';

/**
 * Default Card Style for Projects
 * Original ProjectCard implementation
 */
export function DefaultProjectCard({
  project,
  isVideoPlaying: externalIsVideoPlaying,
  onVideoPlay,
  onVideoEnd,
  onCardClick,
  className = '',
}: ProjectCardStyleProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(externalIsVideoPlaying || false);
  const { t, language } = useI18n();
  
  useEffect(() => {
    platformService.setLanguage(language);
  }, [language]);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    onVideoPlay?.();
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    onVideoEnd?.();
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onCardClick}
      className={`bg-bolf-black border border-bolf-gray/20 rounded-lg overflow-hidden hover:border-bolf-neon-blue/30 transition-all duration-300 group cursor-pointer ${className}`}
    >
      {/* Project Image/Video */}
      <div className="relative h-48 bg-gradient-to-br from-bolf-neon-blue/10 to-bolf-orange/10 overflow-hidden">
        {project.video && !isVideoPlaying ? (
          <div className="relative w-full h-full">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-bolf-black/40 group-hover:bg-bolf-black/20 transition-colors">
              <button
                onClick={handleVideoPlay}
                className="w-16 h-16 rounded-full bg-bolf-neon-blue/80 hover:bg-bolf-neon-blue flex items-center justify-center transition-transform hover:scale-110"
                aria-label="Play video"
              >
                <svg className="w-8 h-8 text-bolf-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        ) : project.video && isVideoPlaying ? (
          <video
            src={project.video}
            className="w-full h-full object-cover"
            controls
            autoPlay
            onEnded={handleVideoEnd}
          />
        ) : (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23000" width="400" height="300"/%3E%3Ctext fill="%23fff" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="24"%3EProject Image%3C/text%3E%3C/svg%3E';
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bolf-black/60 to-transparent" />
        
        {/* Type Badge */}
        {project.type === 'media' && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-bolf-orange/80 text-bolf-white text-xs rounded">
            {t('projects.mediaBadge')}
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-3">
        <h3 className="text-lg font-bold text-bolf-white mb-1 group-hover:text-bolf-neon-blue transition-colors">
          {project.name}
        </h3>
        
        <p className="text-bolf-gray mb-3 text-xs line-clamp-2">
          {project.description}
        </p>

        {/* Platforms */}
        <div className="flex flex-wrap gap-2">
          {project.platforms.map((platform) => (
            <span
              key={platform}
              className="inline-flex items-center space-x-1 px-3 py-1 bg-bolf-gray/10 rounded-full text-sm text-bolf-gray"
            >
              <span>{platformService.getPlatformIcon(platform)}</span>
              <span>{platformService.getPlatformDisplayName(platform)}</span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Default Card Style for Team Members
 * Original TeamMemberCard implementation
 */
export function DefaultTeamMemberCard({
  member,
  onClick,
  roleColor,
  className = '',
}: TeamMemberCardStyleProps) {

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={onClick}
      className={`relative bg-bolf-black border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 group ${className}`}
      style={{
        borderColor: `${roleColor}40`,
        boxShadow: `0 0 20px ${roleColor}20`,
      }}
    >
      {/* Hover Effect Border */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: `inset 0 0 30px ${roleColor}30`,
        }}
      />

      {/* Avatar */}
      <div className="relative h-32 bg-gradient-to-br from-bolf-neon-blue/10 to-bolf-orange/10 overflow-hidden">
        <div
          className="absolute inset-0 border-b-4 transition-all duration-300"
          style={{ borderColor: roleColor }}
        />
        <img
          src={member.avatar}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23000" width="300" height="300"/%3E%3Ccircle cx="150" cy="120" r="40" fill="%2300BFFF"/%3E%3Cpath fill="%23000" d="M150 180 L110 240 L190 240 Z"/%3E%3C/svg%3E';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bolf-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-3 relative z-10">
        <h3
          className="text-lg font-bold mb-1 group-hover:scale-105 transition-transform duration-300"
          style={{ color: roleColor }}
        >
          {member.name}
        </h3>
        
        <p className="mb-1.5 font-semibold text-xs" style={{ color: roleColor }}>
          {member.role}
        </p>

        {member.bio && (
          <p className="text-bolf-gray text-xs line-clamp-2">
            {member.bio}
          </p>
        )}
      </div>
    </motion.div>
  );
}

