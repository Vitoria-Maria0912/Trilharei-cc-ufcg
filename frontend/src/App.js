import { useEffect, useState } from 'react';
import { HomeOutlined, UserOutlined, BookOutlined, BulbOutlined, LinkOutlined, MoonOutlined, SunOutlined, ReadOutlined } from '@ant-design/icons';
import { NotificationProvider } from './components/Alert/index.js';
import { Menu, Layout } from 'antd';
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home, About } from './components/Layout/CenterMain.js'
import DisciplineService from './services/DisciplineService.js';
import PlanningService from './services/PlanningService.js';
import LoginService from './services/LoginService.js';
import UserService from './services/UserService.js';
import './style.css';

const App = () => {

    const { Header, Content, Footer, Sider } = Layout;
    const [ lightMode, setLightMode ] = useState(true);
    const [ collapsed, setCollapsed ] = useState(false);

    const onCollapse = (collapsed) => { setCollapsed(collapsed); };

    const navigate = useNavigate();

    const changeTheme = () => {
        const newTheme = lightMode ? 'dark' : 'light';
        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(`${ newTheme }-mode`);
        localStorage.setItem('theme', newTheme);
        setLightMode(!lightMode);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(`${ savedTheme }-mode`);
        setLightMode(savedTheme === 'light');
    }, []);

    return (
        <div className="theme-toggle">
            <button id="theme-button" onClick={ changeTheme }>{ lightMode ? <MoonOutlined/> : <SunOutlined/> }</button>
            <NotificationProvider>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                        <div className="logo" >
                            <span className="logo-T">T</span>
                            <span className="logo-text">rilharei</span>
                        </div>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="vertical">
                            <Menu.Item key="home" icon={<HomeOutlined />} onClick={() => navigate('/')}>Home</Menu.Item>
                            <Menu.Item key="about" icon={<BulbOutlined />} onClick={() => navigate('/about')}>About</Menu.Item>

                            <Menu.Item key="usuario" icon={<UserOutlined />} onClick={() => navigate('/users')}>Usuário</Menu.Item>
                            <Menu.Item key="login" icon={<LinkOutlined />} onClick={() => navigate('/auth/login')}>Login</Menu.Item>
                            <Menu.Item key="discipline" icon={<ReadOutlined />} onClick={() => navigate('/disciplines')}>Disciplina</Menu.Item>
                            <Menu.Item key="planning" icon={<BookOutlined />} onClick={() => navigate('/planning')}>Planejamento</Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }} />
                        <Content style={{ margin: '0 16px' }}>
                            <Routes>
                                <Route path="/" exact element={<Home />} />
                                <Route path="/about" exact element={<About />} />
                                <Route path="/users/*" element={<UserService />} />
                                <Route path="/auth/login" exact element={<LoginService />} />
                                <Route path="/disciplines/*" element={<DisciplineService />} />
                                <Route path="/planning/*" element={<PlanningService />} />
                            </Routes>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Trilharei - Computação UFCG © 2025 Created by UFCG alumni</Footer>
                    </Layout>
                </Layout>
            </NotificationProvider>
        </div>
    );
};

export default App;
