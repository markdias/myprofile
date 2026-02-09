import { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Card, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Section, ComponentConfig, ComponentType } from '../../types';
import ComponentConfigurator from './ComponentConfigurator';

interface SectionEditorProps {
    section: Section | null;
    onSave: (data: Partial<Section>) => void;
    onCancel: () => void;
}

const SectionEditor = ({ section, onSave, onCancel }: SectionEditorProps) => {
    const [form] = Form.useForm();
    const [components, setComponents] = useState<ComponentConfig[]>(section?.components || []);

    useEffect(() => {
        if (section) {
            form.setFieldsValue({
                title: section.title,
                slug: section.slug,
            });
            setComponents(section.components);
        }
    }, [section, form]);

    const handleAddComponent = () => {
        setComponents([
            ...components,
            {
                type: ComponentType.TEXT_BLOCK,
                config: { content: '', heading: '' },
                styles: {},
            },
        ]);
    };

    const handleUpdateComponent = (index: number, component: ComponentConfig) => {
        const newComponents = [...components];
        newComponents[index] = component;
        setComponents(newComponents);
    };

    const handleDeleteComponent = (index: number) => {
        setComponents(components.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            if (components.length === 0) {
                message.warning('Please add at least one component');
                return;
            }

            onSave({
                title: values.title,
                slug: values.slug || values.title.toLowerCase().replace(/\s+/g, '-'),
                components,
            });
        } catch (error) {
            message.error('Please fill in all required fields');
        }
    };

    return (
        <div className="section-editor">
            <Form form={form} layout="vertical">
                <Form.Item
                    name="title"
                    label="Section Title"
                    rules={[{ required: true, message: 'Please enter section title' }]}
                >
                    <Input placeholder="e.g., Our Services, Team Members" />
                </Form.Item>

                <Form.Item
                    name="slug"
                    label="Section Slug (URL anchor)"
                    tooltip="Used for navigation links. Leave empty to auto-generate from title."
                >
                    <Input placeholder="e.g., services, team" />
                </Form.Item>
            </Form>

            <div className="components-section">
                <div className="components-header">
                    <h3>Components</h3>
                    <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={handleAddComponent}
                    >
                        Add Component
                    </Button>
                </div>

                <Space direction="vertical" style={{ width: '100%' }} size="large">
                    {components.map((component, index) => (
                        <Card
                            key={index}
                            title={`Component ${index + 1}: ${component.type}`}
                            extra={
                                <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleDeleteComponent(index)}
                                >
                                    Remove
                                </Button>
                            }
                        >
                            <ComponentConfigurator
                                component={component}
                                onChange={(updated) => handleUpdateComponent(index, updated)}
                            />
                        </Card>
                    ))}
                </Space>

                {components.length === 0 && (
                    <div className="empty-components">
                        <p>No components yet. Click "Add Component" to get started.</p>
                    </div>
                )}
            </div>

            <div className="editor-actions">
                <Space>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button type="primary" onClick={handleSubmit}>
                        Save Section
                    </Button>
                </Space>
            </div>
        </div>
    );
};

export default SectionEditor;
