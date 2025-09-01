import React from 'react';
import { 
  Instagram, 
  Youtube, 
  Music, 
  Twitter, 
  Github, 
  
  ExternalLink,
  MessageCircle,
  DollarSign
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SocialLink {
  platform: string;
  url: string;
  username: string;
  displayName: string;
  icon: React.ReactNode;
  color: string;
  size: 'small' | 'medium' | 'large';
  featured?: boolean;
}

const socialLinks: SocialLink[] = [
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/ardaannyy',
    username: '@ardaannyy',
    displayName: 'Instagram',
    icon: <Instagram className="w-6 h-6" />,
    color: '#E4405F',
    size: 'large'
  },
  {
    platform: 'YouTube',
    url: 'https://www.youtube.com/channel/UC_HCI02Lu4sCLH2j7soRWQg',
    username: 'Danny',
    displayName: 'YouTube',
    icon: <Youtube className="w-6 h-6" />,
    color: '#FF0000',
    size: 'medium'
  },
  {
    platform: 'TikTok',
    url: 'https://www.tiktok.com/@ardaannyy',
    username: '@ardaannyy',
    displayName: 'TikTok',
    icon: <Music className="w-6 h-6" />,
    color: '#000000',
    size: 'medium'
  },
  {
    platform: 'Twitter',
    url: 'https://x.com/daanny62',
    username: '@daanny62',
    displayName: 'Twitter',
    icon: <Twitter className="w-6 h-6" />,
    color: '#1DA1F2',
    size: 'small'
  },
  {
    platform: 'Discord',
    url: 'https://discord.gg/j9tWaJ8HSz',
    username: 'DANNY GRAPICH STORE',
    displayName: 'Discord Server',
    icon: <MessageCircle className="w-6 h-6" />,
    color: '#5865F2',
    size: 'medium'
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/ardannydev',
    username: 'ardannydev',
    displayName: 'GitHub',
    icon: <Github className="w-6 h-6" />,
    color: '#333',
    size: 'large'
  },

  {
    platform: 'Saweria',
    url: 'https://saweria.co/ardanny',
    username: 'Support',
    displayName: 'Saweria',
    icon: <DollarSign className="w-6 h-6" />,
    color: '#FFAA00',
    size: 'large',
    featured: true
  }
];

const SocialGrid: React.FC = () => {
  
  const { t, currentLanguage } = useLanguage();

  const getCardSize = (size: string) => {
    switch (size) {
      case 'large': return 'sm:col-span-2';
      case 'medium': return 'col-span-1';
      case 'small': return 'col-span-1';
      default: return 'col-span-1';
    }
  };

  return (
    <section key={`social-${currentLanguage.code}`} className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 preload-visible">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white dark:text-white mb-4 sm:mb-6">
            {t.socialTitle}
          </h1>
          <p className="text-base sm:text-lg text-white dark:text-gray-200 max-w-2xl mx-auto px-4">
            {t.socialSubtitle}
          </p>
        </div>

        {/* Social Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {socialLinks.map((link) => {
            
            return (
              <div
                key={link.platform}
                className={`${getCardSize(link.size)}`}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  
                  className={`group relative block p-6 rounded-2xl backdrop-blur-md bg-white/10 dark:bg-space-blue/20 border border-white/20 dark:border-electric-cyan/30 hover:border-electric-cyan/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] min-h-[120px] sm:min-h-[140px]
                    ${link.featured ? 'ring-2 ring-electric-cyan/50' : ''}`}
                >
                  {/* Content */}
                  <div className="flex items-center space-x-3 sm:space-x-4 h-full">
                    {/* Icon */}
                    <div 
                      className="p-2 sm:p-3 rounded-lg transition-colors duration-300 flex-shrink-0"
                      style={{
                        backgroundColor: `${link.color}20`,
                        color: link.color
                      }}
                    >
                      {link.icon}
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white dark:text-white text-base sm:text-lg mb-1 truncate">
                        {link.displayName}
                      </h3>
                      <p className="text-xs sm:text-sm text-white dark:text-gray-300 truncate">
                        {link.username}
                      </p>
                    </div>

                    {/* External Link Icon */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-white dark:text-gray-300" />
                    </div>

                    {/* Featured Badge */}
                    {link.featured && (
                      <div className="absolute top-2 right-2 bg-electric-cyan text-space-blue text-xs px-2 py-1 rounded-full font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                </a>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
};

export default SocialGrid;