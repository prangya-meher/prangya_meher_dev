import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, MapPin, ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, Sparkles, Cpu } from 'lucide-react';
import {
    SiReact,
    SiJavascript,
    SiHtml5,
    SiCss,
    SiTailwindcss,
    SiBootstrap,
    SiGreensock,
    SiFramer,
    SiNodedotjs,
    SiExpress,
    SiSqlite,
    SiMongodb,
    SiDjango,
    SiGit,
    SiVite,
    SiWordpress
} from 'react-icons/si';
import profileImg from '../assets/images/about/profile.png';
import { useTheme } from '../context/ThemeContext';
import './About.css';

/* ─── Skill Categories ─── */
const skillCategories = [
    { id: 'all', label: 'ALL STACK' },
    { id: 'frontend', label: 'FRONTEND & UI' },
    { id: 'motion', label: 'MOTION & ANIMATION' },
    { id: 'backend', label: 'BACKEND & DATA' },
    { id: 'tools', label: 'DEV TOOLS' },
];

/* ─── Skills Data (Icon + Name Only) ─── */
const skillsList = [
    { name: 'React.js', category: 'frontend', icon: <SiReact size={30} /> },
    { name: 'JavaScript', category: 'frontend', icon: <SiJavascript size={30} /> },
    { name: 'HTML5', category: 'frontend', icon: <SiHtml5 size={30} /> },
    { name: 'CSS3', category: 'frontend', icon: <SiCss size={30} /> },
    { name: 'Tailwind CSS', category: 'frontend', icon: <SiTailwindcss size={30} /> },
    { name: 'Bootstrap', category: 'frontend', icon: <SiBootstrap size={30} /> },

    { name: 'GSAP', category: 'motion', icon: <SiGreensock size={30} /> },
    { name: 'Framer Motion', category: 'motion', icon: <SiFramer size={30} /> },
    { name: 'Locomotive Scroll', category: 'motion', icon: <Sparkles size={30} /> },

    { name: 'Node.js', category: 'backend', icon: <SiNodedotjs size={30} /> },
    { name: 'Express.js', category: 'backend', icon: <SiExpress size={30} /> },
    { name: 'SQLite', category: 'backend', icon: <SiSqlite size={30} /> },
    { name: 'MongoDB', category: 'backend', icon: <SiMongodb size={30} /> },
    { name: 'Django', category: 'backend', icon: <SiDjango size={30} /> },

    { name: 'Git & GitHub', category: 'tools', icon: <SiGit size={30} /> },
    { name: 'Vite', category: 'tools', icon: <SiVite size={30} /> },
    { name: 'REST APIs', category: 'tools', icon: <Cpu size={30} /> },
    { name: 'WordPress', category: 'tools', icon: <SiWordpress size={30} /> },
];

