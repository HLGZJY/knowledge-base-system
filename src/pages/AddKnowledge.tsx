import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './AddKnowledge.css';

const { TextArea } = Input;

const AddKnowledge: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await api.createKnowledge({
        title: values.title,
        content: values.content,
        imageUrl: values.imageUrl,
      });
      message.success('Knowledge item created successfully');
      navigate('/');
    } catch (error) {
      message.error('Failed to create knowledge item');
    } finally {
      setLoading(false);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="add-knowledge-container">
      <h2>Add New Knowledge Item</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="add-knowledge-form"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input placeholder="Enter knowledge title" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: 'Please input the content!' }]}
        >
          <TextArea
            placeholder="Enter knowledge content"
            autoSize={{ minRows: 4, maxRows: 8 }}
          />
        </Form.Item>

        <Form.Item
          name="imageUrl"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="file"
            action="/api/upload"
            listType="picture"
            maxCount={1}
            beforeUpload={(file) => {
              const isImage = file.type.startsWith('image/');
              if (!isImage) {
                message.error('You can only upload image files!');
              }
              return isImage;
            }}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Knowledge Item
          </Button>
          <Button 
            onClick={() => navigate('/')} 
            style={{ marginLeft: '10px' }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddKnowledge;
