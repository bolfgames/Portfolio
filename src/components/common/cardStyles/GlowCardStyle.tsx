import { useEffect, useRef } from 'react';
import type { ProjectCardStyleProps, TeamMemberCardStyleProps } from './types';
import { platformService } from '../../../services/platformService';
import Button from '../Button';
import { useI18n } from '../../../contexts/I18nContext';

/**
 * Glow Effect Card Style for Projects
 * Based on card-glow-effect-one-event-one-attribute
 */
export function GlowProjectCard({
  project,
  isVideoPlaying = false,
  onVideoPlay,
  onVideoEnd,
  onCardClick,
  className = '',
}: ProjectCardStyleProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { t, language } = useI18n();

  useEffect(() => {
    platformService.setLanguage(language);
  }, [language]);

  // Update glow position relative to card
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Set CSS variables for this card
      card.style.setProperty('--x', `${x}`);
      card.style.setProperty('--y', `${y}`);
      card.style.setProperty('--base', '210');
      card.style.setProperty('--saturation', '100');
      card.style.setProperty('--lightness', '70');
      card.style.setProperty('--bg-spot-opacity', '0.1');
      card.style.setProperty('--border-spot-opacity', '1');
      card.style.setProperty('--border-light-opacity', '1');
    };

    const handleMouseLeave = () => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', `${rect.width / 2}`);
      card.style.setProperty('--y', `${rect.height / 2}`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    // Initialize center position
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', `${rect.width / 2}`);
    card.style.setProperty('--y', `${rect.height / 2}`);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`card-glow-project bg-bolf-black/80 backdrop-blur-md border-2 rounded-xl overflow-hidden transition-all duration-300 ${className}`}
      data-glow
      style={{
        borderColor: 'rgba(0, 191, 255, 0.3)',
        '--backdrop': 'rgba(0, 191, 255, 0.15)',
        '--backup-border': 'rgba(0, 191, 255, 0.2)',
      } as React.CSSProperties}
      onClick={onCardClick}
    >
      <style>{`
        .card-glow-project[data-glow] {
          position: relative;
          --spotlight-size: 150px;
          --x: 50%;
          --y: 50%;
          --base: 210;
          --saturation: 100;
          --lightness: 70;
          --bg-spot-opacity: 0.1;
          --border-spot-opacity: 1;
          --border-light-opacity: 1;
          background-image: radial-gradient(
            var(--spotlight-size) var(--spotlight-size) at
            calc(var(--x) * 1px) calc(var(--y) * 1px),
            hsl(var(--base) var(--saturation)% var(--lightness)% / var(--bg-spot-opacity)),
            transparent
          );
          background-color: var(--backdrop, transparent);
          background-size: 100% 100%;
          background-position: 50% 50%;
        }

        .card-glow-project[data-glow]::before,
        .card-glow-project[data-glow]::after {
          pointer-events: none;
          content: "";
          position: absolute;
          inset: -2px;
          border: 2px solid transparent;
          border-radius: 12px;
          background-size: calc(100% + 4px) calc(100% + 4px);
          background-repeat: no-repeat;
          background-position: 50% 50%;
          mask:
            linear-gradient(transparent, transparent),
            linear-gradient(white, white);
          mask-clip: padding-box, border-box;
          mask-composite: intersect;
          z-index: 1;
        }

        .card-glow-project[data-glow]::before {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
            calc(var(--x) * 1px) calc(var(--y) * 1px),
            hsl(var(--base) var(--saturation)% calc(var(--lightness) - 20)% / var(--border-spot-opacity)),
            transparent 100%
          );
          filter: brightness(2);
        }

        .card-glow-project[data-glow]::after {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
            calc(var(--x) * 1px) calc(var(--y) * 1px),
            hsl(0 100% 100% / var(--border-light-opacity)),
            transparent 100%
          );
        }
      `}</style>

            {/* Project Image/Video */}
            <div className="relative h-24 bg-gradient-to-br from-bolf-neon-blue/10 to-bolf-orange/10 overflow-hidden">
        {project.video && !isVideoPlaying ? (
          <div className="relative w-full h-full">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
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
          />
        ) : (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23000" width="400" height="300"/%3E%3Ctext fill="%23fff" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="24"%3EProject Image%3C/text%3E%3C/svg%3E';
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bolf-black/60 to-transparent" />
        
        {project.type === 'media' && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-bolf-orange/80 text-bolf-white text-xs rounded z-10">
            {t('projects.mediaBadge')}
          </div>
        )}
      </div>

            {/* Project Content */}
            <div className="p-3 relative z-10">
              <h3 className="text-lg font-bold text-bolf-white mb-1 hover:text-bolf-neon-blue transition-colors">
                {project.name}
              </h3>
        
        <p className="text-bolf-gray mb-3 text-xs line-clamp-2">
          {project.description}
        </p>

        {/* Platforms */}
        <div className="flex flex-wrap gap-2 mb-4">
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
  );
}

