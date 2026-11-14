import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Github, ArrowUpRight } from 'lucide-react';
import { projectsData } from '../data/projects';
import { useTheme } from '../context/ThemeContext';
import './Projects.css';

const Projects = () => {
    const outlet = useOutlet();
    const navigate = useNavigate();
    const { playClickSound } = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const stageRef = useRef(null);
    const touchStartX = useRef(0);

    // If viewing a single project detail case study via route /projects/:id
    if (outlet) {
        return outlet;
    }

    const currentProject = projectsData[currentIndex] || projectsData[0];
    const totalProjects = projectsData.length;

    const handleNext = () => {
        playClickSound();
        setCurrentIndex((prev) => (prev + 1) % totalProjects);
    };

    const handlePrev = () => {
        playClickSound();
        setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    };

    const handleSelect = (idx) => {
        if (idx === currentIndex) {
            // Clicking the center card opens the case study!
            playClickSound();
            navigate(`/projects/${projectsData[idx].id}`);
            return;
        }
        playClickSound();
        setCurrentIndex(idx);
    };

    // Keyboard Arrow navigation & Enter key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Enter') {
                navigate(`/projects/${currentProject.id}`);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, currentProject]);

    // Mouse Wheel scroll navigation (debounced for silky single-slide advance)
    useEffect(() => {
        const el = stageRef.current;
        if (!el) return;

        let lastWheelTime = 0;
        const onWheel = (e) => {
            if (Math.abs(e.deltaY) < 18 && Math.abs(e.deltaX) < 18) return;
            const now = Date.now();
            if (now - lastWheelTime < 420) return;
            lastWheelTime = now;

            if (e.deltaY > 0 || e.deltaX > 0) {
                handleNext();
            } else {
                handlePrev();
            }
        };

        el.addEventListener('wheel', onWheel, { passive: true });
        return () => el.removeEventListener('wheel', onWheel);
    }, [currentIndex]);

    // Touch Swipe Navigation for mobile
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const deltaX = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(deltaX) > 40) {
            if (deltaX > 0) handleNext();
            else handlePrev();
        }
    };

    // Calculate circular relative distance from current index (-2, -1, 0, 1, 2)
    const getDiff = (idx) => {
        let diff = idx - currentIndex;
        while (diff > totalProjects / 2) diff -= totalProjects;
        while (diff < -totalProjects / 2) diff += totalProjects;
        return diff;
    };

    return (
        <section className="showcase-projects-page">
            {/* ============================================================
               1. TOP MARQUEE BANNER
               ============================================================ */}
            <div className="works-marquee-wrapper" aria-hidden="true">
                <div className="works-marquee-track">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="works-marquee-item">
                            <span className="marquee-works-text font-serif">WORKS</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ============================================================
               2. 3D PERSPECTIVE COVERFLOW SHOWCASE (MATCHING REFERENCE)
               ============================================================ */}
            <div 
                className="coverflow-stage-viewport"
                ref={stageRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div className="coverflow-stage-track">
                    {projectsData.map((project, idx) => {
                        const diff = getDiff(idx);
                        const isCenter = diff === 0;

                        return (
                            <div
                                key={project.id}
                                className={`coverflow-card-container pos-${diff} ${isCenter ? 'is-active-center' : 'is-side-card'}`}
                                onClick={() => handleSelect(idx)}
                                role="button"
                                tabIndex={0}
                                aria-label={`${project.title} ${isCenter ? '(Active - Click to open)' : '(Click to center)'}`}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSelect(idx);
                                }}
                            >
                                {/* Laptop Mockup Device Shell */}
                                <div className="laptop-mockup-frame">
                                    {/* Screen Display Lid */}
                                    <div className="laptop-screen-lid">
                                        {/* Camera Notch dot */}
                                        <div className="laptop-camera-notch" />
                                        
                                        {/* Project Preview Image */}
                                        <div className="laptop-display-content">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="laptop-screen-img"
                                                loading="eager"
                                            />

                                            {/* Center Overlay CTA */}
                                            {isCenter && (
                                                <div className="center-card-hover-pill font-mono">
                                                    <span>OPEN CASE STUDY</span>
                                                    <ArrowUpRight size={14} />
                                                </div>
                                            )}

                                            {/* Side Card Vignette Dimmer */}
                                            {!isCenter && <div className="side-card-dim-overlay" />}
                                        </div>
                                    </div>

                                    {/* Aluminum Laptop Base / Deck */}
                                    <div className="laptop-deck-base">
                                        <div className="laptop-thumb-notch" />
                                    </div>
                                    
                                    {/* Surface Shadow */}
                                    <div className="laptop-surface-shadow" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Left & Right Interactive Navigation Floaters */}
                <button
                    type="button"
                    className="coverflow-nav-floater prev-btn"
                    onClick={handlePrev}
                    aria-label="Previous Project (Left Arrow)"
                    title="Previous Project (←)"
                >
                    <ChevronLeft size={26} />
                </button>

                <button
                    type="button"
                    className="coverflow-nav-floater next-btn"
                    onClick={handleNext}
                    aria-label="Next Project (Right Arrow)"
                    title="Next Project (→)"
                >
                    <ChevronRight size={26} />
                </button>
            </div>

            {/* ============================================================
               3. EXPLORE MORE ON GITHUB (BOTTOM SECTION)
               ============================================================ */}
            <div className="explore-github-bottom-section">
                <div className="explore-github-card">
                    <div className="explore-text-block">
                        <span className="explore-badge-tag font-mono">OPEN SOURCE REPOSITORIES</span>
                        <h3 className="explore-headline font-serif">
                            EXPLORE MORE PROJECTS ON GITHUB
                        </h3>
                        <p className="explore-subtext font-sans">
                            Discover additional open-source repositories, experiments, full-stack microservices, and component libraries directly on my GitHub.
                        </p>
                    </div>

                    <a
                        href="https://github.com/prangya-meher"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="explore-github-action-btn font-mono"
                        onClick={playClickSound}
                    >
                        <Github size={18} />
                        <span>EXPLORE MORE ON GITHUB</span>
                        <ArrowRight size={16} className="btn-arrow-slide" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
