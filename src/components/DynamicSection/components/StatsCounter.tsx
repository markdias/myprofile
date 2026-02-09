import { useEffect, useState } from 'react';
import { Row, Col, Statistic } from 'antd';
import * as Icons from '@ant-design/icons';
import { StatsCounterConfig } from '../../../types';

interface StatsCounterProps {
    config: StatsCounterConfig;
}

const StatsCounter = ({ config }: StatsCounterProps) => {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        setAnimated(true);
    }, []);

    const getIcon = (iconName?: string) => {
        if (!iconName) return null;
        const IconComponent = (Icons as any)[iconName];
        return IconComponent ? <IconComponent style={{ fontSize: '2rem', color: 'var(--color-primary)' }} /> : null;
    };

    return (
        <div className="stats-counter">
            <Row gutter={[32, 32]} justify="center">
                {config.stats.map((stat, index) => (
                    <Col key={index} xs={24} sm={12} md={24 / config.stats.length}>
                        <div className="stat-item" style={{ textAlign: 'center' }}>
                            {stat.icon && <div className="stat-icon">{getIcon(stat.icon)}</div>}
                            <Statistic
                                value={animated ? stat.value : 0}
                                suffix={stat.suffix}
                                valueStyle={{
                                    color: 'var(--color-primary)',
                                    fontSize: '2.5rem',
                                    fontWeight: 700
                                }}
                            />
                            <p className="stat-label">{stat.label}</p>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default StatsCounter;
