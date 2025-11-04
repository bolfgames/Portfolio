import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { dataService } from '../services/dataService';
import { ROLE_COLORS } from '../models/types';
import Layout from '../components/layout/Layout';
import { useI18n } from '../contexts/I18nContext';
import { getAssetPath } from '../utils/assetPath';
import ProjectMockup from '../components/portfolio/ProjectMockup';
import ExperienceSection from '../components/portfolio/ExperienceSection';
import EducationSection from '../components/portfolio/EducationSection';
import SkillsSection from '../components/portfolio/SkillsSection';

interface FurkanData {
  contact: {
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
  };
  education: {
    degree: string;
    university: string;
    faculty?: string;
    period: string;
    location: string;
  };
  experience: Array<{
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
  }>;
  skills: string[];
  projects: Array<{
    year: string;
    projects: Array<{
      name: string;
      image: string;
      description: string;
      details?: string;
      link?: string;
      linkUrl?: string;
      isLandscape?: boolean;
    }>;
  }>;
}

function TeamMemberPage() {
  const { name } = useParams<{ name: string }>();
  const { t, language } = useI18n();
  const navigate = useNavigate();
  const [furkanData, setFurkanData] = useState<FurkanData | null>(null);
  
  // Update dataService language when language changes
  useEffect(() => {
    dataService.setLanguage(language);
  }, [language]);
  
  // Get fresh data when language changes using useMemo
  const member = useMemo(() => {
    // Pass language directly to get localized data
    return name ? dataService.getTeamMemberBySlug(name, language) : null;
  }, [name, language]);

  // Load Furkan's portfolio data if this is Furkan's page
  useEffect(() => {
    const isFurkan = member?.name.toLowerCase().includes('furkan');
    if (isFurkan) {
      fetch(getAssetPath('assets/resumes/Furkan/furkan-data.json'))
        .then((res) => res.json())
        .then((data) => setFurkanData(data))
        .catch((err) => {
          console.error('Failed to load Furkan portfolio data:', err);
        });
    }
  }, [member]);

  // Handle browser back button - scroll to team section
  useEffect(() => {
    const handlePopState = () => {
      // Check if we're coming from team member page
      const scrollPosition = sessionStorage.getItem('scrollPosition');
      const fromTeamPage = sessionStorage.getItem('fromTeamPage');
      
      if (fromTeamPage === 'true' && scrollPosition) {
        setTimeout(() => {
          const teamSection = document.getElementById('team');
          if (teamSection) {
            const headerHeight = 80;
            const elementPosition = teamSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          } else {
            // Fallback to saved scroll position
            window.scrollTo(0, parseInt(scrollPosition, 10));
          }
          sessionStorage.removeItem('scrollPosition');
          sessionStorage.removeItem('fromTeamPage');
        }, 100);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Restore scroll position when going back via button
  const handleBackClick = () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    navigate('/');
    if (scrollPosition) {
      setTimeout(() => {
        const teamSection = document.getElementById('team');
        if (teamSection) {
          const headerHeight = 80;
          const elementPosition = teamSection.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo(0, parseInt(scrollPosition, 10));
        }
        sessionStorage.removeItem('scrollPosition');
        sessionStorage.removeItem('fromTeamPage');
      }, 100);
    }
  };

  // Save scroll position and mark as from team page when component mounts
  useEffect(() => {
    // Mark that we're coming from team page
    sessionStorage.setItem('fromTeamPage', 'true');
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  if (!member) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-bolf-black">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{t('team.notFound')}</h1>
            <Link 
              to="/" 
              className="text-bolf-neon-blue hover:text-bolf-orange transition-colors"
            >
              {t('team.backToHome')}
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const roleColor = ROLE_COLORS[member.roleType];

  return (
    <Layout>
      <div className="min-h-screen bg-bolf-black pt-20">
        <div className="container mx-auto px-4 py-12">
          <button
            onClick={handleBackClick}
            className="inline-block mb-8 text-bolf-neon-blue hover:text-bolf-orange transition-colors"
          >
            ← {t('team.backToHome')}
          </button>

          <div className="max-w-6xl mx-auto">
            <div 
              className="rounded-lg p-8 mb-8"
              style={{ 
                border: `2px solid ${roleColor}`,
                boxShadow: `0 0 20px ${roleColor}40`,
              }}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4" style={{ borderColor: roleColor }}>
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23000" width="300" height="300"/%3E%3Ccircle cx="150" cy="120" r="40" fill="%2300BFFF"/%3E%3Cpath fill="%23000" d="M150 180 L110 240 L190 240 Z"/%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-4xl font-bold mb-2" style={{ color: roleColor }}>
                    {member.name}
                  </h1>
                  <p className="text-2xl text-bolf-gray mb-4">{member.role}</p>
                  <p className="text-bolf-gray">{member.bio}</p>
                </div>
              </div>
            </div>

            {/* Portfolio Content - Special for Furkan */}
            {furkanData && member?.name.toLowerCase().includes('furkan') ? (
              <div className="space-y-12">
                {/* Contact Section */}
                <section className="bg-bolf-black/50 border border-bolf-gray/20 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-bolf-white mb-4">{t('portfolio.contact')}</h2>
                  <div className="flex flex-wrap gap-4 text-bolf-gray">
                    <a href={`mailto:${furkanData.contact.email}`} className="hover:text-bolf-neon-blue transition-colors">
                      {furkanData.contact.email}
                    </a>
                    <a href={`tel:${furkanData.contact.phone}`} className="hover:text-bolf-neon-blue transition-colors">
                      {furkanData.contact.phone}
                    </a>
                    <span>{furkanData.contact.location}</span>
                    <a href={`https://${furkanData.contact.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-bolf-neon-blue transition-colors">
                      GitHub
                    </a>
                    <a href={`https://${furkanData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-bolf-neon-blue transition-colors">
                      LinkedIn
                    </a>
                  </div>
                </section>

                {/* Education Section */}
                <EducationSection education={furkanData.education} />

                {/* Experience Section */}
                <ExperienceSection experiences={furkanData.experience} />

                {/* Skills Section */}
                <SkillsSection skills={furkanData.skills} />

                {/* Projects Section */}
                <section className="mb-12">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-bolf-white mb-8"
                  >
                    {t('portfolio.projects')}
                  </motion.h2>

                  <div className="space-y-16">
                    {furkanData.projects.map((yearGroup, index) => (
                      <ProjectMockup
                        key={yearGroup.year}
                        year={yearGroup.year}
                        projects={yearGroup.projects}
                      />
                    ))}
                  </div>
                </section>
              </div>
            ) : (
              <div className="bg-bolf-black rounded-lg p-8 border border-bolf-gray/20">
                <h2 className="text-2xl font-bold mb-6">{t('team.portfolio')}</h2>
                <p className="text-bolf-gray">
                  {t('team.portfolioPlaceholder')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TeamMemberPage;

