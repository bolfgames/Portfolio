import { motion } from 'framer-motion';
import { Youtube, Instagram, Music } from 'lucide-react';
import { useI18n } from '../../contexts/I18nContext';

/**
 * Footer Component - Social media links
 * Follows Single Responsibility Principle
 */
function Footer() {
  const { t } = useI18n();

  // Detect mobile device
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 768 && 'ontouchstart' in window);
  };

  // Get social media link based on device type
  const getSocialLink = (type: 'youtube' | 'tiktok' | 'instagram', username: string) => {
    const isMobileDevice = isMobile();
    
    if (isMobileDevice) {
      switch (type) {
        case 'youtube':
          return `youtube://channel/@${username}`;
        case 'tiktok':
          return `tiktok://user?username=${username}`;
        case 'instagram':
          return `instagram://user?username=${username}`;
        default:
          return '#';
      }
    } else {
      switch (type) {
        case 'youtube':
          return `https://www.youtube.com/@${username}`;
        case 'tiktok':
          return `https://www.tiktok.com/@${username}`;
        case 'instagram':
          return `https://www.instagram.com/${username}`;
        default:
          return '#';
      }
    }
  };

  // Handle click - try app link first, fallback to web if app not installed
  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>, type: 'youtube' | 'tiktok' | 'instagram', username: string) => {
    if (!isMobile()) {
      return; // Desktop'ta normal davranış
    }

    e.preventDefault();
    const appLink = getSocialLink(type, username);
    
    // Try to open app - use hidden iframe trick for better detection
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = appLink;
    document.body.appendChild(iframe);
    
    // Remove iframe after attempt
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
    
    // Only open web if app doesn't open (user stays on page)
    let appOpened = false;
    const checkAppOpened = () => {
      if (document.hidden || document.visibilityState === 'hidden') {
        appOpened = true;
      }
    };
    
    document.addEventListener('visibilitychange', checkAppOpened);
    
    setTimeout(() => {
      document.removeEventListener('visibilitychange', checkAppOpened);
      if (!appOpened) {
        const webLink = type === 'youtube' 
          ? `https://www.youtube.com/@${username}`
          : type === 'tiktok'
          ? `https://www.tiktok.com/@${username}`
          : `https://www.instagram.com/${username}`;
        window.open(webLink, '_blank');
      }
    }, 1000);
  };

  return (
    <footer id="contact" className="bg-bolf-black border-t border-bolf-gray/10 py-20">
      <div className="container mx-auto px-4">
        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center mb-12"
        >
          <h3 className="text-3xl font-bold mb-8 text-bolf-white">{t('footer.socialMedia')}</h3>
          
          <div className="w-full max-w-3xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* YouTube */}
              <a
                href={isMobile() ? getSocialLink('youtube', 'bolfmedya') : 'https://www.youtube.com/@bolfmedya'}
                onClick={(e) => handleSocialClick(e, 'youtube', 'bolfmedya')}
                target={isMobile() ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:scale-105 group aspect-square"
              >
                <Youtube size={24} className="text-red-400 group-hover:text-red-500 transition-colors" />
                <div className="text-center">
                  <div className="text-xs font-semibold text-bolf-white">YouTube</div>
                  <div className="text-[10px] text-bolf-gray group-hover:text-red-300 transition-colors">@bolfmedya</div>
                </div>
              </a>

              {/* TikTok */}
              <a
                href={isMobile() ? getSocialLink('tiktok', 'bolfmedya') : 'https://www.tiktok.com/@bolfmedya'}
                onClick={(e) => handleSocialClick(e, 'tiktok', 'bolfmedya')}
                target={isMobile() ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-br from-gray-800/20 to-black/30 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 group aspect-square"
              >
                <Music size={24} className="text-gray-300 group-hover:text-white transition-colors" />
                <div className="text-center">
                  <div className="text-xs font-semibold text-bolf-white">TikTok</div>
                  <div className="text-[10px] text-bolf-gray group-hover:text-gray-300 transition-colors">@bolfmedya</div>
                </div>
              </a>

              {/* Instagram - BOLF Medya */}
              <a
                href={isMobile() ? getSocialLink('instagram', 'bolf_medya') : 'https://www.instagram.com/bolf_medya'}
                onClick={(e) => handleSocialClick(e, 'instagram', 'bolf_medya')}
                target={isMobile() ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 group aspect-square"
              >
                <Instagram size={24} className="text-purple-400 group-hover:text-pink-400 transition-colors" />
                <div className="text-center">
                  <div className="text-xs font-semibold text-bolf-white">Instagram</div>
                  <div className="text-[10px] text-bolf-gray group-hover:text-purple-300 transition-colors">@bolf_medya</div>
                </div>
              </a>

              {/* Instagram - BOLF Games */}
              <a
                href={isMobile() ? getSocialLink('instagram', 'bolfgames') : 'https://www.instagram.com/bolfgames'}
                onClick={(e) => handleSocialClick(e, 'instagram', 'bolfgames')}
                target={isMobile() ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 group aspect-square"
              >
                <Instagram size={24} className="text-purple-400 group-hover:text-pink-400 transition-colors" />
                <div className="text-center">
                  <div className="text-xs font-semibold text-bolf-white">Instagram</div>
                  <div className="text-[10px] text-bolf-gray group-hover:text-purple-300 transition-colors">@bolfgames</div>
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <div className="border-t border-bolf-gray/10 pt-8 text-center text-bolf-gray space-y-4">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
          
          {/* Attributions */}
          <div className="mt-8 pt-8 border-t border-bolf-gray/10">
            <h4 className="text-sm font-semibold text-bolf-white mb-4">Attributions</h4>
            <div className="text-xs space-y-2 text-bolf-gray/80">
              <p className="mb-3">
                This project uses open-source components under MIT License for non-commercial purposes.
              </p>
              
              <div className="space-y-2">
                <p>
                  <strong>BOLF Keyboard:</strong>{' '}
                  <a 
                    href="https://codepen.io/jh3y/pen/OPyPRLK" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-bolf-neon-blue hover:text-bolf-orange transition-colors"
                  >
                    CodePen
                  </a>
                  {' '}by{' '}
                  <a 
                    href="https://codepen.io/jh3y" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-bolf-neon-blue hover:text-bolf-orange transition-colors"
                  >
                    Jhey
                  </a>
                  {' '}(MIT License)
                </p>
                
                <p>
                  <strong>Tubes Cursor:</strong>{' '}
                  <a 
                    href="https://codepen.io/soju22/pen/qEbdVjK" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-bolf-neon-blue hover:text-bolf-orange transition-colors"
                  >
                    CodePen
                  </a>
                  {' '}by{' '}
                  <a 
                    href="https://codepen.io/soju22" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-bolf-neon-blue hover:text-bolf-orange transition-colors"
                  >
                    Kevin Levron (soju22)
                  </a>
                  {' '}(MIT License)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
