import { useState, useEffect } from 'react';
import { Row, Col, Input, Select, Spin, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getProjects } from '../../firebase/firestore';
import { Project } from '../../types';
import ProjectCard from './ProjectCard';
import './PortfolioGrid.css';

const { Option } = Select;

const PortfolioGrid = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTech, setSelectedTech] = useState<string>('all');

    useEffect(() => {
        loadProjects();
    }, []);

    useEffect(() => {
        filterProjects();
    }, [searchTerm, selectedTech, projects]);

    const loadProjects = async () => {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
        setFilteredProjects(data);
        setLoading(false);
    };

    const filterProjects = () => {
        let filtered = [...projects];

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(project =>
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by technology
        if (selectedTech && selectedTech !== 'all') {
            filtered = filtered.filter(project =>
                project.technologies.includes(selectedTech)
            );
        }

        setFilteredProjects(filtered);
    };

    // Get all unique technologies
    const allTechnologies = Array.from(
        new Set(projects.flatMap(project => project.technologies))
    ).sort();

    if (loading) {
        return (
            <div className="portfolio-loading">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <section id="portfolio" className="portfolio-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="fade-in">Featured Projects</h2>
                    <p className="section-subtitle fade-in">
                        Explore my latest work and creative solutions
                    </p>
                </div>

                <div className="portfolio-filters fade-in">
                    <Input
                        placeholder="Search projects..."
                        prefix={<SearchOutlined />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        size="large"
                        className="search-input"
                    />
                    <Select
                        value={selectedTech}
                        onChange={setSelectedTech}
                        size="large"
                        className="tech-filter"
                        style={{ minWidth: 200 }}
                    >
                        <Option value="all">All Technologies</Option>
                        {allTechnologies.map(tech => (
                            <Option key={tech} value={tech}>{tech}</Option>
                        ))}
                    </Select>
                </div>

                {filteredProjects.length === 0 ? (
                    <Empty
                        description="No projects found"
                        style={{ margin: 'var(--spacing-3xl) 0' }}
                    />
                ) : (
                    <Row gutter={[24, 24]} className="portfolio-grid">
                        {filteredProjects.map((project, index) => (
                            <Col xs={24} sm={12} lg={8} key={project.id}>
                                <div
                                    className="fade-in"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <ProjectCard project={project} />
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </section>
    );
};

export default PortfolioGrid;
