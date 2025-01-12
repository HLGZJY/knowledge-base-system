import axios from 'axios';
import { KnowledgeItem } from '../types/knowledge';

const API_BASE_URL = 'http://localhost:3001/api';

// 创建axios实例
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export const api = {
  // 获取所有知识条目
  getAllKnowledge: () => 
    axiosInstance.get<{ data: KnowledgeItem[] }>('/knowledge'),
  
  // 搜索知识条目
  searchKnowledge: (keyword: string) =>
    axiosInstance.get<{ data: KnowledgeItem[] }>(`/knowledge/search?q=${encodeURIComponent(keyword)}`),
  
  // 获取单个知识条目
  getKnowledgeById: (id: number) =>
    axiosInstance.get<{ data: KnowledgeItem }>(`/knowledge/${id}`),
  
  // 创建新知识条目
  createKnowledge: (data: Partial<KnowledgeItem>) =>
    axiosInstance.post<{ data: KnowledgeItem }>('/knowledge', data),
  
  // 更新知识条目
  updateKnowledge: (id: number, data: Partial<KnowledgeItem>) =>
    axiosInstance.put<{ data: KnowledgeItem }>(`/knowledge/${id}`, data),
  
  // 删除知识条目
  deleteKnowledge: (id: number) =>
    axiosInstance.delete(`/knowledge/${id}`),
  
  // 上传图片
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return axiosInstance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
