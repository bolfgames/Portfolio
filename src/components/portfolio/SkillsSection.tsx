import { motion } from 'framer-motion';
import { useI18n } from '../../contexts/I18nContext';

interface SkillsSectionProps {
  skills: string[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const { t } = useI18n();

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
            className="px-4 py-2 bg-bolf-neon-blue/20 border border-bolf-neon-blue/30 rounded-full text-bolf-white text-sm md:text-base font-medium"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}

