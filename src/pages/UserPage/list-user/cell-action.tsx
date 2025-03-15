'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, ShieldCheck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import {
  useAssignWarehouse,
  useDeleteUser,
  useGetAllWarehouse,
  useUpdateUser
} from '@/queries/admin.query';
import __helpers from '@/helpers';

export const CellAction: React.FC<any> = ({ data }) => {
  const { toast } = useToast();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openWarehouse, setOpenWarehouse] = useState(false);
  const [name, setName] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');

  const { mutateAsync: deleteUser } = useDeleteUser();
  const { mutateAsync: assignWarehouse } = useAssignWarehouse();
  const { mutateAsync: updateUser } = useUpdateUser();
  const { data: dataAPIWarehouse } = useGetAllWarehouse();
  const dataWarehouse = dataAPIWarehouse?.data;
  console.log(dataWarehouse);
  useEffect(() => {
    setName(data.full_name);
  }, [data]);

  const handleDelete = async () => {
    try {
      await deleteUser(data.user_code);
      setOpenDelete(false);
      toast({
        title: 'Đã xóa thành công',
        description: 'Người dùng đã được xóa khỏi hệ thống.',
        variant: 'success'
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể xóa người dùng. Vui lòng thử lại sau.',
        variant: 'destructive'
      });
    }
  };

  const handleSave = async (type: string) => {
    try {
      if (type === 'edit') {
        const model = {
          user_id: data.user_code,
          full_name: name
        };
        await updateUser(model);
        setOpenEdit(false);
      } else if (type === 'warehouse') {
        if (!selectedWarehouse) {
          toast({
            title: 'Lỗi',
            description: 'Vui lòng chọn nhà kho.',
            variant: 'destructive'
          });
          return;
        }

        const model = {
          user_code: data.user_code,
          warehouse_code: selectedWarehouse
        };

        await assignWarehouse(model);
        setOpenWarehouse(false);
      }

      toast({
        title: 'Đã lưu thành công',
        description: `Thông tin ${type === 'edit' ? 'người dùng' : 'phân quyền'} đã được cập nhật.`,
        variant: 'success'
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: `Không thể cập nhật ${type === 'edit' ? 'thông tin người dùng' : 'phân quyền'}. Vui lòng thử lại sau.`,
        variant: 'destructive'
      });
    }
  };

  return (
    <>
      {/* Edit Dialog */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent
          className="sm:max-w-[725px]"
          style={{ padding: '1.5rem' }}
        >
          <DialogHeader>
            <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin người dùng.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Họ và tên</Label>
              <Input
                id="edit-name"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEdit(false)}>
              Hủy
            </Button>
            <Button onClick={() => handleSave('edit')}>Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa người dùng này không? Hành động này
              không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDelete(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Warehouse Assignment Dialog */}
      <Dialog open={openWarehouse} onOpenChange={setOpenWarehouse}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Giao quyền quản lý nhà kho</DialogTitle>
            <DialogDescription>
              Chọn nhà kho để giao quyền quản lý cho người dùng này.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="warehouse-select">Nhà kho</Label>
              <Select
                onValueChange={setSelectedWarehouse}
                value={selectedWarehouse}
              >
                <SelectTrigger id="warehouse-select">
                  <SelectValue placeholder="Chọn nhà kho" />
                </SelectTrigger>
                <SelectContent>
                  {dataWarehouse?.map((warehouse) => (
                    <SelectItem
                      key={warehouse.warehouse_code}
                      value={warehouse.warehouse_code}
                    >
                      {warehouse.warehouse_name} ({warehouse.warehouse_code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenWarehouse(false)}>
              Hủy
            </Button>
            <Button onClick={() => handleSave('warehouse')}>Giao quyền</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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

            <DropdownMenuItem onClick={() => setOpenEdit(true)}>
              <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa thông tin
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenWarehouse(true)}>
              <ShieldCheck className="mr-2 h-4 w-4" /> Giao quyền quản lý nhà
              kho
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setOpenDelete(true)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
