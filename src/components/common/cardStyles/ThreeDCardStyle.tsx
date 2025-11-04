import { useEffect, useRef } from 'react';
import type { ProjectCardStyleProps, TeamMemberCardStyleProps } from './types';
import { platformService } from '../../../services/platformService';
import Button from '../Button';
import { useI18n } from '../../../contexts/I18nContext';

/**
 * Load Vanilla Tilt library dynamically
 */
const loadVanillaTilt = async (): Promise<any> => {
  if (typeof window !== 'undefined' && (window as any).VanillaTilt) {
    return (window as any).VanillaTilt;
  }

  // Check if script already exists
  const existingScript = document.querySelector('script[src*="vanilla-tilt"]');
  if (existingScript) {
    // Wait a bit for script to load
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if ((window as any).VanillaTilt) {
          clearInterval(checkInterval);
          resolve((window as any).VanillaTilt);
        }
      }, 50);
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve((window as any).VanillaTilt || null);
      }, 2000);
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.0/vanilla-tilt.min.js';
    script.async = true;
    script.onload = () => {
      // Wait a bit for VanillaTilt to be available
      setTimeout(() => {
        if ((window as any).VanillaTilt) {
          resolve((window as any).VanillaTilt);
        } else {
          reject(new Error('VanillaTilt not found after script load'));
        }
      }, 100);
    };
    script.onerror = () => {
      reject(new Error('Failed to load Vanilla Tilt'));
    };
    document.head.appendChild(script);
  });
};

/**
 * 3D Card Style for Projects
 * Based on css-3d-card-with-vanilla-tilt
 */
