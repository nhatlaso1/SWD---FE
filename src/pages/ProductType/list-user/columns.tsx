import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { useSearchParams } from 'react-router-dom';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'STT',
    header: 'STT',
    enableSorting: true,
    cell: ({ row }) => {
      const [searchParams] = useSearchParams();
      const pageLimit = Number(searchParams.get('limit') || 10);
      const page = Number(searchParams.get('page') || 1);
      const rowIndex = row.index;
      const serialNumber = (page - 1) * pageLimit + rowIndex + 1;
      return <span>{serialNumber}</span>;
    }
  },

  {
    accessorKey: 'productType_name',
    header: 'Tên loại sản phẩm',
    enableSorting: true,
    cell: ({ row }) => <span>{row.original.productType_name}</span>
  },
  {
    accessorKey: 'productType_code',
    header: 'Mã loại sản phẩm',
    enableSorting: true,
    cell: ({ row }) => <span>{row.original.productType_code}</span>
  },

  {
    accessorKey: 'price',
    header: 'Giá',
    enableSorting: true,
    cell: ({ row }) => <span>{row.original.price.toLocaleString()} đ</span> // Format số tiền
  },

  {
    accessorKey: 'category_name',
    header: 'Danh mục',
    enableSorting: true,
    cell: ({ row }) => <span>{row.original.category_name}</span>
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
