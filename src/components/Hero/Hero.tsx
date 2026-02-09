import { useState, useEffect } from 'react';
import { Button, Space } from 'antd';
import { ArrowRightOutlined, DownloadOutlined } from '@ant-design/icons';
import { getSiteContent } from '../../firebase/firestore';
import { HeroContent } from '../../types';
import './Hero.css';

const Hero = () => {
    const [content, setContent] = useState<HeroContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        try {
            const data = await getSiteContent<HeroContent>('hero');
            setContent(data);
        } catch (error) {
            console.error('Error loading hero content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCTAClick = (link: string) => {
        if (link.startsWith('#')) {
            const element = document.getElementById(link.substring(1));
            element?.scrollIntoView({ behavior: 'smooth' });
        } else if (link.startsWith('/')) {
            window.location.href = link;
        } else {
            window.open(link, '_blank');
        }
    };

    if (loading) {
        return (
            <section className="hero">
                <div className="hero-background">
                    <div className="hero-gradient"></div>
                    <div className="hero-pattern"></div>
                </div>
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="loading-placeholder">Loading...</div>
                    </div>
                </div>
            </section>
        );
    }

    const title = content?.title || 'Welcome to My Portfolio';
    const subtitle = content?.subtitle || 'I create amazing digital experiences';
    const cta1Text = content?.cta1Text || 'View My Work';
    const cta1Link = content?.cta1Link || '#portfolio';
    const cta2Text = content?.cta2Text;
    const cta2Link = content?.cta2Link;
    const stats = content?.stats || [];

    return (
        <section className="hero">
            <div className="hero-background">
                <div className="hero-gradient"></div>
                <div className="hero-pattern"></div>
            </div>

            <div className="hero-content">
                <div className="hero-text">
                    <h1 className="hero-title fade-in">
                        {title.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                {index < title.split('\n').length - 1 && <br />}
                            </span>
                        ))}
                    </h1>

                    <p className="hero-subtitle fade-in" style={{ animationDelay: '0.2s' }}>
                        {subtitle}
                    </p>

                    <Space size="large" className="hero-actions fade-in" style={{ animationDelay: '0.4s' }}>
                        <Button
                            type="primary"
                            size="large"
                            icon={<ArrowRightOutlined />}
                            onClick={() => handleCTAClick(cta1Link)}
                            className="hero-btn-primary"
                        >
                            {cta1Text}
                        </Button>
                        {cta2Text && cta2Link && (
                            <Button
                                size="large"
                                icon={<DownloadOutlined />}
                                onClick={() => handleCTAClick(cta2Link)}
                                className="hero-btn-secondary"
                            >
                                {cta2Text}
                            </Button>
                        )}
                    </Space>
                </div>

                {stats.length > 0 && (
                    <div className="hero-stats fade-in" style={{ animationDelay: '0.6s' }}>
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-item">
                                <h3>{stat.value}</h3>
                                <p>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="scroll-indicator">
                <div className="mouse"></div>
            </div>
        </section>
    );
};

export default Hero;

