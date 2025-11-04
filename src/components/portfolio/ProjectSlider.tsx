import { useState, useEffect, useRef } from 'react';
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
  onPause?: () => void;
}

export default function ProjectSlider({ projects, currentIndex: externalIndex, onProjectChange, onIndexChange, onPause }: ProjectSliderProps) {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(externalIndex ?? 0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastClickTimeRef = useRef<number>(0);

  // Sync with external index if provided
  useEffect(() => {
    if (externalIndex !== undefined && externalIndex !== currentIndex) {
      setCurrentIndex(externalIndex);
    }
  }, [externalIndex, currentIndex]);

  useEffect(() => {
    if (projects.length === 0) return;

    if (isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const newIndex = (prev + 1) % projects.length;
        if (onIndexChange) {
          onIndexChange(newIndex);
        }
        return newIndex;
      });
    }, 3500); // 3.5 saniye

    return () => clearInterval(interval);
  }, [projects.length, isPaused, onIndexChange]);

  useEffect(() => {
    if (onProjectChange && projects[currentIndex]) {
      onProjectChange(projects[currentIndex]);
    }
  }, [currentIndex, projects, onProjectChange]);

  const handleIndexChange = (newIndex: number) => {
    setCurrentIndex(newIndex);
    if (onIndexChange) {
      onIndexChange(newIndex);
    }
  };

  const handleClick = () => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTimeRef.current;
    
    if (isPaused && timeSinceLastClick > 300) {
      // Resume if paused
      setIsPaused(false);
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
    } else {
      // Pause if not paused
      setIsPaused(true);
      
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }

      if (onPause) {
        onPause();
      }

      pauseTimeoutRef.current = setTimeout(() => {
        setIsPaused(false);
      }, 5000);
    }
    
    lastClickTimeRef.current = now;
  };

  useEffect(() => {
    return () => {
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
        <AnimatePresence mode="wait">
          <motion.img
            key={`${currentProject.image}-${currentIndex}`}
            src={getAssetPath(`assets/resumes/Furkan/project_images/${currentProject.image}`)}
            alt={currentProject.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-contain rounded-lg"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="600"%3E%3Crect fill="%23222" width="400" height="600"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="20" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3EImage not found%3C/text%3E%3C/svg%3E';
            }}
          />
        </AnimatePresence>
        
        {/* Click on image to pause/resume - overlay */}
        <div
          className="absolute inset-0 cursor-pointer z-10"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          title={isPaused ? t('portfolio.clickToResume') : t('portfolio.clickToPause')}
        />
      </div>

      {/* Slider Indicator - at bottom */}
      <div className="flex justify-center gap-2 mt-auto pt-2 relative z-20">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              handleIndexChange(index);
              handleClick();
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

      {/* Pause Indicator */}
      {isPaused && (
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
