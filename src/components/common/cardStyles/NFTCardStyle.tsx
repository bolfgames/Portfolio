import { useEffect } from 'react';
import type { ProjectCardStyleProps, TeamMemberCardStyleProps } from './types';
import { platformService } from '../../../services/platformService';
import Button from '../Button';
import { useI18n } from '../../../contexts/I18nContext';

/**
 * NFT Card Style for Projects
 * Based on nft-card-component
 */
export function NFTProjectCard({
  project,
  isVideoPlaying = false,
  onVideoPlay,
  onVideoEnd,
  onCardClick,
  className = '',
}: ProjectCardStyleProps) {
  const { t, language } = useI18n();

  useEffect(() => {
    platformService.setLanguage(language);
  }, [language]);

  return (
    <div
      className={`nft-card bg-gradient-to-b from-[#1c1038] to-[#0d0519] border border-white/10 rounded-xl overflow-hidden transition-all duration-500 cursor-pointer hover:border-white/40 hover:scale-[1.015] hover:brightness-[1.3] ${className}`}
      onClick={onCardClick}
      style={{
        boxShadow: '0 7px 20px 5px rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(7px)',
        WebkitBackdropFilter: 'blur(7px)',
      }}
    >
      <style>{`
        .nft-card {
          position: relative;
          user-select: none;
        }

        .nft-card::before {
          content: "";
          position: fixed;
          box-shadow: 0 0 100px 40px rgba(255, 255, 255, 0.08);
          top: -10%;
          left: -100%;
          transform: rotate(-45deg);
          height: 60rem;
          transition: 0.7s all;
        }

        .nft-card:hover::before {
          filter: brightness(0.5);
          top: -100%;
          left: 200%;
        }
      `}</style>

      {/* Project Image/Video */}
      <div className="relative w-full h-24 overflow-hidden">
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
            className="w-full h-full object-cover"
            style={{ borderRadius: '0.5rem 0.5rem 0 0' }}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23000" width="400" height="300"/%3E%3Ctext fill="%23fff" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="24"%3EProject Image%3C/text%3E%3C/svg%3E';
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col" style={{ width: '90%', margin: '0 auto' }}>
        <h3 className="text-lg font-bold text-white mb-1">
          {project.name}
        </h3>
        
        <p className="text-[#a89ec9] mb-3 line-clamp-2 text-xs">
          {project.description}
        </p>

        {/* Platforms & Tags Info */}
        <div className="flex justify-between items-center mb-3">
          {/* Platforms */}
          <div className="flex items-center text-[#ee83e5] font-bold text-sm">
            <span className="mr-2">◘</span>
            <div className="flex gap-1">
              {project.platforms.slice(0, 2).map((platform) => (
                <span key={platform} className="text-xs">
                  {platformService.getPlatformIcon(platform)}
                </span>
              ))}
            </div>
          </div>

        </div>

        <hr style={{ width: '100%', border: 'none', borderBottom: '1px solid rgba(136, 136, 136, 0.3)', marginTop: 0 }} />

        {/* Type Badge / Creator */}
        <div className="flex items-center mt-2 mb-2">
          <div className="flex items-center border border-white/10 p-1 mr-2 rounded-full" style={{ boxShadow: 'inset 0 0 0 4px rgba(0, 0, 0, 0.7)' }}>
            {project.type === 'media' ? (
              <span className="text-xs">📺</span>
            ) : (
              <span className="text-xs">🎮</span>
            )}
          </div>
          <p className="text-[#a89ec9] text-xs">
            <span style={{ textDecoration: 'none' }}>{project.type === 'media' ? t('projects.mediaBadge') : 'Game'}</span>
          </p>
        </div>

        {/* CTA Button */}
        <Button
          onClick={(e) => {
            e?.stopPropagation();
            if (project.link) window.open(project.link, '_blank');
          }}
          variant="secondary"
          size="small"
          className="w-full mt-2"
        >
          {t('projects.viewDetails')}
        </Button>
      </div>
    </div>
  );
}

/**
 * NFT Card Style for Team Members
 */
export function NFTTeamMemberCard({
  member,
  onClick,
  roleColor,
  className = '',
}: TeamMemberCardStyleProps) {

  return (
    <div
      className={`nft-card bg-gradient-to-b from-[#1c1038] to-[#0d0519] border border-white/10 rounded-xl overflow-hidden transition-all duration-500 cursor-pointer hover:border-white/40 hover:scale-[1.015] hover:brightness-[1.3] ${className}`}
      onClick={onClick}
      style={{
        boxShadow: `0 7px 20px 5px ${roleColor}30`,
        backdropFilter: 'blur(7px)',
        WebkitBackdropFilter: 'blur(7px)',
        borderColor: `${roleColor}30`,
      }}
    >
      <style>{`
        .nft-card {
          position: relative;
          user-select: none;
        }

        .nft-card::before {
          content: "";
          position: fixed;
          box-shadow: 0 0 100px 40px rgba(255, 255, 255, 0.08);
          top: -10%;
          left: -100%;
          transform: rotate(-45deg);
          height: 60rem;
          transition: 0.7s all;
        }

        .nft-card:hover::before {
          filter: brightness(0.5);
          top: -100%;
          left: 200%;
        }
      `}</style>

      {/* Avatar */}
      <div className="relative w-full h-32 overflow-hidden">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-full h-full object-cover"
          style={{ borderRadius: '0.5rem 0.5rem 0 0' }}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23000" width="300" height="300"/%3E%3Ccircle cx="150" cy="120" r="40" fill="%2300BFFF"/%3E%3Cpath fill="%23000" d="M150 180 L110 240 L190 240 Z"/%3E%3C/svg%3E';
          }}
        />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col" style={{ width: '90%', margin: '0 auto' }}>
        <h3 className="text-lg font-bold mb-1" style={{ color: roleColor }}>
          {member.name}
        </h3>
        
        <p className="mb-1.5 text-xs font-semibold" style={{ color: roleColor }}>
          {member.role}
        </p>

        {member.bio && (
          <p className="text-bolf-gray mb-2 line-clamp-2 text-xs">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );
}

