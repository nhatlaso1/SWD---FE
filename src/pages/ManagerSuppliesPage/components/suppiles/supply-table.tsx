'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, FileText, Trash } from 'lucide-react';

interface SupplyTableProps {
  type: 'all' | 'incoming' | 'outgoing' | 'history';
}

const supplyData = {
  all: [
    {
      id: 'SUP001',
      type: 'incoming',
      name: 'Linh kiện Laptop',
      supplier: 'Công ty TechParts',
      quantity: 50,
      status: 'Lên lịch',
      date: '2023-04-15'
    },
    {
      id: 'SUP002',
      type: 'outgoing',
      name: 'Ghế văn phòng',
      destination: 'Chi nhánh B',
      quantity: 10,
      status: 'Đang vận chuyển',
      date: '2023-04-12'
    },
    {
      id: 'SUP003',
      type: 'incoming',
      name: 'Giấy in',
      supplier: 'Công ty Văn phòng phẩm',
      quantity: 200,
      status: 'Đã giao',
      date: '2023-04-10'
    },
    {
      id: 'SUP004',
      type: 'outgoing',
      name: 'Màn hình máy tính',
      destination: 'Khách hàng XYZ',
      quantity: 25,
      status: 'Đã giao',
      date: '2023-04-08'
    },
    {
      id: 'SUP005',
      type: 'incoming',
      name: 'Nhôm nguyên liệu',
      supplier: 'Công ty MetalWorks',
      quantity: 500,
      status: 'Lên lịch',
      date: '2023-04-20'
    }
  ],
  incoming: [
    {
      id: 'SUP001',
      name: 'Linh kiện Laptop',
      supplier: 'Công ty TechParts',
      quantity: 50,
      status: 'Lên lịch',
      date: '2023-04-15'
    },
    {
      id: 'SUP003',
      name: 'Giấy in',
      supplier: 'Công ty Văn phòng phẩm',
      quantity: 200,
      status: 'Đã giao',
      date: '2023-04-10'
    },
    {
      id: 'SUP005',
      name: 'Nhôm nguyên liệu',
      supplier: 'Công ty MetalWorks',
      quantity: 500,
      status: 'Lên lịch',
      date: '2023-04-20'
    }
  ],
  outgoing: [
    {
      id: 'SUP002',
      name: 'Ghế văn phòng',
      destination: 'Chi nhánh B',
      quantity: 10,
      status: 'Đang vận chuyển',
      date: '2023-04-12'
    },
    {
      id: 'SUP004',
      name: 'Màn hình máy tính',
      destination: 'Khách hàng XYZ',
      quantity: 25,
      status: 'Đã giao',
      date: '2023-04-08'
    }
  ],
  history: [
    {
      id: 'SUP003',
      type: 'incoming',
      name: 'Giấy in',
      supplier: 'Công ty Văn phòng phẩm',
      quantity: 200,
      status: 'Đã giao',
      date: '2023-04-10'
    },
    {
      id: 'SUP004',
      type: 'outgoing',
      name: 'Màn hình máy tính',
      destination: 'Khách hàng XYZ',
      quantity: 25,
      status: 'Đã giao',
      date: '2023-04-08'
    },
    {
      id: 'HIST001',
      type: 'incoming',
      name: 'Bàn phím',
      supplier: 'Công ty TechParts',
      quantity: 30,
      status: 'Đã giao',
      date: '2023-03-25'
    },
    {
      id: 'HIST002',
      type: 'outgoing',
      name: 'Tủ hồ sơ',
      destination: 'Chi nhánh A',
      quantity: 5,
      status: 'Đã giao',
      date: '2023-03-20'
    }
  ]
};

export function SupplyTable({ type }: SupplyTableProps) {
  const data = supplyData[type];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Lên lịch':
        return <Badge variant="outline">{status}</Badge>;
      case 'Đang vận chuyển':
        return <Badge variant="secondary">{status}</Badge>;
      case 'Đã giao':
        return <Badge variant="default">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Mã</TableHead>
            {type === 'all' && <TableHead>Loại</TableHead>}
            <TableHead>Tên vật tư</TableHead>
            {(type === 'all' || type === 'incoming' || type === 'history') && (
              <TableHead>Nhà cung cấp</TableHead>
            )}
            {(type === 'all' || type === 'outgoing' || type === 'history') && (
              <TableHead>Điểm đến</TableHead>
            )}
            <TableHead>Số lượng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              {type === 'all' && (
                <TableCell>
                  <Badge
                    variant={item.type === 'incoming' ? 'secondary' : 'outline'}
                  >
                    {item.type === 'incoming' ? 'Nhập kho' : 'Xuất kho'}
                  </Badge>
                </TableCell>
              )}
              <TableCell>{item.name}</TableCell>
              {(type === 'all' ||
                type === 'incoming' ||
                type === 'history') && (
                <TableCell>{(item as any).supplier || '-'}</TableCell>
              )}
              {(type === 'all' ||
                type === 'outgoing' ||
                type === 'history') && (
                <TableCell>{(item as any).destination || '-'}</TableCell>
              )}
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Mở menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Chỉnh sửa</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Xem chi tiết</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Xóa</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