export function ThreeDProjectCard({
  project,
  isVideoPlaying = false,
  onVideoPlay,
  onVideoEnd,
  onCardClick,
  className = '',
}: ProjectCardStyleProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltInstanceRef = useRef<any>(null);
  const { t, language } = useI18n();
  const cardColor = '#00BFFF'; // Neon blue for projects
  
  // Convert hex to rgba for box-shadow
  const getRgbaForShadow = (hex: string, opacity: number) => {
    if (hex.startsWith('#')) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return `rgba(0, 191, 255, ${opacity})`; // fallback to blue
  };
  
  const cardShadowColor = getRgbaForShadow(cardColor, 0.12);

  useEffect(() => {
    platformService.setLanguage(language);
  }, [language]);

  // Mouse tracking effect (like Card Interaction)
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--x', `${x}`);
      card.style.setProperty('--y', `${y}`);
    };

    const handleMouseLeave = () => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', `${rect.width / 2}`);
      card.style.setProperty('--y', `${rect.height / 2}`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Small delay to ensure card is rendered
    const timer = setTimeout(() => {
      loadVanillaTilt()
        .then((VanillaTilt) => {
          if (!VanillaTilt || !card) return;
          
          // Try different initialization methods
          if (typeof VanillaTilt.init === 'function') {
            try {
              tiltInstanceRef.current = VanillaTilt.init(card, {
                max: 10,
                speed: 500,
                perspective: 1800,
                glare: true,
                'max-glare': 0.1,
                scale: 1.03,
                reset: true,
              });
            } catch (error) {
              console.error('VanillaTilt.init error:', error);
            }
          } else if (typeof VanillaTilt === 'function') {
            try {
              tiltInstanceRef.current = new VanillaTilt(card, {
                max: 10,
                speed: 500,
                perspective: 1800,
                glare: true,
                'max-glare': 0.1,
                scale: 1.03,
                reset: true,
              });
            } catch (error) {
              console.error('VanillaTilt constructor error:', error);
            }
          } else {
            console.error('VanillaTilt is not a valid function or object');
          }
        })
        .catch((error) => {
          console.error('Failed to load or initialize Vanilla Tilt:', error);
        });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (tiltInstanceRef.current) {
        try {
          if (typeof tiltInstanceRef.current.destroy === 'function') {
            tiltInstanceRef.current.destroy();
          } else if (tiltInstanceRef.current.vanillaTilt && typeof tiltInstanceRef.current.vanillaTilt.destroy === 'function') {
            tiltInstanceRef.current.vanillaTilt.destroy();
          }
        } catch (error) {
          console.error('Error destroying VanillaTilt:', error);
        }
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`card-3d bg-bolf-black/90 backdrop-blur-md rounded-3xl overflow-hidden transition-all duration-300 cursor-grab active:cursor-grabbing ${className}`}
      style={{
        backgroundImage: `url(${project.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0 0 0 2px rgba(0, 191, 255, 0.4), 0 0 25px 8px rgba(0, 191, 255, 0.15)',
        transformStyle: 'preserve-3d',
        height: 'auto',
        '--x': '50%',
        '--y': '50%',
        '--card-shadow-color': cardShadowColor,
      } as React.CSSProperties}
      onClick={onCardClick}
    >
      <style>{`
        .card-3d {
          position: relative;
          min-height: 200px;
          height: auto;
          will-change: transform, box-shadow, background-size;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1),
                      box-shadow 0.4s ease-out,
                      background-size 1.5s ease-out;
        }

        @media (min-width: 640px) {
          .card-3d {
            min-height: 300px;
          }
        }

        .card-3d::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--x, 50%) var(--y, 50%),
            rgba(0, 191, 255, 0.4) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 25;
          pointer-events: none;
          border-radius: 1.5rem;
        }

        .card-3d:hover::before {
          opacity: 1;
        }

        .card-3d::after {
          content: "";
          position: fixed;
          box-shadow: 0 0 100px 40px var(--card-shadow-color, rgba(0, 191, 255, 0.12));
          top: -10%;
          left: -100%;
          transform: rotate(-45deg);
          height: 60rem;
          width: 100%;
          transition: 0.7s all;
          pointer-events: none;
          z-index: 0;
        }

        .card-3d:hover::after {
          filter: brightness(0.5);
          top: -100%;
          left: 200%;
        }

        .card-3d:hover {
          box-shadow: 0 0 0 3px rgba(0, 191, 255, 0.6),
                      0 0 35px 12px rgba(0, 191, 255, 0.25);
        }

        .card-3d-inner {
          position: absolute;
          inset: 14px;
          border-radius: 1.375rem;
          pointer-events: none;
          z-index: 10;
          box-shadow: inset 0.5px 0.5px 1.5px rgba(255, 235, 180, 0.6),
                      inset -1px -1px 1px rgba(160, 110, 0, 0.5),
                      inset 3px 3px 6px rgba(0, 0, 0, 0.25);
          transform: translateZ(30px);
          will-change: transform;
          border: 1px solid rgba(0, 191, 255, 0.1);
        }

        .card-3d-content {
          position: absolute;
          inset: 14px;
          border-radius: 1.375rem;
          overflow: visible;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          z-index: 20;
          transform: translateZ(60px);
          will-change: transform;
        }

        .card-3d-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 75%;
          background: linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.75) 50%, transparent 100%);
          pointer-events: none;
          z-index: 10;
          transform: translateZ(5px);
          will-change: transform;
        }
      `}</style>

      <div className="card-3d-inner" />
      <div className="card-3d-gradient" />

      <div className="card-3d-content p-4 sm:p-5 lg:p-7">
        {/* Project Image/Video (for background) */}
        {project.video && !isVideoPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-bolf-black/40 hover:bg-bolf-black/20 transition-colors">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onVideoPlay?.();
              }}
              className="w-16 h-16 rounded-full bg-bolf-neon-blue/80 hover:bg-bolf-neon-blue flex items-center justify-center transition-transform hover:scale-110 z-20 relative"
              style={{ transform: 'translateZ(70px)' }}
              aria-label="Play video"
            >
              <svg className="w-8 h-8 text-bolf-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}

        {project.video && isVideoPlaying && (
          <video
            src={project.video}
            className="absolute inset-0 w-full h-full object-cover"
            controls
            autoPlay
            onEnded={onVideoEnd}
            style={{ transform: 'translateZ(20px)', zIndex: 5 }}
          />
        )}

        {/* Type Badge */}
        {project.type === 'media' && (
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-bolf-orange/85 text-bolf-white text-xs rounded-full font-semibold z-20" style={{ transform: 'translateZ(70px)' }}>
            {t('projects.mediaBadge')}
          </div>
        )}

        {/* Content */}
        <div className="relative z-30 bg-gradient-to-t from-bolf-black/95 via-bolf-black/80 to-transparent" style={{ transform: 'translateZ(25px)', position: 'relative' }}>
                <h3 className="text-lg font-bold text-bolf-white mb-1 hover:text-bolf-neon-blue transition-colors">
                  {project.name}
                </h3>
          
          <p className="text-bolf-gray/80 mb-3 text-xs line-clamp-2">
            {project.description}
          </p>

          {/* Platforms */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.platforms.map((platform) => (
              <span
                key={platform}
                className="inline-flex items-center space-x-1 px-3 py-1 bg-bolf-white/10 backdrop-blur-sm rounded-full text-sm text-bolf-white"
                style={{ transform: 'translateZ(20px)' }}
              >
                <span>{platformService.getPlatformIcon(platform)}</span>
                <span>{platformService.getPlatformDisplayName(platform)}</span>
              </span>
            ))}
          </div>


          {/* CTA Button */}
          <div style={{ transform: 'translateZ(40px)' }}>
            <Button
                onClick={(e) => {
                  e?.stopPropagation();
                  if (project.link) window.open(project.link, '_blank');
                }}
              variant="primary"
              size="small"
              className="w-full sm:w-auto min-w-[190px]"
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
 * 3D Card Style for Team Members
 */
export function ThreeDTeamMemberCard({
  member,
  onClick,
  roleColor,
  className = '',
}: TeamMemberCardStyleProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltInstanceRef = useRef<any>(null);

  // Mouse tracking effect (like Card Interaction)
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--x', `${x}`);
      card.style.setProperty('--y', `${y}`);
    };

    const handleMouseLeave = () => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', `${rect.width / 2}`);
      card.style.setProperty('--y', `${rect.height / 2}`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Small delay to ensure card is rendered
    const timer = setTimeout(() => {
      loadVanillaTilt()
        .then((VanillaTilt) => {
          if (!VanillaTilt || !card) return;
          
          // Try different initialization methods
          if (typeof VanillaTilt.init === 'function') {
            try {
              tiltInstanceRef.current = VanillaTilt.init(card, {
                max: 10,
                speed: 500,
                perspective: 1800,
                glare: true,
                'max-glare': 0.1,
                scale: 1.03,
                reset: true,
              });
            } catch (error) {
              console.error('VanillaTilt.init error:', error);
            }
          } else if (typeof VanillaTilt === 'function') {
            try {
              tiltInstanceRef.current = new VanillaTilt(card, {
                max: 10,
                speed: 500,
                perspective: 1800,
                glare: true,
                'max-glare': 0.1,
                scale: 1.03,
                reset: true,
              });
            } catch (error) {
              console.error('VanillaTilt constructor error:', error);
            }
          } else {
            console.error('VanillaTilt is not a valid function or object');
          }
        })
        .catch((error) => {
          console.error('Failed to load or initialize Vanilla Tilt:', error);
        });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (tiltInstanceRef.current) {
        try {
          if (typeof tiltInstanceRef.current.destroy === 'function') {
            tiltInstanceRef.current.destroy();
          } else if (tiltInstanceRef.current.vanillaTilt && typeof tiltInstanceRef.current.vanillaTilt.destroy === 'function') {
            tiltInstanceRef.current.vanillaTilt.destroy();
          }
        } catch (error) {
          console.error('Error destroying VanillaTilt:', error);
        }
      }
    };
  }, []);

  // Convert roleColor to RGB for rgba
  const getRgbaColor = (color: string, opacity: number) => {
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  };

  const roleColorRgba = getRgbaColor(roleColor, 0.4);
  const roleShadowColor = getRgbaColor(roleColor, 0.12);

  return (
    <div
      ref={cardRef}
      className={`card-3d bg-bolf-black/90 backdrop-blur-md rounded-3xl overflow-hidden transition-all duration-300 cursor-grab active:cursor-grabbing ${className}`}
      style={{
        backgroundImage: `url(${member.avatar})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: `0 0 0 2px ${roleColor}40, 0 0 25px 8px ${roleColor}15`,
        transformStyle: 'preserve-3d',
        height: 'auto',
        '--x': '50%',
        '--y': '50%',
        '--role-color': roleColorRgba,
        '--role-shadow-color': roleShadowColor,
      } as React.CSSProperties}
      onClick={onClick}
    >
      <style>{`
        .card-3d {
          position: relative;
          min-height: 200px;
          height: auto;
          will-change: transform, box-shadow, background-size;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1),
                      box-shadow 0.4s ease-out,
                      background-size 1.5s ease-out;
        }

        @media (min-width: 640px) {
          .card-3d {
            min-height: 300px;
          }
        }

        .card-3d::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--x, 50%) var(--y, 50%),
            var(--role-color, rgba(0, 191, 255, 0.4)) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 25;
          pointer-events: none;
          border-radius: 1.5rem;
        }

        .card-3d:hover::before {
          opacity: 1;
        }

        .card-3d::after {
          content: "";
          position: fixed;
          box-shadow: 0 0 100px 40px var(--role-shadow-color, rgba(0, 191, 255, 0.12));
          top: -10%;
          left: -100%;
          transform: rotate(-45deg);
          height: 60rem;
          width: 100%;
          transition: 0.7s all;
          pointer-events: none;
          z-index: 0;
        }

        .card-3d:hover::after {
          filter: brightness(0.5);
          top: -100%;
          left: 200%;
        }

        .card-3d:hover {
          box-shadow: 0 0 0 3px ${roleColor}60, 0 0 35px 12px ${roleColor}25;
        }

        .card-3d-inner {
          position: absolute;
          inset: 14px;
          border-radius: 1.375rem;
          pointer-events: none;
          z-index: 10;
          box-shadow: inset 0.5px 0.5px 1.5px rgba(255, 235, 180, 0.6),
                      inset -1px -1px 1px rgba(160, 110, 0, 0.5),
                      inset 3px 3px 6px rgba(0, 0, 0, 0.25);
          transform: translateZ(30px);
          will-change: transform;
          border: 1px solid ${roleColor}20;
        }

        .card-3d-content {
          position: absolute;
          inset: 14px;
          border-radius: 1.375rem;
          overflow: visible;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          z-index: 20;
          transform: translateZ(60px);
          will-change: transform;
        }

        .card-3d-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 75%;
          background: linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.75) 50%, transparent 100%);
          pointer-events: none;
          z-index: 10;
          transform: translateZ(5px);
          will-change: transform;
        }
      `}</style>

      <div className="card-3d-inner" />
      <div className="card-3d-gradient" />

      <div className="card-3d-content p-3">
        {/* Content */}
        <div className="relative z-30 bg-gradient-to-t from-bolf-black/95 via-bolf-black/80 to-transparent p-3" style={{ transform: 'translateZ(25px)', position: 'relative' }}>
          <h3
            className="text-lg font-bold mb-1 transition-colors"
            style={{ color: roleColor, transform: 'translateZ(30px)' }}
          >
            {member.name}
          </h3>
          
          <p className="mb-1.5 font-semibold text-xs" style={{ transform: 'translateZ(20px)', color: roleColor }}>
            {member.role}
          </p>

          {member.bio && (
            <p className="text-bolf-gray/80 text-xs line-clamp-2 mb-2" style={{ transform: 'translateZ(20px)' }}>
              {member.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

