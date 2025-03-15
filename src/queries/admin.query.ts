import BaseRequest from '@/config/axios.config';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useGetAllCategory = () => {
  return useQuery({
    queryKey: ['get-all-category'],
    queryFn: async () => {
      return await BaseRequest.Get(`/api/categories`);
    }
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-category'],
    mutationFn: async (model: any) => {
      return await BaseRequest.Post(`/api/categories`, model);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-category']
      });
    }
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-category'],
    mutationFn: async (id: string) => {
      return await BaseRequest.Delete(`/api/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-category']
      });
    }
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-category'],
    mutationFn: async (model: any) => {
      return await BaseRequest.Put(
        `/api/categories/${model.category_code}`,
        model
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-category']
      });
    }
  });
};
/// product
export const useGetAllProduct = () => {
  return useQuery({
    queryKey: ['get-all-product'],
    queryFn: async () => {
      return await BaseRequest.Get(`/api/products`);
    }
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-product'],
    mutationFn: async (model: any) => {
      return await BaseRequest.Post(`/api/products`, model);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-product']
      });
    }
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-product'],
    mutationFn: async (id: string) => {
      return await BaseRequest.Delete(`/api/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-product']
      });
    }
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-product'],
    mutationFn: async (model: any) => {
      return await BaseRequest.Patch(
        `/api/products/${model.product_id}`,
        model
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-product']
      });
    }
  });
};

// ===== product type

export const useGetAllProductType = () => {
  return useQuery({
    queryKey: ['get-all-product-type'],
    queryFn: async () => {
      return await BaseRequest.Get(`/api/product-types`);
    }
  });
};

export const useCreateProductType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-product-type'],
    mutationFn: async (model: any) => {
      return await BaseRequest.Post(`/api/product-types`, model);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-product-type']
      });
    }
  });
};

export const useDeleteProductType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-product-type'],
    mutationFn: async (id: string) => {
      return await BaseRequest.Delete(`/api/product-types/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-product-type']
      });
    }
  });
};

export const useUpdateProductType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-product-type'],
    mutationFn: async (model: any) => {
      return await BaseRequest.Put(
        `/api/product-types/${model.productType_id}`,
        model
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-product-type']
      });
    }
  });
};

// ===== warehouse

export const useGetAllWarehouse = () => {
  return useQuery({
    queryKey: ['get-all-warehouse'],
    queryFn: async () => {
      return await BaseRequest.Get(`/api/warehouses`);
    }
  });
};

export const useCreateWarehouse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-warehouse'],
    mutationFn: async (model: any) => {
      return await BaseRequest.Post(`/api/warehouses`, model);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-warehouse']
      });
    }
  });
};

export const useDeleteWarehouse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-warehouse'],
    mutationFn: async (id: string) => {
      return await BaseRequest.Delete(`/api/warehouses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-warehouse']
      });
    }
  });
};

export const useUpdateWarehouse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-warehouse'],
    mutationFn: async (model: any) => {
      return await BaseRequest.Put(
        `/api/warehouses/${model.warehouse_id}`,
        model
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-warehouse']
      });
    }
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-user'],
    mutationFn: async (model: any) => {
      return await BaseRequest.Post(`/api/users`, model);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-user']
      });
    }
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-user'],
    mutationFn: async (id: string) => {
      return await BaseRequest.Delete(`/api/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-user']
      });
    }
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-user'],
    mutationFn: async (model: any) => {
      return await BaseRequest.Put(`/api/users/${model.user_id}`, model);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-user']
      });
    }
  });
};

export const useAssignWarehouse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['assign-warehouse'],
    mutationFn: async (model: any) => {
      return await BaseRequest.Put(
        `/api/users/${model.user_code}/warehouse`,
        model
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-user']
      });
    }
  });
};
