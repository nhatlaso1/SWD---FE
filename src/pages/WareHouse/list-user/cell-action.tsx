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
import { useDeleteWarehouse, useUpdateWarehouse } from '@/queries/admin.query';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { EditWarehouseModal } from './edit-warehouse-modal';
import __helpers from '@/helpers';

export const CellAction: React.FC<any> = ({ data }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { mutateAsync: deleteWarehouse } = useDeleteWarehouse();
  const { mutateAsync: updateWarehouse } = useUpdateWarehouse();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deleteWarehouse(data.warehouse_code);
      toast({
        title: 'Thành công',
        description: 'Xóa kho thành công',
        variant: 'success'
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể xóa kho',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (formData) => {
    const model = {
      ...formData,
      warehouse_id: data.warehouse_code
    };
    return await updateWarehouse(model);
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

          <EditWarehouseModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            warehouse={data}
            onUpdate={handleUpdate}
          />
        </>
      )}
    </>
  );
};
