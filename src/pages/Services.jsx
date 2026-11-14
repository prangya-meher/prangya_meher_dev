import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Services.css';

const services = [
    {
        id: '01',
        num: '01',
        title: 'FRONTEND ARCHITECTURE',
        subLabel: 'React & SPAs',
        desc: 'I craft high-performance, accessible single-page applications with modular component architecture, robust state management, and fluid user interactions designed for scale.',
        deliverablesCol1: [
            'Modular Component Architecture',
            'Design Tokens & System UI',
            'Decoupled Business Logic'
        ],
        deliverablesCol2: [
            'State Architecture & Store Design',
            'Cross-Browser Semantic Markup',
            'Responsive Multi-Device Layouts'
        ]
    },
    {
        id: '02',
        num: '02',
        title: 'CREATIVE MOTION',
        subLabel: 'GSAP & Micro-UX',
        desc: 'Transforming static web platforms into narrative-driven visual journeys with orchestrated timeline animations, inertial scrolling, and fluid interaction physics.',
        deliverablesCol1: [
            'GSAP ScrollTrigger Choreography',
            'Locomotive Inertial Scrolling',
            'Hardware-Accelerated 60fps CSS'
        ],
        deliverablesCol2: [
            'Framer Motion Page Transitions',
            'Interactive Custom Cursor States',
            'Dynamic Hover & Reveal Micro-UX'
        ]
    },
    {
        id: '03',
        num: '03',
        title: 'FULL-STACK INTEGRATION',
        subLabel: 'Coding & APIs',
        desc: 'Connecting intuitive frontend interfaces with reliable server environments, relational databases, and secure asynchronous data pipelines.',
        deliverablesCol1: [
            'RESTful API Architecture',
            'Node.js & Express Endpoints',
            'SQLite & Relational Schemas'
        ],
        deliverablesCol2: [
            'Asynchronous Custom Hook Pipelines',
            'CORS & Security Configuration',
            'Cloud Infrastructure Deployment'
        ]
    },
    {
        id: '04',
        num: '04',
        title: 'OPTIMIZATION',
        subLabel: 'Core Web Vitals',
        desc: 'Auditing and tuning web platforms to achieve top-tier Lighthouse benchmarks, sub-second First Contentful Paint, and zero cumulative layout shift.',
        deliverablesCol1: [
            'Bundle Size & Code-Splitting',
            'Asset Compression & Modern Formats',
            'Tree-Shaking & Dynamic Imports'
        ],
        deliverablesCol2: [
            'Zero Cumulative Layout Shift (CLS)',
            'Sub-Second LCP Benchmarking',
            'Automated CI/CD Workflows'
        ]
    }
];

const processSteps = [
    {
        num: '01',
        title: 'DISCOVERY & ARCHITECTURE',
        desc: 'Mapping user journeys, evaluating technological scope, and establishing component structures and API contracts.'
    },
    {
        num: '02',
        title: 'COMPONENT-DRIVEN BUILD',
        desc: 'Developing modular, accessible React components with clean Git branching and continuous visual verification.'
    },
    {
        num: '03',
        title: 'MOTION & POLISH',
        desc: 'Orchestrating micro-interactions, refining hover states, and testing edge cases across varied viewports.'
    },
    {
        num: '04',
        title: 'AUDIT & DEPLOYMENT',
        desc: 'Benchmarking performance vitals, optimizing assets, and deploying to cloud infrastructure with CI/CD.'
    }
];

const Services = () => {
    const { playClickSound } = useTheme();
    // Default 01 open, smoothly switches on hover
    const [openServiceId, setOpenServiceId] = useState('01');

    const handleHover = (id) => {
        if (openServiceId !== id) {
            setOpenServiceId(id);
        }
    };

    return (
        <section className="services-page-accordion">
            <div className="services-page-container">
                {/* Header */}
                <div className="services-eyebrow-wrapper">
                    <h1 className="services-hero-heading font-serif">
                        WHAT I CAN DO
                    </h1>
                </div>

                {/* Accordion List (Opens on Hover) */}
                <div className="services-accordion-list">
                    {services.map((service) => {
                        const isOpen = openServiceId === service.id;

                        return (
                            <div
                                key={service.id}
                                className={`service-accordion-row ${isOpen ? 'active-row' : ''}`}
                                onMouseEnter={() => handleHover(service.id)}
                                onClick={() => setOpenServiceId(service.id)}
                            >
                                {/* Row Header (Clean typography without icons or boxes) */}
                                <div
                                    className="service-row-header"
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            setOpenServiceId(service.id);
                                        }
                                    }}
                                >
                                    <div className="service-title-cluster">
                                        <sup className="service-sup-num font-serif">{service.num}</sup>
                                        <h2 className="service-accordion-title font-serif">
                                            {service.title}
                                        </h2>
                                        <span className="service-sub-label font-sans">
                                            {service.subLabel}
                                        </span>
                                    </div>
                                </div>

                                {/* Expanded Content Panel (Reveals on Hover) */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            className="service-expanded-panel"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <div className="service-content-grid">
                                                {/* Left Column: Narrative description */}
                                                <div className="service-desc-box">
                                                    <p className="service-desc-text font-sans">
                                                        {service.desc}
                                                    </p>
                                                    <div className="service-contact-link-wrap">
                                                        <Link
                                                            to="/contact"
                                                            className="service-inquire-link font-mono"
                                                            onClick={playClickSound}
                                                        >
                                                            DISCUSS PROJECT <ArrowRight size={14} />
                                                        </Link>
                                                    </div>
                                                </div>

                                                {/* Middle Column: Deliverables 1 */}
                                                <div className="service-col-deliverables font-sans">
                                                    <ul className="service-bullets">
                                                        {service.deliverablesCol1.map((item, idx) => (
                                                            <li key={idx} className="service-bullet-line">
                                                                <span className="bullet-symbol">•</span>
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Right Column: Deliverables 2 */}
                                                <div className="service-col-deliverables font-sans">
                                                    <ul className="service-bullets">
                                                        {service.deliverablesCol2.map((item, idx) => (
                                                            <li key={idx} className="service-bullet-line">
                                                                <span className="bullet-symbol">•</span>
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Methodology Roadmap Section */}
                <div className="methodology-container">
                    <div className="methodology-header">
                        <span className="services-eyebrow font-mono">&#123; Methodology &#125;</span>
                        <h2 className="methodology-title font-serif">HOW I APPROACH SOFTWARE DEVELOPMENT</h2>
                    </div>

                    <div className="methodology-grid">
                        {processSteps.map((step, idx) => (
                            <div key={idx} className="methodology-card">
                                <span className="step-num font-serif">{step.num}</span>
                                <h4 className="step-name font-sans">{step.title}</h4>
                                <p className="step-detail font-sans">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Call to Action */}
                <div className="services-bottom-cta">
                    <div className="cta-left">
                        <h3 className="cta-lead font-serif">HAVE A PROJECT OR ROLE IN MIND?</h3>
                        <p className="cta-desc font-sans">
                            Let's discuss how my engineering and creative motion capabilities can bring your digital vision to life.
                        </p>
                    </div>
                    <Link to="/contact" className="service-cta-button font-mono" onClick={playClickSound}>
                        LET'S CONNECT <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Services;
