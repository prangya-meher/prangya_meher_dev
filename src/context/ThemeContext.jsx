import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = [
    { id: 'emerald', name: 'Emerald', color: '#059669', dot: '#10b981' },
    { id: 'sapphire', name: 'Sapphire', color: '#2563eb', dot: '#3b82f6' },
    { id: 'rose', name: 'Rose', color: '#e11d48', dot: '#f43f5e' },
    { id: 'amber', name: 'Amber', color: '#d97706', dot: '#f59e0b' }
];

export const ThemeProvider = ({ children }) => {
    // Mode: 'light' (default elegant porcelain) or 'slate' (elegant deep navy-slate, never pitch black)
    const [mode, setModeState] = useState(() => {
        return localStorage.getItem('portfolio_mode') || 'light';
    });

    // Accent theme: 'emerald' | 'sapphire' | 'rose' | 'amber'
    const [theme, setThemeState] = useState(() => {
        return localStorage.getItem('portfolio_theme') || 'emerald';
    });

    const [soundEnabled, setSoundEnabled] = useState(() => {
        return localStorage.getItem('portfolio_sound') === 'true';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-mode', mode);
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio_mode', mode);
        localStorage.setItem('portfolio_theme', theme);
    }, [mode, theme]);

    const toggleMode = () => {
        playPopSound();
        setModeState((prev) => (prev === 'light' ? 'slate' : 'light'));
    };

    const setMode = (newMode) => {
        setModeState(newMode);
        playPopSound();
    };

    const setTheme = (newTheme) => {
        setThemeState(newTheme);
        playPopSound();
    };

    const toggleSound = () => {
        setSoundEnabled((prev) => {
            const next = !prev;
            localStorage.setItem('portfolio_sound', String(next));
            return next;
        });
    };

    const playPopSound = () => {
        if (!soundEnabled) return;
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.06);
        } catch (_) {}
    };

    const playClickSound = () => {
        if (!soundEnabled) return;
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(600, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.035);
            gain.gain.setValueAtTime(0.03, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.04);
        } catch (_) {}
    };

    return (
        <ThemeContext.Provider value={{
            mode,
            setMode,
            toggleMode,
            theme,
            setTheme,
            themes,
            soundEnabled,
            toggleSound,
            playClickSound,
            playPopSound
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
