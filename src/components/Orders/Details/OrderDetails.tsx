'use client'

import { Button } from "@/components/Shared/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Shared/ui/table"

export function OrderDetails({ orderId }: { orderId: string }) {
  const order = {
    id: orderId,
    customer: "John CYRIL",
    date: "Sept 18, 2024",
    items: [
      { name: "Product A", quantity: 2, price: "2,000 XAF", total: "4,000 XAF" },
      { name: "Product B", quantity: 1, price: "6,000 XAF", total: "6,000 XAF" },
    ],
    subtotal: "10,000 XAF",
    discount: "0 XAF",
    tax: "0%",
    total: "10,000 XAF",
    amountPaid: "10,000 XAF",
    changeGiven: "3,000 XAF",
    netAmountPaid: "7,000 XAF",
    salesperson: "Ngwa Mildred",
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Invoice #{order.id}</h1>
          <p className="text-gray-600">Customer: {order.customer}</p>
          <p className="text-gray-600">Order Date: {order.date}</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-semibold mb-2">SalesBox</h2>
          <p className="text-gray-600">Office 149, 450 South Brand Brooklyn</p>
          <p className="text-gray-600">San Diego County, CA 91905, USA</p>
          <p className="text-gray-600">+1 (123) 456 7891, +44 (876) 543 2198</p>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[400px]"> {/* Added scrollable area */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price Per Item</TableHead>
              <TableHead className="text-right">Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell className="text-right">{item.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex justify-between">
        <div>
          <p className="font-semibold">Salesperson: {order.salesperson}</p>
          <p className="mt-4 text-gray-600">Amount Paid: {order.amountPaid}</p>
          <p className="text-gray-600">Change Given: {order.changeGiven}</p>
          <p className="text-gray-600">Net Amount Paid: {order.netAmountPaid}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Subtotal: {order.subtotal}</p>
          <p className="text-gray-600">Discount: {order.discount}</p>
          <p className="text-gray-600">Tax: {order.tax}</p>
          <p className="font-semibold text-lg mt-2">Total: {order.total}</p>
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <Button variant="outline">Print</Button>
        <Button>Download</Button>
      </div>
    </div>
  )
}