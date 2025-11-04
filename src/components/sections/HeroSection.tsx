import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Button from '../common/Button';
import { useI18n } from '../../contexts/I18nContext';
import { settingsService } from '../../services/settingsService';

/**
 * Hero Section Component - Logo centered with subtle background
 * Follows Single Responsibility Principle
 */
function HeroSection() {
  const { t } = useI18n();
  
  // Get particle settings from settingsService (will update on settings change)
  const [particleCount, setParticleCount] = useState(() => settingsService.getParticleCount());
  const [particleColors, setParticleColors] = useState(() => settingsService.getParticleColors());
  
  // Update particles when settings change (listen to settingsService)
  useEffect(() => {
    const unsubscribe = settingsService.subscribe(() => {
      setParticleCount(settingsService.getParticleCount());
      setParticleColors(settingsService.getParticleColors());
    });

    return unsubscribe;
  }, []);
  
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bolf-black pt-20">
      {/* Subtle Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bolf-neon-blue/5 via-bolf-black to-bolf-orange/5" />
        
        {/* Subtle Particle Animation */}
        <div className="absolute inset-0">
          {Array.from({ length: particleCount }).map((_, i) => {
            // Random position for each particle
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 3;
            const duration = 4 + Math.random() * 2;
            // Random color from available colors
            const randomColor = particleColors[Math.floor(Math.random() * particleColors.length)];
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 3 + 2 + 'px',
                  height: Math.random() * 3 + 2 + 'px',
                  left: `${left}%`,
                  top: `${top}%`,
                  backgroundColor: `${randomColor.value}66`, // 66 = 40% opacity in hex
                }}
                animate={{
                  y: [0, -30 - Math.random() * 20, 0],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.4 + Math.random() * 0.3, 1],
                  x: [0, (Math.random() - 0.5) * 20, 0],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>

        {/* Subtle Geometric Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-bolf-neon-blue/20 rotate-45" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-bolf-orange/20 rotate-12" />
        </div>
      </div>

      {/* Content - Logo Centered */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          {/* Large Logo */}
          <div className="mb-12">
            <img 
              src={getAssetPath('/assets/icons/logo_cropped_by_gunduzdev/fulllogobeyazpng_Çalışma Yüzeyi 1.png')}
              alt="BOLF Games"
              className="h-32 md:h-48 lg:h-64 w-auto mx-auto"
              loading="eager"
              decoding="async"
              onError={(e) => {
                (e.target as HTMLImageElement).src = getAssetPath('/assets/icons/logo_name_transparent/fulllogobznpng_Çalışma Yüzeyi 1.png');
              }}
            />
          </div>
          
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-bolf-gray/80 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t('hero.tagline')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Button onClick={scrollToProjects} variant="primary" size="large">
              {t('hero.cta')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;

