// import { useSearchParams } from 'react-router-dom';
import { useGetAllProduct } from '@/queries/admin.query';
import ListUser from '../../list-user';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
// import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';

export function OverViewTab() {
  const [searchParams] = useSearchParams();
  // const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  // const keyword = searchParams.get('keyword') || '';
  const { data, isPending } = useGetAllProduct();
  const listObjects = data?.data;
  const totalRecords = data?.data?.length;
  const pageCount = Math.ceil(totalRecords / pageLimit);

  return (
    <>
      <div className="grid gap-6 rounded-md p-4 pt-0 ">
        <h1 className="text-center font-bold">DANH SÁCH SẢN PHẨM</h1>
        {isPending ? (
          <div className="p-5">
            <DataTableSkeleton
              columnCount={10}
              filterableColumnCount={2}
              searchableColumnCount={1}
            />
          </div>
        ) : (
          <ListUser
            data={listObjects}
            page={pageLimit}
            totalUsers={totalRecords}
            pageCount={pageCount}
          />
        )}

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
