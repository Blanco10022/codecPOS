/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Shared/ui/select"
import { Checkbox } from "@/components/Shared/ui/checkbox"
import { Search, Edit, Trash2 } from "lucide-react"
import { Employee } from "@/types/employee"

// Mock data
const employees: Employee[] = [
  {
    id: "1",
    firstName: "Aurelie",
    lastName: "Mballa",
    phone: "237674537760",
    role: "Admin",
    email: "aurelie@example.com",
    department: "HR",
    hireDate: new Date('2020-01-01'),
    status: 'active'
  },
  {
    id: "2",
    firstName: "Jean-Claude",
    lastName: "Ndombe",
    phone: "237674537771",
    role: "Seller",
    email: "jean.claude@example.com",
    department: "Sales",
    hireDate: new Date('2021-02-01'),
    status: 'active'
  },
  {
    id: "3",
    firstName: "Marie",
    lastName: "Kouassi",
    phone: "237674537772",
    role: "Manager",
    email: "marie@example.com",
    department: "Management",
    hireDate: new Date('2019-03-01'),
    status: 'active'
  },
]
const roles = ["Admin", "Seller", "Manager"]

interface EmployeeListProps {
  onEmployeeClick: (employee: Employee) => void;
  onAddEmployee: () => void;
  onEditEmployee: (employee: Employee) => void;
}

export function EmployeeList({ onEmployeeClick, onAddEmployee, onEditEmployee }: EmployeeListProps) {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])

  const handleEmployeeClick = (employee: Employee) => {
    onEmployeeClick(employee)
  }

  const handleEditClick = (event: React.MouseEvent, employee: Employee) => {
    event.stopPropagation()
    onEditEmployee(employee)
  }

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-[#E8FFF3] text-[#03A734]'
      case 'seller':
        return 'bg-[#EEF2FF] text-[#3F5BF6]'
      case 'manager':
        return 'bg-[#FFF4ED] text-[#FF8E29]'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Employees</h1>
        <div className="space-x-2">
          <Button variant="outline" className="text-[#2D70FD] border-[#2D70FD]">Export</Button>
          <Button onClick={onAddEmployee} className="bg-[#2D70FD]">Add Employee</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Employees</CardTitle>
        </CardHeader>
        <CardContent className="max-h-[400px] overflow-y-auto"> {/* Added scrollable area */}
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <Select>
              <SelectTrigger className="w-full md:w-[180px] mb-2 md:mb-0">
                <SelectValue placeholder="Filter Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role} value={role.toLowerCase()}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input placeholder="Search..." className="pl-8" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="flex justify-end space-x-2 mb-2">
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id} onClick={() => handleEmployeeClick(employee)} className="cursor-pointer">
                    <TableCell>
                      <Checkbox onClick={(e) => e.stopPropagation()} />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar className="bg-[#EEF2FF] text-[#3F5BF6]">
                          <AvatarFallback>{employee.firstName[0]}{employee.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <span>{employee.firstName} {employee.lastName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{employee.phone}</TableCell>
                    <TableCell>
                      <Badge className={`font-medium ${getRoleColor(employee.role)}`}>
                        {employee.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={(e) => handleEditClick(e, employee)}>
                        <Edit className="h-4 w-4 text-gray-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
