import { Row, Col, Progress } from 'antd';
import { SkillsGridConfig } from '../../../types';

interface SkillsGridProps {
    config: SkillsGridConfig;
}

const SkillsGrid = ({ config }: SkillsGridProps) => {
    const columns = config.columns || 2;

    return (
        <div className="skills-grid">
            <Row gutter={[24, 24]}>
                {config.skills.map((skill, index) => (
                    <Col key={index} xs={24} md={24 / columns}>
                        <div className="skill-item">
                            <div className="skill-header">
                                <span className="skill-name">{skill.name}</span>
                                <span className="skill-level">{skill.level}%</span>
                            </div>
                            <Progress
                                percent={skill.level}
                                showInfo={false}
                                strokeColor={{
                                    '0%': '#1a365d',
                                    '100%': '#2c5282',
                                }}
                            />
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default SkillsGrid;
