import { useEffect, useRef } from 'react';
import type { ProjectCardStyleProps, TeamMemberCardStyleProps } from './types';
import { platformService } from '../../../services/platformService';
import Button from '../Button';
import { useI18n } from '../../../contexts/I18nContext';

/**
 * Card Interaction Style for Projects
 * Based on cards-interactions - 3D tilt effect
 */
export function InteractionProjectCard({
  project,
  isVideoPlaying = false,
  onVideoPlay,
  onVideoEnd,
  onCardClick,
  className = '',
}: ProjectCardStyleProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t, language } = useI18n();
  const rotationFactor = 2;

  useEffect(() => {
    platformService.setLanguage(language);
  }, [language]);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;
    if (!card || !content) return;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = (rotationFactor * (x - centerX)) / centerX;
      const rotateX = (-rotationFactor * (y - centerY)) / centerY;

      content.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.setProperty('--x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--y', `${(y / rect.height) * 100}%`);
    };

    const handleMouseLeave = () => {
      if (content) {
        content.style.transform = 'rotateX(0) rotateY(0)';
        content.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
          if (content) content.style.transition = '';
        }, 500);
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`card-interaction bg-bolf-black/50 backdrop-blur-md border border-bolf-white/10 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl ${className}`}
      data-rotation-factor={rotationFactor}
      onClick={onCardClick}
      style={
        {
          '--x': '50%',
          '--y': '50%',
        } as React.CSSProperties
      }
    >
      <style>{`
        .card-interaction {
          position: relative;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .card-interaction::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--x, 50%) var(--y, 50%),
            rgba(255, 255, 255, 0.1) 0%,
            transparent 50%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
          pointer-events: none;
        }

        .card-interaction:hover::before {
          opacity: 1;
        }

        .card-interaction-content {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          transform-style: preserve-3d;
        }
      `}</style>

      <div ref={contentRef} className="card-interaction-content">
          {/* Project Image/Video */}
          <div className="relative h-24 bg-gradient-to-br from-bolf-neon-blue/10 to-bolf-orange/10 overflow-hidden">
          {project.video && !isVideoPlaying ? (
            <div className="relative w-full h-full">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
                style={{ transform: 'translateZ(20px)' }}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-bolf-black/40 hover:bg-bolf-black/20 transition-colors">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onVideoPlay?.();
                  }}
                  className="w-16 h-16 rounded-full bg-bolf-neon-blue/80 hover:bg-bolf-neon-blue flex items-center justify-center transition-transform hover:scale-110"
                  aria-label="Play video"
                  style={{ transform: 'translateZ(25px)' }}
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
              onEnded={onVideoEnd}
              style={{ transform: 'translateZ(20px)' }}
            />
          ) : (
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              style={{ transform: 'translateZ(20px)' }}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23000" width="400" height="300"/%3E%3Ctext fill="%23fff" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="24"%3EProject Image%3C/text%3E%3C/svg%3E';
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bolf-black/60 to-transparent" />
          
          {project.type === 'media' && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-bolf-orange/80 text-bolf-white text-xs rounded z-10" style={{ transform: 'translateZ(25px)' }}>
              {t('projects.mediaBadge')}
            </div>
          )}
        </div>

        {/* Project Content */}
          <div className="p-3 relative z-10" style={{ transform: 'translateZ(15px)' }}>
            <h3 className="text-lg font-bold text-bolf-white mb-1 hover:text-bolf-neon-blue transition-colors" style={{ transform: 'translateZ(20px)' }}>
              {project.name}
            </h3>
          
          <p className="text-bolf-gray mb-3 text-xs line-clamp-2" style={{ transform: 'translateZ(15px)' }}>
            {project.description}
          </p>

          {/* Platforms */}
          <div className="flex flex-wrap gap-2 mb-4" style={{ transform: 'translateZ(15px)' }}>
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

          {/* CTA Button */}
          <div style={{ transform: 'translateZ(15px)' }}>
            <Button
              onClick={(e) => {
                e?.stopPropagation();
                if (project.link) window.open(project.link, '_blank');
              }}
              variant="secondary"
              size="small"
              className="w-full"
            >
              {t('projects.viewDetails')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Card Interaction Style for Team Members
 */
export function InteractionTeamMemberCard({
  member,
  onClick,
  roleColor,
  className = '',
}: TeamMemberCardStyleProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rotationFactor = 2;

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;
    if (!card || !content) return;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = (rotationFactor * (x - centerX)) / centerX;
      const rotateX = (-rotationFactor * (y - centerY)) / centerY;

      content.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.setProperty('--x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--y', `${(y / rect.height) * 100}%`);
    };

    const handleMouseLeave = () => {
      if (content) {
        content.style.transform = 'rotateX(0) rotateY(0)';
        content.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
          if (content) content.style.transition = '';
        }, 500);
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`card-interaction bg-bolf-black/50 backdrop-blur-md border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl ${className}`}
      data-rotation-factor={rotationFactor}
      onClick={onClick}
      style={
        {
          '--x': '50%',
          '--y': '50%',
          borderColor: `${roleColor}40`,
        } as React.CSSProperties
      }
    >
      <style>{`
        .card-interaction {
          position: relative;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .card-interaction::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--x, 50%) var(--y, 50%),
            ${roleColor}20 0%,
            transparent 50%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
          pointer-events: none;
        }

        .card-interaction:hover::before {
          opacity: 1;
        }

        .card-interaction-content {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          transform-style: preserve-3d;
        }
      `}</style>

      <div ref={contentRef} className="card-interaction-content">
        {/* Avatar */}
        <div className="relative h-32 bg-gradient-to-br from-bolf-neon-blue/10 to-bolf-orange/10 overflow-hidden">
          <div
            className="absolute inset-0 border-b-4 transition-all duration-300"
            style={{ borderColor: roleColor, transform: 'translateZ(15px)' }}
          />
          <img
            src={member.avatar}
            alt={member.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            style={{ transform: 'translateZ(20px)' }}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23000" width="300" height="300"/%3E%3Ccircle cx="150" cy="120" r="40" fill="%2300BFFF"/%3E%3Cpath fill="%23000" d="M150 180 L110 240 L190 240 Z"/%3E%3C/svg%3E';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bolf-black/80 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-3 relative z-10" style={{ transform: 'translateZ(15px)' }}>
          <h3
            className="text-lg font-bold mb-1 hover:scale-105 transition-transform duration-300"
            style={{ color: roleColor, transform: 'translateZ(25px)' }}
          >
            {member.name}
          </h3>
          
          <p className="mb-1.5 font-semibold text-xs" style={{ transform: 'translateZ(20px)', color: roleColor }}>
            {member.role}
          </p>

          {member.bio && (
            <p className="text-bolf-gray text-xs line-clamp-2" style={{ transform: 'translateZ(20px)' }}>
              {member.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

