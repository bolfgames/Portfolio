import { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { dataService } from '../../services/dataService';
import { platformService } from '../../services/platformService';
import ProjectCard from '../common/ProjectCard';
import ProjectModal from '../common/ProjectModal';
import { useI18n } from '../../contexts/I18nContext';
import BOLFKeyboardWrapper from './BOLFKeyboard';
import type { Project } from '../../models/types';

/**
 * Projects Section Component
 * Follows Single Responsibility Principle
 */
function ProjectsSection() {
  const { t, language } = useI18n();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Update services language when language changes
  useEffect(() => {
    dataService.setLanguage(language);
    platformService.setLanguage(language);
  }, [language]);
  
  // Get fresh data when language changes using useMemo
  const projects = useMemo(() => {
    // Pass language directly to get localized data
    return dataService.getAllProjects(language);
  }, [language]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Delay to allow animation
  };

  return (
    <section id="projects" className="pt-8 md:pt-12 pb-20 md:pb-32 bg-bolf-black">
      <div className="container mx-auto px-4">
        {/* BOLF Keyboard Animation */}
        <BOLFKeyboardWrapper />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-bolf-white">{t('projects.title')}</span>
          </h2>
          <p className="text-bolf-gray text-lg md:text-xl">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProjectCard project={project} onCardClick={handleProjectClick} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}

export default ProjectsSection;

