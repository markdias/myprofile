import { useState } from 'react';
import { Card, Tag, Space } from 'antd';
import { GithubOutlined, LinkOutlined } from '@ant-design/icons';
import { Project } from '../../types';
import ProjectModal from './ProjectModal';
import './ProjectCard.css';

const { Meta } = Card;

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <>
            <Card
                hoverable
                className="project-card"
                cover={
                    <div className="project-image-wrapper">
                        {!imageLoaded && <div className="image-skeleton" />}
                        <img
                            alt={project.title}
                            src={project.imageUrl}
                            className="project-image"
                            onLoad={() => setImageLoaded(true)}
                            style={{ display: imageLoaded ? 'block' : 'none' }}
                        />
                        <div className="project-overlay">
                            <Space size="middle">
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="overlay-btn"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <LinkOutlined /> Live Demo
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="overlay-btn"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <GithubOutlined /> Code
                                    </a>
                                )}
                            </Space>
                        </div>
                    </div>
                }
                onClick={() => setModalOpen(true)}
            >
                <Meta
                    title={<h3 className="project-title">{project.title}</h3>}
                    description={
                        <p className="project-description">{project.description}</p>
                    }
                />
                <div className="project-tech">
                    {project.technologies.slice(0, 3).map(tech => (
                        <Tag key={tech} color="blue">
                            {tech}
                        </Tag>
                    ))}
                    {project.technologies.length > 3 && (
                        <Tag>+{project.technologies.length - 3}</Tag>
                    )}
                </div>
            </Card>

            <ProjectModal
                project={project}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </>
    );
};

export default ProjectCard;
