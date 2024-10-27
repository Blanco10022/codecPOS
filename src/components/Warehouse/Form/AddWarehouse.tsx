"use client"

import { useState } from "react"
import { Button } from "@/components/Shared/ui/button"
import { Input } from "@/components/Shared/ui/input"
import { Label } from "@/components/Shared/ui/label"
import { Textarea } from "@/components/Shared/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/Shared/ui/card"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface AddWarehouseProps {
  onBack: () => void;
}

const AddWarehouse: React.FC<AddWarehouseProps> = ({ onBack }) => {
  const router = useRouter()
  const [warehouseName, setWarehouseName] = useState("")
  const [location, setLocation] = useState("")
  const [capacity, setCapacity] = useState("")
  const [manager, setManager] = useState("")
  const [status, setStatus] = useState<"Active" | "Inactive">("Active")
  const [description, setDescription] = useState("")

  const handleAddWarehouse = () => {
    // Here you would typically send the data to your backend
    console.log({
      name: warehouseName,
      location,
      capacity,
      manager,
      status,
      description,
    })
    // Reset form or show success message
  }

  const handleBack = () => {
    onBack()
  }

  return (
    <div className="container mx-auto py-10">
      <Button onClick={handleBack} variant="outline" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <h1 className="text-3xl font-bold mb-6">Add Warehouse</h1>
      <Card>
        <CardHeader>
          <CardTitle>New Warehouse Entry</CardTitle>
          <CardDescription>Add a new warehouse to your system.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="warehouse-name">Warehouse Name</Label>
            <Input
              id="warehouse-name"
              value={warehouseName}
              onChange={(e) => setWarehouseName(e.target.value)}
              placeholder="Enter warehouse name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Enter capacity"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="manager">Manager</Label>
            <Input
              id="manager"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              placeholder="Enter manager's name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
              className="border rounded p-2 w-full"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddWarehouse} className="w-full">Add Warehouse</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AddWarehouse
