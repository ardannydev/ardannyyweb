import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Palette, 
  Video, 
  Music, 
  Gamepad2, 
  Camera, 
  Mic, 
  Edit3,
  Calendar,
  MapPin,
  Star,
  Mail
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Maintenance from '../components/Maintenance';

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  color: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: 'milestone' | 'achievement' | 'project';
  icon: React.ReactNode;
}

const skills: Skill[] = [
  {
    name: 'Content Creation',
    level: 95,
    icon: <Video className="w-6 h-6" />,
    color: '#FF0000'
  },
  {
    name: 'Video Editing',
    level: 90,
    icon: <Edit3 className="w-6 h-6" />,
    color: '#8B5CF6'
  },
  {
    name: 'Gaming',
    level: 88,
    icon: <Gamepad2 className="w-6 h-6" />,
    color: '#10B981'
  },
  {
    name: 'Music Production',
    level: 75,
    icon: <Music className="w-6 h-6" />,
    color: '#F59E0B'
  },
  {
    name: 'Photography',
    level: 80,
    icon: <Camera className="w-6 h-6" />,
    color: '#EF4444'
  },
  {
    name: 'Live Streaming',
    level: 85,
    icon: <Mic className="w-6 h-6" />,
    color: '#06B6D4'
  },
  {
    name: 'Web Development',
    level: 70,
    icon: <Code className="w-6 h-6" />,
    color: '#3B82F6'
  },
  {
    name: 'Graphic Design',
    level: 78,
    icon: <Palette className="w-6 h-6" />,
    color: '#EC4899'
  }
];

const timeline: TimelineEvent[] = [
  {
    year: '2024',
    title: 'Multi-Platform Creator',
    description: 'Expanded content creation across YouTube, TikTok, and Instagram with consistent branding and engagement.',
    type: 'milestone',
    icon: <Star className="w-5 h-5" />
  },
  {
    year: '2023',
    title: 'Gaming Content Focus',
    description: 'Specialized in gaming content creation, building a dedicated community of gaming enthusiasts.',
    type: 'achievement',
    icon: <Gamepad2 className="w-5 h-5" />
  },
  {
    year: '2022',
    title: 'YouTube Channel Launch',
    description: 'Started my YouTube journey with gaming and lifestyle content, focusing on authentic storytelling.',
    type: 'project',
    icon: <Video className="w-5 h-5" />
  },
  {
    year: '2021',
    title: 'Content Creation Journey Begins',
    description: 'Discovered passion for content creation and began learning video editing and production skills.',
    type: 'milestone',
    icon: <Edit3 className="w-5 h-5" />
  }
];

const About: React.FC = () => {
  const { t } = useLanguage();

  // Return maintenance component
  return (
    <Maintenance 
      pageTitle="About Me"
      pageType="about"
    />
  );
};

export default About;