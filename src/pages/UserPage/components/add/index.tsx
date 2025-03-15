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
import { useCreateUser } from '@/queries/admin.query';
import { useToast } from '@/components/ui/use-toast';

export const AddUser = () => {
  const [formData, setFormData] = useState({
    role_type: 'MANAGER',
    user_name: '',
    full_name: '',
    email: '',
    password: ''
  });

  const { mutateAsync: createUser } = useCreateUser();
  const { toast } = useToast();

  const roleTypes = [
    { value: 'ADMIN', label: 'Quản trị viên' },
    { value: 'MANAGER', label: 'Quản lý' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role_type: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser(formData);

      toast({
        title: 'Thành công',
        description: 'Thêm người dùng thành công',
        variant: 'success'
      });

      setFormData({
        role_type: 'MANAGER',
        user_name: '',
        full_name: '',
        email: '',
        password: ''
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể thêm người dùng',
        variant: 'destructive'
      });
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">
          Thêm người dùng
        </CardTitle>
        <CardDescription className="text-center">
          Thêm người dùng mới vào hệ thống
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role_type">Vai trò</Label>
            <Select
              onValueChange={handleRoleChange}
              value={formData.role_type}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                {roleTypes.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="user_name">Tên đăng nhập</Label>
            <Input
              id="user_name"
              name="user_name"
              placeholder="Nhập tên đăng nhập"
              value={formData.user_name}
              onChange={handleInputChange}
              className="focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="full_name">Họ và tên</Label>
            <Input
              id="full_name"
              name="full_name"
              placeholder="Nhập họ và tên"
              value={formData.full_name}
              onChange={handleInputChange}
              className="focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Nhập địa chỉ email"
              value={formData.email}
              onChange={handleInputChange}
              className="focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleInputChange}
              className="focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            <Save className="mr-2 h-4 w-4" /> Thêm người dùng
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
