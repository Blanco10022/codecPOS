"use client"

import { Button } from "@/components/Shared/ui/button"
import { Input } from "@/components/Shared/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Shared/ui/card"
import { ChevronLeft } from "lucide-react"

interface AddOrderProps {
  onBack: () => void;
}

export function AddOrder({ onBack }: AddOrderProps) {
  return (
    <>
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Add Order</h1>
        <div>
          <Button variant="outline" className="mr-2">Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Order Information</CardTitle>
        </CardHeader>
        <CardContent className="max-h-[400px] overflow-y-auto"> {/* Added scrollable area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Customer</label>
              <Input />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Order Date</label>
              <Input type="date" />
            </div>
            {/* Add more fields as needed */}
          </div>
        </CardContent>
      </Card>
    </>
  )
}