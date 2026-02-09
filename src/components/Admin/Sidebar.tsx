import { Menu } from 'antd';
import {
    ProjectOutlined,
    RocketOutlined,
    UserOutlined,
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import './Sidebar.css';

interface SidebarProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
    onLogout: () => void;
}

const Sidebar = ({ activeSection, onSectionChange, onLogout }: SidebarProps) => {
    const menuItems = [
        {
            key: 'projects',
            icon: <ProjectOutlined />,
            label: 'Projects'
        },
        {
            key: 'hero',
            icon: <RocketOutlined />,
            label: 'Hero Section'
        },
        {
            key: 'about',
            icon: <UserOutlined />,
            label: 'About Section'
        },
        {
            key: 'contact',
            icon: <MailOutlined />,
            label: 'Contact Section'
        },
        {
            key: 'sections',
            icon: <AppstoreOutlined />,
            label: 'Custom Sections'
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings'
        }
    ];

    return (
        <div className="admin-sidebar">
            <div className="sidebar-header">
                <h2>Portfolio Admin</h2>
            </div>
            <Menu
                mode="inline"
                selectedKeys={[activeSection]}
                onClick={({ key }) => onSectionChange(key)}
                items={menuItems}
                className="sidebar-menu"
            />
            <div className="sidebar-footer">
                <Menu
                    mode="inline"
                    items={[
                        {
                            key: 'logout',
                            icon: <LogoutOutlined />,
                            label: 'Logout',
                            danger: true,
                            onClick: onLogout
                        }
                    ]}
                />
            </div>
        </div>
    );
};

export default Sidebar;
