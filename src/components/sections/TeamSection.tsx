import { useMemo, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import TeamMemberCard from '../common/TeamMemberCard';
import { useI18n } from '../../contexts/I18nContext';
import type { TeamMember } from '../../models/types';

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Team Section Component
 * Follows Single Responsibility Principle
 * Features random shuffling and animated reordering
 */
function TeamSection() {
  const navigate = useNavigate();
  const { t, language } = useI18n();
  const [shuffledMembers, setShuffledMembers] = useState<TeamMember[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Update dataService language when language changes
  useEffect(() => {
    dataService.setLanguage(language);
  }, [language]);
  
  // Get fresh data when language changes using useMemo
  const members = useMemo(() => {
    // Pass language directly to get localized data
    return dataService.getAllTeamMembers(language);
  }, [language]);

  // Shuffle members function
  const shuffleMembers = useCallback(() => {
    if (members.length > 0) {
      setShuffledMembers(shuffleArray(members));
      setIsInitialized(true);
    }
  }, [members]);

  // Initial shuffle on mount
  useEffect(() => {
    if (members.length > 0 && !isInitialized) {
      shuffleMembers();
    }
  }, [members, isInitialized, shuffleMembers]);

  // Update shuffled members when language or members change (for real-time localization)
  useEffect(() => {
    if (members.length > 0 && isInitialized) {
      // Language or members changed, re-shuffle with new localized data
      setShuffledMembers(shuffleArray(members));
    }
  }, [language, members, isInitialized]);

  // Periodic shuffle with animation (every 10-15 seconds, randomized)
  useEffect(() => {
    if (!isInitialized || members.length === 0) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    
    const scheduleNextShuffle = () => {
      const delay = 10000 + Math.random() * 5000; // Random interval between 10-15 seconds
      timeoutId = setTimeout(() => {
        shuffleMembers();
        scheduleNextShuffle(); // Schedule next shuffle after this one
      }, delay);
    };

    scheduleNextShuffle();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isInitialized, members, shuffleMembers]);

  const handleMemberClick = (member: TeamMember) => {
    // Save scroll position before navigation
    const scrollPosition = window.scrollY;
    sessionStorage.setItem('scrollPosition', scrollPosition.toString());
    sessionStorage.setItem('fromTeamPage', 'true');
    const slug = dataService.getNameSlug(member.name);
    navigate(`/${slug}`);
  };

  // Don't render until shuffled
  if (!isInitialized || shuffledMembers.length === 0) {
    return (
      <section id="team" className="py-20 md:py-32 bg-bolf-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-bolf-white">{t('team.title')}</span>
            </h2>
            <p className="text-bolf-gray text-lg md:text-xl">
              {t('team.subtitle')}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-20 md:py-32 bg-bolf-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-bolf-white">{t('team.title')}</span>
          </h2>
          <p className="text-bolf-gray text-lg md:text-xl">
            {t('team.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {shuffledMembers.map((member) => (
              <motion.div
                key={`${member.id}-${language}-${member.role}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  layout: { duration: 0.5, ease: 'easeInOut' },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
              >
                <TeamMemberCard 
                  member={member} 
                  onClick={() => handleMemberClick(member)} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default TeamSection;

