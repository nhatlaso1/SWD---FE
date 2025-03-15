'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const EditWarehouseModal = ({
  isOpen,
  onClose,
  warehouse,
  onUpdate
}) => {
  const [formData, setFormData] = useState({
    warehouse_id: warehouse?.warehouse_id || '',
    warehouse_name: warehouse?.warehouse_name || '',
    address: warehouse?.address || '',
    warehouse_code: warehouse?.warehouse_code || ''
  });

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
      await onUpdate(formData);
      toast({
        title: 'Thành công',
        description: 'Cập nhật kho thành công',
        variant: 'success'
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể cập nhật kho',
        variant: 'destructive'
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa nhà kho</DialogTitle>
          <DialogDescription>Cập nhật thông tin nhà kho</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
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
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Lưu thay đổi
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
