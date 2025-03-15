'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { useDeleteProduct, useUpdateProduct } from '@/queries/admin.query';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import __helpers from '@/helpers';

export const CellAction: React.FC<any> = ({ data }) => {
  const { mutateAsync: deleteProduct } = useDeleteProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(data.quantity || 0);

  const handleDelete = async () => {
    try {
      await deleteProduct(data.product_code);
      toast({
        title: 'Thành công',
        description: 'Xóa sản phẩm thành công',
        variant: 'success'
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể xóa sản phẩm',
        variant: 'destructive'
      });
    }
  };

  const handleUpdateQuantity = async () => {
    try {
      await updateProduct({
        product_id: data.product_code,
        quantity: Number(quantity)
      });

      toast({
        title: 'Thành công',
        description: 'Cập nhật số lượng sản phẩm thành công',
        variant: 'success'
      });

      setIsOpen(false);
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể cập nhật số lượng sản phẩm',
        variant: 'destructive'
      });
    }
  };

  return (
    <>
      {__helpers.isAdmin() && (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Mở menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-primary-foreground">
            <DropdownMenuLabel>Lựa chọn</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setIsOpen(true)}>
              <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cập nhật số lượng sản phẩm</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="product-name" className="font-medium">
                Tên sản phẩm
              </Label>
              <div className="text-sm text-muted-foreground">
                {data.product_name}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity" className="font-medium">
                Số lượng
              </Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.valueAsNumber)}
                min={0}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleUpdateQuantity}>Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
