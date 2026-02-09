import { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Space, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { getSiteContent, updateSiteContent } from '../../firebase/firestore';
import { SiteSettings } from '../../types';
import './SettingsEditor.css';

const SettingsEditor = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        try {
            setLoading(true);
            const content = await getSiteContent<SiteSettings>('settings');
            if (content) {
                form.setFieldsValue(content);
            }
        } catch (error) {
            console.error('Error loading settings:', error);
            message.error('Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (values: SiteSettings) => {
        try {
            setLoading(true);
            await updateSiteContent('settings', values);
            message.success('Settings updated successfully!');
        } catch (error) {
            console.error('Error saving settings:', error);
            message.error('Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="settings-editor">
            <div className="editor-header">
                <h1>Site Settings</h1>
                <p>Configure global site settings and branding</p>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                initialValues={{
                    siteTitle: 'My Portfolio',
                    logoUrl: '',
                    navLinks: [],
                    socialLinks: [],
                    resumeUrl: ''
                }}
            >
                <Card title="General Settings" className="editor-card">
                    <Form.Item
                        label="Site Title"
                        name="siteTitle"
                        rules={[{ required: true, message: 'Please enter a site title' }]}
                    >
                        <Input placeholder="e.g., John Doe Portfolio" size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Logo URL"
                        name="logoUrl"
                        extra="Enter the URL of your logo image"
                    >
                        <Input placeholder="https://example.com/logo.png" size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Resume URL"
                        name="resumeUrl"
                        extra="Enter the URL of your resume/CV PDF"
                    >
                        <Input placeholder="https://example.com/resume.pdf" size="large" />
                    </Form.Item>
                </Card>

                <Card title="Navigation Links" className="editor-card">
                    <Form.List name="navLinks">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => (
                                    <div key={field.key} className="link-item">
                                        <div className="link-fields">
                                            <Form.Item
                                                {...field}
                                                label="Label"
                                                name={[field.name, 'label']}
                                                rules={[{ required: true, message: 'Please enter label' }]}
                                            >
                                                <Input placeholder="e.g., About" />
                                            </Form.Item>

                                            <Form.Item
                                                {...field}
                                                label="Link/Anchor"
                                                name={[field.name, 'href']}
                                                rules={[{ required: true, message: 'Please enter link' }]}
                                            >
                                                <Input placeholder="e.g., #about or /about" />
                                            </Form.Item>
                                        </div>

                                        <Button
                                            type="text"
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() => remove(field.name)}
                                            className="remove-link-btn"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}

                                <Button
                                    type="dashed"
                                    onClick={() => add({ label: '', href: '' })}
                                    block
                                    icon={<PlusOutlined />}
                                    disabled={fields.length >= 8}
                                >
                                    Add Navigation Link {fields.length >= 8 && '(Maximum reached)'}
                                </Button>
                            </>
                        )}
                    </Form.List>
                </Card>

                <Card title="Social Media Links" className="editor-card">
                    <Form.List name="socialLinks">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => (
                                    <div key={field.key} className="link-item">
                                        <div className="social-fields">
                                            <Form.Item
                                                {...field}
                                                label="Platform"
                                                name={[field.name, 'platform']}
                                                rules={[{ required: true, message: 'Please enter platform' }]}
                                            >
                                                <Input placeholder="e.g., GitHub, LinkedIn, Twitter" />
                                            </Form.Item>

                                            <Form.Item
                                                {...field}
                                                label="URL"
                                                name={[field.name, 'url']}
                                                rules={[
                                                    { required: true, message: 'Please enter URL' },
                                                    { type: 'url', message: 'Please enter a valid URL' }
                                                ]}
                                            >
                                                <Input placeholder="https://github.com/username" />
                                            </Form.Item>

                                            <Form.Item
                                                {...field}
                                                label="Icon (optional)"
                                                name={[field.name, 'icon']}
                                            >
                                                <Input placeholder="Icon name or URL" />
                                            </Form.Item>
                                        </div>

                                        <Button
                                            type="text"
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() => remove(field.name)}
                                            className="remove-link-btn"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}

                                <Button
                                    type="dashed"
                                    onClick={() => add({ platform: '', url: '', icon: '' })}
                                    block
                                    icon={<PlusOutlined />}
                                    disabled={fields.length >= 6}
                                >
                                    Add Social Link {fields.length >= 6 && '(Maximum reached)'}
                                </Button>
                            </>
                        )}
                    </Form.List>
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

export default SettingsEditor;
