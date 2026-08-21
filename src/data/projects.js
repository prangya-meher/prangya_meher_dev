import rpsImg from '../assets/images/projects/rps.jpg';
import weatherImg from '../assets/images/projects/weather.jpg';
import twogocoImg from '../assets/images/projects/twogoco.jpg';
import taskflowImg from '../assets/images/projects/taskflow.jpg';
import codenpixelsImg from '../assets/images/projects/codenpixels.jpg';

export const projectsData = [
    {
        id: 'taskflow',
        title: 'TaskFlow – Task Management',
        description: 'A full-stack Kanban-style task management application built with React, Vite, Node.js, Express.js, and SQLite. Features RESTful APIs for workflow management, relational data modeling, and an interactive drag-and-drop task board with priority management.',
        image: taskflowImg,
        tags: ['React', 'Node.js', 'Express.js', 'SQLite'],
        link: 'https://taskflowfrontend-production-a5b4.up.railway.app/',
        github: 'https://github.com/prangya-meher/taskflow'
    },
    {
        id: 'codenpixels',
        title: 'CodeNPixels – Web Platform',
        description: 'A responsive modern business platform showcasing AI-powered web development, modern web applications, UI/UX, and digital solutions. Built with reusable React component architecture, Framer Motion animations, and fluid responsive layouts.',
        image: codenpixelsImg,
        tags: ['React.js', 'Vite', 'Framer Motion', 'React Router'],
        link: 'https://codenpixels.in/',
        github: 'https://github.com/prangya-meher/codenpixxels_'
    },
    {
        id: 'rock-paper-scissors',
        title: 'Rock Paper Scissors',
        description: 'An interactive game featuring smooth animations and logic-driven gameplay. Users can play against a randomized AI, with real-time score tracking and a modern, vibrant interface built with vanilla JavaScript.',
        image: rpsImg,
        tags: ['HTML', 'CSS', 'JavaScript'],
        link: 'https://game-lvft795s3-prangyanjali-mehers-projects.vercel.app/',
        github: 'https://github.com/prangya-meher/GameHub'
    },
    {
        id: 'weather-app',
        title: 'Dynamic Weather App',
        description: 'A clean, intuitive weather application that fetches real-time data from a global weather API. Features city-based searching, dynamic background changes based on weather conditions, and detailed atmospheric data.',
        image: weatherImg,
        tags: ['HTML', 'CSS', 'JavaScript', 'API'],
        link: 'https://weather-app-tan-six-39.vercel.app/',
        github: 'https://github.com/prangya-meher/Weather-App'
    },
    {
        id: 'twogoco-clone',
        title: 'Twogoco UI Clone',
        description: 'A premium landing page clone showcasing advanced frontend techniques. Implements GSAP for ultra-smooth entrance animations and LocomotiveJS for a modern, high-end "smooth scroll" experience.',
        image: twogocoImg,
        tags: ['GSAP', 'LocomotiveJS', 'JavaScript'],
        link: 'https://twogoco-clone-nohjy699e-prangyanjali-mehers-projects.vercel.app/',
        github: 'https://github.com/prangya-meher/twogoco_clone'
    }
];
