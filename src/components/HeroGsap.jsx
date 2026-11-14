import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import heroImg from '../assets/images/hero.png';
import './HeroGsap.css';

/* ─── Helper: split a string into individual <span> chars ─── */
const SplitText = ({ text, cls }) =>
    text.split('').map((char, i) => (
        <span key={i} className={`char ${cls}`} aria-hidden="true">
            {char === ' ' ? '\u00A0' : char}
        </span>
    ));

const HeroGsap = () => {
    const { playClickSound } = useTheme();
    const sectionRef = useRef(null);
    const glowRef = useRef(null);

    /* ─── GSAP Entrance Timeline ─── */
    useEffect(() => {
        const gsap = window.gsap;
        if (!gsap) return;

        const ctx = gsap.context(() => {
            /* Animated gradient drift on the left wash overlay */
            gsap.to('.hero-left-wash', {
                backgroundPosition: '100% 100%',
                duration: 10,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });

            /* Floating deco elements */
            gsap.to('.deco-circle-1', {
                y: -16,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
            gsap.to('.deco-circle-2', {
                y: 12,
                x: -8,
                duration: 5.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 1.2,
            });

            /* Rotating badge */
            gsap.to('.spinning-badge-svg', {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: 'none',
            });

            /* Main entrance timeline */
            const tl = gsap.timeline({ delay: 0.1 });

            tl
                /* Top meta row */
                .from('.hero-meta-top', {
                    opacity: 0,
                    y: -20,
                    duration: 0.55,
                    ease: 'power2.out',
                })
                /* Name label */
                .from('.hero-name-lbl', {
                    opacity: 0,
                    x: -20,
                    duration: 0.5,
                    ease: 'power2.out',
                }, '-=0.2')
                /* "PORT" letter by letter */
                .from('.char-port', {
                    y: 100,
                    opacity: 0,
                    stagger: 0.055,
                    duration: 0.72,
                    ease: 'power3.out',
                }, '-=0.15')
                /* "FOLIO" letter by letter */
                .from('.char-folio', {
                    y: 100,
                    opacity: 0,
                    stagger: 0.055,
                    duration: 0.72,
                    ease: 'power3.out',
                }, '-=0.52')
                /* Tagline */
                .from('.hero-tagline-row', {
                    opacity: 0,
                    y: 14,
                    duration: 0.5,
                    ease: 'power2.out',
                }, '-=0.2')
                /* CTA buttons */
                .fromTo('.hero-cta-gsap',
                    { opacity: 0, y: 16 },
                    { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'all' },
                    '-=0.15'
                )
                /* Hero image fades in */
                .from('.hero-bg-img', {
                    opacity: 0,
                    scale: 1.03,
                    duration: 1.1,
                    ease: 'power2.out',
                }, 0.05)
                /* Badge */
                .from('.rotating-badge-container-gsap', {
                    opacity: 0,
                    scale: 0.7,
                    duration: 0.5,
                    ease: 'back.out(1.6)',
                }, '-=0.4');
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    /* ─── Mouse glow ─── */
    useEffect(() => {
        const gsap = window.gsap;
        if (!gsap || !glowRef.current) return;

        const move = (e) => {
            gsap.to(glowRef.current, {
                x: e.clientX - 160,
                y: e.clientY - 160,
                duration: 0.65,
                ease: 'power2.out',
            });
        };
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, []);

    /* ─── CTA button hover ─── */
    useEffect(() => {
        const gsap = window.gsap;
        if (!gsap) return;

        const btns = document.querySelectorAll('.hero-cta-gsap .btn');
        const handlers = [];
        btns.forEach((btn) => {
            const enter = () => gsap.to(btn, { scale: 1.04, duration: 0.2, ease: 'power1.out' });
            const leave = () => gsap.to(btn, { scale: 1, duration: 0.2, ease: 'power1.in' });
            btn.addEventListener('mouseenter', enter);
            btn.addEventListener('mouseleave', leave);
            handlers.push({ btn, enter, leave });
        });
        return () => handlers.forEach(({ btn, enter, leave }) => {
            btn.removeEventListener('mouseenter', enter);
            btn.removeEventListener('mouseleave', leave);
        });
    }, []);

    return (
        <section className="hero-gsap-section" ref={sectionRef}>
            {/* Full-bleed hero photo — absolutely positioned behind all text */}
            <div className="hero-bg-wrap">
                <img
                    src={heroImg}
                    alt="Prangyanjali Meher – Frontend Developer"
                    className="hero-bg-img"
                />
            </div>

            {/* Left linen gradient wash — makes text legible over photo */}
            <div className="hero-left-wash" />

            {/* Mouse glow */}
            <div className="hero-mouse-glow" ref={glowRef} />

            {/* Floating deco */}
            <div className="deco-circle-1" />
            <div className="deco-circle-2" />

            {/* ── All text content ── */}
            <div className="container hero-content-wrap">

                {/* Top meta bar */}
                <div className="hero-meta-top font-sans">
                    <span className="meta-role-gsap">WEB &amp; FRONTEND DEVELOPER</span>
                    <div className="meta-right-gsap">
                        <span className="meta-location-gsap">BASED IN ODISHA, INDIA</span>
                        {/* Rotating badge */}
                        <div className="rotating-badge-container-gsap" title="Available for work">
                            <div className="spinning-badge-svg">
                                <svg viewBox="0 0 100 100" width="88" height="88">
                                    <defs>
                                        <path
                                            id="hCirclePath"
                                            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                        />
                                    </defs>
                                    <text fontFamily="Plus Jakarta Sans" fontSize="9" fontWeight="700" letterSpacing="2.5">
                                        <textPath xlinkHref="#hCirclePath" fill="#171717">
                                            AVAILABLE · FOR PROJECTS ·
                                        </textPath>
                                    </text>
                                </svg>
                                <span className="badge-star-gsap">✦</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Left content column — text only */}
                <div className="hero-text-col">
                    {/* Name label */}
                    <span className="hero-name-lbl font-sans">PRANGYANJALI MEHER</span>

                    {/* Giant PORT / FOLIO */}
                    <h1 className="hero-giant-title font-serif" aria-label="PORTFOLIO">
                        <span className="title-line" aria-hidden="true">
                            <SplitText text="PORT" cls="char-port" />
                        </span>
                        <span className="title-line" aria-hidden="true">
                            <SplitText text="FOLIO" cls="char-folio" />
                        </span>
                    </h1>

                    {/* Tagline */}
                    <div className="hero-tagline-row">
                        <div className="tagline-rule" />
                        <p className="tagline-text font-sans">
                            THOUGHTFUL CODE. INTUITIVE EXPERIENCES.
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="hero-cta-gsap">
                        <a
                            href="/PRANGYANJALI-MEHER-%20Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn hero-cv-btn"
                            onClick={playClickSound}
                        >
                            <span>VIEW CV</span>
                            <ArrowRight size={15} className="btn-arrow" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroGsap;
