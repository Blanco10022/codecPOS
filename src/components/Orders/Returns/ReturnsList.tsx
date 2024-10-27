/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/Shared/ui/button"
import { Input } from "@/components/Shared/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Shared/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Shared/ui/dialog"
import { Label } from "@/components/Shared/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Shared/ui/select"
import { Checkbox } from "@/components/Shared/ui/checkbox"
import { ArrowLeft, ArrowRight, Search, Plus, Edit, Trash2 } from "lucide-react"

// Mock data for returns
type Return = {
  id: string;
  date: string;
  status: string;
  customerName: string;
  reason: string;
};

const initialReturns = [
  { id: "#12512B", date: "May 5, 4:20 PM", status: "Completed", customerName: "Aurelie Mballa", reason: "Wrong Item" },
  { id: "#12523C", date: "May 5, 4:15 PM", status: "Pending", customerName: "Jean-Claude Ndombe", reason: "Wrong Item" },
  // ... other returns ...
]

const Returns = () => {
  const [returns, setReturns] = useState(initialReturns)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedReturns, setSelectedReturns] = useState<string[]>([])
  const [isAddReturnOpen, setIsAddReturnOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedReturn, setSelectedReturn] = useState<Return | null>(null)

  const itemsPerPage = 7
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const filteredReturns = returns.filter(
    (returnItem) =>
      returnItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.reason.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentReturns = filteredReturns.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(filteredReturns.length / itemsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCheckboxChange = (returnId: string) => {
    setSelectedReturns((prev) =>
      prev.includes(returnId)
        ? prev.filter((id) => id !== returnId)
        : [...prev, returnId]
    )
  }

  const handleAddReturn = () => {
    // Add return logic...
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const openDetailModal = (returnItem: Return) => {
    setSelectedReturn(returnItem)
    setIsDetailOpen(true)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Returns</h1>
        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
          <Dialog open={isAddReturnOpen} onOpenChange={setIsAddReturnOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Return
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Return</DialogTitle>
              </DialogHeader>
              {/* Add return form */}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="hidden md:block bg-white p-6 rounded-lg shadow"> {/* Keep the card for desktop */}
        <h2 className="text-xl font-semibold mb-4">Those are your business Returns</h2>
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <div className="overflow-x-auto"> {/* Added scrollable area for the table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Return ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentReturns.map((returnItem) => (
                <TableRow key={returnItem.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedReturns.includes(returnItem.id)}
                      onCheckedChange={() => handleCheckboxChange(returnItem.id)}
                    />
                  </TableCell>
                  <TableCell onClick={() => openDetailModal(returnItem)} className="cursor-pointer">{returnItem.id}</TableCell>
                  <TableCell>{returnItem.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(returnItem.status)}`}>
                      {returnItem.status}
                    </span>
                  </TableCell>
                  <TableCell>{returnItem.customerName}</TableCell>
                  <TableCell>{returnItem.reason}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* Mobile View */}
      <div className="md:hidden">
        {currentReturns.map((returnItem) => (
          <div key={returnItem.id} className="bg-white rounded-lg shadow mb-4 p-4 cursor-pointer w-full" onClick={() => openDetailModal(returnItem)}>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h2 className="font-medium">{returnItem.id}</h2>
                <p className="text-sm text-gray-500">{returnItem.date}</p>
                <span className={`inline-flex items-center px-1 py-1 rounded-full text-xs font-semibold ${getStatusColor(returnItem.status)}`}>
                  {returnItem.status}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-medium">{returnItem.customerName}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Return Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Return Details</DialogTitle>
          </DialogHeader>
          {selectedReturn && (
            <div>
              <p><strong>Return ID:</strong> {selectedReturn.id}</p>
              <p><strong>Date:</strong> {selectedReturn.date}</p>
              <p><strong>Status:</strong> <span className={getStatusColor(selectedReturn.status)}>{selectedReturn.status}</span></p>
              <p><strong>Customer Name:</strong> {selectedReturn.customerName}</p>
              <p><strong>Reason:</strong> {selectedReturn.reason}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Returns;
