"use client"

import { Button } from "@/components/Shared/ui/button"
import { Input } from "@/components/Shared/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Shared/ui/card"
import { ChevronLeft } from "lucide-react"

interface AddCustomerProps {
  onBack: () => void;
}

export function AddCustomer({ onBack }: AddCustomerProps) {
  return (
    <>
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Add Customer</h1>
        <div className="flex flex-col md:flex-row w-full md:w-auto">
          <div className="flex flex-col md:flex-row w-full">
            <Button variant="outline" className="mr-2 mb-2 md:mb-0 w-full md:w-auto">Cancel</Button>
            <Button className="w-full md:w-auto">Save</Button>
          </div>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
          <p className="text-sm text-gray-500">Most important information about the customer</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">First Name</label>
              <Input className="w-full" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Country</label>
              <Input className="w-full" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Last Name</label>
              <Input className="w-full" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Address</label>
              <Input className="w-full" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone Number</label>
              <Input className="w-full" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Date of Birth</label>
              <Input type="date" className="w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
