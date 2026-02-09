import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ContactForm from '../components/Contact/ContactForm';

const Contact = () => {
    return (
        <div className="page">
            <Header />
            <main style={{ paddingTop: '70px', minHeight: 'calc(100vh - 70px)' }}>
                <ContactForm />
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
