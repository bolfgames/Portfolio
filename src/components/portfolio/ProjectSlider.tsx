import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetPath } from '../../utils/assetPath';

interface Project {
  name: string;
  image: string;
  description: string;
  details?: string;
  link?: string;
  linkUrl?: string;
  isLandscape?: boolean;
}

interface ProjectSliderProps {
  projects: Project[];
  year: string;
  onProjectChange?: (project: Project) => void;
  onPause?: () => void;
}

export default function ProjectSlider({ projects, year, onProjectChange, onPause }: ProjectSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (projects.length === 0) return;

    if (isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 3500); // 3.5 saniye

    return () => clearInterval(interval);
  }, [projects.length, isPaused]);

  useEffect(() => {
    if (onProjectChange && projects[currentIndex]) {
      onProjectChange(projects[currentIndex]);
    }
  }, [currentIndex, projects, onProjectChange]);

  const handlePause = () => {
    setIsPaused(true);
    
    // Clear existing timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    // Notify parent
    if (onPause) {
      onPause();
    }

    // Resume after 5 seconds
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  // Expose pause function via ref (will be handled by parent)
  useEffect(() => {
    // This will be called from parent if needed
  }, []);

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
      {/* Project Name - shown in mockup */}
      {year && (
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-2xl font-bold text-bolf-white mb-2 text-center"
        >
          {year}
        </motion.h2>
      )}
      
      <AnimatePresence mode="wait">
        <motion.h3
          key={`${currentProject.name}-${currentIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-sm md:text-base font-semibold text-bolf-white mb-2 text-center"
        >
          {currentProject.name}
        </motion.h3>
      </AnimatePresence>

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
        
        {/* Click on image to pause - overlay */}
        <div
          className="absolute inset-0 cursor-pointer z-10"
          onClick={(e) => {
            e.stopPropagation();
            handlePause();
          }}
          title="Click to pause"
        />
      </div>

      {/* Slider Indicator - at bottom */}
      <div className="flex justify-center gap-2 mt-auto pt-2 relative z-20">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
              handlePause();
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
          Paused
        </motion.div>
      )}
    </div>
  );
}

