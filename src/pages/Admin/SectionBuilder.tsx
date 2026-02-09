import { useState, useEffect } from 'react';
import {
    List,
    Button,
    Space,
    Modal,
    Form,
    Input,
    Switch,
    message,
    Popconfirm,
    Card
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    DragOutlined
} from '@ant-design/icons';
import {
    getSections,
    createSection,
    updateSection,
    deleteSection,
    reorderSections
} from '../../firebase/firestore';
import { Section } from '../../types';
import SectionEditor from './SectionEditor';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
    section: Section;
    onEdit: (section: Section) => void;
    onDelete: (id: string) => void;
    onToggleVisibility: (section: Section) => void;
}

const SortableItem = ({ section, onEdit, onDelete, onToggleVisibility }: SortableItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: section.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <Card className="section-list-item">
                <div className="section-item-content">
                    <div className="section-drag-handle" {...attributes} {...listeners}>
                        <DragOutlined />
                    </div>
                    <div className="section-info">
                        <h4>{section.title || 'Untitled Section'}</h4>
                        <p className="section-meta">
                            {section.components.length} component{section.components.length !== 1 ? 's' : ''} •
                            Order: {section.order}
                        </p>
                    </div>
                    <Space>
                        <Button
                            type="text"
                            icon={section.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            onClick={() => onToggleVisibility(section)}
                        >
                            {section.visible ? 'Visible' : 'Hidden'}
                        </Button>
                        <Button
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => onEdit(section)}
                        >
                            Edit
                        </Button>
                        <Popconfirm
                            title="Are you sure you want to delete this section?"
                            onConfirm={() => onDelete(section.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="link" danger icon={<DeleteOutlined />}>
                                Delete
                            </Button>
                        </Popconfirm>
                    </Space>
                </div>
            </Card>
        </div>
    );
};

const SectionBuilder = () => {
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingSection, setEditingSection] = useState<Section | null>(null);
    const [form] = Form.useForm();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        loadSections();
    }, []);

    const loadSections = async () => {
        setLoading(true);
        const data = await getSections();
        setSections(data);
        setLoading(false);
    };

    const handleAdd = () => {
        setEditingSection(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (section: Section) => {
        setEditingSection(section);
        setModalVisible(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteSection(id);
            message.success('Section deleted successfully');
            loadSections();
        } catch (error) {
            message.error('Failed to delete section');
        }
    };

    const handleToggleVisibility = async (section: Section) => {
        try {
            await updateSection(section.id, { visible: !section.visible });
            message.success(`Section ${section.visible ? 'hidden' : 'shown'}`);
            loadSections();
        } catch (error) {
            message.error('Failed to update section visibility');
        }
    };

    const handleSave = async (sectionData: Partial<Section>) => {
        try {
            setLoading(true);
            if (editingSection) {
                await updateSection(editingSection.id, sectionData);
                message.success('Section updated successfully');
            } else {
                await createSection({
                    ...sectionData,
                    order: sections.length,
                    visible: true,
                });
                message.success('Section created successfully');
            }
            setModalVisible(false);
            loadSections();
        } catch (error) {
            message.error('Failed to save section');
        } finally {
            setLoading(false);
        }
    };

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = sections.findIndex((s) => s.id === active.id);
            const newIndex = sections.findIndex((s) => s.id === over.id);

            const newSections = arrayMove(sections, oldIndex, newIndex);
            setSections(newSections);

            try {
                await reorderSections(newSections.map((s, index) => ({ id: s.id, order: index })));
                message.success('Sections reordered');
            } catch (error) {
                message.error('Failed to reorder sections');
                loadSections(); // Reload to reset order
            }
        }
    };

    return (
        <div className="section-builder">
            <div className="manager-header">
                <h2>Custom Sections</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                >
                    Add Section
                </Button>
            </div>

            <p className="section-builder-description">
                Create custom sections with various component types. Drag to reorder sections.
            </p>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={sections.map(s => s.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="sections-list">
                        {sections.map((section) => (
                            <SortableItem
                                key={section.id}
                                section={section}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onToggleVisibility={handleToggleVisibility}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {sections.length === 0 && !loading && (
                <div className="empty-state">
                    <p>No custom sections yet. Create your first section to get started!</p>
                </div>
            )}

            <Modal
                title={editingSection ? 'Edit Section' : 'Create Section'}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={900}
                destroyOnHidden
            >
                <SectionEditor
                    section={editingSection}
                    onSave={handleSave}
                    onCancel={() => setModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default SectionBuilder;
