import BasePages from '@/components/shared/base-pages.js';
import { OverViewTab } from './components/overview/index.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddProduct } from './components/overview/add/index.js';
import __helpers from '@/helpers/index.js';

export default function ProductPage() {
  return (
    <>
      <BasePages
        className="relative flex-1 space-y-4 overflow-y-auto  px-4"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Sản phẩm', link: '/Warehouse' }
        ]}
      >
        <div className="top-4 flex items-center justify-between space-y-2 "></div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Danh sách sản phẩm</TabsTrigger>
            {__helpers.localStorage_get('role') === 'ADMIN' && (
              <TabsTrigger value="add-exam-schedule">Thêm sản phẩm</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <OverViewTab />
          </TabsContent>
          <TabsContent value="add-exam-schedule" className="space-y-4">
            <AddProduct />
          </TabsContent>
        </Tabs>
      </BasePages>
    </>
  );
}
