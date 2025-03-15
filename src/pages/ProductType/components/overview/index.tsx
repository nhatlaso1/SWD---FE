import { useGetAllProductType } from '@/queries/admin.query';
import ListUser from '../../list-user';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { useEffect, useState } from 'react';

export function OverViewTab() {
  const [searchParams] = useSearchParams();
  const pageLimit = Number(searchParams.get('limit') || 10);
  const [transformedData, setTransformedData] = useState<any[]>([]);

  const { data, isPending } = useGetAllProductType();
  const listObjects = data?.data || [];
  const totalRecords = listObjects.length || 0;
  const pageCount = totalRecords > 0 ? Math.ceil(totalRecords / pageLimit) : 1;

  useEffect(() => {
    if (!data?.data) return;

    console.log('Dữ liệu API:', data.data);

    const temp: any[] = [];
    listObjects.data.forEach((category: any) => {
      category.product_types.forEach((product: any) => {
        temp.push({
          category_code: category.category_code,
          category_name: category.category_name,
          productType_id: product.productType_id,
          productType_code: product.productType_code,
          productType_name: product.productType_name,
          price: product.price
        });
      });
    });

    setTransformedData(temp);
  }, [data]);

  return (
    <>
      <div className="grid gap-6 rounded-md p-4 pt-0 ">
        <h1 className="text-center font-bold">DANH SÁCH LOẠI SẢN PHẨM</h1>
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
            data={transformedData}
            page={pageLimit}
            totalUsers={totalRecords}
            pageCount={pageCount}
          />
        )}
      </div>
    </>
  );
}
