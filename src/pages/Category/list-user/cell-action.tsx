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
import { useDeleteCategory } from '@/queries/admin.query';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { EditCategoryDialog } from './EditCategoryDialog';
import __helpers from '@/helpers';

export const CellAction: React.FC<any> = ({ data }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { mutateAsync: deleteCategory } = useDeleteCategory();
  const { toast } = useToast();

  const handleDelete = async () => {
    await deleteCategory(data.category_code);
    toast({
      title: 'Thành công',
      description: 'Xóa danh mục thành công',
      variant: 'success'
    });
  };

  const openEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
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
              <DropdownMenuItem onClick={openEditDialog}>
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

          <EditCategoryDialog
            isOpen={isEditDialogOpen}
            onClose={closeEditDialog}
            category={data}
          />
        </>
      )}
    </>
  );
};
