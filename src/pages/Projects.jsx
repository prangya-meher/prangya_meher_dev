import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useOutlet } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight, LayoutGrid, List } from 'lucide-react';
import { projectsData } from '../data/projects';
import { useTheme } from '../context/ThemeContext';
import './Projects.css';

const categories = [
    { id: 'all', label: 'ALL WORK' },
    { id: 'fullstack', label: 'FULL-STACK' },
    { id: 'frontend', label: 'FRONTEND PLATFORMS' },
    { id: 'motion', label: 'MOTION & GSAP' },
    { id: 'webapp', label: 'INTERACTIVE APPS' },
];

const Projects = () => {
    const outlet = useOutlet();
    const { playClickSound } = useTheme();
    const [activeFilter, setActiveFilter] = useState('all');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

    if (outlet) {
        return outlet;
    }

    const filteredProjects = activeFilter === 'all'
        ? projectsData
        : projectsData.filter((p) => p.category === activeFilter);

    return (
        <section className="editorial-projects-page">
            <div className="container">
                {/* Header */}
                <div className="section-header">
                    <span className="section-tag font-sans">SELECTED WORK</span>
                    <h1 className="section-title font-serif">
                        CURATED CASE STUDIES & ENGINEERING WORK.
                    </h1>
                    <p className="section-subtitle font-sans">
                        A collection of full-stack web platforms, motion-driven agency clones, and interactive digital interfaces built with modern technologies.
                    </p>
                </div>

                {/* Filter and View Mode bar */}
                <div className="editorial-projects-toolbar">
                    <div className="editorial-filter-pills">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`editorial-filter-btn font-sans ${activeFilter === cat.id ? 'active' : ''}`}
                                onClick={() => {
                                    playClickSound();
                                    setActiveFilter(cat.id);
                                }}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="editorial-view-toggle">
                        <button
                            className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => {
                                playClickSound();
                                setViewMode('grid');
                            }}
                            title="Grid View"
                            aria-label="Grid view"
                        >
                            <LayoutGrid size={16} />
                        </button>
                        <button
                            className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => {
                                playClickSound();
                                setViewMode('list');
                            }}
                            title="List View"
                            aria-label="List view"
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>

                {/* Grid View */}
                {viewMode === 'grid' ? (
                    <motion.div layout className="editorial-projects-grid">
                        <AnimatePresence>
                            {filteredProjects.map((project, idx) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="editorial-project-card"
                                >
                                    <div className="card-meta-top font-sans">
                                        <span className="card-index-num">0{idx + 1}</span>
                                        <span className="card-cat-badge">{project.category}</span>
                                    </div>

                                    {/* Mockup screen */}
                                    <div className="card-mockup-wrapper">
                                        <img src={project.image} alt={project.title} className="card-mockup-img" />
                                        <div className="card-hover-overlay">
                                            <Link
                                                to={`/projects/${project.id}`}
                                                className="btn btn-primary btn-sm"
                                                onClick={playClickSound}
                                            >
                                                VIEW CASE STUDY <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="card-content-block">
                                        <h3 className="card-work-title font-serif">
                                            <Link to={`/projects/${project.id}`} onClick={playClickSound}>
                                                {project.title.split('–')[0]}
                                            </Link>
                                        </h3>
                                        <p className="card-work-desc font-sans">
                                            {project.description.length > 115
                                                ? `${project.description.substring(0, 115)}...`
                                                : project.description}
                                        </p>

                                        <div className="card-tags-row font-sans">
                                            {project.tags.map((tag, i) => (
                                                <span key={i} className="editorial-tag-pill">{tag}</span>
                                            ))}
                                        </div>

                                        <div className="card-footer-actions">
                                            <Link
                                                to={`/projects/${project.id}`}
                                                className="study-link font-sans"
                                                onClick={playClickSound}
                                            >
                                                CASE STUDY &rarr;
                                            </Link>

                                            <div className="actions-links-group">
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="circle-link-btn"
                                                    title="GitHub Repository"
                                                    onClick={playClickSound}
                                                >
                                                    <Github size={15} />
                                                </a>
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="circle-link-btn"
                                                    title="Live Preview"
                                                    onClick={playClickSound}
                                                >
                                                    <ExternalLink size={15} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    /* List View */
                    <motion.div layout className="editorial-projects-list">
                        <AnimatePresence>
                            {filteredProjects.map((project, idx) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 15 }}
                                    transition={{ duration: 0.2 }}
                                    className="editorial-list-row"
                                >
                                    <span className="list-row-num font-sans">0{idx + 1}</span>
                                    <div className="list-row-body">
                                        <h3 className="list-row-title font-serif">
                                            <Link to={`/projects/${project.id}`} onClick={playClickSound}>
                                                {project.title}
                                            </Link>
                                        </h3>
                                        <p className="list-row-desc font-sans">{project.description}</p>
                                        <div className="list-row-tags font-sans">
                                            {project.tags.map((t, i) => (
                                                <span key={i} className="editorial-tag-pill">{t}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="list-row-actions">
                                        <Link
                                            to={`/projects/${project.id}`}
                                            className="btn btn-outline btn-sm"
                                            onClick={playClickSound}
                                        >
                                            DETAILS
                                        </Link>
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary btn-sm"
                                            onClick={playClickSound}
                                        >
                                            PREVIEW <ExternalLink size={13} />
                                        </a>
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="circle-link-btn"
                                            title="GitHub Code"
                                            onClick={playClickSound}
                                        >
                                            <Github size={16} />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Bottom Explore Banner */}
                <div className="editorial-bottom-cta">
                    <div>
                        <h4 className="cta-lead font-serif">EXPLORE MORE REPOSITORIES</h4>
                        <p className="cta-body font-sans">Inspect full codebases, component libraries, and scripts on my GitHub profile.</p>
                    </div>
                    <a
                        href="https://github.com/prangya-meher"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                        onClick={playClickSound}
                    >
                        GITHUB / PRANGYA-MEHER &rarr;
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
