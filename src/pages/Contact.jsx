import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Linkedin, Copy, Check, ArrowUpRight, Download, X } from 'lucide-react';
import heroImg from '../assets/images/hero.png';
import aboutMeImg from '../assets/images/about/about-me.jpg';
import { useTheme } from '../context/ThemeContext';
import './Contact.css';

const WEB3FORMS_ACCESS_KEY = '698598e7-4b97-4352-9b00-4b38c08c1b8b';

const Contact = () => {
    const { playClickSound } = useTheme();
    const [isFormOpen, setIsFormOpen] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.location.hash === '#form' || window.location.search.includes('open=true');
        }
        return false;
    });

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [copiedEmail, setCopiedEmail] = useState(false);

    const handleChange = (e) =>
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleCopyEmail = () => {
        playClickSound();
        navigator.clipboard.writeText('meherprangya@gmail.com');
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2500);
    };

    const handleOpenForm = () => {
        playClickSound();
        setIsFormOpen(true);
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleCloseForm = () => {
        playClickSound();
        setIsFormOpen(false);
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        playClickSound();
        setStatus('loading');

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: 'New Portfolio Message from ' + formData.name,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    // Honeypot – anti-spam
                    botcheck: '',
                }),
            });

            const data = await res.json();

            if (data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 4000);
            } else {
                console.error('Web3Forms error:', data);
                setStatus('error');
                setTimeout(() => setStatus('idle'), 4000);
            }
        } catch (err) {
            console.error('Network error:', err);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    const isLoading = status === 'loading';
    const isSuccess = status === 'success';
    const isError = status === 'error';

    return (
        <section className="contact-reference-page">
            <AnimatePresence mode="wait">
                {!isFormOpen ? (
                    /* ============================================================
                       STAGE 1: TEASER VIEW (MATCHING FIRST REFERENCE IMAGE)
                       ============================================================ */
                    <motion.div
                        key="teaser"
                        className="contact-teaser-view"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="teaser-content-center">
                            <span className="teaser-uptitle font-sans">
                                GOT A PROJECT IN MIND?
                            </span>

                            <h1
                                className="teaser-main-heading font-serif"
                                onClick={handleOpenForm}
                            >
                                LET'S CONNECT
                            </h1>

                            <button
                                type="button"
                                className="teaser-circle-action font-mono"
                                onClick={handleOpenForm}
                                aria-label="Write a message"
                            >
                                <span>WRITE A</span>
                                <span>MESSAGE</span>
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    /* ============================================================
                       STAGE 2: BENTO FORM VIEW (MATCHING SECOND REFERENCE IMAGE)
                       ============================================================ */
                    <motion.div
                        key="bento-form"
                        className="contact-bento-view"
                        initial={{ opacity: 0, y: 24, scale: 0.98, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 16, scale: 0.98, filter: 'blur(4px)' }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="bento-stage-wrapper">
                            <div className="contact-bento-grid">
                                {/* ── Left Column: Tall Studio Portrait ── */}
                                <motion.div
                                    className="bento-photo-card"
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <img
                                        src={heroImg}
                                        alt="Prangyanjali Meher"
                                        className="bento-primary-photo"
                                    />
                                    <div className="bento-photo-badge font-sans">
                                        <span>My Studio</span>
                                    </div>
                                </motion.div>

                                {/* ── Right Column: Form + 3 Bottom Subcards ── */}
                                <div className="bento-interactive-column">
                                    {/* Top Card: Let's Talk Form */}
                                    <motion.div
                                        className="bento-form-card"
                                        initial={{ opacity: 0, y: -12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <div className="bento-form-header">
                                            <h2 className="bento-form-headline font-serif">
                                                Let's Talk
                                            </h2>
                                            <button
                                                type="button"
                                                onClick={handleCloseForm}
                                                className="bento-close-btn"
                                                aria-label="Close form view"
                                                title="Back to Let's Connect"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>

                                        <form onSubmit={handleSubmit} className="bento-form-element font-sans">
                                            {/* Honeypot anti-spam */}
                                            <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

                                            <div className="bento-input-row">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Your Name"
                                                    className="bento-text-field"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Your Email"
                                                    className="bento-text-field"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="bento-textarea-row">
                                                <textarea
                                                    name="message"
                                                    placeholder="Your Message"
                                                    rows="4"
                                                    className="bento-textarea-field"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="bento-submit-action font-sans"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    'Sending Message...'
                                                ) : isSuccess ? (
                                                    'Message Transmitted ✓'
                                                ) : isError ? (
                                                    'Error. Please Try Again'
                                                ) : (
                                                    'Send Message'
                                                )}
                                            </button>
                                        </form>
                                    </motion.div>

                                    {/* Bottom Row: 3 Modular Cards */}
                                    <motion.div
                                        className="bento-bottom-row"
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                            {/* Subcard 1: Studio & Direct Details */}
                                            <div className="bento-subcard bento-studio-card">
                                                <h3 className="bento-studio-title font-serif">
                                                    Prangya<br />Studio
                                                </h3>
                                                <div className="bento-studio-meta font-sans">
                                                    <p>Odisha, India</p>
                                                    <p className="bento-meta-sub">Worldwide Remote</p>
                                                    <p className="bento-meta-email">meherprangya@gmail.com</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={handleCopyEmail}
                                                    className="bento-studio-action-btn font-sans"
                                                >
                                                    <span>{copiedEmail ? 'Copied ✓' : 'Copy Email'}</span>
                                                    <ArrowUpRight size={13} />
                                                </button>
                                            </div>

                                            {/* Subcard 2: Creative Portrait Card */}
                                            <div className="bento-subcard bento-portrait-card">
                                                <img
                                                    src={aboutMeImg}
                                                    alt="Prangyanjali Meher creative setup"
                                                    className="bento-subcard-img"
                                                />
                                            </div>

                                            {/* Subcard 3: Social Pills Stack */}
                                            <div className="bento-subcard bento-social-stack">
                                                <a
                                                    href="https://github.com/prangya-meher"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bento-social-row font-sans"
                                                    onClick={playClickSound}
                                                >
                                                    <span>GitHub</span>
                                                    <Github size={14} className="social-row-icon" />
                                                </a>
                                                <a
                                                    href="https://www.linkedin.com/in/prangyanjali-meher-aa6b56316"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bento-social-row font-sans"
                                                    onClick={playClickSound}
                                                >
                                                    <span>LinkedIn</span>
                                                    <Linkedin size={14} className="social-row-icon" />
                                                </a>
                                                <a
                                                    href="mailto:meherprangya@gmail.com"
                                                    className="bento-social-row font-sans"
                                                    onClick={playClickSound}
                                                >
                                                    <span>Email</span>
                                                    <Mail size={14} className="social-row-icon" />
                                                </a>
                                                <a
                                                    href="/PRANGYANJALI-MEHER-%20Resume.pdf"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bento-social-row font-sans"
                                                    onClick={playClickSound}
                                                >
                                                    <span>Resume</span>
                                                    <Download size={14} className="social-row-icon" />
                                                </a>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Notification Toast */}
                <AnimatePresence>
                    {(isSuccess || isError) && (
                        <motion.div
                            className={`editorial-toast ${isError ? 'toast-err' : 'toast-ok'} font-sans`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.25 }}
                        >
                            {isSuccess ? (
                                <span>Message delivered successfully. I will be in touch shortly.</span>
                            ) : (
                                <span>Submission error. Please email directly at meherprangya@gmail.com</span>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
        </section>
    );
};

export default Contact;
