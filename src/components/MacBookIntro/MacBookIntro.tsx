import { useState, useEffect, useCallback } from 'react';
import './MacBookIntro.css';

interface MacBookIntroProps {
    onComplete: () => void;
    heroContent?: {
        title: string;
        subtitle: string;
        cta1Text: string;
    };
}

const MacBookIntro = ({ onComplete, heroContent }: MacBookIntroProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [animationPhase, setAnimationPhase] = useState<
        'idle' | 'opening' | 'screenOn' | 'browserLoad' | 'contentLoad' | 'zooming' | 'complete'
    >('idle');
    const [isMobile, setIsMobile] = useState(false);
    const [typedUrl, setTypedUrl] = useState('');

    const fullUrl = 'www.mdias.co.uk';

    // Detect mobile/touch devices
    useEffect(() => {
        const checkMobile = () => {
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isSmallScreen = window.innerWidth <= 768;
            setIsMobile(isTouchDevice || isSmallScreen);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-play on mobile
    useEffect(() => {
        if (isMobile && animationPhase === 'idle') {
            const timer = setTimeout(() => {
                startAnimation();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isMobile, animationPhase]);

    // URL typing animation
    useEffect(() => {
        if (animationPhase === 'browserLoad') {
            let index = 0;
            const interval = setInterval(() => {
                if (index <= fullUrl.length) {
                    setTypedUrl(fullUrl.slice(0, index));
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 80);
            return () => clearInterval(interval);
        }
    }, [animationPhase]);

    const startAnimation = useCallback(() => {
        if (animationPhase !== 'idle') return;

        // Phase 1: Opening lid
        setAnimationPhase('opening');

        // Phase 2: Screen turns on
        setTimeout(() => setAnimationPhase('screenOn'), 1500);

        // Phase 3: Browser chrome appears
        setTimeout(() => setAnimationPhase('browserLoad'), 2000);

        // Phase 4: Content loads
        setTimeout(() => setAnimationPhase('contentLoad'), 3500);

        // Phase 5: Zoom transition
        setTimeout(() => setAnimationPhase('zooming'), 5500);

        // Phase 6: Complete
        setTimeout(() => {
            setAnimationPhase('complete');
            onComplete();
        }, 7000);
    }, [animationPhase, onComplete]);

    const handleMouseEnter = () => {
        if (!isMobile) {
            setIsHovered(true);
            startAnimation();
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setIsHovered(false);
        }
    };

    const handleSkip = () => {
        setAnimationPhase('complete');
        onComplete();
    };

    // Handle keyboard skip
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && animationPhase !== 'complete') {
                handleSkip();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [animationPhase]);

    const isOpen = animationPhase !== 'idle';
    const showScreen = ['screenOn', 'browserLoad', 'contentLoad', 'zooming'].includes(animationPhase);
    const showBrowser = ['browserLoad', 'contentLoad', 'zooming'].includes(animationPhase);
    const showContent = ['contentLoad', 'zooming'].includes(animationPhase);
    const isZooming = animationPhase === 'zooming';

    return (
        <div className={`macbook-intro ${isZooming ? 'zooming' : ''}`}>
            {/* Background */}
            <div className="intro-background">
                <div className="desk-surface"></div>
                <div className="ambient-light"></div>
            </div>

            {/* Skip button */}
            {animationPhase !== 'idle' && animationPhase !== 'complete' && (
                <button className="skip-button" onClick={handleSkip}>
                    Skip <span className="skip-key">ESC</span>
                </button>
            )}

            {/* Hint text */}
            {animationPhase === 'idle' && !isMobile && (
                <div className="hover-hint">
                    <span className="hint-icon">👆</span>
                    <span>Hover to open</span>
                </div>
            )}

            {/* 3D MacBook Scene */}
            <div
                className="macbook-scene"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className={`macbook ${isOpen ? 'open' : ''} ${isHovered ? 'hovered' : ''}`}>
                    {/* Screen/Lid Assembly */}
                    <div className="macbook-lid">
                        <div className="lid-back">
                            <div className="apple-logo">
                                <svg viewBox="0 0 170 170" className="logo-svg">
                                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375a25.222 25.222 0 0 1-.188-3.07c0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.252 8.99-3.497 13.1-3.71.12 1.083.17 2.166.17 3.24z" fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                        <div className="lid-front">
                            <div className="screen-bezel">
                                <div className="notch">
                                    <div className="camera-dot"></div>
                                </div>
                                <div className="screen-display">
                                    {/* Screen content */}
                                    <div className={`screen-off ${showScreen ? 'hidden' : ''}`}></div>

                                    {showScreen && (
                                        <div className="screen-content">
                                            {/* Browser Chrome */}
                                            {showBrowser && (
                                                <div className="browser-window">
                                                    <div className="browser-toolbar">
                                                        <div className="traffic-lights">
                                                            <span className="light red"></span>
                                                            <span className="light yellow"></span>
                                                            <span className="light green"></span>
                                                        </div>
                                                        <div className="address-bar">
                                                            <span className="url-text">{typedUrl}<span className="cursor-blink">|</span></span>
                                                        </div>
                                                        <div className="browser-actions">
                                                            <span className="action-icon">⊕</span>
                                                        </div>
                                                    </div>
                                                    <div className="browser-content">
                                                        {showContent && (
                                                            <div className="mini-hero">
                                                                <div className="mini-hero-bg"></div>
                                                                <h1 className="mini-title animate-in">
                                                                    {heroContent?.title || 'Welcome to My Portfolio'}
                                                                </h1>
                                                                <p className="mini-subtitle animate-in delay-1">
                                                                    {heroContent?.subtitle || 'I create amazing digital experiences'}
                                                                </p>
                                                                <div className="mini-button animate-in delay-2">
                                                                    {heroContent?.cta1Text || 'View My Work'}
                                                                </div>
                                                            </div>
                                                        )}
                                                        {!showContent && (
                                                            <div className="loading-skeleton">
                                                                <div className="skeleton-line wide"></div>
                                                                <div className="skeleton-line medium"></div>
                                                                <div className="skeleton-button"></div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Power on glow */}
                                            {!showBrowser && (
                                                <div className="power-on-glow"></div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hinge */}
                    <div className="macbook-hinge"></div>

                    {/* Base/Keyboard Assembly */}
                    <div className="macbook-base">
                        <div className="base-top">
                            {/* Speaker Grilles */}
                            <div className="speaker-grille left"></div>
                            <div className="speaker-grille right"></div>

                            {/* Keyboard */}
                            <div className="keyboard-area">
                                {/* Function Row */}
                                <div className="key-row function-row">
                                    <div className="key esc">esc</div>
                                    {[...Array(12)].map((_, i) => (
                                        <div key={`f${i}`} className="key fn-key">F{i + 1}</div>
                                    ))}
                                    <div className="key power">⏻</div>
                                </div>

                                {/* Number Row */}
                                <div className="key-row">
                                    {['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='].map((k) => (
                                        <div key={k} className="key">{k}</div>
                                    ))}
                                    <div className="key backspace">⌫</div>
                                </div>

                                {/* QWERTY Row */}
                                <div className="key-row">
                                    <div className="key tab">⇥</div>
                                    {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'].map((k) => (
                                        <div key={k} className="key">{k}</div>
                                    ))}
                                </div>

                                {/* ASDF Row */}
                                <div className="key-row">
                                    <div className="key caps">⇪</div>
                                    {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"].map((k) => (
                                        <div key={k} className="key">{k}</div>
                                    ))}
                                    <div className="key enter">⏎</div>
                                </div>

                                {/* ZXCV Row */}
                                <div className="key-row">
                                    <div className="key shift-left">⇧</div>
                                    {['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'].map((k) => (
                                        <div key={k} className="key">{k}</div>
                                    ))}
                                    <div className="key shift-right">⇧</div>
                                </div>

                                {/* Bottom Row */}
                                <div className="key-row bottom-row">
                                    <div className="key fn">fn</div>
                                    <div className="key ctrl">⌃</div>
                                    <div className="key opt">⌥</div>
                                    <div className="key cmd">⌘</div>
                                    <div className="key spacebar"></div>
                                    <div className="key cmd">⌘</div>
                                    <div className="key opt">⌥</div>
                                    <div className="key arrow-left">◀</div>
                                    <div className="key-group arrows-vertical">
                                        <div className="key arrow-up">▲</div>
                                        <div className="key arrow-down">▼</div>
                                    </div>
                                    <div className="key arrow-right">▶</div>
                                </div>
                            </div>

                            {/* Trackpad */}
                            <div className="trackpad">
                                <div className="trackpad-surface"></div>
                            </div>
                        </div>

                        {/* Base bottom edge */}
                        <div className="base-front"></div>
                        <div className="base-left"></div>
                        <div className="base-right"></div>
                        <div className="base-back"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MacBookIntro;
