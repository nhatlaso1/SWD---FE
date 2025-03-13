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
    accessorKey: 'warehouse_code',
    header: 'Mã kho',
    enableSorting: true
  },
  {
    accessorKey: 'warehouse_name',
    header: 'Tên kho',
    enableSorting: true
  },
  {
    accessorKey: 'address',
    header: 'Địa chỉ',
    enableSorting: true
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
