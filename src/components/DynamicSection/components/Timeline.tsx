import { Timeline as AntTimeline } from 'antd';
import { TimelineConfig } from '../../../types';

interface TimelineProps {
    config: TimelineConfig;
}

const Timeline = ({ config }: TimelineProps) => {
    return (
        <div className="timeline-component">
            <AntTimeline
                mode="left"
                items={config.items.map(item => ({
                    label: item.date,
                    children: (
                        <div className="timeline-item-content">
                            <h4>{item.title}</h4>
                            {item.subtitle && <p className="timeline-subtitle">{item.subtitle}</p>}
                            {item.description && <p className="timeline-description">{item.description}</p>}
                        </div>
                    ),
                }))}
            />
        </div>
    );
};

export default Timeline;
