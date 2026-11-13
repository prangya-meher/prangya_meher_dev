import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Code, Layers, Zap, Database, CheckCircle2, MapPin } from 'lucide-react';
import profileImg from '../assets/images/about/profile.jpg';
import { useTheme } from '../context/ThemeContext';
import './About.css';

const skillCategories = [
    { id: 'all', label: 'ALL STACK' },
    { id: 'frontend', label: 'FRONTEND & UI' },
    { id: 'motion', label: 'MOTION & ANIMATION' },
    { id: 'backend', label: 'BACKEND & DATA' },
    { id: 'tools', label: 'DEV TOOLS' },
];

const skillsList = [
    { name: 'React.js', category: 'frontend', level: 'Production Core', desc: 'Component architecture, Hooks, Context, State & Routing' },
    { name: 'JavaScript (ES6+)', category: 'frontend', level: 'Advanced', desc: 'Asynchronous workflows, DOM manipulation, Clean Standards' },
    { name: 'HTML5 & Semantic Web', category: 'frontend', level: 'Mastery', desc: 'Accessible, SEO-Ready markup & micro-data' },
    { name: 'CSS3 / Modern CSS', category: 'frontend', level: 'Mastery', desc: 'Flexbox, Grid systems, Custom Properties, Fluid Layouts' },
    { name: 'Tailwind CSS', category: 'frontend', level: 'Production Ready', desc: 'Utility-first rapid responsive engineering' },
    { name: 'Bootstrap', category: 'frontend', level: 'Proficient', desc: 'Grid systems & rapid enterprise layouts' },
    
    { name: 'GSAP (GreenSock)', category: 'motion', level: 'Specialist', desc: 'Orchestrated timelines, ScrollTrigger, high-perf animation' },
    { name: 'Framer Motion', category: 'motion', level: 'Production Ready', desc: 'Spring physics, layout gestures & page transitions' },
    { name: 'Locomotive Scroll', category: 'motion', level: 'Creative Dev', desc: 'Inertial smooth scrolling & parallax depth' },

    { name: 'Node.js', category: 'backend', level: 'Full-Stack Core', desc: 'Server environments & NPM architecture' },
    { name: 'Express.js', category: 'backend', level: 'REST APIs', desc: 'Middleware, controllers, JSON contracts' },
    { name: 'SQLite', category: 'backend', level: 'Relational DB', desc: 'Schema architecture & relational queries' },
    { name: 'MongoDB', category: 'backend', level: 'NoSQL DB', desc: 'Document schemas & Atlas management' },
    { name: 'Django', category: 'backend', level: 'Framework', desc: 'MVC architecture & backend application logic' },

    { name: 'Git & GitHub', category: 'tools', level: 'Essential Workflow', desc: 'Version control, PRs, collaborative branching' },
    { name: 'Vite & Bundlers', category: 'tools', level: 'Modern Tooling', desc: 'High-speed HMR & build optimization' },
    { name: 'REST APIs', category: 'tools', level: 'Integration', desc: 'Axios, Fetch, JSON data modeling' },
    { name: 'WordPress', category: 'tools', level: 'CMS Platform', desc: 'Custom themes & digital publishing' },
];

