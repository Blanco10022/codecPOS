"use client"

import { useState } from "react"; // Import useState for managing search input
import { Button } from "@/components/Shared/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Shared/ui/table";
import { Avatar, AvatarFallback } from "@/components/Shared/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Shared/ui/card";

// Mock data
const customers = [
  { id: 1, name: "William Johnson", phone: "237674537760", orders: 5, spent: "4,056 XAF" },
  { id: 2, name: "Laura Smith", phone: "237674537771", orders: 12, spent: "4,056 XAF" },
  { id: 3, name: "David Brown", phone: "237674534573", orders: 6, spent: "26,000 XAF" },
  { id: 4, name: "Alice Taylor", phone: "237677734537", orders: 3, spent: "4,056 XAF" },
  { id: 5, name: "Robert Davis", phone: "South Olestad", orders: 15, spent: "26,000 XAF" },
  { id: 6, name: "Olivia Wilson", phone: "237674537773", orders: 12, spent: "4,056 XAF" },
  { id: 7, name: "William Anderson", phone: "237637760745", orders: 3, spent: "4,056 XAF" },
  { id: 8, name: "Daniel Martinez", phone: "237674537760", orders: 7, spent: "1,339 XAF" },
];

interface Customer {
  id: number;
  name: string;
  phone: string;
  orders: number;
  spent: string;
}

interface CustomerListProps {
  onCustomerClick: (customer: Customer) => void;
  onAddCustomer: () => void;
}

export function CustomerList({ onCustomerClick, onAddCustomer }: CustomerListProps) {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Customers</h1>
        <Button onClick={onAddCustomer} className="w-full md:w-auto">Add Customer</Button>
      </div>
      
      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Keep the Card component for desktop view only */}
      <div className="hidden md:block">
        <Card className="border-0">
          <CardHeader>
            <CardTitle>All Customers</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Spent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} onClick={() => onCustomerClick(customer)} className="cursor-pointer">
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar className="bg-blue-100 text-blue-600">
                          <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span>{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell>{customer.spent}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="md:hidden">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="mb-4 cursor-pointer w-full" onClick={() => onCustomerClick(customer)}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <Avatar className="bg-blue-100 text-blue-600">
                  <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h2 className="font-medium text-lg">{customer.name}</h2>
                  <p className="text-gray-500">{customer.phone}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span>{customer.orders} Orders</span>
                <span>{customer.spent}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
