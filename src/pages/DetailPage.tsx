import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, message, Spin } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { KnowledgeItem } from '../types/knowledge';
import { api } from '../services/api';
import './DetailPage.css';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<KnowledgeItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKnowledgeItem = async () => {
      try {
        setLoading(true);
        const response = await api.getKnowledgeById(Number(id));
        setItem(response.data.data);
      } catch (error) {
        console.error('Error fetching knowledge item:', error);
        message.error('Failed to fetch knowledge item');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchKnowledgeItem();
    }
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="error-container">
        <p>Knowledge item not found</p>
        <Button type="primary" onClick={handleBack}>
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <Button
        type="link"
        icon={<LeftOutlined />}
        onClick={handleBack}
        className="back-button"
      >
        Back
      </Button>
      <Card
        title={item.title}
        className="detail-card"
        cover={
          item.imageUrl && (
            <div className="detail-image-container">
              <img alt={item.title} src={item.imageUrl} />
            </div>
          )
        }
      >
        <div className="detail-content">{item.content}</div>
        <div className="detail-created-at">
          Created at: {new Date(item.createdAt).toLocaleString()}
        </div>
      </Card>
    </div>
  );
};

export default DetailPage;
