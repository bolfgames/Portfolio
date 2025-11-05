import { motion } from 'framer-motion';
import { useI18n } from '../../contexts/I18nContext';

interface SkillsSectionProps {
  skills: string[];
  accentColor?: string;
}

export default function SkillsSection({ skills, accentColor }: SkillsSectionProps) {
  const { t } = useI18n();

  // Helper function to translate skills
  const translateSkill = (skill: string): string => {
    const skillMap: Record<string, string> = {
      'Unity Engine': 'portfolio.skillItems.unityEngine',
      'C#': 'portfolio.skillItems.csharp',
      'Git - GitHub': 'portfolio.skillItems.gitGithub',
      'SourceTree': 'portfolio.skillItems.sourceTree',
      'JetBrains Rider': 'portfolio.skillItems.jetbrainsRider',
      'Level Design': 'portfolio.skillItems.levelDesign',
      'Game Design': 'portfolio.skillItems.gameDesign',
      'Narrative Design': 'portfolio.skillItems.narrativeDesign',
      '3D Level Design': 'portfolio.skillItems.3dLevelDesign',
      'Environment Design': 'portfolio.skillItems.environmentDesign',
      'Karakter Tasarımı': 'portfolio.skillItems.karakterTasarimi',
      'Konsept Tasarımı': 'portfolio.skillItems.konseptTasarimi',
      '2D Çizim': 'portfolio.skillItems.2dCizim',
    };
    
    const key = skillMap[skill];
    if (key) {
      try {
        const translated = t(key);
        if (translated && translated !== key) {
          return translated;
        }
      } catch {}
    }
    return skill;
  };

  return (
    <section className="mb-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-bolf-white mb-6"
      >
        {t('portfolio.skills')}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap gap-3"
      >
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="px-4 py-2 rounded-full text-bolf-white text-sm md:text-base font-medium"
            style={{
              backgroundColor: accentColor ? `${accentColor}33` : 'rgba(0, 191, 255, 0.2)',
              border: `1px solid ${accentColor ? `${accentColor}4D` : 'rgba(0, 191, 255, 0.3)'}`,
            }}
          >
            {translateSkill(skill)}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
