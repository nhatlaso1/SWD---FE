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
    accessorKey: 'exchangeNote_id',
    header: 'Mã phiếu',
    enableSorting: true
  },
  {
    accessorKey: 'transactionType',
    header: 'Loại giao dịch',
    enableSorting: true
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    enableSorting: true
  },
  {
    accessorKey: 'created_by',
    header: 'Người tạo',
    enableSorting: true
  },

  {
    accessorKey: 'approved_by',
    header: 'Người duyệt',
    enableSorting: true
  },
  {
    accessorKey: 'date',
    header: 'Ngày tạo',
    enableSorting: true,
    cell: ({ row }) => (
      <span>{__helpers.convertToDateDDMMYYYY(row.original.date)}</span>
    )
  },
  {
    accessorKey: 'destination_warehouse_code',
    header: 'Kho đích',
    enableSorting: true
  },
  {
    accessorKey: 'source_warehouse_code',
    header: 'Kho nguồn',
    enableSorting: true
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