const About = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const { playClickSound } = useTheme();

    const filteredSkills = activeFilter === 'all'
        ? skillsList
        : skillsList.filter(s => s.category === activeFilter);

    return (
        <section className="about-editorial-page">
            <div className="container">
                {/* Header */}
                <div className="section-header">
                    <span className="section-tag font-sans">ABOUT ME</span>
                    <h1 className="section-title font-serif">
                        ARCHITECTING DIGITAL SPACES THAT FEEL EFFORTLESS.
                    </h1>
                    <p className="section-subtitle font-sans">
                        A focused look into my technical background, development methodology, and the technology stack I rely on to construct production web applications.
                    </p>
                </div>

                {/* Editorial Bento Grid */}
                <div className="about-editorial-grid">
                    {/* Left: Profile ID Card */}
                    <div className="editorial-card profile-id-card">
                        <div className="profile-img-container">
                            <img src={profileImg} alt="Prangyanjali Meher" className="profile-photo-editorial" />
                            <div className="profile-status-badge font-sans">
                                <span>✦ AVAILABLE FOR OPPORTUNITIES</span>
                            </div>
                        </div>

                        <div className="profile-meta-details">
                            <div className="profile-name-header">
                                <h3 className="profile-full-name font-serif">PRANGYANJALI MEHER</h3>
                                <p className="profile-geo font-sans">
                                    <MapPin size={14} /> ODISHA, INDIA
                                </p>
                            </div>

                            <p className="profile-bio-text font-sans">
                                I am a dedicated <strong>Frontend & Full-Stack Developer</strong> with a background in modern web engineering and creative motion. I focus on creating digital products that balance aesthetic beauty, intuitive user flow, and clean backend logic.
                            </p>

                            <div className="profile-bullet-points font-sans">
                                <div className="bullet-row">
                                    <CheckCircle2 size={15} />
                                    <span>Specialized in React, Modern JS & Component Architecture</span>
                                </div>
                                <div className="bullet-row">
                                    <CheckCircle2 size={15} />
                                    <span>High-Performance Motion with GSAP & Locomotive Scroll</span>
                                </div>
                                <div className="bullet-row">
                                    <CheckCircle2 size={15} />
                                    <span>Full-Stack REST APIs with Node.js, Express & SQLite</span>
                                </div>
                            </div>

                            <div className="profile-action-btn">
                                <a
                                    href="/PRANGYANJALI-MEHER-%20Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                    onClick={playClickSound}
                                >
                                    DOWNLOAD CURRICULUM VITAE <Download size={15} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right: Technical Stack Matrix */}
                    <div className="editorial-card skills-matrix-card">
                        <div className="matrix-top-bar">
                            <div>
                                <h3 className="matrix-heading font-serif">TECHNICAL CAPABILITIES</h3>
                                <p className="matrix-sub font-sans">Verified stack competencies categorized by domain</p>
                            </div>

                            {/* Filter tabs */}
                            <div className="matrix-tabs-row">
                                {skillCategories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        className={`matrix-tab-btn font-sans ${activeFilter === cat.id ? 'active' : ''}`}
                                        onClick={() => {
                                            playClickSound();
                                            setActiveFilter(cat.id);
                                        }}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <motion.div layout className="skills-editorial-grid">
                            <AnimatePresence>
                                {filteredSkills.map((skill) => (
                                    <motion.div
                                        key={skill.name}
                                        layout
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 15 }}
                                        transition={{ duration: 0.2 }}
                                        className="skill-cell-item"
                                    >
                                        <div className="skill-cell-top">
                                            <span className="skill-cell-name font-serif">{skill.name}</span>
                                            <span className="skill-cell-level font-sans">{skill.level}</span>
                                        </div>
                                        <p className="skill-cell-desc font-sans">{skill.desc}</p>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Full Width Pillars Row */}
                    <div className="about-pillars-fullwidth">
                        <div className="pillar-editorial-card">
                            <div className="pillar-num font-serif">01</div>
                            <h4 className="pillar-title font-sans">CLEAN COMPONENT ARCHITECTURE</h4>
                            <p className="pillar-desc font-sans">
                                Writing DRY, modular, and maintainable code with strict component boundaries, reusable design systems, and robust state flow.
                            </p>
                        </div>

                        <div className="pillar-editorial-card">
                            <div className="pillar-num font-serif">02</div>
                            <h4 className="pillar-title font-sans">FLUID GSAP MOTION & PERFORMANCE</h4>
                            <p className="pillar-desc font-sans">
                                Leveraging GreenSock timelines, ScrollTrigger, and GPU acceleration to create tactile 60fps micro-interactions without performance drag.
                            </p>
                        </div>

                        <div className="pillar-editorial-card">
                            <div className="pillar-num font-serif">03</div>
                            <h4 className="pillar-title font-sans">END-TO-END DATA & APIS</h4>
                            <p className="pillar-desc font-sans">
                                Extending frontend interfaces with robust Node.js and Express RESTful endpoints, relational SQLite models, and structured databases.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
