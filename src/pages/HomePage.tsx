import React, { useState, useEffect } from 'react';
import { Input, Button, Card, Row, Col, message, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { KnowledgeItem } from '../types/knowledge';
import { api } from '../services/api';
import './HomePage.css';

const { Search } = Input;

const HomePage: React.FC = () => {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchKnowledgeItems();
  }, []);

  const fetchKnowledgeItems = async () => {
    try {
      setLoading(true);
      const response = await api.getAllKnowledge();
      setItems(response.data.data);
    } catch (error) {
      console.error('Error fetching knowledge items:', error);
      message.error('Failed to fetch knowledge items');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (keyword: string) => {
    if (!keyword.trim()) {
      fetchKnowledgeItems();
      return;
    }
    try {
      setLoading(true);
      const response = await api.searchKnowledge(keyword);
      setItems(response.data.data);
    } catch (error) {
      console.error('Error searching knowledge items:', error);
      message.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="search-container">
        <Search
          placeholder="搜索知识库..."
          enterButton={
            <Button type="primary" icon={<SearchOutlined />}>
              搜索
            </Button>
          }
          size="large"
          onSearch={handleSearch}
          loading={loading}
        />
      </div>

      <div className="cards-container">
        {items.length > 0 ? (
          <Row gutter={[24, 24]}>
            {items.map(item => (
              <Col xs={24} sm={12} md={8} key={item.id}>
                <Card
                  hoverable
                  className="knowledge-card"
                  cover={
                    item.imageUrl && (
                      <div className="card-image-container">
                        <img alt={item.title} src={item.imageUrl} />
                      </div>
                    )
                  }
                  onClick={() => navigate(`/detail/${item.id}`)}
                >
                  <Card.Meta
                    title={item.title}
                    description={
                      <div className="card-description">
                        {item.content.length > 100
                          ? `${item.content.substring(0, 100)}...`
                          : item.content}
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty description="暂无数据" />
        )}
      </div>
    </div>
  );
};

export default HomePage;
