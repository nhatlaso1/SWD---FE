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
import { useCreateWarehouse } from '@/queries/admin.query';
import { useToast } from '@/components/ui/use-toast';

export const AddWareHouse = () => {
  const [formData, setFormData] = useState({
    warehouse_name: '',
    address: ''
  });
  const { mutateAsync: createWarehouse } = useCreateWarehouse();
  const { toast } = useToast();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createWarehouse(formData);
      console.log('Warehouse created:', formData);
      setFormData({
        warehouse_name: '',
        address: ''
      });
      toast({
        title: 'Thành công',
        description: 'Thêm nhà kho thành công',
        variant: 'success'
      });
    } catch (error) {
      console.error('Error creating warehouse:', error);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">
          Thêm nhà kho
        </CardTitle>
        <CardDescription className="text-center">
          Thêm nhà kho mới vào hệ thống
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="warehouse_name">Tên nhà kho</Label>
            <Input
              id="warehouse_name"
              name="warehouse_name"
              placeholder="Kho Hàng HCM"
              value={formData.warehouse_name}
              onChange={handleInputChange}
              className="focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ nhà kho</Label>
            <Input
              id="address"
              name="address"
              placeholder="Quận Sơn Trà, HCM"
              value={formData.address}
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
