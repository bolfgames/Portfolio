import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetPath } from '../../utils/assetPath';

interface LaptopProject {
  name: string;
  images: string[];
  features?: string[];
  link?: string;
  linkUrl?: string;
}

interface LaptopSliderProps {
  projects: LaptopProject[];
  currentIndex?: number;
  onProjectChange?: (project: LaptopProject) => void;
  onIndexChange?: (index: number) => void;
  onImageIndexChange?: (imageIndex: number) => void;
  isPaused?: boolean;
  resetTimer?: number;
  showIndicators?: boolean;
}

export default function LaptopSlider({ 
  projects, 
  currentIndex: externalIndex, 
  onProjectChange, 
  onIndexChange,
  onImageIndexChange,
  isPaused: externalPaused,
  resetTimer,
  showIndicators = true
}: LaptopSliderProps) {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(externalIndex ?? 0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(externalPaused ?? false);
  const [imageLoading, setImageLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Sync with external index if provided
  useEffect(() => {
    if (externalIndex !== undefined && externalIndex !== currentProjectIndex) {
      setCurrentProjectIndex(externalIndex);
      setCurrentImageIndex(0); // Reset image index when project changes
    }
  }, [externalIndex, currentProjectIndex]);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentProjectIndex]);

  // Sync with external pause state
  useEffect(() => {
    if (externalPaused !== undefined && externalPaused !== isPaused) {
      setIsPaused(externalPaused);
    }
  }, [externalPaused, isPaused]);

  // Handle timer reset
  useEffect(() => {
    if (resetTimer !== undefined && resetTimer > 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [resetTimer]);

  // Auto-advance images every 3 seconds
  useEffect(() => {
    if (projects.length === 0) return;
    if (isPaused) return;
    if (imageLoading) return;

    const currentProject = projects[currentProjectIndex];
    if (!currentProject || currentProject.images.length === 0) return;

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const nextIndex = (prev + 1) % currentProject.images.length;
        return nextIndex;
      });
    }, 3000); // 3 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [projects, currentProjectIndex, currentImageIndex, isPaused, imageLoading]);

  // Notify project change
  useEffect(() => {
    if (onProjectChange && projects[currentProjectIndex]) {
      onProjectChange(projects[currentProjectIndex]);
    }
  }, [currentProjectIndex, projects, onProjectChange]);

  // Notify index change
  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(currentProjectIndex);
    }
  }, [currentProjectIndex, onIndexChange]);

  // Notify image index change
  useEffect(() => {
    if (onImageIndexChange) {
      onImageIndexChange(currentImageIndex);
    }
  }, [currentImageIndex, onImageIndexChange]);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23222" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="20" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3EImage not found%3C/text%3E%3C/svg%3E';
    setImageLoading(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (projects.length === 0) {
    return null;
  }

  const currentProject = projects[currentProjectIndex];
  if (!currentProject || currentProject.images.length === 0) {
    return null;
  }

  const currentImage = currentProject.images[currentImageIndex];

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Image Container */}
      <div className="relative flex-1 flex items-center justify-center min-h-0 overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="w-8 h-8 border-2 border-bolf-neon-blue border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.img
            ref={imageRef}
            key={`${currentProject.name}-${currentImageIndex}-${currentImage}`}
            src={getAssetPath(`assets/resumes/Emir/project_images/${currentImage}`)}
            alt={`${currentProject.name} - ${currentImageIndex + 1}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: imageLoading ? 0 : 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="object-contain rounded-lg w-full h-full"
            loading="lazy"
            decoding="async"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </AnimatePresence>
      </div>

      {/* Slider Indicator - at bottom */}
      {showIndicators && currentProject.images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {currentProject.images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex
                  ? 'bg-bolf-neon-blue w-6'
                  : 'bg-bolf-gray/50 hover:bg-bolf-gray/70'
              }`}
              onClick={() => {
                setCurrentImageIndex(index);
                setImageLoading(true);
              }}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

