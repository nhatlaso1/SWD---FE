'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Save } from 'lucide-react';
import { useCreateProductType, useGetAllCategory } from '@/queries/admin.query';
import { useToast } from '@/components/ui/use-toast';

export const AddProduct = () => {
  const [formData, setFormData] = useState({
    productType_name: '',
    price: '',
    category_code: ''
  });

  const { data } = useGetAllCategory();
  const listObjects = data?.data;
  const { mutateAsync: createProductType } = useCreateProductType();
  const { toast } = useToast();
  // Sample categories - replace with your actual categories

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCategoryChange = (value) => {
    setFormData({
      ...formData,
      category_code: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price)
    };

    await createProductType(payload);

    toast({
      title: 'Thành công',
      description: 'Thêm sản phẩm thành công',
      variant: 'success'
    });

    setFormData({
      productType_name: '',
      price: '',
      category_code: ''
    });

    console.log('Product data:', payload);
  };

  return (
    <Card className="mx-auto w-full max-w-md shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">
          Thêm loại sản phẩm
        </CardTitle>
        <CardDescription className="text-center">
          Thêm loại sản phẩm mới vào hệ thống
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productType_name">Tên loại sản phẩm</Label>
            <Input
              id="productType_name"
              name="productType_name"
              placeholder="Nhập tên sản phẩm"
              value={formData.productType_name}
              onChange={handleInputChange}
              className="focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Giá</Label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="Nhập giá sản phẩm"
              value={formData.price}
              onChange={handleInputChange}
              className="focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Danh mục</Label>
            <Select
              onValueChange={handleCategoryChange}
              value={formData.category_code}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {listObjects?.map((category) => (
                  <SelectItem
                    key={category.category_code}
                    value={category.category_code}
                  >
                    {category.category_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            <Save className="mr-2 h-4 w-4" /> Thêm loại sản phẩm
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
