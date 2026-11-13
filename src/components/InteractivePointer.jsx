import React, { useEffect, useState } from 'react';
import './InteractivePointer.css';

const InteractivePointer = () => {
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Disable on touch devices
        if (window.matchMedia('(pointer: coarse)').matches) {
            return;
        }

        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleElementHover = (e) => {
            const target = e.target;
            const isInteractive = target.closest('a, button, .dev-card, input, textarea, .interactive-item');
            setIsHovered(!!isInteractive);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mouseover', handleElementHover);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('mouseover', handleElementHover);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="custom-pointer-container" style={{ pointerEvents: 'none' }}>
            {/* Ambient Spotlight */}
            <div
                className="pointer-spotlight"
                style={{
                    transform: `translate3d(${mousePos.x - 300}px, ${mousePos.y - 300}px, 0)`
                }}
            />
            {/* Precision Reticle Dot */}
            <div
                className={`pointer-dot ${isHovered ? 'hovered' : ''}`}
                style={{
                    transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`
                }}
            />
        </div>
    );
};

export default InteractivePointer;

