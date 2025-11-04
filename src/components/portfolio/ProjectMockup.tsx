import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectSlider from './ProjectSlider';
import { useI18n } from '../../contexts/I18nContext';

interface Project {
  name: string;
  image: string;
  features?: string[];
  link?: string;
  linkUrl?: string;
  isLandscape?: boolean;
}

interface ProjectMockupProps {
  year: string;
  projects: Project[];
}

export default function ProjectMockup({ year, projects }: ProjectMockupProps) {
  const { t } = useI18n();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isLandscape, setIsLandscape] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (projects.length > 0 && !currentProject) {
      setCurrentProject(projects[0]);
      setIsLandscape(projects[0].isLandscape || false);
      setCurrentIndex(0);
    }
  }, [projects, currentProject]);

  const handleProjectChange = (project: Project) => {
    setCurrentProject(project);
    setIsLandscape(project.isLandscape || false);
    const index = projects.findIndex(p => p.name === project.name && p.image === project.image);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + projects.length) % projects.length;
    setCurrentIndex(newIndex);
    setCurrentProject(projects[newIndex]);
    setIsLandscape(projects[newIndex].isLandscape || false);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % projects.length;
    setCurrentIndex(newIndex);
    setCurrentProject(projects[newIndex]);
    setIsLandscape(projects[newIndex].isLandscape || false);
  };

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center mb-16">
      {/* Year Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold text-bolf-white mb-6 text-center"
      >
        {year}
      </motion.h2>

      {/* Project Name - Outside Mockup */}
      {currentProject && (
        <motion.h3
          key={`${currentProject.name}-${currentIndex}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl md:text-2xl font-bold text-bolf-white mb-4 text-center"
        >
          {currentProject.name}
        </motion.h3>
      )}

      {/* Mockup Container */}
      <div className="relative flex items-center gap-4">
        {/* Previous Arrow */}
        {projects.length > 1 && (
          <button
            onClick={handlePrevious}
            className="z-30 p-2 rounded-full bg-bolf-black/80 border border-bolf-gray/40 hover:bg-bolf-neon-blue/20 hover:border-bolf-neon-blue transition-all duration-300"
            aria-label={t('portfolio.previous')}
          >
            <svg className="w-6 h-6 text-bolf-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div className="relative">
          <motion.div
            animate={{
              rotateY: isLandscape ? 90 : 0,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
            }}
            className="perspective-1000"
            style={{
              perspective: '1000px',
            }}
          >
            {/* iPhone Mockup */}
            <div
              className={`relative ${
                isLandscape
                  ? 'w-[600px] h-[300px] max-w-[90vw] max-h-[45vw]'
                  : 'w-[280px] h-[600px] max-w-[70vw] max-h-[150vw]'
              } rounded-[45px] shadow-[0_0_2px_2px_rgba(255,255,255,0.1)] border-8 border-zinc-900`}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Dynamic Island */}
              <div
                className={`absolute top-2 left-1/2 transform -translate-x-1/2 ${
                  isLandscape ? 'w-[90px] h-[22px]' : 'w-[90px] h-[22px]'
                } bg-zinc-900 rounded-full z-20`}
              />

              {/* Border */}
              <div className="absolute -inset-[1px] border-[3px] border-zinc-700 border-opacity-40 rounded-[37px] pointer-events-none" />

              {/* Screen Content */}
              <div className="relative w-full h-full rounded-[37px] overflow-hidden bg-zinc-900/10">
                <div 
                  className="w-full h-full flex items-center justify-center p-2 overflow-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="w-full h-full">
                    <ProjectSlider
                      projects={projects}
                      currentIndex={currentIndex}
                      onProjectChange={handleProjectChange}
                      onIndexChange={setCurrentIndex}
                    />
                  </div>
                </div>
              </div>

              {/* Left Side Buttons */}
              {!isLandscape && (
                <>
                  {/* Silent Switch */}
                  <div className="absolute left-[-12px] top-20 w-[6px] h-8 bg-zinc-900 rounded-l-md shadow-md" />
                  {/* Volume Up */}
                  <div className="absolute left-[-12px] top-36 w-[6px] h-12 bg-zinc-900 rounded-l-md shadow-md" />
                  {/* Volume Down */}
                  <div className="absolute left-[-12px] top-52 w-[6px] h-12 bg-zinc-900 rounded-l-md shadow-md" />
                </>
              )}

              {/* Right Side Button (Power) */}
              {!isLandscape && (
                <div className="absolute right-[-12px] top-36 w-[6px] h-16 bg-zinc-900 rounded-r-md shadow-md" />
              )}

              {/* Top/Bottom Buttons for Landscape */}
              {isLandscape && (
                <>
                  <div className="absolute left-[-12px] top-1/2 transform -translate-y-1/2 w-[6px] h-12 bg-zinc-900 rounded-l-md shadow-md" />
                  <div className="absolute right-[-12px] top-1/2 transform -translate-y-1/2 w-[6px] h-12 bg-zinc-900 rounded-r-md shadow-md" />
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Next Arrow */}
        {projects.length > 1 && (
          <button
            onClick={handleNext}
            className="z-30 p-2 rounded-full bg-bolf-black/80 border border-bolf-gray/40 hover:bg-bolf-neon-blue/20 hover:border-bolf-neon-blue transition-all duration-300"
            aria-label={t('portfolio.next')}
          >
            <svg className="w-6 h-6 text-bolf-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Project Details Below Mockup */}
      {currentProject && (
        <motion.div
          key={`${currentProject.name}-details-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-2xl w-full px-4"
        >
          <div className="bg-bolf-black/50 border border-bolf-gray/20 rounded-lg p-6">
            {currentProject.features && currentProject.features.length > 0 && (
              <>
                <h4 className="text-lg font-semibold text-bolf-white mb-3">{t('portfolio.features')}</h4>
                <ul className="space-y-2 mb-4">
                  {currentProject.features.map((feature, index) => (
                    <li key={index} className="text-bolf-gray/80 flex items-start">
                      <span className="text-bolf-neon-blue mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            
            {currentProject.linkUrl && (
              <a
                href={currentProject.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-bolf-neon-blue hover:text-bolf-orange transition-colors"
              >
                {currentProject.link || t('portfolio.viewLink')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </motion.div>
      )}

      {/* Click to Pause Hint */}
      <p className="text-xs text-bolf-gray/60 mt-4 text-center">
        {t('portfolio.clickToPause')}
      </p>
    </div>
  );
}
