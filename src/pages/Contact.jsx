import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Github, Linkedin, Copy, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './Contact.css';

const WEB3FORMS_ACCESS_KEY = '698598e7-4b97-4352-9b00-4b38c08c1b8b';

const Contact = () => {
    const { playClickSound } = useTheme();
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
        <section className="editorial-contact-page">
            <div className="container">
                {/* Header */}
                <div className="section-header">
                    <span className="section-tag font-sans">CONTACT</span>
                    <h1 className="section-title font-serif">
                        LET'S CREATE SOMETHING MEANINGFUL.
                    </h1>
                    <p className="section-subtitle font-sans">
                        I am currently available for full-time frontend/full-stack positions, freelance projects, and creative collaborations.
                    </p>
                </div>

                <div className="editorial-contact-grid">
                    {/* Left: Direct Information */}
                    <div className="editorial-contact-info-panel">
                        <div className="contact-meta-block">
                            <span className="contact-meta-label font-sans">INQUIRIES & AVAILABILITY</span>
                            <h3 className="contact-meta-headline font-serif">
                                START A CONVERSATION.
                            </h3>
                            <p className="contact-meta-body font-sans">
                                Whether you have a project to architect, an engineering position to fill, or want to discuss modern web technologies, feel free to reach out.
                            </p>
                        </div>

                        {/* Direct Channels */}
                        <div className="editorial-channels-list">
                            <div className="editorial-channel-item">
                                <span className="channel-type font-sans">DIRECT EMAIL</span>
                                <div className="channel-value-row">
                                    <button className="channel-email-btn font-sans" onClick={handleCopyEmail}>
                                        meherprangya@gmail.com
                                    </button>
                                    <button
                                        className="channel-copy-icon-btn"
                                        onClick={handleCopyEmail}
                                        title="Copy email"
                                        aria-label="Copy Email"
                                    >
                                        {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                                    </button>
                                </div>
                            </div>

                            <div className="editorial-channel-item">
                                <span className="channel-type font-sans">TELEPHONE</span>
                                <a href="tel:+918117862163" className="channel-phone-link font-sans">
                                    +91 8117862163
                                </a>
                            </div>

                            <div className="editorial-channel-item">
                                <span className="channel-type font-sans">LOCATION</span>
                                <span className="channel-loc-text font-sans">
                                    Odisha, India (Available for Worldwide Remote)
                                </span>
                            </div>
                        </div>

                        {/* Social profiles */}
                        <div className="contact-social-row">
                            <span className="channel-type font-sans">PROFILES</span>
                            <div className="social-links-wrap font-sans">
                                <a
                                    href="https://github.com/prangya-meher"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="editorial-social-link"
                                    onClick={playClickSound}
                                >
                                    GITHUB &rarr;
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/prangyanjali-meher-aa6b56316"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="editorial-social-link"
                                    onClick={playClickSound}
                                >
                                    LINKEDIN &rarr;
                                </a>
                            </div>
                        </div>

                        {/* Monogram Badge */}
                        <div className="contact-monogram-box">
                            <div className="monogram-capsule-stone font-serif">
                                <span>PM</span>
                            </div>
                            <span className="monogram-badge-year font-sans">ESTD 2026</span>
                        </div>
                    </div>

                    {/* Right: Message Dispatch Form */}
                    <div className="editorial-contact-form-panel">
                        <div className="form-panel-top font-sans">
                            <span>DISPATCH INQUIRY</span>
                            <span>WEB3FORMS ENCRYPTED</span>
                        </div>

                        <form onSubmit={handleSubmit} className="editorial-form-body font-sans">
                            {/* Honeypot */}
                            <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

                            <div className="editorial-field-item">
                                <label className="editorial-label" htmlFor="name">
                                    YOUR NAME *
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="editorial-text-input"
                                    placeholder="e.g. Eleanor Vance"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="editorial-field-item">
                                <label className="editorial-label" htmlFor="email">
                                    YOUR EMAIL ADDRESS *
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    className="editorial-text-input"
                                    placeholder="e.g. eleanor@studio.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="editorial-field-item">
                                <label className="editorial-label" htmlFor="message">
                                    PROJECT OR ROLE DETAILS *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="editorial-textarea"
                                    placeholder="Describe the opportunity, scope, or timeline..."
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary submit-action-btn"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>DISPATCHING MESSAGE...</>
                                ) : isSuccess ? (
                                    <>MESSAGE TRANSMITTED ✓</>
                                ) : isError ? (
                                    <>ERROR. PLEASE TRY AGAIN &rarr;</>
                                ) : (
                                    <>SEND MESSAGE &rarr;</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Floating Notification */}
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
            </div>
        </section>
    );
};

export default Contact;
