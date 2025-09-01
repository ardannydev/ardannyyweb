import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Youtube,
  Instagram,
  Github,
  Twitter,
  MessageCircle,
  Music
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Maintenance from '../components/Maintenance';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const socialLinks = [
  {
    platform: 'YouTube',
    url: 'https://youtube.com/@ardaannyy',
    icon: <Youtube className="w-6 h-6" />,
    color: '#FF0000'
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/ardaannyy',
    icon: <Instagram className="w-6 h-6" />,
    color: '#E4405F'
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/ardaannyy',
    icon: <Github className="w-6 h-6" />,
    color: '#333333'
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com/ardaannyy',
    icon: <Twitter className="w-6 h-6" />,
    color: '#1DA1F2'
  },
  {
    platform: 'Discord',
    url: 'https://discord.gg/ardaannyy',
    icon: <MessageCircle className="w-6 h-6" />,
    color: '#5865F2'
  },
  {
    platform: 'Spotify',
    url: 'https://open.spotify.com/user/ardaannyy',
    icon: <Music className="w-6 h-6" />,
    color: '#1DB954'
  }
];

const Contact: React.FC = () => {
  const { t } = useLanguage();

  // Return maintenance component
  return (
    <Maintenance 
      pageTitle="Contact Me"
      pageType="contact"
    />
  );
};

export default Contact;