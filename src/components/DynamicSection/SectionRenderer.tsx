import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { getVisibleSections } from '../../firebase/firestore';
import { Section } from '../../types';
import ComponentRenderer from './ComponentRenderer';
import './SectionRenderer.css';

const SectionRenderer = () => {
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSections();
    }, []);

    const loadSections = async () => {
        setLoading(true);
        const data = await getVisibleSections();
        setSections(data);
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="sections-loading">
                <Spin size="large" />
            </div>
        );
    }

    if (sections.length === 0) {
        return null;
    }

    return (
        <div className="dynamic-sections">
            {sections.map((section, index) => (
                <section
                    key={section.id}
                    id={section.slug}
                    className="dynamic-section fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <div className="container">
                        {section.title && (
                            <h2 className="section-title">{section.title}</h2>
                        )}
                        <div className="section-components">
                            {section.components.map((component, compIndex) => (
                                <ComponentRenderer
                                    key={compIndex}
                                    component={component}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default SectionRenderer;
