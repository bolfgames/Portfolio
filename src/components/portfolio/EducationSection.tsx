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
  accentColor?: string;
}

export default function EducationSection({ education, accentColor }: EducationSectionProps) {
  const { t } = useI18n();

  // Try to get translated values, fallback to JSON values
  const getTranslatedDegree = () => {
    // Check if this is Ata Cem's education
    if (education.degree === 'Çizgi Film ve Animasyon') {
      try {
        const translated = t('portfolio.educationData.ataCemDegree');
        if (translated && translated !== 'portfolio.educationData.ataCemDegree') {
          return translated;
        }
      } catch {}
    }
    // Check if this is Ahmet Emir's or Emir's education
    if (education.degree === 'Dijital Oyun Tasarımı Lisansı') {
      try {
        const translated = t('portfolio.educationData.degree');
        if (translated && translated !== 'portfolio.educationData.degree') {
          return translated;
        }
      } catch {}
    }
    return education.degree;
  };

  const getTranslatedUniversity = () => {
    // Check if this is Ata Cem's education
    if (education.university === 'İstanbul Aydın Üniversitesi') {
      try {
        const translated = t('portfolio.educationData.ataCemUniversity');
        if (translated && translated !== 'portfolio.educationData.ataCemUniversity') {
          return translated;
        }
      } catch {}
    }
    // Check if this is Ahmet Emir's or Emir's education
    if (education.university === 'İstanbul Bilgi Üniversitesi') {
      try {
        const translated = t('portfolio.educationData.university');
        if (translated && translated !== 'portfolio.educationData.university') {
          return translated;
        }
      } catch {}
    }
    return education.university;
  };

  const getTranslatedFaculty = () => {
    if (!education.faculty) return '';
    // Check if this is Ata Cem's education
    if (education.faculty === 'Güzel Sanatlar Fakültesi') {
      try {
        const translated = t('portfolio.educationData.ataCemFaculty');
        if (translated && translated !== 'portfolio.educationData.ataCemFaculty') {
          return translated;
        }
      } catch {}
    }
    // Check if this is Ahmet Emir's or Emir's education
    if (education.faculty === 'İletişim Fakültesi') {
      try {
        const translated = t('portfolio.educationData.faculty');
        if (translated && translated !== 'portfolio.educationData.faculty') {
          return translated;
        }
      } catch {}
    }
    return education.faculty;
  };

  const getTranslatedPeriod = () => {
    // Always use the JSON value directly
    return education.period;
  };

  const getTranslatedLocation = () => {
    // Always use the JSON value directly
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
        <h3 className="text-2xl font-bold mb-2" style={{ color: accentColor || '#00BFFF' }}>
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
