import { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, Upload, message, Popconfirm, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import {
    getProjects,
    createProject,
    updateProject,
    deleteProject
} from '../../firebase/firestore';
import { uploadImage } from '../../firebase/storage';
import { Project } from '../../types';
import type { UploadFile } from 'antd/es/upload/interface';

const { TextArea } = Input;

const ProjectManager = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState<UploadFile | null>(null);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
        setLoading(false);
    };

    const handleAdd = () => {
        setEditingProject(null);
        form.resetFields();
        setImageFile(null);
        setModalVisible(true);
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        form.setFieldsValue(project);
        setImageFile(null);
        setModalVisible(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteProject(id);
            message.success('Project deleted successfully');
            loadProjects();
        } catch (error) {
            message.error('Failed to delete project');
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            let imageUrl = editingProject?.imageUrl || '';

            // Upload new image if selected
            if (imageFile && imageFile.originFileObj) {
                imageUrl = await uploadImage(imageFile.originFileObj, 'projects');
            }

            const projectData = {
                ...values,
                imageUrl,
                technologies: values.technologies?.split(',').map((t: string) => t.trim()) || [],
            } as Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

            if (editingProject) {
                await updateProject(editingProject.id, projectData);
                message.success('Project updated successfully');
            } else {
                await createProject(projectData);
                message.success('Project created successfully');
            }

            setModalVisible(false);
            loadProjects();
        } catch (error) {
            message.error('Failed to save project');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Technologies',
            dataIndex: 'technologies',
            key: 'technologies',
            render: (technologies: string[]) => (
                <>
                    {technologies?.map((tech) => (
                        <Tag key={tech} color="blue">{tech}</Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Project) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this project?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="project-manager">
            <div className="manager-header">
                <h2>Portfolio Projects</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                >
                    Add Project
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={projects}
                rowKey="id"
                loading={loading}
            />

            <Modal
                title={editingProject ? 'Edit Project' : 'Add Project'}
                open={modalVisible}
                onOk={handleSubmit}
                onCancel={() => setModalVisible(false)}
                width={700}
                confirmLoading={loading}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter project title' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter description' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: 'Please enter category' }]}
                    >
                        <Input placeholder="e.g., Web Development, Mobile App, Design" />
                    </Form.Item>

                    <Form.Item
                        name="technologies"
                        label="Technologies (comma-separated)"
                        rules={[{ required: true, message: 'Please enter technologies' }]}
                    >
                        <Input placeholder="e.g., React, TypeScript, Firebase" />
                    </Form.Item>

                    <Form.Item
                        name="liveUrl"
                        label="Live URL"
                    >
                        <Input placeholder="https://example.com" />
                    </Form.Item>

                    <Form.Item
                        name="githubUrl"
                        label="GitHub URL"
                    >
                        <Input placeholder="https://github.com/username/repo" />
                    </Form.Item>

                    <Form.Item label="Project Image">
                        <Upload
                            listType="picture-card"
                            maxCount={1}
                            beforeUpload={(file) => {
                                setImageFile(file as any);
                                return false;
                            }}
                            onRemove={() => setImageFile(null)}
                        >
                            <div>
                                <UploadOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                        {editingProject?.imageUrl && !imageFile && (
                            <img
                                src={editingProject.imageUrl}
                                alt="Current"
                                style={{ maxWidth: '200px', marginTop: '10px' }}
                            />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProjectManager;
