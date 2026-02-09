import { useState } from 'react';
import { Layout, message } from 'antd';
import { logout } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar';
import ProjectManager from './ProjectManager';
import SectionBuilder from './SectionBuilder';
import HeroEditor from '../../components/Admin/HeroEditor';
import AboutEditor from '../../components/Admin/AboutEditor';
import ContactEditor from '../../components/Admin/ContactEditor';
import SettingsEditor from '../../components/Admin/SettingsEditor';
import './AdminDashboard.css';

const { Content } = Layout;

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('projects');

    const handleLogout = async () => {
        try {
            await logout();
            message.success('Logged out successfully');
            navigate('/admin/login');
        } catch (error) {
            message.error('Failed to logout');
        }
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'projects':
                return <ProjectManager />;
            case 'hero':
                return <HeroEditor />;
            case 'about':
                return <AboutEditor />;
            case 'contact':
                return <ContactEditor />;
            case 'sections':
                return <SectionBuilder />;
            case 'settings':
                return <SettingsEditor />;
            default:
                return <ProjectManager />;
        }
    };

    return (
        <Layout className="admin-dashboard">
            <Sidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                onLogout={handleLogout}
            />
            <Layout className="admin-main-layout">
                <Content className="admin-content">
                    <div className="admin-content-inner">
                        {renderContent()}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;
