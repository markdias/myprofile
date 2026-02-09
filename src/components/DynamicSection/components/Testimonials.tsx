import { Carousel, Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { TestimonialsConfig } from '../../../types';

interface TestimonialsProps {
    config: TestimonialsConfig;
}

const Testimonials = ({ config }: TestimonialsProps) => {
    return (
        <div className="testimonials-carousel">
            <Carousel autoplay={config.autoplay !== false} dots>
                {config.testimonials.map((testimonial, index) => (
                    <div key={index}>
                        <Card className="testimonial-card">
                            <div className="testimonial-content">
                                <p className="testimonial-quote">"{testimonial.quote}"</p>
                                <div className="testimonial-author">
                                    <Avatar
                                        size={64}
                                        src={testimonial.imageUrl}
                                        icon={!testimonial.imageUrl && <UserOutlined />}
                                    />
                                    <div className="author-info">
                                        <h4>{testimonial.author}</h4>
                                        {testimonial.role && <p className="author-role">{testimonial.role}</p>}
                                        {testimonial.company && <p className="author-company">{testimonial.company}</p>}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Testimonials;
