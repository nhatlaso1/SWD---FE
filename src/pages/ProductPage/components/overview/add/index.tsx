'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useCreateProduct, useGetAllProductType } from '@/queries/admin.query';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  product_name: z
    .string()
    .min(1, { message: 'Tên sản phẩm không được để trống' }),
  size: z.string().min(1, { message: 'Kích thước không được để trống' }),
  color: z.string().min(1, { message: 'Màu sắc không được để trống' }),
  quantity: z.coerce.number().min(1, { message: 'Số lượng phải lớn hơn 0' }),
  productType_code: z
    .string()
    .min(1, { message: 'Loại sản phẩm không được để trống' })
});

export function AddProduct({ initialData }: { initialData?: any }) {
  const [loading, setLoading] = useState(false);
  const { mutateAsync: createProduct } = useCreateProduct();
  const { toast } = useToast();
  const { data: apiData, isLoading } = useGetAllProductType();
  const [productTypes, setProductTypes] = useState([]);

  // Lấy danh sách product types từ API
  useEffect(() => {
    if (apiData?.data) {
      const extractedProducts = apiData.data.data.flatMap(
        (category) => category.product_types
      );
      setProductTypes(extractedProducts);
    }
  }, [apiData]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      product_name: '',
      size: '',
      color: '',
      quantity: 0,
      productType_code: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await createProduct(values);
      toast({
        title: 'Thành công',
        description: initialData
          ? 'Sản phẩm đã được cập nhật'
          : 'Sản phẩm đã được tạo'
      });

      if (!initialData) {
        form.reset();
      }
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể lưu sản phẩm. Vui lòng thử lại.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="product_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên sản phẩm</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên sản phẩm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kích thước</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập kích thước" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Màu sắc</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập màu sắc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập số lượng"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productType_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại sản phẩm</FormLabel>
                {isLoading ? (
                  <p>Đang tải danh sách sản phẩm...</p>
                ) : (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại sản phẩm" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {productTypes.map(
                        (product: {
                          productType_id: string;
                          productType_code: string;
                          productType_name: string;
                        }) => (
                          <SelectItem
                            key={product.productType_id}
                            value={product.productType_code}
                          >
                            {product.productType_name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading
            ? 'Đang xử lý...'
            : initialData
              ? 'Cập nhật sản phẩm'
              : 'Tạo sản phẩm'}
        </Button>
      </form>
    </Form>
  );
}
