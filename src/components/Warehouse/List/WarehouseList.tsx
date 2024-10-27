/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
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
import { PenIcon, TrashIcon, FileDown, Plus, Search } from 'lucide-react'
import { DeleteConfirmationModal } from '@/components/Shared/ui/Modal/delete-confrimation-modal'
import { Card, CardContent } from "@/components/Shared/ui/card"
import AddWarehouse from '../Form/AddWarehouse'
import { InventoryList } from '@/components/Inventory/InventoryList/Inventory-list'

type WarehouseItem = {
  id: string
  name: string
  location: string
  capacity: number
  manager: string
  status: 'Active' | 'Inactive'
}

const warehouseData: WarehouseItem[] = [
  { id: '1', name: 'Warehouse A', location: 'New York', capacity: 1000, manager: 'John Doe', status: 'Active' },
  { id: '2', name: 'Warehouse B', location: 'Los Angeles', capacity: 800, manager: 'Jane Smith', status: 'Inactive' },
  { id: '3', name: 'Warehouse C', location: 'Chicago', capacity: 1200, manager: 'Mike Johnson', status: 'Active' },
]

export function WarehouseList() {
  const [warehouses, setWarehouses] = useState<WarehouseItem[]>(warehouseData)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [showAddWarehouse, setShowAddWarehouse] = useState(false)
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string | null>(null)

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
      setWarehouses(warehouses.filter(item => item.id !== itemToDelete))
      setSelectedItems(selectedItems.filter(id => id !== itemToDelete))
      setIsDeleteModalOpen(false)
      setItemToDelete(null)
    }
  }

  const handleAddItemClick = () => {
    setShowAddWarehouse(true)
  }

  const handleBackToList = () => {
    setShowAddWarehouse(false)
  }

  const handleWarehouseClick = (warehouseId: string) => {
    setSelectedWarehouseId(warehouseId)
  }

  if (showAddWarehouse) {
    return <AddWarehouse onBack={handleBackToList} />
  }

  if (selectedWarehouseId) {
    return <InventoryList warehouseId={selectedWarehouseId} onBack={() => setSelectedWarehouseId(null)} />
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Warehouse List</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleAddItemClick}>
            <Plus className="mr-2 h-4 w-4" />
            Add Warehouse
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="w-48">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
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
        </div>
      </div>

      <div className="hidden md:block">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {warehouses.map((item) => (
                <TableRow key={item.id} className="cursor-pointer hover:bg-gray-100" onClick={() => handleWarehouseClick(item.id)}>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => toggleItemSelection(item.id)}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.capacity}</TableCell>
                  <TableCell>{item.manager}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
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
        {warehouses.map((item) => (
          <Card key={item.id} className="mb-4 cursor-pointer w-full" onClick={() => handleWarehouseClick(item.id)}>
            <CardContent className="flex flex-col p-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{item.name}</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold
                  ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {item.status}
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-500">Location: {item.location}</p>
                <p className="text-sm text-gray-500">Capacity: {item.capacity}</p>
              </div>
              <p className="text-sm text-gray-500 mt-1">Manager: {item.manager}</p>
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
