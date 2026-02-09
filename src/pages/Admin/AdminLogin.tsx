import { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (values: { email: string; password: string }) => {
        setLoading(true);
        try {
            await login(values.email, values.password);
            message.success('Login successful');
            navigate('/admin');
        } catch (error: any) {
            message.error(error.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login">
            <Card className="login-card">
                <div className="login-header">
                    <h1>Portfolio Admin</h1>
                    <p>Sign in to manage your portfolio</p>
                </div>
                <Form
                    name="login"
                    onFinish={handleLogin}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Please enter a valid email' },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Email"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            size="large"
                            block
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AdminLogin;
