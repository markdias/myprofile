import { Row, Col, Image } from 'antd';
import { ImageGalleryConfig } from '../../../types';

interface ImageGalleryProps {
    config: ImageGalleryConfig;
}

const ImageGallery = ({ config }: ImageGalleryProps) => {
    const columns = config.columns || 3;

    return (
        <div className="image-gallery">
            <Image.PreviewGroup>
                <Row gutter={[16, 16]}>
                    {config.images.map((image, index) => (
                        <Col
                            key={index}
                            xs={24}
                            sm={12}
                            md={24 / columns}
                        >
                            <div className="gallery-item">
                                <Image
                                    src={image.url}
                                    alt={image.alt || `Gallery image ${index + 1}`}
                                    style={{ width: '100%', borderRadius: '8px' }}
                                />
                                {image.caption && (
                                    <p className="image-caption">{image.caption}</p>
                                )}
                            </div>
                        </Col>
                    ))}
                </Row>
            </Image.PreviewGroup>
        </div>
    );
};

export default ImageGallery;
