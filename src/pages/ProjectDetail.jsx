import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projects';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './ProjectDetail.css';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { playClickSound } = useTheme();
    const [project, setProject] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        const idx = projectsData.findIndex((p) => p.id === id);
        if (idx === -1) {
            navigate('/projects');
        } else {
            setProject(projectsData[idx]);
            setCurrentIndex(idx);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [id, navigate]);

    if (!project) return null;

    const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
    const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

    return (
        <section className="editorial-case-study-page">
            <div className="container">
                {/* Back to projects breadcrumb */}
                <div className="case-breadcrumb">
                    <Link to="/projects" className="case-back-link font-sans" onClick={playClickSound}>
                        <ArrowLeft size={16} /> BACK TO SELECTED WORK
                    </Link>
                </div>

                {/* Case Study Grid */}
                <div className="case-study-editorial-grid">
                    {/* Visual Preview */}
                    <div className="case-visual-column">
                        <div className="case-mockup-frame">
                            <div className="case-frame-bar font-sans">
                                <span className="frame-url-label">
                                    <Globe size={13} /> {project.link.replace('https://', '')}
                                </span>
                            </div>
                            <div className="case-screen-wrap">
                                <img src={project.image} alt={project.title} className="case-full-image" />
                            </div>
                        </div>
                    </div>

                    {/* Architectural Info */}
                    <div className="case-info-column">
                        <span className="case-category-tag font-sans">
                            {project.category.toUpperCase()} · CASE STUDY
                        </span>

                        <h1 className="case-headline font-serif">{project.title}</h1>

                        <div className="case-tags-stack font-sans">
                            {project.tags.map((tag, idx) => (
                                <span key={idx} className="editorial-tag-pill">{tag}</span>
                            ))}
                        </div>

                        <div className="case-block-divider" />

                        <div className="case-content-block">
                            <h3 className="case-subheading font-sans">OVERVIEW & ARCHITECTURE</h3>
                            <p className="case-narrative font-sans">{project.description}</p>
                        </div>

                        {project.highlights && project.highlights.length > 0 && (
                            <div className="case-content-block">
                                <h3 className="case-subheading font-sans">ENGINEERING HIGHLIGHTS</h3>
                                <ul className="case-bullets-stack font-sans">
                                    {project.highlights.map((item, idx) => (
                                        <li key={idx} className="case-bullet-row">
                                            <span className="bullet-dash">—</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="case-actions-toolbar">
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                onClick={playClickSound}
                            >
                                LIVE PREVIEW <ExternalLink size={15} />
                            </a>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline"
                                onClick={playClickSound}
                            >
                                SOURCE CODE <Github size={15} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Previous / Next Case Study Switcher */}
                <div className="case-pager-bar">
                    {prevProject ? (
                        <Link
                            to={`/projects/${prevProject.id}`}
                            className="pager-nav-link prev font-sans"
                            onClick={playClickSound}
                        >
                            <ChevronLeft size={18} />
                            <div>
                                <span className="pager-direction">PREVIOUS WORK</span>
                                <span className="pager-title font-serif">{prevProject.title.split('–')[0]}</span>
                            </div>
                        </Link>
                    ) : (
                        <div className="pager-nav-link disabled font-sans">
                            <span className="pager-direction">FIRST PROJECT</span>
                        </div>
                    )}

                    <div className="pager-center-rule" />

                    {nextProject ? (
                        <Link
                            to={`/projects/${nextProject.id}`}
                            className="pager-nav-link next font-sans"
                            onClick={playClickSound}
                        >
                            <div>
                                <span className="pager-direction">NEXT WORK</span>
                                <span className="pager-title font-serif">{nextProject.title.split('–')[0]}</span>
                            </div>
                            <ChevronRight size={18} />
                        </Link>
                    ) : (
                        <div className="pager-nav-link disabled font-sans">
                            <span className="pager-direction">END OF WORK</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProjectDetail;
