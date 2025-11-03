import { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { ROLE_COLORS } from '../models/types';
import Layout from '../components/layout/Layout';
import { useI18n } from '../contexts/I18nContext';

function TeamMemberPage() {
  const { name } = useParams<{ name: string }>();
  const { t, language } = useI18n();
  const navigate = useNavigate();
  
  // Update dataService language when language changes
  useEffect(() => {
    dataService.setLanguage(language);
  }, [language]);
  
  // Get fresh data when language changes using useMemo
  const member = useMemo(() => {
    // Pass language directly to get localized data
    return name ? dataService.getTeamMemberBySlug(name, language) : null;
  }, [name, language]);

  // Restore scroll position when going back
  const handleBackClick = () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    navigate('/');
    if (scrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(scrollPosition, 10));
        sessionStorage.removeItem('scrollPosition');
      }, 100);
    }
  };

  // Scroll to top when page loads
  useEffect(() => {
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

          <div className="max-w-4xl mx-auto">
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

            <div className="bg-bolf-black rounded-lg p-8 border border-bolf-gray/20">
              <h2 className="text-2xl font-bold mb-6">{t('team.portfolio')}</h2>
              <p className="text-bolf-gray">
                {t('team.portfolioPlaceholder')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TeamMemberPage;

