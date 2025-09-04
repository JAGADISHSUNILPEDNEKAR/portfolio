// Portfolio data and constants
export const PERSONAL_INFO = {
  name: 'Jagadish Sunil Pednekar',
  title: 'Creative Developer',
  subtitle: 'I craft exceptional digital experiences with modern technologies, turning complex problems into elegant solutions.',
  email: 'jagadish@example.com', 
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  resume: '/resume.pdf'
};

export const SOCIAL_LINKS = {
  github: 'https://github.com/JAGADISHSUNILPEDNEKAR',
  linkedin: 'https://linkedin.com/in/jagadish-pednekar',
  twitter: 'https://twitter.com/jagadish_dev',
  website: 'https://jagadish.dev'
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