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
        <h1 className="text-center font-bold">DANH SÁCH SẢN PHẨM</h1>
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
              product_code: 'P001',
              product_name: 'Áo thun nam',
              size: 'L',
              color: 'Đen',
              quantity: 100,
              status: 'Còn hàng',
              productType_code: 'PT001'
            },
            {
              product_code: 'P002',
              product_name: 'Quần jean nữ',
              size: 'M',
              color: 'Xanh',
              quantity: 50,
              status: 'Còn hàng',
              productType_code: 'PT002'
            },
            {
              product_code: 'P003',
              product_name: 'Giày thể thao',
              size: '42',
              color: 'Trắng',
              quantity: 30,
              status: 'Hết hàng',
              productType_code: 'PT003'
            },
            {
              product_code: 'P004',
              product_name: 'Balo du lịch',
              size: '45L',
              color: 'Đỏ',
              quantity: 75,
              status: 'Còn hàng',
              productType_code: 'PT004'
            },
            {
              product_code: 'P005',
              product_name: 'Đồng hồ thông minh',
              size: 'One Size',
              color: 'Đen',
              quantity: 20,
              status: 'Sắp hết',
              productType_code: 'PT005'
            },
            {
              product_code: 'P006',
              product_name: 'Tai nghe Bluetooth',
              size: 'One Size',
              color: 'Trắng',
              quantity: 60,
              status: 'Còn hàng',
              productType_code: 'PT006'
            },
            {
              product_code: 'P007',
              product_name: 'Bàn phím cơ',
              size: 'Full-size',
              color: 'RGB',
              quantity: 15,
              status: 'Hết hàng',
              productType_code: 'PT007'
            },
            {
              product_code: 'P008',
              product_name: 'Chuột gaming',
              size: 'Medium',
              color: 'Đen',
              quantity: 90,
              status: 'Còn hàng',
              productType_code: 'PT008'
            },
            {
              product_code: 'P009',
              product_name: 'Áo khoác gió',
              size: 'XL',
              color: 'Xám',
              quantity: 40,
              status: 'Sắp hết',
              productType_code: 'PT009'
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
