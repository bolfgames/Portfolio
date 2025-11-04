import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [isPaused, setIsPaused] = useState(false);
  const [resetTimer, setResetTimer] = useState(0);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (projects.length > 0 && !currentProject) {
      setCurrentProject(projects[0]);
      setIsLandscape(projects[0].isLandscape || false);
      setCurrentIndex(0);
    }
  }, [projects, currentProject]);

  const handleProjectChange = useCallback((project: Project) => {
    setCurrentProject(project);
    const index = projects.findIndex(p => p.name === project.name && p.image === project.image);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [projects]);

  const handleLandscapeDetected = useCallback((landscape: boolean) => {
    setIsLandscape(landscape);
  }, []);

  const handlePrevious = useCallback(() => {
    const newIndex = (currentIndex - 1 + projects.length) % projects.length;
    setCurrentIndex(newIndex);
    setCurrentProject(projects[newIndex]);
    // Don't set isLandscape here - let ProjectSlider detect it
    setResetTimer(prev => prev + 1); // Reset timer
  }, [currentIndex, projects]);

  const handleNext = useCallback(() => {
    const newIndex = (currentIndex + 1) % projects.length;
    setCurrentIndex(newIndex);
    setCurrentProject(projects[newIndex]);
    // Don't set isLandscape here - let ProjectSlider detect it
    setResetTimer(prev => prev + 1); // Reset timer
  }, [currentIndex, projects]);

  const togglePause = useCallback(() => {
    setIsPaused(prev => {
      const newPaused = !prev;
      if (newPaused) {
        setResetTimer(prevTimer => prevTimer + 1);
      }
      return newPaused;
    });
  }, []);

  const handleMockupClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mockupRef.current) return;
    
    const rect = mockupRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    
    // Calculate click zones: left 30%, center 40%, right 30%
    const leftZone = width * 0.3;
    const centerZone = width * 0.7;
    
    if (clickX < leftZone) {
      // Left zone: previous
      e.stopPropagation();
      handlePrevious();
    } else if (clickX > centerZone) {
      // Right zone: next
      e.stopPropagation();
      handleNext();
    } else {
      // Center zone: pause/resume
      e.stopPropagation();
      togglePause();
    }
  }, [handlePrevious, handleNext, togglePause]);

  // Helper function to translate project features
  const translateProjectFeature = (feature: string): string => {
    const featureMap: Record<string, string> = {
      'Level-based arcade game inspired by Flappy Bird': 'portfolio.projectFeatures.levelBasedArcadeGame',
      'Boosters system': 'portfolio.projectFeatures.boostersSystem',
      'Character skins and customization': 'portfolio.projectFeatures.characterSkins',
      'Shop system': 'portfolio.projectFeatures.shopSystem',
      'Leaderboard integration': 'portfolio.projectFeatures.leaderboardIntegration',
      'Optimized physics-based gameplay': 'portfolio.projectFeatures.optimizedPhysics',
      'Local multiplayer game': 'portfolio.projectFeatures.localMultiplayerGame',
      'Booster and power-up mechanics': 'portfolio.projectFeatures.boosterPowerUpMechanics',
      'Smooth controls': 'portfolio.projectFeatures.smoothControls',
      'Responsive visual and sound effects': 'portfolio.projectFeatures.responsiveVisualSound',
      'Professional game development': 'portfolio.projectFeatures.professionalGameDev',
      'Shine effects implementation': 'portfolio.projectFeatures.shineEffects',
      'ColorBlind mode': 'portfolio.projectFeatures.colorBlindMode',
      'Custom animations and UI': 'portfolio.projectFeatures.customAnimationsUI',
      'Backend-controlled systems': 'portfolio.projectFeatures.backendControlledSystems',
      'A/B testing integration': 'portfolio.projectFeatures.abTestingIntegration',
      'DOTween for effects (crash and camera shaking)': 'portfolio.projectFeatures.dotweenEffects',
      'AudioManager': 'portfolio.projectFeatures.audioManager',
      'PathFollower system integrated': 'portfolio.projectFeatures.pathFollowerSystem',
      'UnityAction as Signals': 'portfolio.projectFeatures.unityActionSignals',
      'Touch Input system': 'portfolio.projectFeatures.touchInputSystem',
      'Object Pooling': 'portfolio.projectFeatures.objectPooling',
      'Singleton': 'portfolio.projectFeatures.singleton',
      'Cinemachine for camera': 'portfolio.projectFeatures.cinemachineCamera',
      'Scriptable Object (Vehicle, Weapon, Level Datas)': 'portfolio.projectFeatures.scriptableObjectVehicle',
      'Boosters and Shop system': 'portfolio.projectFeatures.boostersShopSystem',
      'PlayFab integrated for leaderboard': 'portfolio.projectFeatures.playFabLeaderboard',
      'Vibration integrated': 'portfolio.projectFeatures.vibrationIntegrated',
      'Safe Areas Handler for iPhone notch issue': 'portfolio.projectFeatures.safeAreasHandler',
      'Scriptable Object for levels': 'portfolio.projectFeatures.scriptableObjectLevels',
      'WorldSpace Canvas for tutorial': 'portfolio.projectFeatures.worldSpaceCanvas',
      'Interface (IDamageable)': 'portfolio.projectFeatures.interfaceIDamageable',
      'Grid system': 'portfolio.projectFeatures.gridSystem',
      'Post-process': 'portfolio.projectFeatures.postProcess',
      'Multiplayer mode with Photon': 'portfolio.projectFeatures.photonMultiplayer',
      'Create room, join and edit game settings': 'portfolio.projectFeatures.createRoomJoin',
      'Firebase to save datas': 'portfolio.projectFeatures.firebaseSaveDatas',
      'Infinity looping background UI': 'portfolio.projectFeatures.infinityLoopingUI',
      'Firebase for login and leaderboard system': 'portfolio.projectFeatures.firebaseLoginLeaderboard',
      'Clue system': 'portfolio.projectFeatures.clueSystem',
      'Level system': 'portfolio.projectFeatures.levelSystem',
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

  // Helper function to translate project names
  const translateProjectName = (name: string): string => {
    const nameMap: Record<string, string> = {
      'the Birdie': 'portfolio.projectNames.theBirdie',
      'Bomberman': 'portfolio.projectNames.bomberman',
      'Bus Jam': 'portfolio.projectNames.busJam',
      'ParkingJam3D Clone': 'portfolio.projectNames.parkingJam3D',
      'BattleWheelsMayhemArena': 'portfolio.projectNames.battleWheels',
      'MatchTile': 'portfolio.projectNames.matchTile',
      'Buildopolis': 'portfolio.projectNames.buildopolis',
      'VictoryDawn': 'portfolio.projectNames.victoryDawn',
      'Claw of Vengeance': 'portfolio.projectNames.clawOfVengeance',
      'Revolt of the Exiles': 'portfolio.projectNames.revoltOfExiles',
      'Stack Diamonds': 'portfolio.projectNames.stackDiamonds',
      'ISH - Mad Libs': 'portfolio.projectNames.ishMadLibs',
      'Crypto Jumper': 'portfolio.projectNames.cryptoJumper',
      'Sloppy Jelly': 'portfolio.projectNames.sloppyJelly',
      'Space Blizzard': 'portfolio.projectNames.spaceBlizzard',
      'Crypto Ball': 'portfolio.projectNames.cryptoBall',
      'Multi Merge': 'portfolio.projectNames.multiMerge',
      'Laser Defender': 'portfolio.projectNames.laserDefender',
      'Save The Villagers': 'portfolio.projectNames.saveTheVillagers',
      'Argon Assault Ships': 'portfolio.projectNames.argonAssaultShips',
      'Basic Blocks': 'portfolio.projectNames.basicBlocks',
      'Wizard Guesser': 'portfolio.projectNames.wizardGuesser',
      'Math Game': 'portfolio.projectNames.mathGame',
      'Breaking Blocks': 'portfolio.projectNames.breakingBlocks',
      'TileVania': 'portfolio.projectNames.tileVania',
    };
    
    const key = nameMap[name];
    if (key) {
      try {
        const translated = t(key);
        if (translated && translated !== key) {
          return translated;
        }
      } catch {}
    }
    return name;
  };

  // Helper function to translate links
  const translateLink = (link: string): string => {
    const linkMap: Record<string, string> = {
      'Google Play Store': 'portfolio.links.googlePlayStore',
      'App Store / Google Play Store': 'portfolio.links.appStoreGooglePlay',
    };
    
    const key = linkMap[link];
    if (key) {
      try {
        const translated = t(key);
        if (translated && translated !== key) {
          return translated;
        }
      } catch {}
    }
    return link;
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
          {translateProjectName(currentProject.name)}
        </motion.h3>
      )}

      {/* Mockup Container */}
      <div className="relative flex items-center gap-4">
        {/* Previous Arrow - Outside mockup */}
        {projects.length > 1 && (
          <button
            onClick={handlePrevious}
            className="z-30 p-2 rounded-full bg-bolf-black/80 border border-bolf-gray/40 hover:bg-bolf-neon-blue/20 hover:border-bolf-neon-blue transition-all duration-600 ease-in-out"
            aria-label={t('portfolio.previous')}
          >
            <svg className="w-6 h-6 text-bolf-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div className="relative" ref={mockupRef}>
          {/* iPhone Mockup */}
          <div
            className="relative rounded-[45px] shadow-[0_0_2px_2px_rgba(255,255,255,0.1)] border-8 border-zinc-900 transition-all duration-600 ease-in-out w-[280px] h-[600px] max-w-[70vw] max-h-[150vw]"
            style={{
              transform: isLandscape ? 'rotate(90deg)' : 'rotate(0deg)',
              transformOrigin: 'center center',
            }}
          >
              {/* Pause/Resume Button - Top Right */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePause();
                }}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-bolf-black/90 border border-bolf-gray/40 hover:bg-bolf-neon-blue/20 hover:border-bolf-neon-blue transition-all duration-600 ease-in-out backdrop-blur-sm"
                style={{
                  transform: isLandscape ? 'rotate(-90deg)' : 'rotate(0deg)',
                }}
                aria-label={isPaused ? t('portfolio.clickToResume') : t('portfolio.clickToPause')}
              >
                {isPaused ? (
                  <motion.svg
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 text-bolf-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ transform: 'none' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 text-bolf-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ transform: 'none' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </motion.svg>
                )}
              </button>

              {/* Dynamic Island */}
              <div
                className={`absolute top-2 left-1/2 transform -translate-x-1/2 ${
                  isLandscape ? 'w-[90px] h-[22px]' : 'w-[90px] h-[22px]'
                } bg-zinc-900 rounded-full z-20`}
              />

              {/* Border */}
              <div className="absolute -inset-[1px] border-[3px] border-zinc-700 border-opacity-40 rounded-[37px] pointer-events-none" />

              {/* Screen Content with Click Zones */}
              <div className="relative w-full h-full rounded-[37px] overflow-hidden bg-zinc-900/10">
                <div 
                  className="w-full h-full flex items-center justify-center p-2 overflow-auto"
                  onClick={handleMockupClick}
                >
                  {/* Click Zones - Visual Debug (can be removed in production) */}
                  {/* <div className="absolute left-0 top-0 w-[30%] h-full bg-red-500/10 z-40 pointer-events-none" />
                  <div className="absolute left-[30%] top-0 w-[40%] h-full bg-green-500/10 z-40 pointer-events-none" />
                  <div className="absolute right-0 top-0 w-[30%] h-full bg-blue-500/10 z-40 pointer-events-none" /> */}
                  
                  <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
                    <ProjectSlider
                      projects={projects}
                      currentIndex={currentIndex}
                      onProjectChange={handleProjectChange}
                      onIndexChange={setCurrentIndex}
                      onLandscapeDetected={handleLandscapeDetected}
                      isPaused={isPaused}
                      resetTimer={resetTimer}
                      isLandscape={isLandscape}
                      showIndicators={false}
                    />
                  </div>
                </div>
              </div>

              {/* Slider Indicator - Bottom center, counter-rotate to stay upright */}
              <div 
                className="absolute bottom-2 left-1/2 z-30 flex justify-center gap-2"
                style={{
                  transform: isLandscape ? 'translateX(-50%) rotate(-90deg)' : 'translateX(-50%) rotate(0deg)',
                }}
              >
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      const newIndex = index;
                      setCurrentIndex(newIndex);
                      setCurrentProject(projects[newIndex]);
                      setResetTimer(prev => prev + 1);
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

              {/* Pause Indicator - Outside screen content, counter-rotate to stay upright */}
              {isPaused && (
                <div 
                  className="absolute bottom-8 left-1/2 z-30 text-xs text-bolf-gray/60 text-center"
                  style={{
                    transform: isLandscape ? 'translateX(-50%) rotate(-90deg)' : 'translateX(-50%) rotate(0deg)',
                  }}
                >
                  {t('portfolio.paused')}
                </div>
              )}

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
        </div>

        {/* Next Arrow - Outside mockup */}
        {projects.length > 1 && (
          <button
            onClick={handleNext}
            className="z-30 p-2 rounded-full bg-bolf-black/80 border border-bolf-gray/40 hover:bg-bolf-neon-blue/20 hover:border-bolf-neon-blue transition-all duration-600 ease-in-out"
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
                      <span>{translateProjectFeature(feature)}</span>
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
                {currentProject.link ? translateLink(currentProject.link) : t('portfolio.viewLink')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
