// import { useSearchParams } from 'react-router-dom';
import ListUser from '../../list-user';
// import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';

export function OverViewTab() {
  // const [searchParams] = useSearchParams();
  // const page = Number(searchParams.get('page') || 1);
  // const pageLimit = Number(searchParams.get('limit') || 10);
  // const keyword = searchParams.get('keyword') || '';

  // const listObjects = data?.listData;
  // const totalRecords = data?.totalRecords;
  // const pageCount = Math.ceil(totalRecords / pageLimit);

  return (
    <>
      <div className="grid gap-6 rounded-md p-4 pt-0 ">
        <h1 className="text-center font-bold">DANH SÁCH NHÀ KHO</h1>
        {/* {isPending ? (
          <div className="p-5">
            <DataTableSkeleton
              columnCount={10}
              filterableColumnCount={2}
              searchableColumnCount={1}
            />
          </div>
        ) : (
          <ListExamPE
            data={listObjects}
            page={totalRecords}
            totalUsers={totalRecords}
            pageCount={pageCount}
          />
        )} */}

        <ListUser
          data={[
            {
              warehouse_code: 'WH001',
              warehouse_name: 'Kho Hà Nội',
              address: '123 Đường Láng, Đống Đa, Hà Nội'
            },
            {
              warehouse_code: 'WH002',
              warehouse_name: 'Kho Sài Gòn',
              address: '456 Nguyễn Trãi, Quận 1, TP.HCM'
            },
            {
              warehouse_code: 'WH003',
              warehouse_name: 'Kho Đà Nẵng',
              address: '789 Trần Hưng Đạo, Hải Châu, Đà Nẵng'
            },
            {
              warehouse_code: 'WH004',
              warehouse_name: 'Kho Hải Phòng',
              address: '101 Lê Hồng Phong, Ngô Quyền, Hải Phòng'
            },
            {
              warehouse_code: 'WH005',
              warehouse_name: 'Kho Cần Thơ',
              address: '202 3 Tháng 2, Ninh Kiều, Cần Thơ'
            }
          ]}
          page={10}
          totalUsers={10}
          pageCount={10}
        />

        {/* <ListExamSchedule
          data={[
            {
              exam_code: 'SSl',
              exam_date: '2022-12-12',
              exam_user_count: '3',
              created_at: '2022-12-12'
            }
          ]}
          page={10}
          totalUsers={10}
          pageCount={10}
        /> */}
      </div>
    </>
  );
}
