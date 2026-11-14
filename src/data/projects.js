import rpsImg from '../assets/images/projects/rps.jpg';
import weatherImg from '../assets/images/projects/weather.jpg';
import twogocoImg from '../assets/images/projects/twogoco.jpg';
import taskflowImg from '../assets/images/projects/taskflow.jpg';
import codenpixelsImg from '../assets/images/projects/codenpixels.jpg';
import truptiImg from '../assets/images/projects/truptipadhi.jpg';
import netflixImg from '../assets/images/projects/netflix.jpg';
import notesImg from '../assets/images/projects/notes.jpg';
import coffeeImg from '../assets/images/projects/coffee.jpg';
import todoImg from '../assets/images/projects/todo.jpg';

export const projectsData = [
    {
        id: 'taskflow',
        title: 'TaskFlow – Task Management Engine',
        category: 'fullstack',
        description: 'A robust full-stack Kanban task management application built with React, Vite, Node.js, Express.js, and SQLite. Features RESTful APIs for workflow orchestration, relational data modeling, priority tracking, and a fluid drag-and-drop board designed for streamlined project management.',
        image: taskflowImg,
        tags: ['React', 'Node.js', 'Express.js', 'SQLite', 'REST API'],
        link: 'https://taskflowfrontend-production-a5b4.up.railway.app/',
        github: 'https://github.com/prangya-meher/taskflow',
        featured: true,
        highlights: [
            'Full-stack architecture with decoupled React SPA and Express REST backend',
            'Relational schema design with SQLite for persistent card and column state',
            'Interactive drag-and-drop Kanban board with immediate optimistic UI updates',
            'Deployed on Railway with environment-based configuration management'
        ]
    },
    {
        id: 'trupti-padhi',
        title: 'Trupti Padhi – Market & Data Analytics Portfolio',
        category: 'analytics',
        description: 'A bespoke editorial portfolio designed and developed for a Market Research Analyst & Data Analytics Consultant. Features custom interactive BI dashboard showcases, predictive modeling case studies, animated progress milestones, and high-impact visual storytelling for consumer behavior intelligence.',
        image: truptiImg,
        tags: ['Data Analytics', 'Market Intelligence', 'Power BI', 'JavaScript', 'Responsive UI'],
        link: 'https://truptipadhi-chi.vercel.app/',
        github: 'https://github.com/prangya-meher/truptipadhi_',
        featured: true,
        highlights: [
            'Bespoke luxury editorial aesthetic pairing Cinzel display serif and Plus Jakarta Sans',
            'Interactive fullscreen splash intro with animated progress track and monogram branding',
            'Interactive expandable case study drawers showcasing data science & BI analytics projects',
            'Fully responsive across all screen sizes with lightweight, zero-dependency vanilla architecture'
        ]
    },
    {
        id: 'codenpixels',
        title: 'CodeNPixels – Modern Web Studio Platform',
        category: 'frontend',
        description: 'A responsive digital platform showcasing modern web applications, UI/UX solutions, and AI-assisted workflows. Engineered with modular React component architecture, Framer Motion transitions, and fluid responsive styling across all device viewports.',
        image: codenpixelsImg,
        tags: ['React.js', 'Vite', 'Framer Motion', 'React Router'],
        link: 'https://codenpixels.in/',
        github: 'https://github.com/prangya-meher/codenpixxels_',
        featured: true,
        highlights: [
            'Component-driven architecture optimized for reusable interactive blocks',
            'Framer Motion spring physics for smooth scroll reveals and layout transitions',
            'Lighthouse score optimization for fast first contentful paint (FCP)',
            'Clean multi-route architecture with React Router 7'
        ]
    },
    {
        id: 'twogoco-clone',
        title: 'Twogoco UI – High-End Motion Clone',
        category: 'motion',
        description: 'A high-end landing page recreation showcasing advanced frontend motion engineering. Implements GSAP for synchronized entrance animations and Locomotive Scroll for an ultra-smooth, inertial scrolling user experience.',
        image: twogocoImg,
        tags: ['GSAP', 'LocomotiveJS', 'JavaScript', 'CSS Motion'],
        link: 'https://twogoco-clone-nohjy699e-prangyanjali-mehers-projects.vercel.app/',
        github: 'https://github.com/prangya-meher/twogoco_clone',
        featured: true,
        highlights: [
            'Deep GSAP timeline integration for orchestrated stagger animations',
            'Locomotive Scroll implementation with buttery smooth page inertia',
            'Pixel-precise layout reproduction matching high-standard agency designs',
            'Fully responsive across mobile, tablet, and widescreen displays'
        ]
    },
    {
        id: 'weather-app',
        title: 'Dynamic Real-Time Weather Console',
        category: 'webapp',
        description: 'A clean, intuitive meteorological application fetching live data from global weather APIs. Features asynchronous city-based search, responsive state changes based on atmospheric conditions, and detailed atmospheric data metrics.',
        image: weatherImg,
        tags: ['JavaScript', 'REST API', 'CSS3', 'Async/Await'],
        link: 'https://weather-app-tan-six-39.vercel.app/',
        github: 'https://github.com/prangya-meher/Weather-App',
        featured: false,
        highlights: [
            'Asynchronous API fetching with structured error handling for invalid cities',
            'Dynamic UI styling that adapts based on temperature and atmospheric metrics',
            'Lightweight vanilla JavaScript architecture for zero-overhead performance',
            'Detailed metrics breakdown: humidity, wind velocity, and condition indices'
        ]
    },
    {
        id: 'rock-paper-scissors',
        title: 'Interactive Rock Paper Scissors Arena',
        category: 'webapp',
        description: 'An interactive browser game featuring smooth state transitions and logic-driven gameplay. Users play against an algorithm with instant score tracking, persistent state, and an engaging visual feedback loop.',
        image: rpsImg,
        tags: ['JavaScript', 'DOM Manipulation', 'CSS Animations'],
        link: 'https://game-lvft795s3-prangyanjali-mehers-projects.vercel.app/',
        github: 'https://github.com/prangya-meher/GameHub',
        featured: false,
        highlights: [
            'Pure vanilla JavaScript game logic with randomized decision algorithms',
            'Real-time win/loss/tie state computation and round score tracking',
            'Engaging CSS keyframe animations for tactile feedback on each round',
            'Clean responsive design playable on mobile and desktop'
        ]
    }
];
