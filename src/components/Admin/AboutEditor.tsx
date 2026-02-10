import { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Space, message, Slider } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { getSiteContent, updateSiteContent } from '../../firebase/firestore';
import { AboutContent } from '../../types';
import './AboutEditor.css';

const { TextArea } = Input;

const AboutEditor = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        try {
            setLoading(true);
            const content = await getSiteContent<AboutContent>('about');
            if (content) {
                form.setFieldsValue(content);
            }
        } catch (error) {
            console.error('Error loading about content:', error);
            message.error('Failed to load about content');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (values: AboutContent) => {
        try {
            setLoading(true);
            await updateSiteContent('about', values);
            message.success('About section updated successfully!');
        } catch (error) {
            console.error('Error saving about content:', error);
            message.error('Failed to save about content');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="about-editor">
            <div className="editor-header">
                <h1>About Section Editor</h1>
                <p>Customize your about section content</p>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                initialValues={{
                    heading: 'About Me',
                    description: '',
                    skills: []
                }}
            >
                <Card title="Main Content" className="editor-card">
                    <Form.Item
                        label="Heading"
                        name="heading"
                        rules={[{ required: true, message: 'Please enter a heading' }]}
                    >
                        <Input placeholder="e.g., About Me" size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please enter a description' }]}
                    >
                        <TextArea
                            placeholder="Tell your story..."
                            rows={6}
                            showCount
                            maxLength={1000}
                        />
                    </Form.Item>
                </Card>

                <Card title="Skills" className="editor-card">
                    <Form.List name="skills">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => (
                                    <div key={field.key} className="skill-item">
                                        <div className="skill-fields">
                                            <Form.Item
                                                {...field}
                                                label="Skill Name"
                                                name={[field.name, 'name']}
                                                rules={[{ required: true, message: 'Please enter skill name' }]}
                                                className="skill-name-field"
                                            >
                                                <Input placeholder="e.g., JavaScript" />
                                            </Form.Item>

                                            <Form.Item
                                                {...field}
                                                label="Proficiency (%)"
                                                name={[field.name, 'percentage']}
                                                rules={[{ required: true, message: 'Please set proficiency' }]}
                                                className="skill-percentage-field"
                                            >
                                                <Slider
                                                    min={0}
                                                    max={100}
                                                    marks={{
                                                        0: '0%',
                                                        25: '25%',
                                                        50: '50%',
                                                        75: '75%',
                                                        100: '100%'
                                                    }}
                                                />
                                            </Form.Item>
                                        </div>

                                        <Button
                                            type="text"
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() => remove(field.name)}
                                            className="remove-skill-btn"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}

                                <Button
                                    type="dashed"
                                    onClick={() => add({ name: '', percentage: 50 })}
                                    block
                                    icon={<PlusOutlined />}
                                    disabled={fields.length >= 10}
                                >
                                    Add Skill {fields.length >= 10 && '(Maximum reached)'}
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

export default AboutEditor;
