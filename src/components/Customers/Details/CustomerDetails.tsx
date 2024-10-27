"use client"

import { Button } from "@/components/Shared/ui/button"
import { Input } from "@/components/Shared/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Shared/ui/table"
import { Avatar, AvatarFallback } from "@/components/Shared/ui/avatar"
import { Badge } from "@/components/Shared/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Shared/ui/card"
import { ChevronLeft } from "lucide-react"

// Mock data for customer orders
const customerOrders = [
    { id: "#23534D", date: "May 25, 3:12 PM", status: "Pending", price: "1,342 XAF" },
    { id: "#12512B", date: "May 10, 2:00 PM", status: "Completed", price: "1,342 XAF" },
    { id: "#23534D", date: "April 18, 8:00 AM", status: "Completed", price: "1,342 XAF" },
    { id: "#76543E", date: "April 12, 8:00 AM", status: "Processing", price: "1,342 XAF" },
    { id: "#51323C", date: "April 10, 4:12 PM", status: "Cancelled", price: "1,342 XAF" },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'processing':
      return 'bg-blue-100 text-blue-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  orders: number;
  spent: string;
}

interface CustomerDetailsProps {
  customer: Customer;
  onBack: () => void;
}

export function CustomerDetails({ customer, onBack }: CustomerDetailsProps) {
  return (
    <>
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Customer Information</h1>
        <div className="flex flex-col md:flex-row w-full md:w-auto">
          <div className="flex flex-col md:flex-row w-full">
            <Button variant="outline" className="mr-2 mb-2 md:mb-0 w-full md:w-auto">Cancel</Button>
            <Button className="w-full md:w-auto">Save</Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="h-16 w-16 md:h-20 md:w-20 text-2xl">
                <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl md:text-2xl font-semibold">{customer.name}</h2>
                <p className="text-gray-500">Douala</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">First Name</label>
                <Input defaultValue={customer.name.split(' ')[0]} className="w-full" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Last Name</label>
                <Input defaultValue={customer.name.split(' ')[1]} className="w-full" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone Number</label>
                <Input defaultValue={customer.phone} className="w-full" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Address</label>
                <Input defaultValue="Country, Region, City" className="w-full" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                <Input type="date" className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>OrderID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Order Status</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge className={`font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
