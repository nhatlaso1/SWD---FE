import ListUser from '../../list-user';

export function OverViewTab() {
  // const listObjects = data?.listData;
  // const totalRecords = data?.totalRecords;
  // const pageCount = Math.ceil(totalRecords / pageLimit);

  return (
    <>
      <div className="grid gap-6 rounded-md p-4 pt-0 ">
        <h1 className="text-center font-bold">DANH SÁCH DANH MỤC</h1>
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
            { category_code: 'INV001', category_name: 'Thiết bị điện tử' },
            { category_code: 'INV002', category_name: 'Văn phòng phẩm' },
            { category_code: 'INV003', category_name: 'Dụng cụ y tế' },
            { category_code: 'INV004', category_name: 'Thiết bị viễn thông' },
            { category_code: 'INV005', category_name: 'Linh kiện máy tính' },
            { category_code: 'INV006', category_name: 'Thiết bị gia dụng' },
            { category_code: 'INV007', category_name: 'Đồ bảo hộ lao động' },
            { category_code: 'INV008', category_name: 'Hàng tiêu dùng nhanh' },
            { category_code: 'INV009', category_name: 'Dụng cụ sửa chữa' },
            { category_code: 'INV010', category_name: 'Phụ kiện ô tô - xe máy' }
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
