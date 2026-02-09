import { Link } from 'react-router-dom';
import { Row, Col, Space } from 'antd';
import {
    GithubOutlined,
    LinkedinOutlined,
    TwitterOutlined,
    MailOutlined
} from '@ant-design/icons';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <Row gutter={[32, 32]}>
                    <Col xs={24} md={8}>
                        <h3 className="footer-title">Portfolio</h3>
                        <p className="footer-description">
                            Showcasing professional web development projects with modern technologies and best practices.
                        </p>
                    </Col>

                    <Col xs={24} md={8}>
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </Col>

                    <Col xs={24} md={8}>
                        <h4 className="footer-heading">Connect</h4>
                        <Space size="large" className="social-links">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <GithubOutlined style={{ fontSize: '1.5rem' }} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <LinkedinOutlined style={{ fontSize: '1.5rem' }} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <TwitterOutlined style={{ fontSize: '1.5rem' }} />
                            </a>
                            <a href="mailto:contact@example.com" aria-label="Email">
                                <MailOutlined style={{ fontSize: '1.5rem' }} />
                            </a>
                        </Space>
                    </Col>
                </Row>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Portfolio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
