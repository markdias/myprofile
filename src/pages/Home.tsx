import { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Hero from '../components/Hero/Hero';
import PortfolioGrid from '../components/Portfolio/PortfolioGrid';
import SectionRenderer from '../components/DynamicSection/SectionRenderer';
import About from '../components/About/About';
import ContactForm from '../components/Contact/ContactForm';
import MacBookIntro from '../components/MacBookIntro/MacBookIntro';
import { getSiteContent } from '../firebase/firestore';
import { HeroContent } from '../types';

const Home = () => {
    const [introComplete, setIntroComplete] = useState(false);
    const [heroContent, setHeroContent] = useState<HeroContent | null>(null);

    // Preload hero content for the MacBook screen
    useEffect(() => {
        const loadHeroContent = async () => {
            try {
                const data = await getSiteContent<HeroContent>('hero');
                setHeroContent(data);
            } catch (error) {
                console.error('Error loading hero content:', error);
            }
        };
        loadHeroContent();
    }, []);

    return (
        <div className="home-page">
            {!introComplete && (
                <MacBookIntro
                    onComplete={() => setIntroComplete(true)}
                    heroContent={heroContent ? {
                        title: heroContent.title || 'Welcome to My Portfolio',
                        subtitle: heroContent.subtitle || 'I create amazing digital experiences',
                        cta1Text: heroContent.cta1Text || 'View My Work'
                    } : undefined}
                />
            )}
            <div className={`page ${introComplete ? 'visible' : 'hidden'}`}>
                <Header />
                <main>
                    <Hero />
                    <PortfolioGrid />
                    <SectionRenderer />
                    <About />
                    <ContactForm />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Home;

