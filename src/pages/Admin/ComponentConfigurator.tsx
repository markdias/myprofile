import { Form, Input, Select, InputNumber, Switch, Button, Space, Card } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { ComponentConfig, ComponentType } from '../../types';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Option } = Select;
const { TextArea } = Input;

interface ComponentConfiguratorProps {
    component: ComponentConfig;
    onChange: (component: ComponentConfig) => void;
}

const ComponentConfigurator = ({ component, onChange }: ComponentConfiguratorProps) => {
    const [localConfig, setLocalConfig] = useState(component.config);
    const [localStyles, setLocalStyles] = useState(component.styles || {});

    const updateConfig = (key: string, value: any) => {
        const newConfig = { ...localConfig, [key]: value };
        setLocalConfig(newConfig);
        onChange({ ...component, config: newConfig });
    };

    const updateStyle = (key: string, value: any) => {
        const newStyles = { ...localStyles, [key]: value };
        setLocalStyles(newStyles);
        onChange({ ...component, styles: newStyles });
    };

    const updateComponentType = (newType: ComponentType) => {
        // Reset config when changing type
        const defaultConfigs: Record<ComponentType, any> = {
            [ComponentType.TEXT_BLOCK]: { content: '', heading: '' },
            [ComponentType.IMAGE_GALLERY]: { images: [], columns: 3 },
            [ComponentType.VIDEO_EMBED]: { url: '', title: '', autoplay: false },
            [ComponentType.STATS_COUNTER]: { stats: [] },
            [ComponentType.TIMELINE]: { items: [] },
            [ComponentType.SKILLS_GRID]: { skills: [], columns: 2 },
            [ComponentType.TESTIMONIALS]: { testimonials: [], autoplay: true },
            [ComponentType.CTA_BUTTON]: { text: '', url: '', variant: 'primary', size: 'large' },
            [ComponentType.DIVIDER]: { style: 'solid', color: '#d9d9d9', thickness: 1 },
            [ComponentType.CUSTOM_HTML]: { html: '' },
        };

        onChange({
            type: newType,
            config: defaultConfigs[newType],
            styles: localStyles,
        });
    };

    const renderConfigForm = () => {
        switch (component.type) {
            case ComponentType.TEXT_BLOCK:
                return (
                    <>
                        <Form.Item label="Heading (optional)">
                            <Input
                                value={localConfig.heading}
                                onChange={(e) => updateConfig('heading', e.target.value)}
                                placeholder="Section heading"
                            />
                        </Form.Item>
                        <Form.Item label="Content">
                            <ReactQuill
                                value={localConfig.content}
                                onChange={(value) => updateConfig('content', value)}
                                theme="snow"
                            />
                        </Form.Item>
                    </>
                );

            case ComponentType.IMAGE_GALLERY:
                return (
                    <>
                        <Form.Item label="Columns">
                            <InputNumber
                                min={1}
                                max={4}
                                value={localConfig.columns || 3}
                                onChange={(value) => updateConfig('columns', value)}
                            />
                        </Form.Item>
                        <Form.Item label="Images">
                            <Space direction="vertical" style={{ width: '100%' }}>
                                {(localConfig.images || []).map((img: any, index: number) => (
                                    <Space key={index} style={{ width: '100%' }}>
                                        <Input
                                            placeholder="Image URL"
                                            value={img.url}
                                            onChange={(e) => {
                                                const newImages = [...localConfig.images];
                                                newImages[index] = { ...img, url: e.target.value };
                                                updateConfig('images', newImages);
                                            }}
                                        />
                                        <Input
                                            placeholder="Alt text"
                                            value={img.alt}
                                            onChange={(e) => {
                                                const newImages = [...localConfig.images];
                                                newImages[index] = { ...img, alt: e.target.value };
                                                updateConfig('images', newImages);
                                            }}
                                        />
                                        <Button
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() => {
                                                const newImages = localConfig.images.filter((_: any, i: number) => i !== index);
                                                updateConfig('images', newImages);
                                            }}
                                        />
                                    </Space>
                                ))}
                                <Button
                                    type="dashed"
                                    icon={<PlusOutlined />}
                                    onClick={() => {
                                        updateConfig('images', [...(localConfig.images || []), { url: '', alt: '', caption: '' }]);
                                    }}
                                >
                                    Add Image
                                </Button>
                            </Space>
                        </Form.Item>
                    </>
                );

            case ComponentType.VIDEO_EMBED:
                return (
                    <>
                        <Form.Item label="Video URL (YouTube or Vimeo)">
                            <Input
                                value={localConfig.url}
                                onChange={(e) => updateConfig('url', e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                            />
                        </Form.Item>
                        <Form.Item label="Title (optional)">
                            <Input
                                value={localConfig.title}
                                onChange={(e) => updateConfig('title', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item label="Autoplay">
                            <Switch
                                checked={localConfig.autoplay}
                                onChange={(checked) => updateConfig('autoplay', checked)}
                            />
                        </Form.Item>
                    </>
                );

            case ComponentType.STATS_COUNTER:
                return (
                    <Form.Item label="Stats">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            {(localConfig.stats || []).map((stat: any, index: number) => (
                                <Space key={index} style={{ width: '100%' }}>
                                    <InputNumber
                                        placeholder="Value"
                                        value={stat.value}
                                        onChange={(value) => {
                                            const newStats = [...localConfig.stats];
                                            newStats[index] = { ...stat, value };
                                            updateConfig('stats', newStats);
                                        }}
                                    />
                                    <Input
                                        placeholder="Label"
                                        value={stat.label}
                                        onChange={(e) => {
                                            const newStats = [...localConfig.stats];
                                            newStats[index] = { ...stat, label: e.target.value };
                                            updateConfig('stats', newStats);
                                        }}
                                    />
                                    <Input
                                        placeholder="Suffix (e.g., +, %)"
                                        value={stat.suffix}
                                        onChange={(e) => {
                                            const newStats = [...localConfig.stats];
                                            newStats[index] = { ...stat, suffix: e.target.value };
                                            updateConfig('stats', newStats);
                                        }}
                                    />
                                    <Button
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => {
                                            const newStats = localConfig.stats.filter((_: any, i: number) => i !== index);
                                            updateConfig('stats', newStats);
                                        }}
                                    />
                                </Space>
                            ))}
                            <Button
                                type="dashed"
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    updateConfig('stats', [...(localConfig.stats || []), { value: 0, label: '', suffix: '' }]);
                                }}
                            >
                                Add Stat
                            </Button>
                        </Space>
                    </Form.Item>
                );

            case ComponentType.TIMELINE:
                return (
                    <Form.Item label="Timeline Items">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            {(localConfig.items || []).map((item: any, index: number) => (
                                <Card key={index} size="small">
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Input
                                            placeholder="Date"
                                            value={item.date}
                                            onChange={(e) => {
                                                const newItems = [...localConfig.items];
                                                newItems[index] = { ...item, date: e.target.value };
                                                updateConfig('items', newItems);
                                            }}
                                        />
                                        <Input
                                            placeholder="Title"
                                            value={item.title}
                                            onChange={(e) => {
                                                const newItems = [...localConfig.items];
                                                newItems[index] = { ...item, title: e.target.value };
                                                updateConfig('items', newItems);
                                            }}
                                        />
                                        <TextArea
                                            placeholder="Description"
                                            value={item.description}
                                            onChange={(e) => {
                                                const newItems = [...localConfig.items];
                                                newItems[index] = { ...item, description: e.target.value };
                                                updateConfig('items', newItems);
                                            }}
                                        />
                                        <Button
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() => {
                                                const newItems = localConfig.items.filter((_: any, i: number) => i !== index);
                                                updateConfig('items', newItems);
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    </Space>
                                </Card>
                            ))}
                            <Button
                                type="dashed"
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    updateConfig('items', [...(localConfig.items || []), { date: '', title: '', description: '' }]);
                                }}
                            >
                                Add Timeline Item
                            </Button>
                        </Space>
                    </Form.Item>
                );

            case ComponentType.SKILLS_GRID:
                return (
                    <>
                        <Form.Item label="Columns">
                            <InputNumber
                                min={1}
                                max={3}
                                value={localConfig.columns || 2}
                                onChange={(value) => updateConfig('columns', value)}
                            />
                        </Form.Item>
                        <Form.Item label="Skills">
                            <Space direction="vertical" style={{ width: '100%' }}>
                                {(localConfig.skills || []).map((skill: any, index: number) => (
                                    <Space key={index}>
                                        <Input
                                            placeholder="Skill name"
                                            value={skill.name}
                                            onChange={(e) => {
                                                const newSkills = [...localConfig.skills];
                                                newSkills[index] = { ...skill, name: e.target.value };
                                                updateConfig('skills', newSkills);
                                            }}
                                        />
                                        <InputNumber
                                            min={0}
                                            max={100}
                                            placeholder="Level %"
                                            value={skill.level}
                                            onChange={(value) => {
                                                const newSkills = [...localConfig.skills];
                                                newSkills[index] = { ...skill, level: value };
                                                updateConfig('skills', newSkills);
                                            }}
                                        />
                                        <Button
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() => {
                                                const newSkills = localConfig.skills.filter((_: any, i: number) => i !== index);
                                                updateConfig('skills', newSkills);
                                            }}
                                        />
                                    </Space>
                                ))}
                                <Button
                                    type="dashed"
                                    icon={<PlusOutlined />}
                                    onClick={() => {
                                        updateConfig('skills', [...(localConfig.skills || []), { name: '', level: 0 }]);
                                    }}
                                >
                                    Add Skill
                                </Button>
                            </Space>
                        </Form.Item>
                    </>
                );

            case ComponentType.TESTIMONIALS:
                return (
                    <>
                        <Form.Item label="Autoplay">
                            <Switch
                                checked={localConfig.autoplay !== false}
                                onChange={(checked) => updateConfig('autoplay', checked)}
                            />
                        </Form.Item>
                        <Form.Item label="Testimonials">
                            <Space direction="vertical" style={{ width: '100%' }}>
                                {(localConfig.testimonials || []).map((testimonial: any, index: number) => (
                                    <Card key={index} size="small">
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            <TextArea
                                                placeholder="Quote"
                                                value={testimonial.quote}
                                                onChange={(e) => {
                                                    const newTestimonials = [...localConfig.testimonials];
                                                    newTestimonials[index] = { ...testimonial, quote: e.target.value };
                                                    updateConfig('testimonials', newTestimonials);
                                                }}
                                            />
                                            <Input
                                                placeholder="Author name"
                                                value={testimonial.author}
                                                onChange={(e) => {
                                                    const newTestimonials = [...localConfig.testimonials];
                                                    newTestimonials[index] = { ...testimonial, author: e.target.value };
                                                    updateConfig('testimonials', newTestimonials);
                                                }}
                                            />
                                            <Input
                                                placeholder="Role (optional)"
                                                value={testimonial.role}
                                                onChange={(e) => {
                                                    const newTestimonials = [...localConfig.testimonials];
                                                    newTestimonials[index] = { ...testimonial, role: e.target.value };
                                                    updateConfig('testimonials', newTestimonials);
                                                }}
                                            />
                                            <Button
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => {
                                                    const newTestimonials = localConfig.testimonials.filter((_: any, i: number) => i !== index);
                                                    updateConfig('testimonials', newTestimonials);
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </Space>
                                    </Card>
                                ))}
                                <Button
                                    type="dashed"
                                    icon={<PlusOutlined />}
                                    onClick={() => {
                                        updateConfig('testimonials', [...(localConfig.testimonials || []), { quote: '', author: '', role: '' }]);
                                    }}
                                >
                                    Add Testimonial
                                </Button>
                            </Space>
                        </Form.Item>
                    </>
                );

            case ComponentType.CTA_BUTTON:
                return (
                    <>
                        <Form.Item label="Button Text">
                            <Input
                                value={localConfig.text}
                                onChange={(e) => updateConfig('text', e.target.value)}
                                placeholder="Get Started"
                            />
                        </Form.Item>
                        <Form.Item label="URL">
                            <Input
                                value={localConfig.url}
                                onChange={(e) => updateConfig('url', e.target.value)}
                                placeholder="https://example.com"
                            />
                        </Form.Item>
                        <Form.Item label="Variant">
                            <Select
                                value={localConfig.variant || 'primary'}
                                onChange={(value) => updateConfig('variant', value)}
                            >
                                <Option value="primary">Primary</Option>
                                <Option value="secondary">Secondary</Option>
                                <Option value="outline">Outline</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Size">
                            <Select
                                value={localConfig.size || 'large'}
                                onChange={(value) => updateConfig('size', value)}
                            >
                                <Option value="small">Small</Option>
                                <Option value="medium">Medium</Option>
                                <Option value="large">Large</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Open in New Tab">
                            <Switch
                                checked={localConfig.openInNewTab}
                                onChange={(checked) => updateConfig('openInNewTab', checked)}
                            />
                        </Form.Item>
                    </>
                );

            case ComponentType.DIVIDER:
                return (
                    <>
                        <Form.Item label="Style">
                            <Select
                                value={localConfig.style || 'solid'}
                                onChange={(value) => updateConfig('style', value)}
                            >
                                <Option value="solid">Solid</Option>
                                <Option value="dashed">Dashed</Option>
                                <Option value="dotted">Dotted</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Color">
                            <Input
                                type="color"
                                value={localConfig.color || '#d9d9d9'}
                                onChange={(e) => updateConfig('color', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item label="Thickness (px)">
                            <InputNumber
                                min={1}
                                max={10}
                                value={localConfig.thickness || 1}
                                onChange={(value) => updateConfig('thickness', value)}
                            />
                        </Form.Item>
                    </>
                );

            case ComponentType.CUSTOM_HTML:
                return (
                    <Form.Item label="HTML Content">
                        <TextArea
                            rows={10}
                            value={localConfig.html}
                            onChange={(e) => updateConfig('html', e.target.value)}
                            placeholder="<div>Your custom HTML here</div>"
                        />
                    </Form.Item>
                );

            default:
                return null;
        }
    };

    return (
        <div className="component-configurator">
            <Form layout="vertical">
                <Form.Item label="Component Type">
                    <Select
                        value={component.type}
                        onChange={updateComponentType}
                    >
                        <Option value={ComponentType.TEXT_BLOCK}>Text Block</Option>
                        <Option value={ComponentType.IMAGE_GALLERY}>Image Gallery</Option>
                        <Option value={ComponentType.VIDEO_EMBED}>Video Embed</Option>
                        <Option value={ComponentType.STATS_COUNTER}>Stats Counter</Option>
                        <Option value={ComponentType.TIMELINE}>Timeline</Option>
                        <Option value={ComponentType.SKILLS_GRID}>Skills Grid</Option>
                        <Option value={ComponentType.TESTIMONIALS}>Testimonials</Option>
                        <Option value={ComponentType.CTA_BUTTON}>CTA Button</Option>
                        <Option value={ComponentType.DIVIDER}>Divider</Option>
                        <Option value={ComponentType.CUSTOM_HTML}>Custom HTML</Option>
                    </Select>
                </Form.Item>

                {renderConfigForm()}

                <div className="style-section">
                    <h4>Styling (Optional)</h4>
                    <Form.Item label="Background Color">
                        <Input
                            type="color"
                            value={localStyles.backgroundColor}
                            onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Text Color">
                        <Input
                            type="color"
                            value={localStyles.textColor}
                            onChange={(e) => updateStyle('textColor', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Text Alignment">
                        <Select
                            value={localStyles.alignment}
                            onChange={(value) => updateStyle('alignment', value)}
                            placeholder="Default"
                        >
                            <Option value="left">Left</Option>
                            <Option value="center">Center</Option>
                            <Option value="right">Right</Option>
                        </Select>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default ComponentConfigurator;
