import BaseRequest from '@/config/axios.config';
import { useMutation } from '@tanstack/react-query';
import __helpers from '@/helpers/index';

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(`/api/auth/login`, model);
    }
  });
};
