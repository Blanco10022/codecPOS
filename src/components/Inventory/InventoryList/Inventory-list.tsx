/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/Shared/ui/button"
import { Input } from "@/components/Shared/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Shared/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Shared/ui/table"
import { Checkbox } from "@/components/Shared/ui/checkbox"
import { PenIcon, TrashIcon, FileDown, Plus, Search, ArrowLeft } from 'lucide-react'
import { DeleteConfirmationModal } from '@/components/Shared/ui/Modal/delete-confrimation-modal'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Shared/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/Shared/ui/dialog"
import AddInventory from '../add-inventory/add-inventory' 
import InventoryDetails  from '../details/InventoryDetails' 
type InventoryItem = {
  id: string
  name: string
  sku: string
  category: string
  quantity: number
  unitPrice: number
  sellingPrice: number
  totalValue: number
  supplier: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
  lastUpdated: Date
  description: string
}

const inventoryData: InventoryItem[] = [
  { id: '1', name: 'Product A', sku: 'SKU001', category: 'Electronics', quantity: 100, unitPrice: 50, sellingPrice: 75, totalValue: 5000, supplier: 'Supplier A', status: 'In Stock', lastUpdated: new Date(), description: 'High-quality electronic product' },
  { id: '2', name: 'Product B', sku: 'SKU002', category: 'Clothing', quantity: 50, unitPrice: 30, sellingPrice: 45, totalValue: 1500, supplier: 'Supplier B', status: 'Low Stock', lastUpdated: new Date(), description: 'Comfortable clothing item' },
  { id: '3', name: 'Product C', sku: 'SKU003', category: 'Home & Garden', quantity: 0, unitPrice: 40, sellingPrice: 60, totalValue: 0, supplier: 'Supplier C', status: 'Out of Stock', lastUpdated: new Date(), description: 'Useful home and garden product' },
]

interface InventoryListProps {
  warehouseId: string;
  onBack: () => void;
}

export function InventoryList({ warehouseId, onBack }: InventoryListProps) {
  const [inventory, setInventory] = useState<InventoryItem[]>(inventoryData)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [showAddInventory, setShowAddInventory] = useState(false)

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleDeleteClick = () => {
    if (selectedItems.length > 0) {
      setItemToDelete(selectedItems[0])
      setIsDeleteModalOpen(true)
    }
  }

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      setInventory(inventory.filter(item => item.id !== itemToDelete))
      setSelectedItems(selectedItems.filter(id => id !== itemToDelete))
      setIsDeleteModalOpen(false)
      setItemToDelete(null)
    }
  }

  const openOverlay = (item: InventoryItem) => {
    setSelectedItem(item);
  }

  const closeOverlay = () => {
    setSelectedItem(null);
  }

  const handleAddItemClick = () => {
    setShowAddInventory(true)
  }

  const handleBackToList = () => {
    setShowAddInventory(false)
  }

  if (showAddInventory) {
    return <AddInventory onBack={handleBackToList} />
  }

  if (selectedItem) {
    return <InventoryDetails 
      item={{
        ...selectedItem,
        description: selectedItem.description || 'No description available',
        lastUpdated: selectedItem.lastUpdated 
          ? selectedItem.lastUpdated.toISOString().split('T')[0] 
          : new Date().toISOString().split('T')[0] 
      }} 
      onClose={closeOverlay} 
    />
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Warehouses
        </Button>
        <h1 className="text-2xl font-bold">Inventory List - Warehouse {warehouseId}</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="w-48">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="low-stock">Low Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative w-64">
          <Input type="text" placeholder="Search..." className="pl-10" />
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <PenIcon className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleDeleteClick}
            disabled={selectedItems.length === 0}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
          <Button onClick={handleAddItemClick}>
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Selling Price</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => toggleItemSelection(item.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <span 
                      className="cursor-pointer text-blue-500 hover:underline"
                      onClick={() => openOverlay(item)}
                    >
                      {item.name}
                    </span>
                  </TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unitPrice} XAF</TableCell>
                  <TableCell>{item.sellingPrice} XAF</TableCell>
                  <TableCell>{item.totalValue} XAF</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${item.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                        item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {item.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {inventory.map((item) => (
          <Card key={item.id} className="mb-4 cursor-pointer w-full" onClick={() => openOverlay(item)}>
            <CardContent className="flex flex-col p-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">SKU: {item.sku}</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold
                  ${item.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                    item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}>
                  {item.status}
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-500">Total Value: {item.totalValue} XAF</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-500">Selling Price: {item.sellingPrice} XAF</p>
                <p className="text-sm text-gray-500">Supplier: {item.supplier}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
