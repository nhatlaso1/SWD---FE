import BaseRequest from '@/config/axios.config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import __helpers from '@/helpers/index';
const SUB_URL = `auth`;

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login-admin'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(`/${SUB_URL}/login-admin`, model);
    }
  });
};

export const useGetInfoUser = () => {
  const location = useLocation();
  const isAuthenticated = () => !!__helpers.cookie_get('AT');
  const isAuth = isAuthenticated();
  return useQuery({
    queryKey: ['get_info_user'],
    queryFn: async () => {
      return await BaseRequest.Get(`/${SUB_URL}/get-info-user`);
    },
    staleTime: 120000,
    enabled: isAuth && !location.pathname.includes('login') // Chỉ gọi khi cookie tồn tại và không ở trang đăng nhập
  });
};
