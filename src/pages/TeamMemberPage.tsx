import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { dataService } from '../services/dataService';
import { ROLE_COLORS } from '../models/types';
import Layout from '../components/layout/Layout';
import { useI18n } from '../contexts/I18nContext';
import { getAssetPath } from '../utils/assetPath';
import ProjectMockup from '../components/portfolio/ProjectMockup';
import LaptopMockup from '../components/portfolio/LaptopMockup';
import ResponsiveSlideshow from '../components/portfolio/ResponsiveSlideshow';
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
      features?: string[];
      link?: string;
      linkUrl?: string;
      isLandscape?: boolean;
    }>;
  }>;
}

interface EmirData {
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    artstation: string;
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
    name: string;
    images: string[];
    features?: string[];
    link?: string;
    linkUrl?: string;
    landscapeScale?: number;
    portraitScale?: number;
  }>;
}

interface AtaCemData {
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    artstation: string;
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
    period?: string;
    projects: Array<{
      name: string;
      description: string;
      features?: string[];
    }>;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    images: string[];
    features?: string[];
  }>;
}

interface ErdemData {
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    artstation: string;
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
    period?: string;
    projects: Array<{
      name: string;
      description: string;
      features?: string[];
    }>;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    images: string[];
    features?: string[];
  }>;
}

