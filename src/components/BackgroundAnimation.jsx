import React from 'react';
import './BackgroundAnimation.css';

const BackgroundAnimation = () => {
    return (
        <div className="editorial-bg-canvas" aria-hidden="true">
            {/* Subtle architectural vertical guides */}
            <div className="editorial-guides">
                <div className="guide-line guide-left" />
                <div className="guide-line guide-right" />
            </div>

            {/* Subtle paper grain / warm texture overlay */}
            <div className="texture-wash" />
        </div>
    );
};

export default BackgroundAnimation;
