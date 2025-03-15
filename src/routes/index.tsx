import NotFound from '@/pages/not-found';
import UserPage from '@/pages/UserPage';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);

const SignInPage = lazy(() => import('@/pages/auth/signin'));
const CategoryPage = lazy(() => import('@/pages/Category'));
const WareHousePage = lazy(() => import('@/pages/WareHouse'));
const ProductPage = lazy(() => import('@/pages/ProductPage'));
const ManagerOverView = lazy(() => import('@/pages/ManagerOverView'));
const InventoryPage = lazy(() => import('@/pages/ManagerInventoryPage'));
const SuppliesPage = lazy(() => import('@/pages/ManagerSuppliesPage'));
const ManagerStaffPage = lazy(() => import('@/pages/ManagerStaff'));
const ProductType = lazy(() => import('@/pages/ProductType'));

// ----------------------------------------------------------------------

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          path: '/user',
          element: <UserPage />,
          index: true
        },
        {
          path: '/category',
          element: <CategoryPage />,
          index: true
        },
        {
          path: '/warehouse',
          element: <WareHousePage />
        },
        {
          path: '/product',
          element: <ProductPage />
        },
        {
          path: '/product-type',
          element: <ProductType />
        },
        {
          path: '/manager/overview',
          element: <ManagerOverView />
        },
        {
          path: '/manager/inventory',
          element: <InventoryPage />
        },
        {
          path: '/manager/suppliles',
          element: <SuppliesPage />
        },
        {
          path: '/manager/staff',
          element: <ManagerStaffPage />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/login',
      element: <SignInPage />,
      index: true
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
