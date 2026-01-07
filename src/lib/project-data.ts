export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    technologies: string[];
    github: string;
    demo: string;
    featured: boolean;
    status: 'Deployed' | 'In Development' | 'Archived' | 'Prototype';
}

export const projects: Project[] = [
    {
        id: 1,
        title: 'Payroll_Management_System',
        description: 'Terminal-based COBOL payroll system with employee management, automated salary calculations including overtime and tax, CSV export, and secure admin authentication.',
        image: '/images/projects/PMS.png',
        category: 'systems',
        technologies: ['COBOL', 'GnuCOBOL', 'CLI', 'File System'],
        github: 'https://github.com/JAGADISHSUNILPEDNEKAR/Payroll_Management_System',
        demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/Payroll_Management_System',
        featured: true,
        status: 'Archived'
    },
    {
        id: 2,
        title: 'portfolio',
        description: 'Modern portfolio website built with Next.js showcasing projects and skills with optimized fonts and responsive design.',
        image: '/images/projects/Portfolio.webp',
        category: 'web',
        technologies: ['Next.js', 'React', 'TypeScript', 'Vercel'],
        github: 'https://github.com/JAGADISHSUNILPEDNEKAR/portfolio',
        demo: 'https://jagadishsunilpednekarportfolio.vercel.app/',
        featured: true,
        status: 'Deployed'
    },
    {
        id: 3,
        title: 'Guess-the-number',
        description: 'Interactive number guessing game with single and multiplayer modes, performance classification, real-time scoring leaderboard, and celebratory fireworks animations.',
        image: '/images/projects/GTN.png',
        category: 'web',
        technologies: ['JavaScript', 'HTML', 'CSS', 'Canvas Confetti'],
        github: 'https://github.com/JAGADISHSUNILPEDNEKAR/Guess-the-number',
        demo: 'https://jagadishsunilpednekar.github.io/Guess-the-number/',
        featured: true,
        status: 'Deployed'
    },
    {
        id: 4,
        title: 'MusicPlayer',
        description: 'Feature-rich WPF music player with playlist management, supporting multiple audio formats (MP3, WAV, FLAC), shuffle and repeat modes, and persistent settings.',
        image: '/images/projects/MP.webp',
        category: 'design',
        technologies: ['C#', 'WPF', '.NET', 'NAudio', 'TagLib'],
        github: 'https://github.com/JAGADISHSUNILPEDNEKAR/MusicPlayer',
        demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/MusicPlayer',
        featured: false,
        status: 'Archived'
    },
    {
        id: 5,
        title: 'TICTACTOE',
        description: 'iOS Tic-Tac-Toe game with intelligent AI opponents using minimax algorithm, featuring MVVM architecture, smooth animations, and multiple difficulty levels.',
        image: '/images/projects/ttt.png',
        category: 'mobile',
        technologies: ['Swift', 'SwiftUI', 'Combine', 'iOS'],
        github: 'https://github.com/JAGADISHSUNILPEDNEKAR/TICTACTOE',
        demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/TICTACTOE',
        featured: false,
        status: 'Archived'
    },
    {
        id: 6,
        title: 'kenken-game',
        description: 'Mathematical puzzle game implementing KenKen logic with constraint satisfaction and interactive gameplay.',
        image: '/images/projects/kenken.jpg',
        category: 'web',
        technologies: ['JavaScript', 'HTML', 'CSS', 'Game Logic'],
        github: 'https://github.com/JAGADISHSUNILPEDNEKAR/kenken-game',
        demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/kenken-game',
        featured: false,
        status: 'Deployed'
    },
    {
        id: 7,
        title: 'blockchain-lottery-platform',
        description: 'Decentralized lottery and gaming platform with Chainlink VRF for provable randomness, featuring automated payouts, blackjack, and bingo on Ethereum blockchain.',
        image: '/images/projects/BLP.png',
        category: 'blockchain',
        technologies: ['Solidity', 'React', 'Ethers.js', 'Chainlink', 'Hardhat'],
        github: 'https://github.com/JAGADISHSUNILPEDNEKAR/blockchain-lottery-platform',
        demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/blockchain-lottery-platform',
        featured: true,
        status: 'In Development'
    },
    {
        id: 8,
        title: 'toy-docker-compose',
        description: 'Simplified Docker Compose implementation in Scala with YAML parsing, service orchestration, dependency resolution, and comprehensive logging for container management.',
        image: '/images/projects/scala-docker.png',
        category: 'systems',
        technologies: ['Scala', 'SBT', 'Docker', 'YAML', 'SnakeYAML'],
        github: 'https://github.com/JAGADISHSUNILPEDNEKAR/toy-docker-compose',
        demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/toy-docker-compose',
        featured: false,
        status: 'Prototype'
    },
    {
        id: 9,
        title: 'monoalphabetic-cipher',
        description: 'Assembly-based encryption tool implementing monoalphabetic substitution cipher with case preservation, input validation, and educational cryptography demonstration.',
        image: '/images/projects/mc.jpeg',
        category: 'systems',
        technologies: ['Assembly', 'x86-64', 'NASM', 'Linux'],
        github: 'https://github.com/JAGADISHSUNILPEDNEKAR/monoalphabetic-cipher',
        demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/monoalphabetic-cipher',
        featured: false,
        status: 'Prototype'
    },
    {
        id: 10,
        title: 'J-MATH-SOLVER',
        description: 'Interactive mathematical problem solver using J programming language for algebraic equations, statistics, calculus, and Monte Carlo simulations with CLI and API support.',
        image: '/images/projects/jsolver.png',
        category: 'fullstack',
        technologies: ['J', 'Node.js', 'JavaScript', 'Linear Algebra'],
        github: 'https://github.com/JAGADISHSUNILPEDNEKAR/J-MATH-SOLVER',
        demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/J-MATH-SOLVER',
        featured: false,
        status: 'Prototype'
    },
    {
        id: 11,
        title: 'CFD_SOLVER',
        description: 'Computational Fluid Dynamics solver for Navier-Stokes equations with turbulence modeling, parallel computing support (OpenMP/MPI), and multiple discretization schemes.',
        image: '/images/projects/CFD.webp',
        category: 'systems',
        technologies: ['Fortran', 'C++', 'OpenMP', 'MPI', 'CMake'],
        github: 'https://github.com/JAGADISHSUNILPEDNEKAR/CFD_SOLVER',
        demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/CFD_SOLVER',
        featured: true,
        status: 'Prototype'
    },
    {
        id: 12,
        title: 'JuiceWRLD',
        description: 'Dynamic music website with real-time lyrics synchronization during playback, featuring engaging UI, playlist functionality, and Web Audio API integration.',
        image: '/images/projects/JW.jpeg',
        category: 'web',
        technologies: ['JavaScript', 'HTML', 'CSS', 'Web Audio API'],
        github: 'https://github.com/JAGADISHSUNILPEDNEKAR/JuiceWRLD',
        demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/JuiceWRLD',
        featured: false,
        status: 'Deployed'
    },
    {
        id: 13,
        title: 'CodePilot_Ai',
        description: 'AI-powered code review platform detecting bugs and security vulnerabilities, with GitHub integration, health scoring, contextual explanations, and educational feedback for developers.',
        image: '/images/projects/CodePilot.png',
        category: 'ai',
        technologies: ['React', 'Node.js', 'MongoDB', 'Gemini API', 'Express'],
        github: 'https://github.com/PriyanshuPandey008/CodePilot_Ai',
        demo: 'https://ai-code-frontend.vercel.app',
        featured: true,
        status: 'Deployed'
    },
    {
        id: 14,
        title: 'Habit_Tracker',
        description: 'Web application for building healthy habits with interactive calendar, progress visualization, habit logging, and persistent local storage for consistent tracking.',
        image: '/images/projects/HabitTracker.png',
        category: 'web',
        technologies: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
        github: 'https://github.com/raj-aryan-official/Habit-Tracker-',
        demo: 'https://vermillion-longma-89f32f.netlify.app/',
        featured: true,
        status: 'Deployed'
    },
    {
        id: 15,
        title: 'Brainerzz',
        description: 'Study platform generating interactive flashcards from lengthy texts using NLP, extracting key definitions and formulas to reduce exam anxiety and enhance learning efficiency.',
        image: '/images/projects/Brainerzz.png',
        category: 'fullstack',
        technologies: ['Node.js', 'Express', 'MongoDB', 'NLP', 'JWT'],
        github: 'https://github.com/JAGADISHSUNILPEDNEKAR/Final-Project-GSoC',
        demo: 'https://incredible-daffodil-552b7d.netlify.app/index.html',
        featured: true,
        status: 'Deployed'
    }
];

export const projectCategories = ['all', 'web', 'mobile', 'fullstack', 'design', 'systems', 'blockchain', 'ai'];
