'use client';

import { useState } from 'react';
import {
  ArrowUpDown,
  MoreHorizontal,
  Edit,
  Trash,
  AlertTriangle
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const inventoryData = [
  {
    id: 'INV001',
    name: 'Laptop Dell XPS 13',
    category: 'Electronics',
    quantity: 25,
    location: 'Warehouse A, Shelf 3',
    status: 'In Stock',
    lastUpdated: '2023-04-12'
  },
  {
    id: 'INV002',
    name: 'Office Chair - Ergonomic',
    category: 'Furniture',
    quantity: 15,
    location: 'Warehouse B, Section 2',
    status: 'In Stock',
    lastUpdated: '2023-04-10'
  },
  {
    id: 'INV003',
    name: 'Printer Cartridge - Black',
    category: 'Office Supplies',
    quantity: 5,
    location: 'Warehouse A, Shelf 1',
    status: 'Low Stock',
    lastUpdated: '2023-04-08'
  },
  {
    id: 'INV004',
    name: 'Aluminum Sheets 2mm',
    category: 'Raw Materials',
    quantity: 200,
    location: 'Warehouse C, Bay 5',
    status: 'In Stock',
    lastUpdated: '2023-04-05'
  },
  {
    id: 'INV005',
    name: 'Cardboard Boxes - Medium',
    category: 'Packaging',
    quantity: 3,
    location: 'Warehouse B, Section 4',
    status: 'Low Stock',
    lastUpdated: '2023-04-03'
  },
  {
    id: 'INV006',
    name: 'Wireless Mouse',
    category: 'Electronics',
    quantity: 0,
    location: 'Warehouse A, Shelf 2',
    status: 'Out of Stock',
    lastUpdated: '2023-04-01'
  },
  {
    id: 'INV007',
    name: 'Filing Cabinet',
    category: 'Furniture',
    quantity: 8,
    location: 'Warehouse B, Section 1',
    status: 'In Stock',
    lastUpdated: '2023-03-28'
  },
  {
    id: 'INV008',
    name: 'LED Monitors 24"',
    category: 'Electronics',
    quantity: 12,
    location: 'Warehouse A, Shelf 4',
    status: 'In Stock',
    lastUpdated: '2023-03-25'
  }
];

export function InventoryTable() {
  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
        return <Badge variant="default">{status}</Badge>;
      case 'Low Stock':
        return (
          <Badge variant="warning" className="bg-yellow-500">
            {status}
          </Badge>
        );
      case 'Out of Stock':
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Button
                variant="ghost"
                onClick={() => handleSort('id')}
                className="h-auto p-0 font-medium"
              >
                ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('name')}
                className="h-auto p-0 font-medium"
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('quantity')}
                className="h-auto p-0 font-medium"
              >
                Quantity
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
              <TableCell>{item.lastUpdated}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      <span>Mark as Low Stock</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
