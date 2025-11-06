import { motion } from 'framer-motion';
import { useI18n } from '../../contexts/I18nContext';

/**
 * Footer Component - Social media links
 * Follows Single Responsibility Principle
 */
function Footer() {
  const { t } = useI18n();

  const socialLinks = [
    { name: 'Discord', href: '#', icon: '💬' },
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'GitHub', href: '#', icon: '💻' },
  ];

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
          <h3 className="text-3xl font-bold mb-6 text-bolf-white">{t('footer.socialMedia')}</h3>
          <div className="space-y-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center space-x-4 text-bolf-gray hover:text-bolf-neon-blue transition-colors"
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="text-lg">{link.name}</span>
              </a>
            ))}
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
