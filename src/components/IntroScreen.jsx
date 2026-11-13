import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './IntroScreen.css';

const steps = [
    'INITIALIZING ARCHITECTURE',
    'COMPILING COMPONENT DESIGN SYSTEMS',
    'MOUNTING SELECTED WORK & CASE STUDIES',
    'PORTFOLIO READY'
];

const IntroScreen = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(20);

    useEffect(() => {
        const stepTimer = setInterval(() => {
            setCurrentStep((prev) => {
                if (prev < steps.length - 1) return prev + 1;
                return prev;
            });
        }, 360);

        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressTimer);
                    return 100;
                }
                return prev + 25;
            });
        }, 220);

        const exitTimer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 1800);

        const handleKeyDown = (e) => {
            if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
                if (onComplete) onComplete();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            clearInterval(stepTimer);
            clearInterval(progressTimer);
            clearTimeout(exitTimer);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="editorial-intro-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
            onClick={() => onComplete && onComplete()}
        >
            <div className="editorial-intro-card">
                <div className="intro-meta-top font-sans">
                    <span>FRONTEND & FULL-STACK DEVELOPER</span>
                    <span>ESTD 2026</span>
                </div>

                <div className="intro-center-title font-serif">
                    <h1>PRANGYANJALI MEHER</h1>
                    <p className="intro-subtitle font-sans">PORTFOLIO & ARCHITECTURE</p>
                </div>

                <div className="intro-bottom-progress">
                    <div className="intro-step-label font-sans">
                        <span>{steps[currentStep]}</span>
                        <span>{Math.min(progress, 100)}%</span>
                    </div>
                    <div className="intro-bar-track">
                        <motion.div
                            className="intro-bar-fill"
                            initial={{ width: '15%' }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ ease: 'easeOut', duration: 0.2 }}
                        />
                    </div>
                </div>

                <div className="intro-skip-prompt font-sans">
                    Click anywhere or press Esc to enter &rarr;
                </div>
            </div>
        </motion.div>
    );
};

export default IntroScreen;
