'use client';

import type React from 'react';

import { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  useCreatePhieuNhapXuat,
  useGetAllProduct,
  useGetAllWarehouse
} from '@/queries/admin.query';
import { toast } from '@/components/ui/use-toast';

interface TransactionItem {
  productCode: string;
  quantity: string;
  productName?: string;
}

interface Transaction {
  transactionType: 'IMPORT' | 'EXPORT';
  sourceWarehouseCode?: string;
  destinationWarehouseCode?: string;
  items: TransactionItem[];
}

export default function Add() {
  const { data: dataProduct, isPending: pendingProduct } = useGetAllProduct();
  const products = dataProduct?.data || [];
  const { data: dataWarehouse, isPending: pendingWarehouse } =
    useGetAllWarehouse();
  const warehouses = dataWarehouse?.data || [];
  const { mutateAsync: createPhieuNhapXuat, isPending: isSubmitting } =
    useCreatePhieuNhapXuat();

  const [transaction, setTransaction] = useState<Transaction>({
    transactionType: 'EXPORT',
    sourceWarehouseCode: '',
    items: []
  });

  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedQuantity, setSelectedQuantity] = useState<string>('');
  const [quantityError, setQuantityError] = useState<string>('');

  const handleTransactionTypeChange = (value: 'IMPORT' | 'EXPORT') => {
    if (value === 'IMPORT') {
      setTransaction({
        ...transaction,
        transactionType: value,
        sourceWarehouseCode: undefined,
        destinationWarehouseCode: ''
      });
    } else {
      setTransaction({
        ...transaction,
        transactionType: value,
        destinationWarehouseCode: undefined,
        sourceWarehouseCode: ''
      });
    }
  };

  const handleWarehouseChange = (value: string) => {
    if (transaction.transactionType === 'IMPORT') {
      setTransaction({ ...transaction, destinationWarehouseCode: value });
    } else {
      setTransaction({ ...transaction, sourceWarehouseCode: value });
    }
  };

  const validateQuantity = (productCode: string, quantity: string): boolean => {
    const selectedProduct = products.find(
      (p) => p.product_code === productCode
    );
    if (!selectedProduct) return false;

    const numQuantity = Number.parseInt(quantity, 10);
    if (isNaN(numQuantity) || numQuantity <= 0) {
      setQuantityError('Số lượng phải là số dương');
      return false;
    }

    if (numQuantity > selectedProduct.quantity) {
      setQuantityError(`Số lượng tối đa có sẵn là ${selectedProduct.quantity}`);
      return false;
    }

    setQuantityError('');
    return true;
  };

  const addProduct = () => {
    if (!selectedProduct || !selectedQuantity) return;

    if (!validateQuantity(selectedProduct, selectedQuantity)) {
      return;
    }

    const existingItemIndex = transaction.items.findIndex(
      (item) => item.productCode === selectedProduct
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...transaction.items];
      const currentQuantity = Number.parseInt(
        updatedItems[existingItemIndex].quantity,
        10
      );
      const additionalQuantity = Number.parseInt(selectedQuantity, 10);
      const totalQuantity = currentQuantity + additionalQuantity;

      const selectedProductData = products.find(
        (p) => p.product_code === selectedProduct
      );
      if (totalQuantity > (selectedProductData?.quantity || 0)) {
        setQuantityError(
          `Tổng số lượng vượt quá số lượng có sẵn ${selectedProductData?.quantity}`
        );
        return;
      }

      updatedItems[existingItemIndex].quantity = totalQuantity.toString();

      setTransaction({
        ...transaction,
        items: updatedItems
      });
    } else {
      const productName =
        products.find((p) => p.product_code === selectedProduct)
          ?.product_name ||
        products.find((p) => p.product_code === selectedProduct)?.name;

      const newItem: TransactionItem = {
        productCode: selectedProduct,
        quantity: selectedQuantity,
        productName
      };

      setTransaction({
        ...transaction,
        items: [...transaction.items, newItem]
      });
    }

    setSelectedProduct('');
    setSelectedQuantity('');
    setQuantityError('');
  };

  const removeProduct = (index: number) => {
    const updatedItems = [...transaction.items];
    updatedItems.splice(index, 1);
    setTransaction({ ...transaction, items: updatedItems });
  };

  const generatePayload = () => {
    if (transaction.transactionType === 'EXPORT') {
      return {
        transactionType: transaction.transactionType,
        sourceWarehouseCode: transaction.sourceWarehouseCode,
        items: transaction.items.map(({ productCode, quantity }) => ({
          productCode,
          quantity
        }))
      };
    } else {
      return {
        transactionType: transaction.transactionType,
        destinationWarehouseCode: transaction.destinationWarehouseCode,
        items: transaction.items.map(({ productCode, quantity }) => ({
          productCode,
          quantity
        }))
      };
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = generatePayload();
      console.log('Submitting payload:', payload);

      await createPhieuNhapXuat(payload);

      toast({
        title: 'Giao dịch đã được gửi thành công',
        description: `Giao dịch ${transaction.transactionType === 'IMPORT' ? 'nhập kho' : 'xuất kho'} đã được tạo.`
      });

      setTransaction({
        transactionType: 'EXPORT',
        sourceWarehouseCode: '',
        items: []
      });
    } catch (error) {
      console.error('Error submitting transaction:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể gửi giao dịch. Vui lòng thử lại.',
        variant: 'destructive'
      });
    }
  };

  const getAvailableQuantity = (productCode: string): number => {
    const product = products.find((p) => p.product_code === productCode);
    return product?.quantity || 0;
  };

  if (pendingWarehouse || pendingProduct) {
    return (
      <div className="flex h-64 items-center justify-center">Đang tải...</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Giao Dịch Kho</CardTitle>
          <CardDescription>
            Tạo giao dịch nhập hoặc xuất mới giữa các kho
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Loại Giao Dịch</Label>
              <RadioGroup
                defaultValue={transaction.transactionType}
                onValueChange={(value) =>
                  handleTransactionTypeChange(value as 'IMPORT' | 'EXPORT')
                }
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="IMPORT" id="import" />
                  <Label htmlFor="import">Nhập Kho</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="EXPORT" id="export" />
                  <Label htmlFor="export">Xuất Kho</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Warehouse Selection */}
            <div className="space-y-2">
              <Label>
                {transaction.transactionType === 'IMPORT'
                  ? 'Kho Đích'
                  : 'Kho Nguồn'}
              </Label>
              <Select
                value={
                  transaction.transactionType === 'IMPORT'
                    ? transaction.destinationWarehouseCode
                    : transaction.sourceWarehouseCode
                }
                onValueChange={handleWarehouseChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn kho" />
                </SelectTrigger>
                <SelectContent>
                  {warehouses?.map((warehouse) => (
                    <SelectItem
                      key={warehouse.warehouse_code}
                      value={warehouse.warehouse_code}
                    >
                      {warehouse.warehouse_name} ({warehouse.warehouse_code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Product Selection */}
            <div className="space-y-4">
              <Label>Sản Phẩm</Label>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="product">Sản Phẩm</Label>
                  <Select
                    value={selectedProduct}
                    onValueChange={setSelectedProduct}
                  >
                    <SelectTrigger id="product">
                      <SelectValue placeholder="Chọn sản phẩm" />
                    </SelectTrigger>
                    <SelectContent>
                      {products?.map((product) => (
                        <SelectItem
                          key={product.product_code}
                          value={product.product_code}
                        >
                          {product.product_name || product.name} (
                          {product.product_code}) - (Có sẵn: {product.quantity})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Số Lượng</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={
                      selectedProduct
                        ? getAvailableQuantity(selectedProduct).toString()
                        : undefined
                    }
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(e.target.value)}
                    placeholder="Nhập số lượng"
                  />
                  {quantityError && (
                    <p className="mt-1 text-sm text-destructive">
                      {quantityError}
                    </p>
                  )}
                </div>

                <div className="flex items-end">
                  <Button
                    type="button"
                    onClick={addProduct}
                    disabled={!selectedProduct || !selectedQuantity}
                    className="w-full"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Thêm Sản Phẩm
                  </Button>
                </div>
              </div>
            </div>

            {/* Selected Products List */}
            {transaction.items.length > 0 && (
              <div className="space-y-2">
                <Label>Sản Phẩm Đã Chọn</Label>
                <div className="divide-y rounded-md border">
                  {transaction.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3"
                    >
                      <div>
                        <span className="font-medium">{item.productName}</span>
                        <span className="ml-2 text-sm text-muted-foreground">
                          ({item.productCode})
                        </span>
                        <span className="ml-4">SL: {item.quantity}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProduct(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setTransaction({
                  transactionType: 'EXPORT',
                  sourceWarehouseCode: '',
                  items: []
                });
                setSelectedProduct('');
                setSelectedQuantity('');
                setQuantityError('');
              }}
            >
              Đặt Lại
            </Button>
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                (transaction.transactionType === 'IMPORT' &&
                  !transaction.destinationWarehouseCode) ||
                (transaction.transactionType === 'EXPORT' &&
                  !transaction.sourceWarehouseCode) ||
                transaction.items.length === 0
              }
            >
              {isSubmitting ? 'Đang Gửi...' : 'Gửi Giao Dịch'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
