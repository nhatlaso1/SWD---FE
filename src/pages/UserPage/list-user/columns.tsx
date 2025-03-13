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
    accessorKey: 'user_code',
    header: 'Mã người dùng',
    enableSorting: true
  },

  {
    accessorKey: 'user_name',
    header: 'Tên người dùng',
    enableSorting: true
  },

  {
    accessorKey: 'full_name',
    header: 'Họ và tên',
    enableSorting: true
  },

  {
    accessorKey: 'email',
    header: 'Email',
    enableSorting: true
  },
  {
    accessorKey: 'warehouse_code',
    header: 'Mã kho',
    enableSorting: true
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    enableSorting: true
  },
  {
    accessorKey: 'created_at',
    header: 'Ngày tạo',
    enableSorting: true,
    cell: ({ row }) => (
      <span>{__helpers.convertToDateDDMMYYYY(row.original.created_at)}</span>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
