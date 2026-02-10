import { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Space, message } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { getSiteContent, updateSiteContent } from '../../firebase/firestore';
import { ContactContent } from '../../types';
import './ContactEditor.css';

const { TextArea } = Input;

const ContactEditor = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        try {
            setLoading(true);
            const content = await getSiteContent<ContactContent>('contact');
            if (content) {
                form.setFieldsValue(content);
            }
        } catch (error) {
            console.error('Error loading contact content:', error);
            message.error('Failed to load contact content');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (values: ContactContent) => {
        try {
            setLoading(true);
            await updateSiteContent('contact', values);
            message.success('Contact section updated successfully!');
        } catch (error) {
            console.error('Error saving contact content:', error);
            message.error('Failed to save contact content');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-editor">
            <div className="editor-header">
                <h1>Contact Section Editor</h1>
                <p>Manage your contact information and messaging</p>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                initialValues={{
                    title: 'Get In Touch',
                    description: '',
                    email: '',
                    phone: '',
                    location: ''
                }}
            >
                <Card title="Section Content" className="editor-card">
                    <Form.Item
                        label="Section Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter a title' }]}
                    >
                        <Input placeholder="e.g., Get In Touch" size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please enter a description' }]}
                    >
                        <TextArea
                            placeholder="Brief message to encourage visitors to reach out..."
                            rows={4}
                            showCount
                            maxLength={500}
                        />
                    </Form.Item>
                </Card>

                <Card title="Contact Information" className="editor-card">
                    <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[
                            { type: 'email', message: 'Please enter a valid email' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="your.email@example.com"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phone"
                    >
                        <Input
                            prefix={<PhoneOutlined />}
                            placeholder="+1 (555) 123-4567"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Location"
                        name="location"
                    >
                        <Input
                            prefix={<EnvironmentOutlined />}
                            placeholder="City, State/Country"
                            size="large"
                        />
                    </Form.Item>
                </Card>

                <div className="editor-actions">
                    <Space>
                        <Button onClick={() => form.resetFields()}>
                            Reset
                        </Button>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Save Changes
                        </Button>
                    </Space>
                </div>
            </Form>
        </div>
    );
};

export default ContactEditor;
