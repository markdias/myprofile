import DOMPurify from 'dompurify';
import { TextBlockConfig } from '../../../types';

interface TextBlockProps {
    config: TextBlockConfig;
}

const TextBlock = ({ config }: TextBlockProps) => {
    const sanitizedHTML = DOMPurify.sanitize(config.content);

    return (
        <div className="text-block">
            {config.heading && <h3>{config.heading}</h3>}
            <div
                className="text-content"
                dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            />
        </div>
    );
};

export default TextBlock;
