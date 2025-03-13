'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export function InventoryFilters() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-b p-4 sm:flex-row">
      <div className="relative w-full max-w-sm flex-1 sm:w-auto">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search inventory..."
          className="w-full pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row sm:gap-4">
        <div className="w-full sm:w-[180px]">
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="office">Office Supplies</SelectItem>
              <SelectItem value="raw">Raw Materials</SelectItem>
              <SelectItem value="packaging">Packaging</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-[180px]">
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="low-stock">Low Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Refine your inventory view with additional filters.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Warehouse Location</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="warehouse-a" />
                    <label
                      htmlFor="warehouse-a"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Warehouse A
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="warehouse-b" />
                    <label
                      htmlFor="warehouse-b"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Warehouse B
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="warehouse-c" />
                    <label
                      htmlFor="warehouse-c"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Warehouse C
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Last Updated</Label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This week</SelectItem>
                    <SelectItem value="month">This month</SelectItem>
                    <SelectItem value="quarter">This quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Quantity Range</Label>
                <div className="flex items-center space-x-2">
                  <Input type="number" placeholder="Min" className="w-20" />
                  <span>to</span>
                  <Input type="number" placeholder="Max" className="w-20" />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Reset</Button>
              <Button>Apply Filters</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
