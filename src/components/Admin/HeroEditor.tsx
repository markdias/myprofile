import { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Space, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { getSiteContent, updateSiteContent } from '../../firebase/firestore';
import type { HeroContent } from '../../types';
import './HeroEditor.css';

const { TextArea } = Input;

const HeroEditor = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        setLoading(true);
        try {
            const content = await getSiteContent<HeroContent>('hero');
            if (content) {
                form.setFieldsValue(content);
            }
        } catch (error) {
            message.error('Failed to load hero content');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (values: HeroContent) => {
        setSaving(true);
        try {
            const success = await updateSiteContent('hero', values);
            if (success) {
                message.success('Hero section updated successfully!');
            } else {
                message.error('Failed to update hero section');
            }
        } catch (error) {
            message.error('An error occurred while saving');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="hero-editor">
            <div className="editor-header">
                <h2>Hero Section Editor</h2>
                <p>Customize your homepage hero section</p>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                initialValues={{
                    stats: [
                        { label: '', value: '' },
                        { label: '', value: '' },
                        { label: '', value: '' }
                    ]
                }}
            >
                <Card title="Main Content" className="editor-card">
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter a title' }]}
                    >
                        <Input placeholder="e.g., Welcome to My Portfolio" size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Subtitle"
                        name="subtitle"
                        rules={[{ required: true, message: 'Please enter a subtitle' }]}
                    >
                        <TextArea
                            placeholder="e.g., I create amazing digital experiences"
                            rows={3}
                            size="large"
                        />
                    </Form.Item>
                </Card>

                <Card title="Call-to-Action Buttons" className="editor-card">
                    <div className="cta-group">
                        <div className="cta-primary">
                            <h4>Primary Button</h4>
                            <Form.Item
                                label="Button Text"
                                name="cta1Text"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input placeholder="e.g., View Projects" />
                            </Form.Item>
                            <Form.Item
                                label="Button Link"
                                name="cta1Link"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input placeholder="e.g., #projects or /projects" />
                            </Form.Item>
                        </div>

                        <div className="cta-secondary">
                            <h4>Secondary Button (Optional)</h4>
                            <Form.Item
                                label="Button Text"
                                name="cta2Text"
                            >
                                <Input placeholder="e.g., Contact Me" />
                            </Form.Item>
                            <Form.Item
                                label="Button Link"
                                name="cta2Link"
                            >
                                <Input placeholder="e.g., #contact or /contact" />
                            </Form.Item>
                        </div>
                    </div>
                </Card>

                <Card title="Statistics" className="editor-card">
                    <Form.List name="stats">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <div key={field.key} className="stat-item">
                                        <div className="stat-fields">
                                            <Form.Item
                                                {...field}
                                                label="Value"
                                                name={[field.name, 'value']}
                                                rules={[{ required: true, message: 'Required' }]}
                                            >
                                                <Input placeholder="e.g., 50+" />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                label="Label"
                                                name={[field.name, 'label']}
                                                rules={[{ required: true, message: 'Required' }]}
                                            >
                                                <Input placeholder="e.g., Projects Completed" />
                                            </Form.Item>
                                        </div>
                                        {fields.length > 1 && (
                                            <Button
                                                type="text"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => remove(field.name)}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                {fields.length < 6 && (
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                    >
                                        Add Stat
                                    </Button>
                                )}
                            </>
                        )}
                    </Form.List>
                </Card>

                <div className="editor-actions">
                    <Space>
                        <Button onClick={loadContent} disabled={saving}>
                            Reset
                        </Button>
                        <Button type="primary" htmlType="submit" loading={saving} size="large">
                            Save Changes
                        </Button>
                    </Space>
                </div>
            </Form>
        </div>
    );
};

export default HeroEditor;
