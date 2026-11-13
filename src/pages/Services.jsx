import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, Layers, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Services.css';

const services = [
    {
        num: '01',
        title: 'FRONTEND ARCHITECTURE & SPAS',
        desc: 'Building responsive, fast-loading, and scalable single-page web applications with modern React ecosystems and component design systems.',
        deliverables: [
            'Modular, DRY component architecture & reusable design tokens',
            'Robust state management and decoupled business logic',
            'Flawless responsive layouts across all device resolutions',
            'Cross-browser accessibility & semantic markup'
        ],
        stack: ['React 19', 'JavaScript (ES6+)', 'Tailwind CSS', 'Vite']
    },
    {
        num: '02',
        title: 'CREATIVE GSAP MOTION & MICRO-UX',
        desc: 'Transforming static websites into engaging digital experiences with orchestrated timeline animations, scroll-triggered reveals, and fluid interactions.',
        deliverables: [
            'Scroll-triggered narrative animations with GSAP ScrollTrigger',
            'Smooth inertial scrolling with Locomotive Scroll',
            'Hardware-accelerated 60fps CSS animations & micro-interactions',
            'Framer Motion layout transitions & spring physics'
        ],
        stack: ['GSAP', 'Framer Motion', 'LocomotiveJS', 'CSS3']
    },
    {
        num: '03',
        title: 'FULL-STACK INTEGRATION & RESTFUL APIS',
        desc: 'Connecting intuitive frontend interfaces with reliable server environments, relational databases, and secure asynchronous data pipelines.',
        deliverables: [
            'RESTful API architecture with Node.js & Express',
            'Relational database schema modeling with SQLite',
            'Asynchronous data fetching with custom hooks & Axios',
            'Environment security, CORS configuration, and cloud deploy'
        ],
        stack: ['Node.js', 'Express.js', 'SQLite', 'MongoDB', 'REST']
    },
    {
        num: '04',
        title: 'PERFORMANCE OPTIMIZATION & WEB VITALS',
        desc: 'Auditing and tuning web platforms to achieve top-tier Lighthouse scores, instant first contentful paint, and zero layout shift.',
        deliverables: [
            'Bundle size optimization, code-splitting & tree-shaking',
            'Asset compression and modern WebP / SVG formats',
            'Zero Cumulative Layout Shift (CLS) & sub-second LCP',
            'Production deployment workflows (Railway, Vercel)'
        ],
        stack: ['Lighthouse', 'Vite', 'Core Web Vitals', 'Git/GitHub']
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

    return (
        <section className="editorial-services-page">
            <div className="container">
                {/* Header */}
                <div className="section-header">
                    <span className="section-tag font-sans">WHAT I DO</span>
                    <h1 className="section-title font-serif">
                        ENGINEERING SERVICES DESIGNED FOR INTUITIVE USER EXPERIENCES.
                    </h1>
                    <p className="section-subtitle font-sans">
                        From bespoke React user interfaces to creative GSAP motion engineering and full-stack API integration, here is how I help digital ideas succeed.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="editorial-services-grid">
                    {services.map((service, idx) => (
                        <div key={idx} className="editorial-service-card">
                            <span className="service-index-number font-serif">{service.num}</span>
                            <h3 className="service-card-heading font-sans">{service.title}</h3>
                            <p className="service-card-narrative font-sans">{service.desc}</p>

                            <div className="service-deliverables-box">
                                <span className="deliverables-tag font-sans">DELIVERABLES:</span>
                                <ul className="deliverables-stack font-sans">
                                    {service.deliverables.map((item, i) => (
                                        <li key={i} className="deliverable-line">
                                            <span className="dash-mark">—</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="service-tags-box font-sans">
                                {service.stack.map((s, i) => (
                                    <span key={i} className="editorial-tag-pill">{s}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Methodology Roadmap */}
                <div className="methodology-container">
                    <div className="methodology-header">
                        <span className="section-tag font-sans">METHODOLOGY</span>
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
                        <p className="cta-desc font-sans">Let's discuss how my engineering and creative motion capabilities can bring your vision to life.</p>
                    </div>
                    <Link to="/contact" className="btn btn-primary" onClick={playClickSound}>
                        LET'S CONNECT <ArrowRight size={15} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Services;
