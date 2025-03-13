import BaseRequest from '@/config/axios.config';
import { useMutation } from '@tanstack/react-query';

export const useUploadSingleImage = () => {
  return useMutation({
    mutationKey: ['upload-customize'],
    mutationFn: async (file: any) => {
      return BaseRequest.uploadSingleImage(file);
    }
  });
};

export const useUploadDatFile = () => {
  return useMutation({
    mutationKey: ['upload-dat-file'],
    mutationFn: async (model: any) => {
      return BaseRequest.UploadDatFile(model);
    }
  });
};
