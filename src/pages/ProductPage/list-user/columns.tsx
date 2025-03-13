import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import __helpers from '@/helpers';
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
    accessorKey: 'product_code',
    header: 'Mã sản phẩm',
    enableSorting: true
  },
  {
    accessorKey: 'product_name',
    header: 'Tên sản phẩm',
    enableSorting: true
  },
  {
    accessorKey: 'size',
    header: 'Kích thước',
    enableSorting: true
  },
  {
    accessorKey: 'color',
    header: 'Kích thước',
    enableSorting: true
  },

  {
    accessorKey: 'quantity',
    header: 'Số lượng',
    enableSorting: true
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    enableSorting: true
  },
  {
    accessorKey: 'productType_code',
    header: 'Mã loại sản phẩm',
    enableSorting: true
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
