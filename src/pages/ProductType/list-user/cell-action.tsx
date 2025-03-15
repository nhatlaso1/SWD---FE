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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import {
  useDeleteProductType,
  useUpdateProductType
} from '@/queries/admin.query';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import __helpers from '@/helpers';

export const CellAction: React.FC<any> = ({ data }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [productTypeName, setProductTypeName] = useState(
    data.productType_name || ''
  );

  const { mutateAsync: deleteProductType } = useDeleteProductType();
  const { mutateAsync: updateProductType } = useUpdateProductType();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deleteProductType(data.productType_code);
      toast({
        title: 'Thành công',
        description: 'Xóa loại sản phẩm thành công',
        variant: 'success'
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể xóa loại sản phẩm',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = () => {
    setProductTypeName(data.productType_name || '');
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!productTypeName.trim()) {
      toast({
        title: 'Lỗi',
        description: 'Tên loại sản phẩm không được để trống',
        variant: 'destructive'
      });
      return;
    }

    try {
      await updateProductType({
        productType_id: data.productType_code,
        productType_name: productTypeName
      });

      toast({
        title: 'Thành công',
        description: 'Cập nhật loại sản phẩm thành công',
        variant: 'success'
      });

      setIsEditDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể cập nhật loại sản phẩm',
        variant: 'destructive'
      });
    }
  };

  return (
    <>
      {__helpers.isAdmin() && (
        <>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Mở menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-primary-foreground">
              <DropdownMenuLabel>Lựa chọn</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleEdit}>
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

          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Chỉnh sửa loại sản phẩm</DialogTitle>
                <DialogDescription>
                  Cập nhật thông tin loại sản phẩm
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productType_name" className="text-right">
                    Tên loại
                  </Label>
                  <Input
                    id="productType_name"
                    value={productTypeName}
                    onChange={(e) => setProductTypeName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button onClick={handleUpdate}>Lưu thay đổi</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};
