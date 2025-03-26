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
import {
  useAcceptPhieuNhapXuat,
  useFinishPhieuNhapXuat,
  useRejectPhieuNhapXuat
} from '@/queries/admin.query';
import { MoreHorizontal, Check, Ban, ShieldCheck } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';

type ActionType = 'accept' | 'finish' | 'reject' | null;

export const CellAction: React.FC<any> = ({ data }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<ActionType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: accept } = useAcceptPhieuNhapXuat();
  const { mutateAsync: finish } = useFinishPhieuNhapXuat();
  const { mutateAsync: reject } = useRejectPhieuNhapXuat();

  const handleOpenDialog = (action: ActionType) => {
    setCurrentAction(action);
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setCurrentAction(null);
  };

  const handleConfirm = async () => {
    if (!currentAction) return;

    setIsLoading(true);
    try {
      const model = { exchangeNote_id: data.exchangeNote_id };

      switch (currentAction) {
        case 'accept':
          await accept(model);
          toast({
            title: 'Thành công',
            description: 'Đã chấp thuận phiếu nhập xuất'
          });
          break;
        case 'finish':
          await finish(model);
          toast({
            title: 'Thành công',
            description: 'Đã hoàn thành phiếu nhập xuất'
          });
          break;
        case 'reject':
          await reject(model);
          toast({
            title: 'Thành công',
            description: 'Đã từ chối phiếu nhập xuất'
          });
          break;
      }

      handleCloseDialog();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Lỗi',
        description: 'Đã xảy ra lỗi khi thực hiện hành động',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getDialogTitle = () => {
    switch (currentAction) {
      case 'accept':
        return 'Xác nhận chấp thuận';
      case 'finish':
        return 'Xác nhận hoàn thành';
      case 'reject':
        return 'Xác nhận từ chối';
      default:
        return 'Xác nhận';
    }
  };

  const getDialogDescription = () => {
    switch (currentAction) {
      case 'accept':
        return `Bạn có chắc chắn muốn chấp thuận phiếu nhập xuất #${data.exchangeNote_id} không?`;
      case 'finish':
        return `Bạn có chắc chắn muốn đánh dấu phiếu nhập xuất #${data.exchangeNote_id} là đã hoàn thành không?`;
      case 'reject':
        return `Bạn có chắc chắn muốn từ chối phiếu nhập xuất #${data.exchangeNote_id} không?`;
      default:
        return 'Bạn có chắc chắn muốn thực hiện hành động này không?';
    }
  };

  return (
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
          <DropdownMenuItem onClick={() => handleOpenDialog('accept')}>
            <Check className="mr-2 h-4 w-4" /> Chấp thuận
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpenDialog('finish')}>
            <ShieldCheck className="mr-2 h-4 w-4" /> Hoàn thành
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpenDialog('reject')}>
            <Ban className="mr-2 h-4 w-4" /> Từ chối
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
            <DialogDescription>{getDialogDescription()}</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCloseDialog}
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button onClick={handleConfirm} disabled={isLoading}>
              {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
