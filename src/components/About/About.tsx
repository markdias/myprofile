import { useState, useEffect } from 'react';
import { Row, Col, Progress } from 'antd';
import { CodeOutlined, RocketOutlined, TeamOutlined } from '@ant-design/icons';
import { getSiteContent } from '../../firebase/firestore';
import { AboutContent } from '../../types';
import './About.css';

const About = () => {
    const [content, setContent] = useState<AboutContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        try {
            const data = await getSiteContent<AboutContent>('about');
            setContent(data);
        } catch (error) {
            console.error('Error loading about content:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="about-section">
                <div className="container">
                    <div className="loading-placeholder">Loading...</div>
                </div>
            </section>
        );
    }

    const heading = content?.heading || 'About Me';
    const description = content?.description || 'Passionate about creating exceptional digital experiences';
    const skills = content?.skills || [];

    return (
        <section className="about-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="fade-in">{heading}</h2>
                    <p className="section-subtitle fade-in">
                        {description.split('\n')[0]}
                    </p>
                </div>

                <Row gutter={[48, 48]} align="middle">
                    <Col xs={24} lg={12}>
                        <div className="about-content fade-in">
                            <div className="about-text">
                                {description.split('\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>

                            <div className="about-highlights">
                                <div className="highlight-item">
                                    <CodeOutlined className="highlight-icon" />
                                    <div>
                                        <h4>Clean Code</h4>
                                        <p>Writing maintainable, scalable solutions</p>
                                    </div>
                                </div>
                                <div className="highlight-item">
                                    <RocketOutlined className="highlight-icon" />
                                    <div>
                                        <h4>Performance</h4>
                                        <p>Optimized for speed and efficiency</p>
                                    </div>
                                </div>
                                <div className="highlight-item">
                                    <TeamOutlined className="highlight-icon" />
                                    <div>
                                        <h4>Collaboration</h4>
                                        <p>Strong communication and teamwork</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col xs={24} lg={12}>
                        <div className="skills-section fade-in">
                            <h3>Technical Skills</h3>
                            {skills.length > 0 ? (
                                <div className="skills-list">
                                    {skills.map((skill, index) => (
                                        <div key={index} className="skill-item">
                                            <div className="skill-header">
                                                <span className="skill-name">{skill.name}</span>
                                                <span className="skill-level">{skill.percentage}%</span>
                                            </div>
                                            <Progress
                                                percent={skill.percentage}
                                                showInfo={false}
                                                strokeColor={{
                                                    '0%': '#1a365d',
                                                    '100%': '#2c5282',
                                                }}
                                                trailColor="var(--color-bg-tertiary)"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No skills added yet. Add skills from the admin dashboard.</p>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default About;

