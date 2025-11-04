import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetPath } from '../../utils/assetPath';
import { useI18n } from '../../contexts/I18nContext';

interface Project {
  name: string;
  image: string;
  features?: string[];
  link?: string;
  linkUrl?: string;
  isLandscape?: boolean;
}

interface ProjectSliderProps {
  projects: Project[];
  currentIndex?: number;
  onProjectChange?: (project: Project) => void;
  onIndexChange?: (index: number) => void;
  onLandscapeDetected?: (isLandscape: boolean) => void;
  isPaused?: boolean;
  resetTimer?: number;
  isLandscape?: boolean;
  showIndicators?: boolean;
}

export default function ProjectSlider({ 
  projects, 
  currentIndex: externalIndex, 
  onProjectChange, 
  onIndexChange, 
  onLandscapeDetected,
  isPaused: externalPaused,
  resetTimer,
  isLandscape: externalIsLandscape,
  showIndicators = true
}: ProjectSliderProps) {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(externalIndex ?? 0);
  const [isPaused, setIsPaused] = useState(externalPaused ?? false);
  const [imageLoading, setImageLoading] = useState(true);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Sync with external index if provided
  useEffect(() => {
    if (externalIndex !== undefined && externalIndex !== currentIndex) {
      setCurrentIndex(externalIndex);
    }
  }, [externalIndex]);

  // Sync with external pause state
  useEffect(() => {
    if (externalPaused !== undefined && externalPaused !== isPaused) {
      setIsPaused(externalPaused);
    }
  }, [externalPaused]);

  // Handle timer reset
  useEffect(() => {
    if (resetTimer !== undefined && resetTimer > 0) {
      // Timer will be reset when interval recreates
      // Clear existing interval to force reset
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [resetTimer]);

  // Auto-advance interval
  useEffect(() => {
    if (projects.length === 0) return;
    if (isPaused) return;
    if (imageLoading) return; // Don't advance while image is loading

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const newIndex = (prev + 1) % projects.length;
        if (onIndexChange) {
          onIndexChange(newIndex);
        }
        return newIndex;
      });
    }, 5000); // 5 saniye

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [projects.length, isPaused, imageLoading, onIndexChange]);

  // Notify project change
  useEffect(() => {
    if (onProjectChange && projects[currentIndex]) {
      onProjectChange(projects[currentIndex]);
    }
  }, [currentIndex, projects, onProjectChange]);

  // Detect landscape orientation on image load
  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageLoading(false);
    
    // Detect landscape
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    const isLandscape = width > 0 && height > 0 && width / height > 1.2;
    
    if (onLandscapeDetected) {
      onLandscapeDetected(isLandscape);
    }
  }, [onLandscapeDetected]);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="600"%3E%3Crect fill="%23222" width="400" height="600"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="20" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3EImage not found%3C/text%3E%3C/svg%3E';
    setImageLoading(false);
  }, []);

  const handleIndexChange = useCallback((newIndex: number) => {
    setImageLoading(true); // Reset loading state when changing project
    setCurrentIndex(newIndex);
    if (onIndexChange) {
      onIndexChange(newIndex);
    }
    // Reset timer by clearing and recreating interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [onIndexChange]);


  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  if (projects.length === 0) {
    return null;
  }

  const currentProject = projects[currentIndex];

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Image Container */}
      <div className="relative w-full flex-1 flex items-center justify-center min-h-0">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="w-8 h-8 border-2 border-bolf-neon-blue border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.img
            ref={imageRef}
            key={`${currentProject.image}-${currentIndex}`}
            src={getAssetPath(`assets/resumes/Furkan/project_images/${currentProject.image}`)}
            alt={currentProject.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: imageLoading ? 0 : 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-contain rounded-lg"
            style={{
              transform: externalIsLandscape ? 'rotate(-90deg)' : 'rotate(0deg)',
              transformOrigin: 'center center',
            }}
            loading="lazy"
            decoding="async"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </AnimatePresence>
      </div>

      {/* Slider Indicator - at bottom */}
      {showIndicators && (
        <div className={`flex justify-center gap-2 ${externalIsLandscape ? 'absolute bottom-2 left-1/2 transform -translate-x-1/2 z-30' : 'mt-auto pt-2 z-20'}`}>
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleIndexChange(index);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-bolf-neon-blue w-8'
                  : 'bg-bolf-gray/40 w-1.5 hover:bg-bolf-gray/60'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Pause Indicator */}
      {showIndicators && isPaused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-xs text-bolf-gray/60 text-center mt-1"
        >
          {t('portfolio.paused')}
        </motion.div>
      )}
    </div>
  );
}
