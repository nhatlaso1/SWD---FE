import BasePages from '@/components/shared/base-pages.js';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Overview } from './components/dashboard/overview.js';
import { RecentActivity } from './components/dashboard/recent-activity.js';
import { StaffPerformance } from './components/dashboard/staff-performance.js';
import { DashboardHeader } from './components/dashboard/dashboard-header.js';
import { InventorySummary } from './components/dashboard/inventory-summary.js';

export default function ManagerOverView() {
  return (
    <>
      <BasePages
        className="relative flex-1 space-y-4 overflow-y-auto px-4"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Tổng quan', link: '/Warehouse' }
        ]}
      >
        <div className="flex flex-col gap-4">
          <DashboardHeader
            heading="Bảng điều khiển"
            subheading="Tổng quan về hoạt động, kho hàng và hiệu suất nhân viên."
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tổng số hàng tồn kho
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,345</div>
                <p className="text-xs text-muted-foreground">
                  +12.5% so với tháng trước
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Sản phẩm sắp hết hàng
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 16v-8M12 16V8M8 16v-4" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">
                  +7 so với tuần trước
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Nhân viên đang hoạt động
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">
                  +2 nhân viên mới trong tháng này
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Đơn hàng đang chờ xử lý
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  3 đơn hàng sẽ đến hôm nay
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Tổng quan</CardTitle>
                <CardDescription>
                  Tổng quan về kho hàng và hoạt động trong 30 ngày qua.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Hiệu suất nhân viên</CardTitle>
                <CardDescription>
                  Nhân viên có thành tích tốt nhất trong tháng này.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StaffPerformance />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Hoạt động gần đây</CardTitle>
                <CardDescription>
                  Các giao dịch nhập - xuất hàng gần nhất.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Tóm tắt kho hàng</CardTitle>
                <CardDescription>
                  Trạng thái hàng tồn kho theo danh mục.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InventorySummary />
              </CardContent>
            </Card>
          </div>
        </div>
      </BasePages>
    </>
  );
}
