import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, User, Briefcase, Mail, Sparkles, Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'About', path: '/about', icon: <User size={18} /> },
    { name: 'Services', path: '/services', icon: <Sparkles size={18} /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={18} /> },
];

const Navbar = () => {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { playClickSound } = useTheme();

    const isActive = (path) =>
        path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

    const handleNavClick = () => {
        playClickSound();
    };

    return (
        <>
            {/* Desktop Minimal Vertical Dock */}
            <aside className="editorial-dock" aria-label="Main Navigation">
                <nav className="editorial-dock-inner">
                    <ul className="editorial-nav-list">
                        {navLinks.map((link) => {
                            const active = isActive(link.path);
                            return (
                                <li key={link.path} className="editorial-nav-item">
                                    <NavLink
                                        to={link.path}
                                        end={link.path === '/'}
                                        className={`editorial-nav-link ${active ? 'active' : ''}`}
                                        onClick={handleNavClick}
                                    >
                                        <span className="dock-icon">{link.icon}</span>
                                        <span className="editorial-tooltip font-sans">{link.name}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>

            {/* Mobile Header */}
            <header className="editorial-mobile-header">
                <div className="mobile-header-bar">
                    <NavLink to="/" className="mobile-brand font-serif" onClick={handleNavClick}>
                        <span>PRANGYANJALI MEHER</span>
                    </NavLink>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => {
                            playClickSound();
                            setMobileOpen(!mobileOpen);
                        }}
                        aria-label="Menu"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            className="editorial-drawer-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.nav
                            className="editorial-mobile-drawer"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                        >
                            <div className="drawer-top font-sans">
                                <span>NAVIGATION</span>
                                <button className="drawer-close" onClick={() => setMobileOpen(false)}>
                                    <X size={20} />
                                </button>
                            </div>

                            <ul className="drawer-links-stack">
                                {navLinks.map((link, idx) => {
                                    const active = isActive(link.path);
                                    return (
                                        <motion.li
                                            key={link.path}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <NavLink
                                                to={link.path}
                                                end={link.path === '/'}
                                                className={`drawer-editorial-link font-serif ${active ? 'active' : ''}`}
                                                onClick={() => {
                                                    playClickSound();
                                                    setMobileOpen(false);
                                                }}
                                            >
                                                <span>{link.name}</span>
                                                {active && <span className="drawer-dot">✦</span>}
                                            </NavLink>
                                        </motion.li>
                                    );
                                })}
                            </ul>

                            <div className="drawer-footer-actions">
                                <a
                                    href="/PRANGYANJALI-MEHER-%20Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                    style={{ width: '100%' }}
                                >
                                    View CV <Download size={15} />
                                </a>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
