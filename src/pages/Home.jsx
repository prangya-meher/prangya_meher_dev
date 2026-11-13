import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Sparkles, Layers, Zap, Compass } from 'lucide-react';
import { projectsData } from '../data/projects';
import { useTheme } from '../context/ThemeContext';
import HeroGsap from '../components/HeroGsap';
import aboutMeImg from '../assets/images/about/about-me.jpg';
import './Home.css';

const marqueeItems = [
    'UI / UX IMPLEMENTATION',
    'REACT & JAVASCRIPT',
    'CREATIVE GSAP MOTION',
    'FULL-STACK REST APIS',
    'MODULAR DESIGN SYSTEMS',
    'PERFORMANCE OPTIMIZATION',
    'SQLITE & RELATIONAL DATA',
];

const capabilities = [
    {
        icon: <Code2 size={20} />,
        title: 'FRONTEND ARCHITECTURE',
        desc: 'Building responsive, fast-loading, and interactive SPAs with React, modern JS, and component systems.',
    },
    {
        icon: <Sparkles size={20} />,
        title: 'CREATIVE GSAP MOTION',
        desc: 'High-performance micro-interactions, scroll triggers, and buttery smooth page transitions.',
    },
    {
        icon: <Layers size={20} />,
        title: 'FULL-STACK INTEGRATION',
        desc: 'Decoupled RESTful APIs with Node.js, Express, SQLite relational modeling, and Django logic.',
    },
    {
        icon: <Compass size={20} />,
        title: 'DESIGN SYSTEMS & UI/UX',
        desc: 'Translating design mockups into pixel-perfect, accessible, and user-friendly web interfaces.',
    },
    {
        icon: <Zap size={20} />,
        title: 'PERFORMANCE & VITALS',
        desc: 'Lighthouse score optimization, zero CLS, responsive mobile tuning, and fast initial paint.',
    },
];