const About = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [isPaused, setIsPaused] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const sliderRef = useRef(null);
    const { playClickSound } = useTheme();

    const filteredSkills = activeFilter === 'all'
        ? skillsList
        : skillsList.filter(s => s.category === activeFilter);

    /* Check scroll bounds */
    const updateScrollBounds = () => {
        if (!sliderRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    /* Manual navigation */
    const handleScroll = (direction) => {
        playClickSound();
        if (!sliderRef.current) return;
        const scrollAmount = direction === 'left' ? -380 : 380;
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    /* Auto-play slider interval */
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            if (!sliderRef.current) return;
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

            // Loop smoothly back to start if at end
            if (scrollLeft + clientWidth >= scrollWidth - 20) {
                sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                sliderRef.current.scrollBy({ left: 190, behavior: 'smooth' });
            }
        }, 2800);

        return () => clearInterval(interval);
    }, [isPaused, filteredSkills]);

    /* Reset scroll position when filter changes */
    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            updateScrollBounds();
        }
    }, [activeFilter]);

    return (
        <section className="about-editorial-page">
            <div className="container">

                {/* ============================================================
                    1. HERO STAGE (INSPIRED BY REFERENCE DESIGN)
                   ============================================================ */}
                <div className="about-hero-stage">
                    {/* Left Rail: Giant Vertical Typography "ABOUT" */}
                    <div className="about-vertical-rail" aria-hidden="true">
                        <span className="about-giant-vertical-text font-serif">
                            ABOUT
                        </span>
                    </div>

                    {/* Main Split: Left (Image slides in) + Right (Text appears from right) */}
                    <div className="about-hero-split">

                        {/* Profile Image Column (Slides in from the left) */}
                        <motion.div
                            className="about-image-column"
                            initial={{ opacity: 0, x: -70 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="about-photo-frame">
                                <img
                                    src={profileImg}
                                    alt="Prangyanjali Meher – Frontend & Full-Stack Developer"
                                    className="about-profile-photo"
                                />

                                {/* Subtle status pill inside photo */}
                                <div className="about-status-pill font-sans">
                                    <span className="status-dot-pulse" />
                                    <span>AVAILABLE FOR WORK</span>
                                </div>
                            </div>

                            {/* Floating decorative elements */}
                            <div className="about-deco-ring" aria-hidden="true" />
                            <div className="about-deco-cross" aria-hidden="true">+</div>

                            {/* Reference-style "SAY HELLO" circular badge */}
                            <Link
                                to="/contact"
                                className="about-say-hello-badge"
                                onClick={playClickSound}
                                title="Contact Prangyanjali"
                            >
                                <span className="say-hello-text font-sans">SAY HELLO</span>
                                <ArrowUpRight size={14} className="say-hello-arrow" />
                            </Link>
                        </motion.div>

                        {/* Text Content Column (Appears from the right) */}
                        <motion.div
                            className="about-text-column"
                            initial={{ opacity: 0, x: 70 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                        >
                            <div className="about-lead-header">
                                <span className="about-section-tag font-sans">ABOUT ME</span>
                                <h1 className="about-lead-title font-serif">
                                    ARCHITECTING DIGITAL SPACES THAT FEEL EFFORTLESS.
                                </h1>
                                <p className="about-role-location font-sans">
                                    <MapPin size={14} /> FRONTEND &amp; FULL-STACK DEVELOPER • ODISHA, INDIA
                                </p>
                            </div>

                            <p className="about-lead-narrative font-sans">
                                I am a dedicated <strong>Frontend &amp; Full-Stack Developer</strong> specializing in
                                clean component architecture, creative GSAP motion, and decoupled RESTful APIs. I balance
                                modern aesthetic precision with intuitive user flow and robust backend logic.
                            </p>

                            {/* Key Highlights */}
                            <div className="about-highlights-list font-sans">
                                <div className="highlight-row">
                                    <CheckCircle2 size={16} className="highlight-icon" />
                                    <span>Specialized in React, Modern JS &amp; Modular Component Systems</span>
                                </div>
                                <div className="highlight-row">
                                    <CheckCircle2 size={16} className="highlight-icon" />
                                    <span>High-Performance Creative Motion with GSAP &amp; Framer Motion</span>
                                </div>
                                <div className="highlight-row">
                                    <CheckCircle2 size={16} className="highlight-icon" />
                                    <span>Full-Stack REST APIs with Node.js, Express &amp; Relational SQLite</span>
                                </div>
                            </div>

                            {/* CTA Action Row */}
                            <div className="about-actions-row">
                                <Link
                                    to="/projects"
                                    className="btn about-projects-btn"
                                    onClick={playClickSound}
                                >
                                    <span>VIEW PROJECTS</span>
                                    <ArrowRight size={15} className="btn-arrow" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* ============================================================
                    2. TECHNICAL CAPABILITIES (INTERACTIVE TECH STACK SLIDER)
                   ============================================================ */}
                <div className="about-tech-slider-section">
                    <div className="tech-slider-header-row">
                        <div>
                            <span className="section-tag font-sans">VERIFIED STACK</span>
                            <h2 className="tech-slider-heading font-serif">TECHNICAL CAPABILITIES</h2>
                        </div>

                        {/* Right: Category Tabs & Slider Navigation Arrows */}
                        <div className="tech-slider-controls-group">
                            {/* Filter Tabs */}
                            <div className="skills-tabs-container">
                                {skillCategories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        className={`skills-tab-pill font-sans ${activeFilter === cat.id ? 'active' : ''}`}
                                        onClick={() => {
                                            playClickSound();
                                            setActiveFilter(cat.id);
                                        }}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>

                            {/* Slider Navigation Arrows */}
                            <div className="slider-arrows-group">
                                <button
                                    onClick={() => handleScroll('left')}
                                    className={`slider-arrow-btn ${!canScrollLeft ? 'disabled' : ''}`}
                                    aria-label="Previous slide"
                                    title="Previous"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    onClick={() => handleScroll('right')}
                                    className={`slider-arrow-btn ${!canScrollRight ? 'disabled' : ''}`}
                                    aria-label="Next slide"
                                    title="Next"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Horizontal Smooth Slider Track */}
                    <div
                        className="tech-slider-viewport"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                    >
                        <div
                            className="tech-slider-track"
                            ref={sliderRef}
                            onScroll={updateScrollBounds}
                        >
                            {filteredSkills.map((skill) => (
                                <div key={skill.name} className="tech-slide-card">
                                    <div className="slide-icon-box">
                                        {skill.icon}
                                    </div>
                                    <span className="slide-tech-name font-sans">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ============================================================
                    3. ARCHITECTURAL PILLARS (METHODOLOGY)
                   ============================================================ */}
                <div className="about-pillars-section">
                    <div className="pillars-grid">
                        <div className="pillar-editorial-card">
                            <div className="pillar-num font-serif">01</div>
                            <h3 className="pillar-title font-sans">CLEAN COMPONENT ARCHITECTURE</h3>
                            <p className="pillar-desc font-sans">
                                Writing DRY, modular, and maintainable code with strict component boundaries, reusable design systems, and robust state flow.
                            </p>
                        </div>

                        <div className="pillar-editorial-card">
                            <div className="pillar-num font-serif">02</div>
                            <h3 className="pillar-title font-sans">FLUID GSAP MOTION &amp; PERFORMANCE</h3>
                            <p className="pillar-desc font-sans">
                                Leveraging GreenSock timelines, ScrollTrigger, and GPU acceleration to create tactile 60fps micro-interactions without performance drag.
                            </p>
                        </div>

                        <div className="pillar-editorial-card">
                            <div className="pillar-num font-serif">03</div>
                            <h3 className="pillar-title font-sans">END-TO-END DATA &amp; APIS</h3>
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
