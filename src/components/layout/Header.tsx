import { useState, useRef, useEffect } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import LanguageSelector from '../common/LanguageSelector';
import { settingsService } from '../../services/settingsService';
import DeveloperPanel from '../developer/DeveloperPanel';
import EditorPanel from '../editor/EditorPanel';
import { Edit } from 'lucide-react';
import { getAssetPath } from '../../utils/assetPath';

/**
 * Header Component - Navigation and logo with glassmorphism
 * Follows Single Responsibility Principle
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeveloperPanelOpen, setIsDeveloperPanelOpen] = useState(false);
  const [isEditorPanelOpen, setIsEditorPanelOpen] = useState(false);
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isEditorModeEnabled, setIsEditorModeEnabled] = useState(false);
  const { t } = useI18n();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleScrollTo = (sectionId: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault();
    closeMenu();
    
    // Wait a bit for menu to close on mobile
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80; // Header yüksekliği
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // Developer button handler:
  // - 1 click: always opens language selector
  // - 3 clicks (if developer mode enabled): opens developer panel
  const handleDeveloperButtonClick = () => {
    // Always handle single click for language selector
    setIsLanguageSelectorOpen(!isLanguageSelectorOpen);

    // If developer mode is enabled, track for 3-click developer panel
    if (settingsService.isDeveloperModeEnabled()) {
      // Clear existing timer
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }

      const newCount = clickCount + 1;
      setClickCount(newCount);

      if (newCount >= 3) {
        setIsDeveloperPanelOpen(true);
        setClickCount(0);
        setIsLanguageSelectorOpen(false); // Close language selector when opening dev panel
      } else {
        // Reset counter after 2 seconds
        clickTimerRef.current = setTimeout(() => {
          setClickCount(0);
        }, 2000);
      }
    }
  };

  useEffect(() => {
    setIsEditorModeEnabled(settingsService.isEditorModeEnabled());
    const unsubscribe = settingsService.subscribe(() => {
      setIsEditorModeEnabled(settingsService.isEditorModeEnabled());
    });
    return () => {
      unsubscribe();
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-bolf-black/30 backdrop-blur-md border-b border-bolf-white/10 shadow-lg" />
      
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="#/" 
            className="flex items-center z-10" 
            onClick={(e) => {
              e.preventDefault();
              closeMenu();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img 
              src={getAssetPath('/assets/icons/logo_cropped_by_gunduzdev/logobeyazpng_Çalışma Yüzeyi 1c.png')}
              alt="BOLF Games Logo"
              className="h-10 md:h-12 w-auto"
              loading="eager"
              decoding="async"
              onError={(e) => {
                (e.target as HTMLImageElement).src = getAssetPath('/assets/icons/logo_transparant/logobznpng_Çalışma Yüzeyi 1.png');
              }}
            />
          </a>

          {/* Desktop Navigation - Glassmorphism */}
          <nav className="hidden md:flex items-center space-x-2 flex-wrap">
            <div className="flex items-center space-x-1 flex-wrap px-3 py-2 rounded-full bg-bolf-white/5 backdrop-blur-md border border-bolf-white/10">
              <a 
                href="#/" 
                className="px-2 py-1.5 text-sm text-bolf-white hover:text-bolf-neon-blue transition-colors rounded-full hover:bg-bolf-white/10 whitespace-nowrap"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {t('nav.home')}
              </a>
              <a 
                href="#about" 
                className="px-2 py-1.5 text-sm text-bolf-white hover:text-bolf-neon-blue transition-colors rounded-full hover:bg-bolf-white/10 whitespace-nowrap"
                onClick={(e) => handleScrollTo('about', e)}
              >
                {t('nav.about')}
              </a>
              <a 
                href="#projects" 
                className="px-2 py-1.5 text-sm text-bolf-white hover:text-bolf-neon-blue transition-colors rounded-full hover:bg-bolf-white/10 whitespace-nowrap"
                onClick={(e) => handleScrollTo('projects', e)}
              >
                {t('nav.projects')}
              </a>
              <a 
                href="#team" 
                className="px-2 py-1.5 text-sm text-bolf-white hover:text-bolf-neon-blue transition-colors rounded-full hover:bg-bolf-white/10 whitespace-nowrap"
                onClick={(e) => handleScrollTo('team', e)}
              >
                {t('nav.team')}
              </a>
              <a 
                href="#contact" 
                className="px-2 py-1.5 text-sm text-bolf-white hover:text-bolf-neon-blue transition-colors rounded-full hover:bg-bolf-white/10 whitespace-nowrap"
                onClick={(e) => handleScrollTo('contact', e)}
              >
                {t('nav.contact')}
              </a>
            </div>
            <div className="relative flex items-center space-x-2">
              {/* Editor Button */}
              {isEditorModeEnabled && (
                <button
                  onClick={() => setIsEditorPanelOpen(true)}
                  className="p-2 hover:bg-bolf-white/10 rounded-lg transition-colors"
                  title="Editor Panel"
                  aria-label="Editor Panel"
                >
                  <Edit className="w-5 h-5 text-bolf-orange" />
                </button>
              )}
              <div className="relative">
                <LanguageSelector 
                  isOpen={isLanguageSelectorOpen} 
                  onToggle={() => setIsLanguageSelectorOpen(!isLanguageSelectorOpen)} 
                />
                {/* Developer Button - Hidden, always active for language selector */}
                <button
                  onClick={handleDeveloperButtonClick}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                  aria-label="Language Selector / Developer Panel"
                />
              </div>
            </div>
          </nav>

          {/* Mobile - Language Selector and Menu Button */}
          <div className="md:hidden flex items-center space-x-4 z-10 relative">
            {/* Editor Button */}
            {isEditorModeEnabled && (
              <button
                onClick={() => setIsEditorPanelOpen(true)}
                className="p-2 hover:bg-bolf-white/10 rounded-lg transition-colors"
                title="Editor Panel"
                aria-label="Editor Panel"
              >
                <Edit className="w-5 h-5 text-bolf-orange" />
              </button>
            )}
            <div className="relative">
              <LanguageSelector 
                isOpen={isLanguageSelectorOpen} 
                onToggle={() => setIsLanguageSelectorOpen(!isLanguageSelectorOpen)} 
              />
              {/* Developer Button - Hidden, always active for language selector */}
              <button
                onClick={handleDeveloperButtonClick}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                aria-label="Language Selector / Developer Panel"
              />
            </div>
            <button
              onClick={toggleMenu}
              className="text-bolf-white hover:text-bolf-neon-blue transition-colors"
              aria-label="Toggle menu"
            >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          </div>
        </div>

        {/* Mobile Navigation - Glassmorphism */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-bolf-white/10 relative">
            <div className="absolute inset-0 bg-bolf-black/20 backdrop-blur-md" />
            <div className="relative flex flex-col space-y-2">
              <a 
                href="#/" 
                className="px-4 py-3 text-bolf-white hover:text-bolf-neon-blue transition-colors rounded-lg hover:bg-bolf-white/10"
                onClick={(e) => {
                  e.preventDefault();
                  closeMenu();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {t('nav.home')}
              </a>
              <a 
                href="#about" 
                className="px-4 py-3 text-bolf-white hover:text-bolf-neon-blue transition-colors rounded-lg hover:bg-bolf-white/10"
                onClick={(e) => handleScrollTo('about', e)}
              >
                {t('nav.about')}
              </a>
              <a 
                href="#projects" 
                className="px-4 py-3 text-bolf-white hover:text-bolf-neon-blue transition-colors rounded-lg hover:bg-bolf-white/10"
                onClick={(e) => handleScrollTo('projects', e)}
              >
                {t('nav.projects')}
              </a>
              <a 
                href="#team" 
                className="px-4 py-3 text-bolf-white hover:text-bolf-neon-blue transition-colors rounded-lg hover:bg-bolf-white/10"
                onClick={(e) => handleScrollTo('team', e)}
              >
                {t('nav.team')}
              </a>
              <a 
                href="#contact" 
                className="px-4 py-3 text-bolf-white hover:text-bolf-neon-blue transition-colors rounded-lg hover:bg-bolf-white/10"
                onClick={(e) => handleScrollTo('contact', e)}
              >
                {t('nav.contact')}
              </a>
            </div>
          </nav>
        )}
      </div>

      {/* Developer Panel */}
      <DeveloperPanel
        isOpen={isDeveloperPanelOpen}
        onClose={() => setIsDeveloperPanelOpen(false)}
      />

      {/* Editor Panel */}
      <EditorPanel
        isOpen={isEditorPanelOpen}
        onClose={() => setIsEditorPanelOpen(false)}
      />
    </header>
  );
}

export default Header;

