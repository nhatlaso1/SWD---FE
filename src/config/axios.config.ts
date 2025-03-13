import axios, { AxiosResponse } from 'axios';
import helpers from '../helpers';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://test/'
    : 'http://localhost:8888/';

const token = helpers.cookie_get('AT');

const onRequestSuccess = (config: any) => {
  config.headers['Authorization'] = `Bearer ${helpers.cookie_get('AT')}`;
  return config;
};
const onRequestError = (error: any) => {
  return Promise.reject(error);
};
const onResponseSuccess = (response: any) => {
  return response.data;
};
const onResponseError = (error: any) => {
  if (error.response) {
    if (
      (error.response.status == 403 &&
        error.response.data.message == 'Token expired') ||
      error.response.status == 401
    ) {
      helpers.cookie_delete('AT');
      window.location.href = '/login';
    }
    return Promise.reject(error.response);
  }
  return Promise.reject(error);
};
axios.interceptors.request.use(onRequestSuccess, onRequestError);
axios.interceptors.response.use(onResponseSuccess, onResponseError);
axios.defaults.baseURL = baseURL;

var BaseRequest = {
  Get: async <T = any>(url: string): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axios.get<T>(url);
      return response.data;
    } catch (err) {
      console.error('GET Error:', err);
      throw err;
    }
  },

  Post: async <T = any, D = any>(url: string, data?: D): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axios.post<T>(url, data);
      return response.data;
    } catch (err) {
      console.error('POST Error:', err);
      throw err;
    }
  },

  Put: async <T = any, D = any>(url: string, data?: D): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axios.put<T>(url, data);
      return response.data;
    } catch (err) {
      console.error('PUT Error:', err);
      throw err;
    }
  },

  Patch: async <T = any, D = any>(url: string, data?: D): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axios.patch<T>(url, data);
      return response.data;
    } catch (err) {
      console.error('PATCH Error:', err);
      throw err;
    }
  },

  Delete: async <T = any>(url: string): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axios.delete<T>(url);
      return response.data;
    } catch (err) {
      console.error('DELETE Error:', err);
      throw err;
    }
  },
  UploadDatFile: async (model: any) => {
    try {
      const formData = new FormData();
      for (const key in model) {
        formData.append(key, model[key]);
      }
      const response = await axios.post(`/upload/upload-dat`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      console.error('Error in UploadDatFile request:', err);
      throw err;
    }
  },

  UploadJSONCheckScore: async (model: any) => {
    try {
      const formData = new FormData();
      for (const key in model) {
        formData.append(key, model[key]);
      }
      const response = await axios.post(
        `/upload/upload-json-check-score`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (err) {
      console.error('Error in UploadJSONCheckScore request:', err);
      throw err;
    }
  },

  UploadJSONQuiz: async (model: any) => {
    try {
      const formData = new FormData();
      for (const key in model) {
        formData.append(key, model[key]);
      }
      const response = await axios.post(`/upload/upload-json-quiz`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      console.error('Error in UploadJsonQuiz request:', err);
      throw err;
    }
  },

  UploadExamZip: async (model: any) => {
    try {
      const formData = new FormData();
      for (const key in model) {
        formData.append(key, model[key]);
      }
      const response = await axios.post(`/upload/upload-exam-zip`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      console.error('Error in UploadExamZip request:', err);
      throw err;
    }
  },

  uploadSingleImage: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(
        '/upload/upload-image-local',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
};

var BaseRequestV2 = {
  Get: async <T = any>(url: string): Promise<[any, T | null]> => {
    try {
      const res: any = await axios.get(url);
      if (res && res.success) {
        return [null, res.data];
      }
      return [res.message || 'Unknown error occurred', null];
    } catch (err: any) {
      return [err?.data?.message || err.message || 'Request failed', null];
    }
  },
  Post: async <T = any>(url: string, data?: any): Promise<[any, T | null]> => {
    try {
      const res: any = await axios.post(url, data);
      if (res && res.success) {
        return [null, res.data];
      }
      return [res.message || 'Unknown error occurred', null];
    } catch (err: any) {
      return [err?.data?.message || err.message || 'Request failed', null];
    }
  },
  Put: async <T = any>(url: string, data: any): Promise<[any, T | null]> => {
    try {
      const res: any = await axios.put(url, data);
      if (res && res.success) {
        return [null, res.data];
      }
      return [res.message || 'Unknown error occurred', null];
    } catch (err: any) {
      return [err?.data?.message || err.message || 'Request failed', null];
    }
  },
  Delete: async <T = any>(url: string): Promise<[any, T | null]> => {
    try {
      const res: any = await axios.delete(url);
      if (res && res.success) {
        return [null, res.data];
      }
      return [res.message || 'Unknown error occurred', null];
    } catch (err: any) {
      return [err?.data?.message || err.message || 'Request failed', null];
    }
  }
};

export default BaseRequest;
export { BaseRequestV2 };
