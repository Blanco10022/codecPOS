'use client'

import { useState } from "react"
import { Button } from "@/components/Shared/ui/button"
import { Input } from "@/components/Shared/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Shared/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Shared/ui/card"
import { ChevronLeft } from "lucide-react"
import { roles, shops } from "../Lib/constants"
import { Employee } from "@/types/employee"; 

interface AddEditEmployeeProps {
  employee?: Employee;
  onBack: () => void;
  onSave: (employee: Employee) => void;
  isEdit: boolean;
}

export function AddEditEmployee({ employee, onBack, onSave, isEdit }: AddEditEmployeeProps) {
  const [formData, setFormData] = useState<Employee>({
    id: employee?.id || '',
    firstName: employee?.firstName || '',
    lastName: employee?.lastName || '',
    phone: employee?.phone || '',
    email: employee?.email || '',
    role: employee?.role || '',
    department: employee?.department || '',
    shop: employee?.shop || '',
    country: employee?.country || '',
    address: employee?.address || '',
    dateOfBirth: employee?.dateOfBirth || new Date(), // Ensure it's a Date
    password: employee?.password || '',
    hireDate: employee?.hireDate || new Date(),
    status: employee?.status || 'active',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'dateOfBirth' ? new Date(value) : value, // Convert string to Date
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <>
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {isEdit ? "Edit Employee" : "Add Employee"}
        </h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="mr-2" onClick={onBack}>Cancel</Button>
          <Button className="bg-[#2D70FD]" onClick={handleSubmit}>Save</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Employee Information</CardTitle>
          <p className="text-sm text-gray-500">Most important information about the employee</p>
        </CardHeader>
        <CardContent className="max-h-[400px] overflow-y-auto"> {/* Added scrollable area */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">First Name</label>
                <Input name="firstName" value={formData.firstName} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Last Name</label>
                <Input name="lastName" value={formData.lastName} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Country</label>
                <Input name="country" value={formData.country} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Address</label>
                <Input name="address" value={formData.address} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone Number</label>
                <Input name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                <Input
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth ? formData.dateOfBirth.toISOString().split('T')[0] : ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <Input name="email" type="email" value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Password</label>
                <Input name="password" type="password" value={formData.password} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Select Role</label>
                <Select value={formData.role.toLowerCase()} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role.toLowerCase()}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Select Shop</label>
                <Select value={formData.shop} onValueChange={(value) => setFormData(prev => ({ ...prev, shop: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shop" />
                  </SelectTrigger>
                  <SelectContent>
                    {shops.map((shop) => (
                      <SelectItem key={shop} value={shop.toLowerCase()}>{shop}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
