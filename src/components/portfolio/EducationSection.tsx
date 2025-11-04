import { motion } from 'framer-motion';
import { useI18n } from '../../contexts/I18nContext';

interface Education {
  degree: string;
  university: string;
  faculty?: string;
  period: string;
  location: string;
}

interface EducationSectionProps {
  education: Education;
}

export default function EducationSection({ education }: EducationSectionProps) {
  const { t } = useI18n();

  // Try to get translated values, fallback to JSON values
  const getTranslatedDegree = () => {
    try {
      const translated = t('portfolio.educationData.degree');
      if (translated && translated !== 'portfolio.educationData.degree') {
        return translated;
      }
    } catch {}
    return education.degree;
  };

  const getTranslatedUniversity = () => {
    try {
      const translated = t('portfolio.educationData.university');
      if (translated && translated !== 'portfolio.educationData.university') {
        return translated;
      }
    } catch {}
    return education.university;
  };

  const getTranslatedFaculty = () => {
    if (!education.faculty) return '';
    try {
      const translated = t('portfolio.educationData.faculty');
      if (translated && translated !== 'portfolio.educationData.faculty') {
        return translated;
      }
    } catch {}
    return education.faculty;
  };

  const getTranslatedPeriod = () => {
    const periodMap: Record<string, string> = {
      '2019-2024': 'portfolio.periods.2019-2024',
    };
    
    const key = periodMap[education.period];
    if (key) {
      try {
        const translated = t(key);
        if (translated && translated !== key) {
          return translated;
        }
      } catch {}
    }
    return education.period;
  };

  const getTranslatedLocation = () => {
    const locationMap: Record<string, string> = {
      'Istanbul, Türkiye': 'portfolio.locations.istanbulTurkey',
      'Ankara, Türkiye': 'portfolio.locations.ankaraTurkey',
    };
    
    const key = locationMap[education.location];
    if (key) {
      try {
        const translated = t(key);
        if (translated && translated !== key) {
          return translated;
        }
      } catch {}
    }
    return education.location;
  };

  return (
    <section className="mb-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-bolf-white mb-6"
      >
        {t('portfolio.education')}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-bolf-black/50 border border-bolf-gray/20 rounded-lg p-6"
      >
        <h3 className="text-2xl font-bold text-bolf-neon-blue mb-2">
          {getTranslatedDegree()}
        </h3>
        <p className="text-lg text-bolf-gray mb-1">
          {getTranslatedUniversity()}
          {getTranslatedFaculty() && `, ${getTranslatedFaculty()}`}
        </p>
        <p className="text-sm text-bolf-gray/70 mb-2">
          {getTranslatedPeriod()} · {getTranslatedLocation()}
        </p>
      </motion.div>
    </section>
  );
}
