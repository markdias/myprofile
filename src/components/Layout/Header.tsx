import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './Header.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { key: '/', label: <Link to="/">Home</Link> },
        { key: '/about', label: <Link to="/about">About</Link> },
        { key: '/contact', label: <Link to="/contact">Contact</Link> },
    ];

    return (
        <>
            <header className={`header ${scrolled ? 'scrolled' : ''}`}>
                <div className="header-container">
                    <Link to="/" className="logo">
                        <h2>Portfolio</h2>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="desktop-nav">
                        <Menu
                            mode="horizontal"
                            selectedKeys={[location.pathname]}
                            items={menuItems}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                flex: 1,
                                justifyContent: 'flex-end'
                            }}
                        />
                    </nav>

                    {/* Mobile Menu Button */}
                    <Button
                        className="mobile-menu-btn"
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={() => setMobileMenuOpen(true)}
                    />
                </div>
            </header>

            {/* Mobile Drawer */}
            <Drawer
                title="Menu"
                placement="right"
                onClose={() => setMobileMenuOpen(false)}
                open={mobileMenuOpen}
            >
                <Menu
                    mode="vertical"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={() => setMobileMenuOpen(false)}
                />
            </Drawer>
        </>
    );
};

export default Header;
