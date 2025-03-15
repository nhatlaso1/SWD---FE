import BasePages from '@/components/shared/base-pages.js';
import { OverViewTab } from './components/overview/index.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddUser } from './components/add/index.js';
import __helpers from '@/helpers/index.js';

export default function UserPage() {
  return (
    <>
      <BasePages
        className="relative flex-1 space-y-4 overflow-y-auto  px-4"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Người dùng', link: '/user' }
        ]}
      >
        <div className="top-4 flex items-center justify-between space-y-2 "></div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Danh sách Người dùng</TabsTrigger>
            {__helpers.localStorage_get('role') === 'ADMIN' && (
              <TabsTrigger value="add-user">Thêm người dùng</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <OverViewTab />
          </TabsContent>
          <TabsContent value="add-user" className="space-y-4">
            <AddUser />
          </TabsContent>
        </Tabs>
      </BasePages>
    </>
  );
}