/**
 * Glow Effect Card Style for Team Members
 */
export function GlowTeamMemberCard({
  member,
  onClick,
  roleColor,
  className = '',
}: TeamMemberCardStyleProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Convert roleColor hex to HSL hue for glow effect
  const hexToHue = (hex: string): number => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    if (max === r) h = ((g - b) / (max - min)) * 60;
    else if (max === g) h = ((b - r) / (max - min)) * 60 + 120;
    else h = ((r - g) / (max - min)) * 60 + 240;
    return h < 0 ? h + 360 : h;
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const hue = hexToHue(roleColor);
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--x', `${x}`);
      card.style.setProperty('--y', `${y}`);
      card.style.setProperty('--base', `${hue}`);
      card.style.setProperty('--saturation', '100');
      card.style.setProperty('--lightness', '70');
      card.style.setProperty('--bg-spot-opacity', '0.1');
      card.style.setProperty('--border-spot-opacity', '1');
      card.style.setProperty('--border-light-opacity', '1');
    };

    const handleMouseLeave = () => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', `${rect.width / 2}`);
      card.style.setProperty('--y', `${rect.height / 2}`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    // Initialize center position
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', `${rect.width / 2}`);
    card.style.setProperty('--y', `${rect.height / 2}`);
    card.style.setProperty('--base', `${hue}`);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [roleColor]);

  return (
    <div
      ref={cardRef}
      className={`card-glow-team bg-bolf-black/80 backdrop-blur-md border-2 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${className}`}
      data-glow
      onClick={onClick}
      style={{
        borderColor: `${roleColor}40`,
        '--backdrop': `${roleColor}20`,
        '--backup-border': `${roleColor}40`,
      } as React.CSSProperties}
    >
      <style>{`
        .card-glow-team[data-glow] {
          position: relative;
          --spotlight-size: 150px;
          --x: 50%;
          --y: 50%;
          --base: 210;
          --saturation: 100;
          --lightness: 70;
          --bg-spot-opacity: 0.1;
          --border-spot-opacity: 1;
          --border-light-opacity: 1;
          background-image: radial-gradient(
            var(--spotlight-size) var(--spotlight-size) at
            calc(var(--x) * 1px) calc(var(--y) * 1px),
            hsl(var(--base) var(--saturation)% var(--lightness)% / var(--bg-spot-opacity)),
            transparent
          );
          background-color: var(--backdrop, transparent);
          background-size: 100% 100%;
          background-position: 50% 50%;
        }

        .card-glow-team[data-glow]::before,
        .card-glow-team[data-glow]::after {
          pointer-events: none;
          content: "";
          position: absolute;
          inset: -2px;
          border: 2px solid transparent;
          border-radius: 12px;
          background-size: calc(100% + 4px) calc(100% + 4px);
          background-repeat: no-repeat;
          background-position: 50% 50%;
          mask:
            linear-gradient(transparent, transparent),
            linear-gradient(white, white);
          mask-clip: padding-box, border-box;
          mask-composite: intersect;
          z-index: 1;
        }

        .card-glow-team[data-glow]::before {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
            calc(var(--x) * 1px) calc(var(--y) * 1px),
            hsl(var(--base) var(--saturation)% calc(var(--lightness) - 20)% / var(--border-spot-opacity)),
            transparent 100%
          );
          filter: brightness(2);
        }

        .card-glow-team[data-glow]::after {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
            calc(var(--x) * 1px) calc(var(--y) * 1px),
            hsl(0 100% 100% / var(--border-light-opacity)),
            transparent 100%
          );
        }
      `}</style>

      {/* Avatar */}
      <div className="relative h-32 bg-gradient-to-br from-bolf-neon-blue/10 to-bolf-orange/10 overflow-hidden">
        <div
          className="absolute inset-0 border-b-4 transition-all duration-300"
          style={{ borderColor: roleColor }}
        />
        <img
          src={member.avatar}
          alt={member.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
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
          className="text-lg font-bold mb-1 hover:scale-105 transition-transform duration-300"
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
    </div>
  );
}
