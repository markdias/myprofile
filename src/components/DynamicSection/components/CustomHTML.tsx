import DOMPurify from 'dompurify';
import { CustomHTMLConfig } from '../../../types';

interface CustomHTMLProps {
    config: CustomHTMLConfig;
}

const CustomHTML = ({ config }: CustomHTMLProps) => {
    const sanitizedHTML = DOMPurify.sanitize(config.html);

    return (
        <div
            className="custom-html"
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        />
    );
};

export default CustomHTML;