function TeamMemberPage() {
  const { name } = useParams<{ name: string }>();
  const { t, language } = useI18n();
  const navigate = useNavigate();
  const [furkanData, setFurkanData] = useState<FurkanData | null>(null);
  const [emirData, setEmirData] = useState<EmirData | null>(null);
  const [ataCemData, setAtaCemData] = useState<AtaCemData | null>(null);
  const [erdemData, setErdemData] = useState<ErdemData | null>(null);
  
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

  // Load Emir's portfolio data if this is Emir's page
  useEffect(() => {
    const isEmir = member?.name.toLowerCase().includes('emir');
    if (isEmir) {
      fetch(getAssetPath('assets/resumes/Emir/emir-data.json'))
        .then((res) => res.json())
        .then((data) => setEmirData(data))
        .catch((err) => {
          console.error('Failed to load Emir portfolio data:', err);
        });
    }
  }, [member]);

  // Load Ata Cem's portfolio data if this is Ata Cem's page
  useEffect(() => {
    const isAtaCem = member?.name.toLowerCase().includes('ata');
    if (isAtaCem) {
      fetch(getAssetPath('assets/resumes/AtaCem/atacem-data.json'))
        .then((res) => res.json())
        .then((data) => setAtaCemData(data))
        .catch((err) => {
          console.error('Failed to load Ata Cem portfolio data:', err);
        });
    }
  }, [member]);

  // Load Erdem's portfolio data if this is Erdem's page
  useEffect(() => {
    const isErdem = member?.name.toLowerCase().includes('erdem');
    if (isErdem) {
      fetch(getAssetPath('assets/resumes/Erdem/erdem-data.json'))
        .then((res) => res.json())
        .then((data) => setErdemData(data))
        .catch((err) => {
          console.error('Failed to load Erdem portfolio data:', err);
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
    // Scroll to top when page loads - stay at the top
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
  const isEmir = member?.name.toLowerCase().includes('emir');
  const isAtaCem = member?.name.toLowerCase().includes('ata');
  const isErdem = member?.name.toLowerCase().includes('erdem');
  const accentColor = isEmir ? '#2ECC71' : (isAtaCem ? '#FFD700' : (isErdem ? '#FFD700' : roleColor)); // Emir için yeşil, Ata Cem ve Erdem için altın, diğerleri için role color

  return (
    <Layout>
      <div className="min-h-screen bg-bolf-black pt-20">
        <div className="container mx-auto px-4 py-12">
          <button
            onClick={handleBackClick}
            className="inline-block mb-8 transition-colors"
            style={{ color: accentColor }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            ← {t('team.backToHome')}
          </button>

          <div className="max-w-6xl mx-auto">
            <div 
              className="rounded-lg p-8 mb-8"
              style={{ 
                border: `2px solid ${accentColor}`,
                boxShadow: `0 0 20px ${accentColor}40`,
              }}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4" style={{ borderColor: accentColor }}>
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
                  <h1 className="text-4xl font-bold mb-2" style={{ color: accentColor }}>
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
                <section className="mb-12">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-bolf-white mb-6"
                  >
                    {t('portfolio.contact')}
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-bolf-black/50 border border-bolf-gray/20 rounded-lg p-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-bolf-gray">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-bolf-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href={`mailto:${furkanData.contact.email}`} className="hover:text-bolf-neon-blue transition-colors">
                          {furkanData.contact.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-bolf-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href={`tel:${furkanData.contact.phone}`} className="hover:text-bolf-neon-blue transition-colors">
                          {furkanData.contact.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-bolf-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{furkanData.contact.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-bolf-neon-blue" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        <a href={`https://${furkanData.contact.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-bolf-neon-blue transition-colors">
                          {furkanData.contact.github}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-bolf-neon-blue" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <a href={`https://${furkanData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-bolf-neon-blue transition-colors">
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* Education Section */}
                <EducationSection education={furkanData.education} />

                {/* Experience Section */}
                <ExperienceSection experiences={furkanData.experience} />

                {/* Skills Section */}
                <SkillsSection skills={furkanData.skills} />

                {/* Projects Section */}
                <section id="portfolio-projects" className="mb-12">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-bolf-white mb-8"
                  >
                    {t('portfolio.projects')}
                  </motion.h2>

                  <div className="space-y-16">
                    {furkanData.projects.map((yearGroup) => (
                      <ProjectMockup
                        key={yearGroup.year}
                        year={yearGroup.year}
                        projects={yearGroup.projects}
                      />
                    ))}
                  </div>
                </section>
              </div>
            ) : emirData && member?.name.toLowerCase().includes('emir') ? (
              <div className="space-y-12">
                {/* Contact Section */}
                <section className="mb-12">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-bolf-white mb-6"
                  >
                    {t('portfolio.contact')}
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-bolf-black/50 border border-bolf-gray/20 rounded-lg p-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-bolf-gray">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href={`mailto:${emirData.contact.email}`} style={{ color: accentColor }} className="hover:opacity-80 transition-colors">
                          {emirData.contact.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href={`tel:${emirData.contact.phone}`} style={{ color: accentColor }} className="hover:opacity-80 transition-colors">
                          {emirData.contact.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{emirData.contact.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <a href={`https://${emirData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }} className="hover:opacity-80 transition-colors">
                          LinkedIn
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11V7h2v4h-2zm0 4v-2h2v2h-2z"/>
                        </svg>
                        <a href={`https://${emirData.contact.artstation}`} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }} className="hover:opacity-80 transition-colors">
                          ArtStation
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* Education Section */}
                <EducationSection education={emirData.education} accentColor={accentColor} />

                {/* Experience Section */}
                <ExperienceSection experiences={emirData.experience} accentColor={accentColor} />

                {/* Skills Section */}
                <SkillsSection skills={emirData.skills} accentColor={accentColor} />

                {/* Projects Section */}
                <section id="portfolio-projects" className="mb-12">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-bolf-white mb-8"
                  >
                    {t('portfolio.projects')}
                  </motion.h2>

                  <div className="space-y-16">
                    {emirData.projects.map((project) => (
                      <LaptopMockup key={project.name} project={project} />
                    ))}
                  </div>
                </section>
              </div>
            ) : ataCemData && member?.name.toLowerCase().includes('ata') ? (
              <div className="space-y-12">
                {/* Contact Section */}
                <section className="mb-12">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-bolf-white mb-6"
                  >
                    {t('portfolio.contact')}
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-bolf-black/50 border border-bolf-gray/20 rounded-lg p-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-bolf-gray">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href={`mailto:${ataCemData.contact.email}`} style={{ color: accentColor }} className="hover:opacity-80 transition-colors">
                          {ataCemData.contact.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href={`tel:${ataCemData.contact.phone}`} style={{ color: accentColor }} className="hover:opacity-80 transition-colors">
                          {ataCemData.contact.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{ataCemData.contact.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <a href={`https://${ataCemData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }} className="hover:opacity-80 transition-colors">
                          LinkedIn
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11V7h2v4h-2zm0 4v-2h2v2h-2z"/>
                        </svg>
                        <a href={`https://${ataCemData.contact.artstation}`} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }} className="hover:opacity-80 transition-colors">
                          ArtStation
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* Education Section */}
                <EducationSection education={ataCemData.education} accentColor={accentColor} />

                {/* Experience Section */}
                <ExperienceSection experiences={ataCemData.experience} accentColor={accentColor} />

                {/* Skills Section */}
                <SkillsSection skills={ataCemData.skills} accentColor={accentColor} />

                {/* Projects Section */}
                <section id="portfolio-projects" className="mb-12">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-bolf-white mb-8"
                  >
                    {t('portfolio.projects')}
                  </motion.h2>

                  <div className="space-y-16">
                    {ataCemData.projects.map((project) => (
                      <div key={project.name} className="mb-12">
                        <motion.h3
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-2xl md:text-3xl font-bold mb-6 text-center"
                          style={{ color: accentColor }}
                        >
                          {project.name}
                        </motion.h3>
                        <ResponsiveSlideshow
                          images={project.images}
                          projectName={project.name}
                          accentColor={accentColor}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            ) : erdemData && member?.name.toLowerCase().includes('erdem') ? (
              <div className="space-y-12">
                {/* Contact Section */}
                <section className="mb-12">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-bolf-white mb-6"
                  >
                    {t('portfolio.contact')}
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-bolf-black/50 border border-bolf-gray/20 rounded-lg p-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-bolf-gray">
                      {erdemData.contact.email && (
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <a href={`mailto:${erdemData.contact.email}`} style={{ color: accentColor }} className="hover:opacity-80 transition-colors">
                            {erdemData.contact.email}
                          </a>
                        </div>
                      )}
                      {erdemData.contact.phone && (
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <a href={`tel:${erdemData.contact.phone}`} style={{ color: accentColor }} className="hover:opacity-80 transition-colors">
                            {erdemData.contact.phone}
                          </a>
                        </div>
                      )}
                      {erdemData.contact.location && (
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{erdemData.contact.location}</span>
                        </div>
                      )}
                      {erdemData.contact.linkedin && (
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          <a href={`https://${erdemData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }} className="hover:opacity-80 transition-colors">
                            LinkedIn
                          </a>
                        </div>
                      )}
                      {erdemData.contact.artstation && (
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11V7h2v4h-2zm0 4v-2h2v2h-2z"/>
                          </svg>
                          <a href={`https://${erdemData.contact.artstation}`} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }} className="hover:opacity-80 transition-colors">
                            ArtStation
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </section>

                {/* Education Section */}
                {erdemData.education.degree && (
                  <EducationSection education={erdemData.education} accentColor={accentColor} />
                )}

                {/* Experience Section */}
                {erdemData.experience.length > 0 && (
                  <ExperienceSection experiences={erdemData.experience} accentColor={accentColor} />
                )}

                {/* Skills Section */}
                {erdemData.skills.length > 0 && (
                  <SkillsSection skills={erdemData.skills} accentColor={accentColor} />
                )}

                {/* Projects Section */}
                <section id="portfolio-projects" className="mb-12">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-bolf-white mb-8"
                  >
                    {t('portfolio.projects')}
                  </motion.h2>

                  <div className="space-y-16">
                    {erdemData.projects.map((project) => (
                      <div key={project.name} className="mb-12">
                        <motion.h3
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-2xl md:text-3xl font-bold mb-6 text-center"
                          style={{ color: accentColor }}
                        >
                          {project.name}
                        </motion.h3>
                        <ResponsiveSlideshow
                          images={project.images}
                          projectName={project.name}
                          accentColor={accentColor}
                          imageBasePath="assets/resumes/Erdem/project_images"
                        />
                      </div>
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

