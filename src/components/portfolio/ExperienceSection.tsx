import { motion } from 'framer-motion';
import { useI18n } from '../../contexts/I18nContext';

interface Experience {
  company: string;
  position: string;
  period: string;
  projects: Array<{
    name: string;
    description: string;
    features?: string[];
    link?: string;
    linkUrl?: string;
  }>;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const { t } = useI18n();

  // Helper function to translate company names
  const translateCompany = (company: string): string => {
    const companyMap: Record<string, string> = {
      'BOLF Games': 'portfolio.companies.bolfGames',
      'Freelance': 'portfolio.companies.freelance',
      'Rollic': 'portfolio.companies.rollic',
      'RATIC': 'portfolio.companies.ratic',
    };
    
    const key = companyMap[company];
    if (key) {
      try {
        const translated = t(key);
        if (translated && translated !== key) {
          return translated;
        }
      } catch {}
    }
    return company;
  };

  // Helper function to translate positions
  const translatePosition = (position: string): string => {
    if (position.includes('Unity Game Developer')) {
      try {
        const translated = t('portfolio.positions.unityGameDeveloper');
        if (translated && translated !== 'portfolio.positions.unityGameDeveloper') {
          return translated;
        }
      } catch {}
    }
    return position;
  };

  // Helper function to translate descriptions
  const translateDescription = (description: string): string => {
    const descMap: Record<string, string> = {
      'Level-based arcade game inspired by Flappy Bird': 'portfolio.projectDescriptions.levelBasedArcade',
      'Local multiplayer for touch tables': 'portfolio.projectDescriptions.localMultiplayer',
      'Digital board game for touch tables': 'portfolio.projectDescriptions.digitalBoardGame',
      'With power-ups for touch tables': 'portfolio.projectDescriptions.powerUps',
      'Local multiplayer with boosters': 'portfolio.projectDescriptions.localMultiplayerBoosters',
      'Contributed to feature development': 'portfolio.projectDescriptions.contributedFeatureDevelopment',
      'Developed various Unity games using C#, implementing diverse mechanics and gameplay systems': 'portfolio.projectDescriptions.developedVariousGames',
    };
    
    const key = descMap[description];
    if (key) {
      try {
        const translated = t(key);
        if (translated && translated !== key) {
          return translated;
        }
      } catch {}
    }
    return description;
  };

  return (
    <section className="mb-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-bolf-white mb-8"
      >
        {t('portfolio.experience')}
      </motion.h2>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={`${exp.company}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-bolf-black/50 border border-bolf-gray/20 rounded-lg p-6"
          >
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-bolf-neon-blue mb-2">
                {translateCompany(exp.company)}
              </h3>
              <p className="text-lg text-bolf-gray mb-1">{translatePosition(exp.position)}</p>
              <p className="text-sm text-bolf-gray/70">{exp.period}</p>
            </div>

            <div className="space-y-4">
              {exp.projects.map((project, pIndex) => (
                <div key={`${project.name}-${pIndex}`} className="ml-4">
                  <h4 className="text-xl font-semibold text-bolf-white mb-2">
                    {project.name}
                  </h4>
                  <p className="text-bolf-gray/80 mb-2">{translateDescription(project.description)}</p>
                  
                  {project.features && project.features.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-bolf-gray/70 ml-4">
                      {project.features.map((feature, fIndex) => (
                        <li key={fIndex}>{feature}</li>
                      ))}
                    </ul>
                  )}
                  
                  {project.linkUrl && (
                    <a
                      href={project.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-2 text-bolf-neon-blue hover:text-bolf-orange transition-colors"
                    >
                      {project.link || t('portfolio.viewLink')}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

