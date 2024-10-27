"use client"

import { useState } from "react"
import { Button } from "@/components/Shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Shared/ui/card"
import { Input } from "@/components/Shared/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Shared/ui/select"
import { PlusCircle, Edit2 } from "lucide-react"
import { ShopForm } from "../Setup/shop-form"

// Interface for Shop
interface Shop {
  id?: number;
  name: string;
  mobileNumber: string;
  manager: string;
  address: string;
  city: string;
  country: string;
}

// Mock data for existing shops
const initialShops: Shop[] = [
  { id: 1, name: "Shop 1", mobileNumber: "123456789", manager: "John Doe", address: "123 Main St", city: "City 1", country: "Cameroon" },
  { id: 2, name: "Shop 2", mobileNumber: "987654321", manager: "Jane Smith", address: "456 Elm St", city: "City 2", country: "Nigeria" },
  { id: 3, name: "Shop 3", mobileNumber: "456789123", manager: "Bob Johnson", address: "789 Oak St", city: "City 3", country: "Ghana" },
]

export function Shops() {
  const [shops, setShops] = useState<Shop[]>(initialShops)
  const [isAddingShop, setIsAddingShop] = useState<boolean>(false)
  const [editingShop, setEditingShop] = useState<Shop | null>(null)

  const handleAddShop = (newShop: Shop) => {
    setShops([...shops, { ...newShop, id: shops.length + 1 }])
    setIsAddingShop(false)
  }

  const handleEditShop = (updatedShop: Shop) => {
    setShops(shops.map(shop => shop.id === updatedShop.id ? updatedShop : shop))
    setEditingShop(null)
  }

  const handleCancelEdit = () => {
    setEditingShop(null)
    setIsAddingShop(false)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shops</h1>
        <Button onClick={() => setIsAddingShop(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Shop
        </Button>
      </div>

      {isAddingShop && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Shop</CardTitle>
          </CardHeader>
          <CardContent>
            <ShopForm onSave={handleAddShop} onCancel={handleCancelEdit} />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map(shop => (
          <Card key={shop.id} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setEditingShop(shop)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <CardHeader>
              <CardTitle className="text-xl">{shop.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {editingShop && editingShop.id === shop.id ? (
                <ShopForm shop={shop} onSave={handleEditShop} onCancel={handleCancelEdit} />
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <PlusCircle className="h-6 w-6 text-gray-500" />
                    </div>
                  </div>
                  <Input value={shop.name} readOnly />
                  <div className="grid grid-cols-2 gap-2">
                    <Input value={shop.mobileNumber} readOnly />
                    <Input value={shop.manager} readOnly />
                  </div>
                  <Input value={shop.address} readOnly />
                  <div className="grid grid-cols-2 gap-2">
                    <Input value={shop.city} readOnly />
                    <Select disabled>
                      <SelectTrigger>
                        <SelectValue>{shop.country}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={shop.country}>{shop.country}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}