'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { useDeleteProduct, useUpdateProduct } from '@/queries/admin.query';
import {
  MoreHorizontal,
  Edit,
  Trash2,
  PackageSearch,
  Users
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import __helpers from '@/helpers';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  useGetProductInWarehouse,
  useGetUserInWarehouse
} from '@/queries/admin.query';

export const CellAction: React.FC<any> = ({ data }) => {
  const { mutateAsync: deleteProduct } = useDeleteProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(data.quantity || 0);

  // State cho dialog danh sách sản phẩm và người quản lý
  const [isProductListOpen, setIsProductListOpen] = useState(false);
  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const [productData, setProductData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  // Sử dụng mutateAsync để gọi API
  const { mutateAsync: getProductInWareHouse } = useGetProductInWarehouse();
  const { mutateAsync: getUserInWareHouse } = useGetUserInWarehouse();

  // Mở dialog khi productData được cập nhật thành công
  useEffect(() => {
    if (productData) {
      setIsProductListOpen(true);
    }
  }, [productData]);

  // Mở dialog khi userData được cập nhật thành công
  useEffect(() => {
    if (userData) {
      setIsUserListOpen(true);
    }
  }, [userData]);

  const handleDelete = async () => {
    try {
      await deleteProduct(data.product_code);
      toast({
        title: 'Thành công',
        description: 'Xóa sản phẩm thành công',
        variant: 'success'
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể xóa sản phẩm',
        variant: 'destructive'
      });
    }
  };

  const handleUpdateQuantity = async () => {
    try {
      await updateProduct({
        product_id: data.product_code,
        quantity: Number(quantity)
      });
      toast({
        title: 'Thành công',
        description: 'Cập nhật số lượng sản phẩm thành công',
        variant: 'success'
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể cập nhật số lượng sản phẩm',
        variant: 'destructive'
      });
    }
  };

  const handleShowProductList = async () => {
    try {
      setIsLoadingProducts(true);
      // Gọi API để lấy danh sách sản phẩm theo warehouse_code
      const result = await getProductInWareHouse(data.warehouse_code);
      console.log('Product Data:', result.data);
      setProductData(result.data);
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể tải danh sách sản phẩm',
        variant: 'destructive'
      });
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleShowUserList = async () => {
    try {
      setIsLoadingUsers(true);
      // Gọi API để lấy danh sách người quản lý theo warehouse_code
      const result = await getUserInWareHouse(data.warehouse_code);
      console.log('User Data:', result.data);
      setUserData(result.data);
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể tải danh sách người quản lý',
        variant: 'destructive'
      });
    } finally {
      setIsLoadingUsers(false);
    }
  };

  return (
    <>
      {__helpers.isAdmin() && (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Mở menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-primary-foreground">
            <DropdownMenuLabel>Lựa chọn</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setIsOpen(true)}>
              <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleShowProductList}>
              <PackageSearch className="mr-2 h-4 w-4" /> Danh sách sản phẩm
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleShowUserList}>
              <Users className="mr-2 h-4 w-4" /> Danh sách người quản lý
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Dialog cập nhật số lượng sản phẩm */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cập nhật số lượng sản phẩm</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="product-name" className="font-medium">
                Tên sản phẩm
              </Label>
              <div className="text-sm text-muted-foreground">
                {data.product_name}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity" className="font-medium">
                Số lượng
              </Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.valueAsNumber)}
                min={0}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleUpdateQuantity}>Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog danh sách sản phẩm */}
      <Dialog open={isProductListOpen} onOpenChange={setIsProductListOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Danh sách sản phẩm trong kho</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {isLoadingProducts ? (
              <div className="flex justify-center py-4">Đang tải...</div>
            ) : productData ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Thông tin kho</h3>
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">Mã kho:</span>{' '}
                      {productData.warehouse.warehouse_code}
                    </p>
                    <p>
                      <span className="font-medium">Tên kho:</span>{' '}
                      {productData.warehouse.warehouse_name}
                    </p>
                    <p>
                      <span className="font-medium">Địa chỉ:</span>{' '}
                      {productData.warehouse.address}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">
                    Sản phẩm ({productData.total_products})
                  </h3>
                  {productData.products && productData.products.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mã SP</TableHead>
                          <TableHead>Tên sản phẩm</TableHead>
                          <TableHead>Kích cỡ</TableHead>
                          <TableHead>Màu sắc</TableHead>
                          <TableHead>Số lượng</TableHead>
                          <TableHead>Trạng thái</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {productData.products.map((product: any) => (
                          <TableRow key={product.product_code}>
                            <TableCell>{product.product_code}</TableCell>
                            <TableCell>{product.product_name}</TableCell>
                            <TableCell>{product.size}</TableCell>
                            <TableCell>{product.color}</TableCell>
                            <TableCell>
                              {product.quantity_in_warehouse}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  product.status === 'instock'
                                    ? 'default'
                                    : 'secondary'
                                }
                              >
                                {product.status === 'instock'
                                  ? 'Còn hàng'
                                  : product.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="py-4 text-center text-muted-foreground">
                      Không có sản phẩm nào
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-4 text-center text-muted-foreground">
                Không có dữ liệu
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsProductListOpen(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog danh sách người quản lý */}
      <Dialog open={isUserListOpen} onOpenChange={setIsUserListOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Danh sách người quản lý kho</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {isLoadingUsers ? (
              <div className="flex justify-center py-4">Đang tải...</div>
            ) : userData ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Thông tin kho</h3>
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">Mã kho:</span>{' '}
                      {userData.warehouse_code}
                    </p>
                    <p>
                      <span className="font-medium">Tên kho:</span>{' '}
                      {userData.warehouse_name}
                    </p>
                    <p>
                      <span className="font-medium">Địa chỉ:</span>{' '}
                      {userData.address}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Quản lý</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {userData.ASSIGNED && userData.ASSIGNED.manager ? (
                        <div className="space-y-1">
                          <p>
                            <span className="font-medium">Mã người dùng:</span>{' '}
                            {userData.ASSIGNED.manager.user_code}
                          </p>
                          <p>
                            <span className="font-medium">Họ tên:</span>{' '}
                            {userData.ASSIGNED.manager.full_name}
                          </p>
                          <p>
                            <span className="font-medium">Email:</span>{' '}
                            {userData.ASSIGNED.manager.email}
                          </p>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Chưa có quản lý</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Nhân viên</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {(() => {
                        // Kiểm tra linh hoạt: nếu dữ liệu nhân viên nằm trong ASSIGNED.staffs hoặc trực tiếp trong staffs
                        const staffs =
                          (userData.ASSIGNED && userData.ASSIGNED.staffs) ||
                          userData.staffs ||
                          [];
                        return staffs.length > 0 ? (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Mã NV</TableHead>
                                <TableHead>Họ tên</TableHead>
                                <TableHead>Email</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {staffs.map((staff: any) => (
                                <TableRow key={staff.user_id}>
                                  <TableCell>{staff.user_code}</TableCell>
                                  <TableCell>{staff.full_name}</TableCell>
                                  <TableCell>{staff.email}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <p className="text-muted-foreground">
                            Chưa có nhân viên nào
                          </p>
                        );
                      })()}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center text-muted-foreground">
                Không có dữ liệu
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsUserListOpen(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
