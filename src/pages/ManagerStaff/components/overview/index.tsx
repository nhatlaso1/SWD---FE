// import { useSearchParams } from 'react-router-dom';
import ListUser from '../../list-user';

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
        <h1 className="text-center font-bold">DANH SÁCH NHÂN VIÊN</h1>
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
              STT: 1,
              user_code: 'U12345',
              user_name: 'Nguyễn Văn A',
              full_name: 'Nguyễn Văn A',
              email: 'nguyenvana@example.com',
              warehouse_code: 'WH001',
              status: 'Active',
              created_at: '2024-03-10T08:30:00Z'
            },
            {
              STT: 2,
              user_code: 'U67890',
              user_name: 'Trần Thị B',
              full_name: 'Trần Thị B',
              email: 'tranthib@example.com',
              warehouse_code: 'WH002',
              status: 'Inactive',
              created_at: '2024-03-09T10:15:00Z'
            },
            {
              STT: 3,
              user_code: 'U11223',
              user_name: 'Lê Văn C',
              full_name: 'Lê Văn C',
              email: 'levanc@example.com',
              warehouse_code: 'WH003',
              status: 'Pending',
              created_at: '2024-03-08T14:45:00Z'
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
