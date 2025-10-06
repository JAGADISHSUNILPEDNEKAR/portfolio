// Portfolio data and constants
export const PERSONAL_INFO = {
  name: 'Jagadish Sunil Pednekar',
  title: 'Creative Developer',
  subtitle: 'I craft exceptional digital experiences with modern technologies, turning complex problems into elegant solutions.',
  email: 'jspher16@gmail.com', 
  phone: '+91-8073671781',
  location: 'Bangalore,India',
  resume: '/resume.pdf'
};

export const SOCIAL_LINKS = {
  github: 'https://github.com/JAGADISHSUNILPEDNEKAR',
  linkedin: 'https://linkedin.com/in/jagadish-pednekar',
  twitter: 'https://twitter.com/jagadish_dev',
  website: 'https://jagadishsunilpednekarportfolio.vercel.app/'
};

export const SKILLS = {
  frontend: [
    { name: 'React.js', level: 95 },
    { name: 'Next.js', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Tailwind CSS', level: 92 }
  ],
  backend: [
    { name: 'Node.js', level: 88 },
    { name: 'Python', level: 82 },
    { name: 'Express', level: 85 },
    { name: 'FastAPI', level: 78 }
  ],
  database: [
    { name: 'PostgreSQL', level: 85 },
    { name: 'MongoDB', level: 80 },
    { name: 'Redis', level: 75 },
    { name: 'Prisma', level: 88 }
  ],
  tools: [
    { name: 'Git', level: 92 },
    { name: 'Docker', level: 78 },
    { name: 'AWS', level: 75 },
    { name: 'Vercel', level: 90 }
  ]
};

export const PROJECTS = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution built with Next.js, Stripe, and PostgreSQL',
    image: '/images/projects/ecommerce.jpg',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind'],
    github: 'https://github.com/username/ecommerce',
    demo: 'https://ecommerce-demo.vercel.app',
    featured: true
  },
  {
    id: '2', 
    title: 'Task Management App',
    description: 'Collaborative task management with real-time updates using WebSockets',
    image: '/images/projects/taskmanager.jpg',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    github: 'https://github.com/username/taskmanager',
    demo: 'https://taskmanager-demo.vercel.app',
    featured: true
  }
];

export const THEME_CONFIG = {
  colors: {
    primary: {
      light: '#3b82f6',
      dark: '#1d4ed8'
    },
    secondary: {
      light: '#8b5cf6', 
      dark: '#7c3aed'
    }
  }
};

// Section-specific themes for distinct visual identity
export const SECTION_THEMES = {
  hero: {
    gradient: 'from-[#0F0C29] via-[#302b63] to-[#24243e]', // Deep space gradient
    accent: '#8B5CF6', // Purple accent
    particles: ['#8B5CF6', '#EC4899', '#06B6D4'],
    background: 'bg-gradient-to-br from-[#0F0C29] via-[#302b63] to-[#24243e]',
    text: {
      primary: '#FFFFFF',
      secondary: '#E5E7EB',
      muted: '#9CA3AF'
    }
  },
  about: {
    gradient: 'from-[#1a1c3d] via-[#2d1b69] to-[#0f0c29]', // Rich purple-blue
    accent: '#06B6D4', // Cyan accent
    background: 'bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950',
    text: {
      primary: '#FFFFFF',
      secondary: '#CBD5E1',
      muted: '#94A3B8'
    }
  },
  skills: {
    gradient: 'from-[#1e3c72] via-[#2a5298] to-[#1e3c72]', // Ocean blue gradient
    accent: '#10B981', // Emerald accent
    background: 'bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950',
    text: {
      primary: '#FFFFFF',
      secondary: '#DBEAFE',
      muted: '#93C5FD'
    }
  },
  projects: {
    gradient: 'from-[#232526] via-[#414345] to-[#232526]', // Sophisticated dark
    accent: '#F59E0B', // Amber accent
    background: 'bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950',
    text: {
      primary: '#FFFFFF',
      secondary: '#E5E7EB',
      muted: '#9CA3AF'
    }
  },
  contact: {
    gradient: 'from-[#0f0c29] via-[#302b63] to-[#24243e]', // Return to hero theme
    accent: '#EC4899', // Pink accent
    background: 'bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950',
    text: {
      primary: '#FFFFFF',
      secondary: '#FCE7F3',
      muted: '#F9A8D4'
    }
  }
};

// Animation variants for GSAP and Framer Motion
export const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
  },
  fadeInScale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  slideInLeft: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
  },
  slideInRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
  },
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }
};

// GSAP Animation configurations
export const GSAP_CONFIG = {
  fadeInUp: {
    from: { opacity: 0, y: 60, scale: 0.95 },
    to: { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' }
  },
  slideInLeft: {
    from: { opacity: 0, x: -100 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
  },
  slideInRight: {
    from: { opacity: 0, x: 100 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.5 },
    to: { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
  },
  rotateIn: {
    from: { opacity: 0, rotation: -180, scale: 0.5 },
    to: { opacity: 1, rotation: 0, scale: 1, duration: 1, ease: 'back.out(1.7)' }
  }
};

// Hover effects for interactive elements
export const HOVER_EFFECTS = {
  projectCard: {
    hover: { scale: 1.05, y: -10, rotationY: 5 },
    rest: { scale: 1, y: 0, rotationY: 0 },
    duration: 0.3
  },
  skillIcon: {
    hover: { scale: 1.2, rotate: 360 },
    rest: { scale: 1, rotate: 0 },
    duration: 0.5
  },
  button: {
    hover: { scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.3)' },
    rest: { scale: 1, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' },
    duration: 0.2
  }
};

// Background animation configs
export const BACKGROUND_ANIMATIONS = {
  gradientShift: {
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  },
  floatingParticles: {
    y: { duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' },
    x: { duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' },
    rotation: { duration: 8, repeat: -1, ease: 'none' }
  }
};

// Responsive breakpoints
export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1280px',
  wide: '1536px'
};

// Animation timing constants
export const TIMING = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  verySlow: 1.2
};

// Z-index layers
export const Z_INDEX = {
  background: -1,
  content: 1,
  header: 10,
  modal: 50,
  tooltip: 100
};