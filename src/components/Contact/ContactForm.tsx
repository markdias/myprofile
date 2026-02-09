import { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import { createContactMessage, getSiteContent } from '../../firebase/firestore';
import { ContactContent } from '../../types';
import './ContactForm.css';

const { TextArea } = Input;

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

const ContactForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState<ContactContent | null>(null);

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        try {
            const data = await getSiteContent<ContactContent>('contact');
            setContent(data);
        } catch (error) {
            console.error('Error loading contact content:', error);
        }
    };

    const onFinish = async (values: ContactFormData) => {
        setLoading(true);
        try {
            const id = await createContactMessage(values);
            if (id) {
                message.success('Message sent successfully! I\'ll get back to you soon.');
                form.resetFields();
            } else {
                message.error('Failed to send message. Please try again.');
            }
        } catch (error) {
            message.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const title = content?.title || 'Get In Touch';
    const description = content?.description || 'Have a project in mind? Let\'s work together to create something amazing.';

    return (
        <section className="contact-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="fade-in">{title}</h2>
                    <p className="section-subtitle fade-in">
                        {description}
                    </p>
                </div>

                <div className="contact-form-wrapper fade-in">
                    <Form
                        form={form}
                        name="contact"
                        onFinish={onFinish}
                        layout="vertical"
                        size="large"
                        className="contact-form"
                    >
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                                { required: true, message: 'Please enter your name' },
                                { min: 2, message: 'Name must be at least 2 characters' }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Your name"
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Please enter your email' },
                                { type: 'email', message: 'Please enter a valid email' }
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined />}
                                placeholder="your.email@example.com"
                            />
                        </Form.Item>

                        <Form.Item
                            name="message"
                            label="Message"
                            rules={[
                                { required: true, message: 'Please enter your message' },
                                { min: 10, message: 'Message must be at least 10 characters' }
                            ]}
                        >
                            <TextArea
                                rows={6}
                                placeholder="Tell me about your project..."
                                showCount
                                maxLength={1000}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                icon={<MessageOutlined />}
                                block
                                className="submit-btn"
                            >
                                Send Message
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
