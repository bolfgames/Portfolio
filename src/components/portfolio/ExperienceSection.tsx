import { motion } from 'framer-motion';
import { useI18n } from '../../contexts/I18nContext';

interface Experience {
  company: string;
  position: string;
  period?: string;
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
  accentColor?: string;
}

export default function ExperienceSection({ experiences, accentColor }: ExperienceSectionProps) {
  const { t } = useI18n();

  // Helper function to translate company names
  const translateCompany = (company: string): string => {
    const companyMap: Record<string, string> = {
      'BOLF Games': 'portfolio.companies.bolfGames',
      'Freelance': 'portfolio.companies.freelance',
      'Rollic': 'portfolio.companies.rollic',
      'RATIC': 'portfolio.companies.ratic',
      'Mezuniyet Projesi': 'portfolio.companies.graduationProject',
      'Graduation Project': 'portfolio.companies.graduationProject',
      'Abschlussprojekt': 'portfolio.companies.graduationProject',
      'Projet de Fin d\'Études': 'portfolio.companies.graduationProject',
      'Proyecto de Graduación': 'portfolio.companies.graduationProject',
      '卒業プロジェクト': 'portfolio.companies.graduationProject',
      '毕业项目': 'portfolio.companies.graduationProject',
      'Durih': 'portfolio.companies.durih',
      'Lunscale': 'portfolio.companies.lunscale',
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
    if (position.includes('Level Designer')) {
      try {
        const translated = t('portfolio.positions.levelDesigner');
        if (translated && translated !== 'portfolio.positions.levelDesigner') {
          return translated;
        }
      } catch {}
    }
    if (position.includes('2D Tasarımcı') || position.includes('2D Designer')) {
      try {
        const translated = t('portfolio.positions.2dDesigner');
        if (translated && translated !== 'portfolio.positions.2dDesigner') {
          return translated;
        }
      } catch {}
    }
    if (position.includes('Unity Developer & Game Designer') || position === 'Unity Developer & Game Designer') {
      try {
        const translated = t('portfolio.positions.unityDeveloperGameDesigner');
        if (translated && translated !== 'portfolio.positions.unityDeveloperGameDesigner') {
          return translated;
        }
      } catch {}
    }
    return position;
  };

  // Helper function to translate periods
  const translatePeriod = (period: string): string => {
    const periodMap: Record<string, string> = {
      'Sept 2024 – Jan 2025': 'portfolio.periods.sept2024Jan2025',
      'Oct 2024 – Jan 2025': 'portfolio.periods.oct2024Jan2025',
      'July – Sept 2024': 'portfolio.periods.julySept2024',
      '2022-2023': 'portfolio.periods.2022-2023',
      '2019-2024': 'portfolio.periods.2019-2024',
          'Oct 2023 – Current': 'portfolio.periods.oct2023Current',
          'Ekim 2023 – Günümüz': 'portfolio.periods.oct2023Current',
          'Current': 'portfolio.periods.current',
        };
    
    const key = periodMap[period];
    if (key) {
      try {
        const translated = t(key);
        if (translated && translated !== key) {
          return translated;
        }
      } catch {}
    }
    return period;
  };

  // Helper function to translate project names
  const translateProjectName = (name: string): string => {
    const nameMap: Record<string, string> = {
      'the Birdie': 'portfolio.projectNames.theBirdie',
      'Air Hockey': 'portfolio.projectNames.airHockey',
      'Ludo': 'portfolio.projectNames.ludo',
      'Casual Football Game': 'portfolio.projectNames.casualFootballGame',
      'Bomberman-style Game': 'portfolio.projectNames.bombermanStyleGame',
      'Bus Jam': 'portfolio.projectNames.busJam',
      'Multiple 2D and 3D Unity Games': 'portfolio.projectNames.multipleUnityGames',
      'Black Spot': 'portfolio.projectNames.blackSpot',
      'Gloveffect': 'portfolio.projectNames.gloveffect',
      'TPS Shooter': 'portfolio.projectNames.tpsShooter',
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
      'Level Design and Game Design project': 'portfolio.projectDescriptions.blackSpotDescription',
      'FPS-Shooter game developed from a semester project to a playable prototype': 'portfolio.projectDescriptions.gloveffectDescription',
          'TPS-Shooter game developed for academic course': 'portfolio.projectDescriptions.tpsShooterDescription',
          'Oyun projesi için oyun karakterleri, konsept sanat çalışmaları ve kart tasarımları üzerinde çalıştım. Karakterlerin görsel kimliğini oluştururken, oyun mekaniklerine uygun tasarımlar geliştirdim ve kart tasarımlarında tutarlı bir görsel dil oluşturdum.': 'portfolio.projectDescriptions.durihDescription',
          'Proje için konsept sanat ve görsel tasarım alanlarında çalıştım. Çizimlerimle projenin görsel kimliğini şekillendirdim ve sanatsal yönlendirmelerde bulundum.': 'portfolio.projectDescriptions.lunscaleDescription',
          'Yarıyıl projesi olarak başlayan FPS-Shooter oyunu, oynanabilir bir prototip haline getirildi.': 'portfolio.projectDescriptions.gloveffectDescriptionAhmetEmir',
          'Oyun Tasarımcısı olarak görev aldım.': 'portfolio.projectDescriptions.lunscaleDescriptionAhmetEmir',
          'Unity Developer & Game Designer olarak görev aldım.': 'portfolio.projectDescriptions.diruhDescriptionAhmetEmir',
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

  // Helper function to translate features
  const translateFeature = (feature: string): string => {
    const featureMap: Record<string, string> = {
      'Implemented boosters (shield, pipe gap extender, continuous run boosters) with purchase and usage systems': 'portfolio.experienceFeatures.implementedBoosters',
      'Designed and integrated character customization features, including unlockable skins and outfits for the bird': 'portfolio.experienceFeatures.characterCustomization',
      'Built a leaderboard system with online player visibility, increasing competition and engagement': 'portfolio.experienceFeatures.leaderboardSystem',
      'Optimized physics-based mechanics for smooth and responsive gameplay across devices': 'portfolio.experienceFeatures.optimizedPhysicsMechanics',
      'Implemented shine effects, ColorBlind mode, custom UI/animation systems': 'portfolio.experienceFeatures.shineEffectsColorBlind',
      'Integrated backend-controlled features to allow live updates without requiring new builds': 'portfolio.experienceFeatures.backendControlledFeatures',
      'Conducted A/B testing to optimize gameplay mechanics and boost user engagement': 'portfolio.experienceFeatures.abTesting',
      'Gained hands-on experience in mobile game production pipelines and teamwork in a professional environment': 'portfolio.experienceFeatures.mobileGameProduction',
      'Built and maintained backend systems for player data': 'portfolio.experienceFeatures.backendSystems',
      'Integrated monetization with AdMob & AppLovin': 'portfolio.experienceFeatures.monetization',
      'Created leaderboards for competition': 'portfolio.experienceFeatures.leaderboardsCompetition',
      'Designed multiplayer 2D games using Photon with smooth networking experiences': 'portfolio.experienceFeatures.photonMultiplayer2D',
      'Utilized Cinemachine for camera control, DOTween for animations, and ScriptableObjects to build modular, scalable architectures': 'portfolio.experienceFeatures.cinemachineDotween',
      'Applied best practices in game optimization and clean code principles': 'portfolio.experienceFeatures.optimizationCleanCode',
      'Level Design': 'portfolio.projectFeatures.levelDesign',
      'Game Design': 'portfolio.projectFeatures.gameDesign',
      'Narrative Design': 'portfolio.projectFeatures.narrativeDesign',
      '3D Level Design': 'portfolio.projectFeatures.3dLevelDesign',
      'Environment Design': 'portfolio.projectFeatures.environmentDesign',
      'environment design': 'portfolio.projectFeatures.environmentDesign',
      'Environment design': 'portfolio.projectFeatures.environmentDesign',
      'Environment creation': 'portfolio.projectFeatures.environmentCreation',
      'Gameplay mechanics design': 'portfolio.projectFeatures.gameplayMechanicsDesign',
      'Prototype development': 'portfolio.projectFeatures.prototypeDevelopment',
      'FPS gameplay mechanics': 'portfolio.projectFeatures.fpsGameplayMechanics',
      'TPS gameplay mechanics': 'portfolio.projectFeatures.tpsGameplayMechanics',
      'Karakter Tasarımı': 'portfolio.projectFeatures.karakterTasarimi',
      'Konsept Çizimi': 'portfolio.projectFeatures.konseptCizimi',
      'Kart Tasarımı': 'portfolio.projectFeatures.kartTasarim',
      'Görsel Tasarım': 'portfolio.projectFeatures.gorselTasarim',
      'Unity Development': 'portfolio.projectFeatures.unityDevelopment',
      'Unity Geliştirme': 'portfolio.projectFeatures.unityDevelopment',
      'C# Programming': 'portfolio.projectFeatures.csharpProgramming',
      'C# Programlama': 'portfolio.projectFeatures.csharpProgramming',
      'Oyun Tasarımı': 'portfolio.projectFeatures.gameDesign',
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

  // Helper function to translate links
  const translateLink = (link: string): string => {
    const linkMap: Record<string, string> = {
      'Google Play Store': 'portfolio.links.googlePlayStore',
      'App Store / Google Play Store': 'portfolio.links.appStoreGooglePlay',
          'Trailer': 'portfolio.links.trailer',
          'Fragman': 'portfolio.links.trailer',
          'Gameplay Trailer': 'portfolio.links.gameplayTrailer',
          'Oynanış Fragmanı': 'portfolio.links.gameplayTrailer',
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
              <h3 className="text-2xl font-bold mb-2" style={{ color: accentColor || '#00BFFF' }}>
                {translateCompany(exp.company)}
              </h3>
              <p className="text-lg text-bolf-gray mb-1">{translatePosition(exp.position)}</p>
              {exp.period && <p className="text-sm text-bolf-gray/70">{translatePeriod(exp.period)}</p>}
            </div>

            <div className="space-y-4">
              {exp.projects.map((project, pIndex) => (
                <div key={`${project.name}-${pIndex}`} className="ml-4">
                  <h4 className="text-xl font-semibold text-bolf-white mb-2">
                    {translateProjectName(project.name)}
                  </h4>
                  <p className="text-bolf-gray/80 mb-2">{translateDescription(project.description)}</p>
                  
                  {project.features && project.features.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-bolf-gray/70 ml-4">
                      {project.features.map((feature, fIndex) => (
                        <li key={fIndex}>{translateFeature(feature)}</li>
                      ))}
                    </ul>
                  )}
                  
                  {project.linkUrl && (
                    <a
                      href={project.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-2 transition-colors hover:opacity-80"
                      style={{ color: accentColor || '#00BFFF' }}
                    >
                      {project.link ? translateLink(project.link) : t('portfolio.viewLink')}
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