const Home = () => {
    const { playClickSound } = useTheme();
    const [copiedEmail, setCopiedEmail] = useState(false);

    const handleCopyEmail = () => {
        playClickSound();
        navigator.clipboard.writeText('meherprangya@gmail.com');
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2500);
    };

    const selectedProjects = projectsData.slice(0, 3);

    return (
        <div className="editorial-home">
            {/* ================================================================
                1. HERO SECTION — GSAP animated
               ================================================================ */}
            <HeroGsap />

            {/* ================================================================
                2. HORIZONTAL MARQUEE BAR
               ================================================================ */}
            <div className="editorial-marquee-bar">
                <div className="marquee-content font-sans">
                    {marqueeItems.concat(marqueeItems).map((item, idx) => (
                        <span key={idx} className="marquee-item">
                            <span>{item}</span>
                            <span className="marquee-separator">·</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* ================================================================
                3. SELECTED WORK (PROJECTS PREVIEW)
               ================================================================ */}
            <section className="editorial-selected-section">
                <div className="container">
                    <div className="selected-header-row">
                        <span className="editorial-section-tag font-sans">SELECTED WORK</span>
                        <Link to="/projects" className="all-projects-link font-sans" onClick={playClickSound}>
                            ALL PROJECTS &rarr;
                        </Link>
                    </div>

                    <div className="selected-projects-grid">
                        {selectedProjects.map((project, idx) => (
                            <Link
                                to={`/projects/${project.id}`}
                                key={project.id}
                                className="selected-project-card"
                                onClick={playClickSound}
                            >
                                <div className="card-top-num font-sans">0{idx + 1}</div>

                                <div className="project-device-mockup">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="device-screen-img"
                                    />
                                </div>

                                <div className="project-card-info">
                                    <h3 className="project-card-title font-serif">
                                        {project.title.split('—')[0]}
                                    </h3>
                                    <p className="project-card-sub font-sans">
                                        {project.tags.slice(0, 3).join(' · ')}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================================================================
                4. ABOUT ME + WHAT I DO
               ================================================================ */}
            <section className="editorial-about-section">
                <div className="container about-tri-grid">
                    {/* Left: About narrative */}
                    <div className="about-left-block">
                        <span className="editorial-section-tag font-sans">ABOUT ME</span>
                        <h2 className="about-lead-title font-serif">
                            DESIGNING DIGITAL SPACES THAT FEEL EFFORTLESS.
                        </h2>
                        <p className="about-lead-body font-sans">
                            I am a Frontend &amp; Full-Stack Developer focused on building clean, user-centered
                            web applications that balance aesthetics with high performance. With a background
                            in modern JavaScript frameworks and creative animation, I craft digital products
                            that connect with users through thoughtful engineering.
                        </p>
                        <Link
                            to="/about"
                            className="btn btn-outline"
                            style={{ marginTop: '24px' }}
                            onClick={playClickSound}
                        >
                            MORE ABOUT ME &rarr;
                        </Link>
                    </div>

                    {/* Center: Architectural image */}
                    <div className="about-center-photo">
                        <div className="about-photo-wrapper">
                            <img
                                        src={aboutMeImg}
                                        alt="Development Architecture"
                                        className="about-arch-img"
                                    />
                        </div>
                    </div>

                    {/* Right: What I Do capabilities list */}
                    <div className="about-right-block">
                        <span className="editorial-section-tag font-sans">WHAT I DO</span>
                        <div className="capabilities-stack">
                            {capabilities.map((cap, i) => (
                                <div key={i} className="capability-row">
                                    <div className="cap-icon-box">{cap.icon}</div>
                                    <div className="cap-text-box">
                                        <h4 className="cap-title font-sans">{cap.title}</h4>
                                        <p className="cap-desc font-sans">{cap.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ================================================================
                5. TESTIMONIAL / PHILOSOPHY QUOTE BANNER
               ================================================================ */}
            <section className="editorial-quote-banner">
                <div className="container quote-container">
                    <span className="quote-mark font-serif">&ldquo;</span>
                    <blockquote className="quote-text font-serif">
                        Engineering clean, scalable web interfaces with the structural discipline of an
                        architect and the aesthetic precision of a craftsman.
                    </blockquote>
                    <p className="quote-author font-sans">
                        &mdash; PRANGYANJALI MEHER &middot; FRONTEND &amp; FULL-STACK DEVELOPER
                    </p>
                </div>
            </section>

            {/* ================================================================
                6. EDITORIAL FOOTER (DARK CONTRAST BLOCK)
               ================================================================ */}
            <footer className="editorial-dark-footer">
                <div className="container footer-grid">
                    {/* Left Col */}
                    <div className="footer-col-left">
                        <h3 className="footer-headline font-serif">
                            LET&rsquo;S CREATE SOMETHING MEANINGFUL.
                        </h3>
                        <p className="footer-sub font-sans">
                            I&rsquo;m currently available for full-time developer positions, freelance
                            engagements, and high-impact digital collaborations.
                        </p>
                        <Link to="/contact" className="footer-connect-link font-sans" onClick={playClickSound}>
                            LET&rsquo;S CONNECT &rarr;
                        </Link>
                    </div>

                    {/* Center Col */}
                    <div className="footer-col-center font-sans">
                        <span className="footer-col-heading">CONTACT</span>
                        <div className="footer-contact-items">
                            <button className="footer-email-btn font-sans" onClick={handleCopyEmail}>
                                meherprangya@gmail.com {copiedEmail ? '✓ (Copied)' : ''}
                            </button>
                            <a href="tel:+918117862163" className="footer-link">
                                +91 8117862163
                            </a>
                            <span className="footer-meta-loc">Odisha, India</span>
                        </div>
                    </div>

                    {/* Right Col */}
                    <div className="footer-col-right font-sans">
                        <span className="footer-col-heading">FOLLOW</span>
                        <div className="footer-social-links">
                            <a
                                href="https://github.com/prangya-meher"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-link"
                            >
                                GitHub
                            </a>
                            <a
                                href="https://www.linkedin.com/in/prangyanjali-meher-aa6b56316"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-link"
                            >
                                LinkedIn
                            </a>
                        </div>

                        {/* Monogram Badge */}
                        <div className="footer-monogram-badge">
                            <div className="monogram-capsule font-serif">
                                <span>PM</span>
                            </div>
                            <span className="badge-year font-sans">ESTD 2026</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
