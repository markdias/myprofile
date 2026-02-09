import { VideoEmbedConfig } from '../../../types';

interface VideoEmbedProps {
    config: VideoEmbedConfig;
}

const VideoEmbed = ({ config }: VideoEmbedProps) => {
    const getEmbedUrl = (url: string) => {
        // YouTube
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.includes('youtu.be')
                ? url.split('/').pop()
                : new URL(url).searchParams.get('v');
            return `https://www.youtube.com/embed/${videoId}${config.autoplay ? '?autoplay=1' : ''}`;
        }
        // Vimeo
        if (url.includes('vimeo.com')) {
            const videoId = url.split('/').pop();
            return `https://player.vimeo.com/video/${videoId}${config.autoplay ? '?autoplay=1' : ''}`;
        }
        return url;
    };

    return (
        <div className="video-embed">
            {config.title && <h4>{config.title}</h4>}
            <div className="video-wrapper">
                <iframe
                    src={getEmbedUrl(config.url)}
                    title={config.title || 'Video'}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '8px',
                    }}
                />
            </div>
        </div>
    );
};

export default VideoEmbed;
