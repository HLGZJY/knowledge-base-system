import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AddKnowledge from './pages/AddKnowledge';
import './App.css';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const isAdmin = true; // 临时设置为true，实际应该从认证系统获取

  return (
    <Router>
      <Layout className="app-layout">
        <Header className="app-header">
          <div className="header-content">
            <h1 className="app-title">知识库系统</h1>
            {isAdmin && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                href="/add"
                className="add-button"
              >
                添加知识
              </Button>
            )}
          </div>
        </Header>
        <Content className="app-content">
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/detail/:id" element={<DetailPage />} />
              <Route path="/add" element={<AddKnowledge />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
