import BaseRequest from '@/config/axios.config';
import { useQuery } from '@tanstack/react-query';

export const useGetAllUser = () => {
  return useQuery({
    queryKey: ['get-all-user'],
    queryFn: async () => {
      return await BaseRequest.Get(`/api/users`);
    }
  });
};
