import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAssetPath } from '../../utils/assetPath';
import { useI18n } from '../../contexts/I18nContext';
import './SteamStyleProject.css';

interface SteamProject {
  name: string;
  images: string[];
  features?: string[];
  link?: string;
  linkUrl?: string;
  videoUrl?: string;
  landscapeScale?: number;
  portraitScale?: number;
}

interface SteamStyleProjectProps {
  project: SteamProject;
  accentColor?: string;
  imageBasePath?: string;
}

export default function SteamStyleProject({ project, accentColor = '#2ECC71', imageBasePath = 'assets/resumes/Emir/project_images' }: SteamStyleProjectProps) {
  const { t } = useI18n();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [clickedVideoIndex, setClickedVideoIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // If videoUrl exists, it's the first "image"
  const hasVideo = !!project.videoUrl;
  const displayItems = hasVideo 
    ? [{ type: 'video', url: project.videoUrl } as const, ...project.images.map(img => ({ type: 'image', src: img } as const))]
    : project.images.map(img => ({ type: 'image', src: img } as const));

  // Get correct image base path - Gloveffect uses Emir's images
  const getImageBasePath = () => {
    if (project.name === 'Gloveffect') {
      return 'assets/resumes/Emir/project_images';
    }
    return imageBasePath;
  };

  const handleThumbnailClick = (index: number) => {
    const item = displayItems[index];
    
    // If clicking on video thumbnail, start playing immediately
    if (item.type === 'video') {
      setSelectedIndex(index);
      setClickedVideoIndex(index);
      setIsVideoPlaying(true);
    } else {
      setSelectedIndex(index);
      setClickedVideoIndex(null);
      setIsVideoPlaying(false);
    }
  };

  const handlePrev = () => {
    const newIndex = selectedIndex === 0 ? displayItems.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    // Reset video playing when switching to different item
    setClickedVideoIndex(null);
    setIsVideoPlaying(false);
  };

  const handleNext = () => {
    const newIndex = (selectedIndex + 1) % displayItems.length;
    setSelectedIndex(newIndex);
    // Reset video playing when switching to different item
    setClickedVideoIndex(null);
    setIsVideoPlaying(false);
  };

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 200;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string, autoplay: boolean = false) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    if (!videoId) return null;
    return autoplay 
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
      : `https://www.youtube.com/embed/${videoId}?rel=0`;
  };

  const getYouTubeThumbnailUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  // When selectedIndex changes via prev/next, reset video if it's a video
  // But preserve video playing state if user clicked thumbnail
  useEffect(() => {
    const item = displayItems[selectedIndex];
    if (item && item.type === 'video') {
      // Only reset if this wasn't a thumbnail click
      if (clickedVideoIndex !== selectedIndex) {
        setIsVideoPlaying(false);
      }
    } else {
      // Not a video, reset everything
      setClickedVideoIndex(null);
      setIsVideoPlaying(false);
    }
  }, [selectedIndex, displayItems, clickedVideoIndex]);

  const currentItem = displayItems[selectedIndex];
  const embedUrl = currentItem.type === 'video' && currentItem.url ? getYouTubeEmbedUrl(currentItem.url, isVideoPlaying) : null;
  const thumbnailUrl = currentItem.type === 'video' && currentItem.url ? getYouTubeThumbnailUrl(currentItem.url) : null;

  // Helper function to translate features
  const translateFeature = (feature: string): string => {
    const featureMap: Record<string, string> = {
      'Level Design': 'portfolio.projectFeatures.levelDesign',
      'Game Design': 'portfolio.projectFeatures.gameDesign',
      'Narrative Design': 'portfolio.projectFeatures.narrativeDesign',
      '3D Level Design': 'portfolio.projectFeatures.3dLevelDesign',
      'Environment Design': 'portfolio.projectFeatures.environmentDesign',
      'Environment creation': 'portfolio.projectFeatures.environmentCreation',
      'Gameplay mechanics design': 'portfolio.projectFeatures.gameplayMechanicsDesign',
      'Prototype development': 'portfolio.projectFeatures.prototypeDevelopment',
      'FPS gameplay mechanics': 'portfolio.projectFeatures.fpsGameplayMechanics',
      'TPS gameplay mechanics': 'portfolio.projectFeatures.tpsGameplayMechanics',
      'Unity Development': 'portfolio.projectFeatures.unityDevelopment',
      'Unity Geliştirme': 'portfolio.projectFeatures.unityDevelopment',
      'Oyun Tasarımı': 'portfolio.projectFeatures.gameDesign',
      'C# Programming': 'portfolio.projectFeatures.csharpProgramming',
      'C# Programlama': 'portfolio.projectFeatures.csharpProgramming',
    };
    
    const key = featureMap[feature];
    if (key) {
      try {
        const translated = t(key);
        if (translated && translated !== key) {
          return translated;
        }
      } catch {}
    }
    return feature;
  };

  return (
    <div className="steam-style-project">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="steam-project-header"
      >
        <h3 className="steam-project-title" style={{ color: accentColor }}>
          {project.name}
        </h3>
        {project.features && project.features.length > 0 && (
          <div className="steam-project-features">
            {project.features.map((feature, index) => (
              <span key={index} className="steam-feature-tag">
                {translateFeature(feature)}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Main Display Area */}
      <div className="steam-main-display">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="steam-main-content"
          >
            {currentItem.type === 'video' && embedUrl ? (
              <div className="steam-video-container">
                {!isVideoPlaying && thumbnailUrl ? (
                  <div 
                    className="steam-video-thumbnail"
                    onClick={() => {
                      setClickedVideoIndex(selectedIndex);
                      setIsVideoPlaying(true);
                    }}
                    style={{ cursor: 'pointer', position: 'relative', width: '100%', height: '100%' }}
                  >
                    <img
                      src={thumbnailUrl}
                      alt={`${project.name} video thumbnail`}
                      className="steam-video-thumbnail-img"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div 
                      className="steam-video-play-button"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'rgba(0, 0, 0, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `3px solid ${accentColor}`,
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.9)';
                        e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                        e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                      }}
                    >
                      <svg width="40" height="40" fill={accentColor} viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                ) : (
                  <iframe
                    key={`video-${selectedIndex}`}
                    src={embedUrl}
                    title={project.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="steam-video-iframe"
                  />
                )}
              </div>
            ) : (
              <img
                src={getAssetPath(`${getImageBasePath()}/${currentItem.type === 'image' ? currentItem.src : ''}`)}
                alt={`${project.name} - ${selectedIndex + 1}`}
                className="steam-main-image"
                loading="eager"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {displayItems.length > 1 && (
          <>
            <button
              className="steam-nav-btn steam-nav-prev"
              onClick={handlePrev}
              style={{ borderColor: accentColor }}
              aria-label="Previous"
            >
              <ChevronLeft size={24} color={accentColor} />
            </button>
            <button
              className="steam-nav-btn steam-nav-next"
              onClick={handleNext}
              style={{ borderColor: accentColor }}
              aria-label="Next"
            >
              <ChevronRight size={24} color={accentColor} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {displayItems.length > 1 && (
        <div className="steam-thumbnail-container">
          <button
            className="steam-scroll-btn steam-scroll-left"
            onClick={() => scrollThumbnails('left')}
            style={{ borderColor: accentColor }}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} color={accentColor} />
          </button>
          
          <div className="steam-thumbnail-strip" ref={scrollContainerRef}>
            {displayItems.map((item, index) => (
              <button
                key={index}
                className={`steam-thumbnail ${selectedIndex === index ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
                style={{
                  borderColor: selectedIndex === index ? accentColor : 'transparent',
                }}
                aria-label={`View ${item.type === 'video' ? 'video' : `image ${index + 1}`}`}
              >
                {item.type === 'video' ? (
                  <div className="steam-thumbnail-video">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                ) : (
                  <img
                    src={getAssetPath(`${getImageBasePath()}/${item.type === 'image' ? item.src : ''}`)}
                    alt={`${project.name} thumbnail ${index + 1}`}
                    className="steam-thumbnail-image"
                    loading="lazy"
                  />
                )}
              </button>
            ))}
          </div>

          <button
            className="steam-scroll-btn steam-scroll-right"
            onClick={() => scrollThumbnails('right')}
            style={{ borderColor: accentColor }}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} color={accentColor} />
          </button>
        </div>
      )}
    </div>
  );
}

