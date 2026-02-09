import { ComponentConfig, ComponentType } from '../../types';
import TextBlock from './components/TextBlock';
import ImageGallery from './components/ImageGallery';
import VideoEmbed from './components/VideoEmbed';
import StatsCounter from './components/StatsCounter';
import Timeline from './components/Timeline';
import SkillsGrid from './components/SkillsGrid';
import Testimonials from './components/Testimonials';
import CTAButton from './components/CTAButton';
import Divider from './components/Divider';
import CustomHTML from './components/CustomHTML';

interface ComponentRendererProps {
    component: ComponentConfig;
}

const ComponentRenderer = ({ component }: ComponentRendererProps) => {
    const { type, config, styles } = component;

    const componentStyle = {
        backgroundColor: styles?.backgroundColor,
        color: styles?.textColor,
        padding: styles?.padding,
        margin: styles?.margin,
        textAlign: styles?.alignment as any,
    };

    const renderComponent = () => {
        switch (type) {
            case ComponentType.TEXT_BLOCK:
                return <TextBlock config={config} />;
            case ComponentType.IMAGE_GALLERY:
                return <ImageGallery config={config} />;
            case ComponentType.VIDEO_EMBED:
                return <VideoEmbed config={config} />;
            case ComponentType.STATS_COUNTER:
                return <StatsCounter config={config} />;
            case ComponentType.TIMELINE:
                return <Timeline config={config} />;
            case ComponentType.SKILLS_GRID:
                return <SkillsGrid config={config} />;
            case ComponentType.TESTIMONIALS:
                return <Testimonials config={config} />;
            case ComponentType.CTA_BUTTON:
                return <CTAButton config={config} />;
            case ComponentType.DIVIDER:
                return <Divider config={config} />;
            case ComponentType.CUSTOM_HTML:
                return <CustomHTML config={config} />;
            default:
                return null;
        }
    };

    return (
        <div className="component-wrapper" style={componentStyle}>
            {renderComponent()}
        </div>
    );
};

export default ComponentRenderer;
