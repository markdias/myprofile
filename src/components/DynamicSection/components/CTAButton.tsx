import { Button } from 'antd';
import { CTAButtonConfig } from '../../../types';

interface CTAButtonProps {
    config: CTAButtonConfig;
}

const CTAButton = ({ config }: CTAButtonProps) => {
    const buttonType = config.variant === 'primary' ? 'primary' :
        config.variant === 'secondary' ? 'default' :
            'default';

    const size = config.size || 'large';

    return (
        <div style={{ textAlign: 'center', margin: 'var(--spacing-lg) 0' }}>
            <Button
                type={buttonType}
                size={size}
                href={config.url}
                target={config.openInNewTab ? '_blank' : '_self'}
                rel={config.openInNewTab ? 'noopener noreferrer' : undefined}
            >
                {config.text}
            </Button>
        </div>
    );
};

export default CTAButton;
