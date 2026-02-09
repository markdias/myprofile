import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import AboutComponent from '../components/About/About';

const About = () => {
    return (
        <div className="page">
            <Header />
            <main style={{ paddingTop: '70px', minHeight: 'calc(100vh - 70px)' }}>
                <AboutComponent />
            </main>
            <Footer />
        </div>
    );
};

export default About;
