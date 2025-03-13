'use client';

import { useState } from 'react';
import {
  ArrowUpDown,
  MoreHorizontal,
  Edit,
  Trash,
  AlertTriangle
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const inventoryData = [
  {
    id: 'INV001',
    name: 'Laptop Dell XPS 13',
    category: 'Thiết bị điện tử',
    quantity: 25,
    location: 'Kho A, Kệ số 3',
    status: 'Còn hàng',
    lastUpdated: '2023-04-12'
  },
  {
    id: 'INV002',
    name: 'Ghế văn phòng công thái học',
    category: 'Nội thất',
    quantity: 15,
    location: 'Kho B, Khu vực 2',
    status: 'Còn hàng',
    lastUpdated: '2023-04-10'
  },
  {
    id: 'INV003',
    name: 'Hộp mực in - Màu đen',
    category: 'Văn phòng phẩm',
    quantity: 5,
    location: 'Kho A, Kệ số 1',
    status: 'Sắp hết hàng',
    lastUpdated: '2023-04-08'
  },
  {
    id: 'INV004',
    name: 'Tấm nhôm 2mm',
    category: 'Nguyên liệu thô',
    quantity: 200,
    location: 'Kho C, Khu vực 5',
    status: 'Còn hàng',
    lastUpdated: '2023-04-05'
  },
  {
    id: 'INV005',
    name: 'Thùng carton - Cỡ trung',
    category: 'Bao bì đóng gói',
    quantity: 3,
    location: 'Kho B, Khu vực 4',
    status: 'Sắp hết hàng',
    lastUpdated: '2023-04-03'
  },
  {
    id: 'INV006',
    name: 'Chuột không dây',
    category: 'Thiết bị điện tử',
    quantity: 0,
    location: 'Kho A, Kệ số 2',
    status: 'Hết hàng',
    lastUpdated: '2023-04-01'
  },
  {
    id: 'INV007',
    name: 'Tủ hồ sơ',
    category: 'Nội thất',
    quantity: 8,
    location: 'Kho B, Khu vực 1',
    status: 'Còn hàng',
    lastUpdated: '2023-03-28'
  },
  {
    id: 'INV008',
    name: 'Màn hình LED 24"',
    category: 'Thiết bị điện tử',
    quantity: 12,
    location: 'Kho A, Kệ số 4',
    status: 'Còn hàng',
    lastUpdated: '2023-03-25'
  }
];

export function InventoryTable() {
  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Còn hàng':
        return <Badge variant="default">{status}</Badge>;
      case 'Sắp hết hàng':
        return (
          <Badge variant="warning" className="bg-yellow-500">
            {status}
          </Badge>
        );
      case 'Hết hàng':
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Button
                variant="ghost"
                onClick={() => handleSort('id')}
                className="h-auto p-0 font-medium"
              >
                Mã hàng
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('name')}
                className="h-auto p-0 font-medium"
              >
                Tên sản phẩm
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Danh mục</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('quantity')}
                className="h-auto p-0 font-medium"
              >
                Số lượng
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Vị trí</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Cập nhật lần cuối</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
              <TableCell>{item.lastUpdated}</TableCell>
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
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      <span>Đánh dấu sắp hết hàng</span>
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
