'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, View, Edit, Trash2, ShieldCheck } from 'lucide-react';
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
import { useRouter } from '@/routes/hooks';

interface UserCellActionProps {
  data: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export const CellAction: React.FC<UserCellActionProps> = ({ data }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openPermissions, setOpenPermissions] = useState(false);

  const handleDelete = () => {
    // Xử lý xóa người dùng
    setOpenDelete(false);
    toast({
      title: 'Đã xóa thành công',
      description: `Người dùng với ID ${data.id} đã được xóa.`
    });
  };

  const handleSave = (type: string) => {
    // Xử lý lưu thông tin
    if (type === 'edit') setOpenEdit(false);
    if (type === 'permissions') setOpenPermissions(false);

    toast({
      title: 'Đã lưu thành công',
      description: `Thông tin ${type === 'edit' ? 'người dùng' : 'phân quyền'} đã được cập nhật.`
    });
  };

  return (
    <>
      {/* Edit Dialog */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin người dùng.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Họ và tên</Label>
              <Input id="edit-name" defaultValue={data.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input id="edit-email" type="email" defaultValue={data.email} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-role">Vai trò</Label>
              <Select
                defaultValue={
                  data.role === 'Admin'
                    ? 'admin'
                    : data.role === 'Quản lý kho'
                      ? 'manager'
                      : 'staff'
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Quản lý kho</SelectItem>
                  <SelectItem value="staff">Nhân viên</SelectItem>
                </SelectContent>
              </Select>
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
        <DialogContent>
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

      {/* Permissions Dialog */}
      <Dialog open={openPermissions} onOpenChange={setOpenPermissions}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Phân quyền người dùng</DialogTitle>
            <DialogDescription>
              Cấp quyền truy cập cho người dùng.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="perm-users"
                  className="rounded"
                  defaultChecked
                />
                <Label htmlFor="perm-users">Quản lý người dùng</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="perm-products"
                  className="rounded"
                  defaultChecked
                />
                <Label htmlFor="perm-products">Quản lý sản phẩm</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="perm-warehouses"
                  className="rounded"
                  defaultChecked
                />
                <Label htmlFor="perm-warehouses">Quản lý kho</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="perm-categories"
                  className="rounded"
                  defaultChecked
                />
                <Label htmlFor="perm-categories">Quản lý danh mục</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenPermissions(false)}>
              Hủy
            </Button>
            <Button onClick={() => handleSave('permissions')}>
              Lưu phân quyền
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Mở menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-primary-foreground">
          <DropdownMenuLabel>Lựa chọn</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/admin/users/${data.id}`)}
          >
            <View className="mr-2 h-4 w-4" /> Xem chi tiết
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenPermissions(true)}>
            <ShieldCheck className="mr-2 h-4 w-4" /> Phân quyền
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
    </>
  );
};
