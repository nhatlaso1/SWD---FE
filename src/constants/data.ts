export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const navItems: any = [
  {
    label: 'Trang chủ',
    detail: [
      {
        title: 'Tổng quan',
        url: '/manager/overview',
        icon: 'dashboard',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      }
    ]
  },
  {
    label: 'Account',
    detail: [
      {
        title: 'Người dùng',
        url: '/user',
        icon: 'attendees',
        shortcut: ['p', 'p'],
        isActive: false
      }
      // {
      //   title: 'Nhân viên',
      //   url: '/manager/staff',
      //   icon: 'users',
      //   shortcut: ['v', 'v'],
      //   isActive: false
      // }
    ]
  },
  {
    label: 'Quản lý',
    detail: [
      {
        title: 'Kho',
        url: '/warehouse',
        icon: 'warehouse',
        shortcut: ['v', 'v'],
        isActive: false
      },
      {
        title: 'Danh mục',
        url: '/category',
        icon: 'dashboard',
        shortcut: ['v', 'v'],
        isActive: false
      },
      {
        title: 'Loại sản phẩm',
        url: '/product-type',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false
      },
      {
        title: 'Sản phẩm',
        url: '/product',
        icon: 'shirt',
        shortcut: ['p', 'p'],
        isActive: false
      }
      // {
      //   title: 'Hàng tồn kho',
      //   url: '/manager/inventory',
      //   icon: 'blocks',
      //   shortcut: ['p', 'p'],
      //   isActive: false
      // }
    ]
  },
  {
    label: 'Công cụ',
    detail: [
      {
        title: 'Nhập/xuất vật tư',
        url: '/manager/suppliles',
        icon: 'import',
        shortcut: ['p', 'p'],
        isActive: false
      }
    ]
  }
];

export const navItemsManager: any = [
  {
    label: 'Quản lý',
    detail: []
  }
];
