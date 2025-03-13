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
import { Save } from 'lucide-react';

export const AddWareHouse = () => {
  const [formData, setFormData] = useState({
    category_code: '',
    category_name: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Category data:', formData);
    // Add your submission logic here
  };

  return (
    <Card className="mx-auto w-full max-w-md shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">
          Thêm sản phẩm
        </CardTitle>
        <CardDescription className="text-center">
          Thêm sản phẩm mới vào hệ thống
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category_code">Mã nhà kho</Label>
            <Input
              id="category_code"
              name="category_code"
              placeholder="INV005"
              value={formData.category_code}
              onChange={handleInputChange}
              className="focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category_name">Tên nhà kho</Label>
            <Input
              id="category_name"
              name="category_name"
              placeholder="Tên nhà kho"
              value={formData.category_name}
              onChange={handleInputChange}
              className="focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category_name">Địa chỉ nhà kho</Label>
            <Input
              id="category_name"
              name="category_name"
              placeholder="Địa chỉ nhà kho"
              value={formData.category_name}
              onChange={handleInputChange}
              className="focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            <Save className="mr-2 h-4 w-4" /> Thêm nhà kho
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
