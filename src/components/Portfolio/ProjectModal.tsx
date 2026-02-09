import { Modal, Carousel, Tag, Button, Space } from 'antd';
import { GithubOutlined, LinkOutlined, CloseOutlined } from '@ant-design/icons';
import { Project } from '../../types';
import './ProjectModal.css';

interface ProjectModalProps {
    project: Project;
    open: boolean;
    onClose: () => void;
}

const ProjectModal = ({ project, open, onClose }: ProjectModalProps) => {
    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={900}
            closeIcon={<CloseOutlined />}
            className="project-modal"
        >
            <div className="modal-content">
                {/* Image Carousel */}
                {project.images && project.images.length > 0 ? (
                    <Carousel autoplay className="project-carousel">
                        {project.images.map((image, index) => (
                            <div key={index} className="carousel-image-wrapper">
                                <img src={image} alt={`${project.title} ${index + 1}`} />
                            </div>
                        ))}
                    </Carousel>
                ) : (
                    <div className="single-image-wrapper">
                        <img src={project.imageUrl} alt={project.title} />
                    </div>
                )}

                {/* Project Details */}
                <div className="project-details">
                    <h2 className="modal-title">{project.title}</h2>

                    <div className="project-tech-tags">
                        {project.technologies.map(tech => (
                            <Tag key={tech} color="blue" className="tech-tag">
                                {tech}
                            </Tag>
                        ))}
                    </div>

                    <div className="project-description-full">
                        <p>{project.description}</p>
                        {project.longDescription && (
                            <p className="long-description">{project.longDescription}</p>
                        )}
                    </div>

                    <Space size="middle" className="project-actions">
                        {project.liveUrl && (
                            <Button
                                type="primary"
                                icon={<LinkOutlined />}
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="large"
                            >
                                Live Demo
                            </Button>
                        )}
                        {project.githubUrl && (
                            <Button
                                icon={<GithubOutlined />}
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="large"
                            >
                                View Code
                            </Button>
                        )}
                    </Space>
                </div>
            </div>
        </Modal>
    );
};

export default ProjectModal;
