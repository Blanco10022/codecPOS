"use client"

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/Shared/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const maxVisiblePages = 6
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) return pageNumbers

    const halfVisible = Math.floor(maxVisiblePages / 2)
    const start = Math.max(currentPage - halfVisible, 1) // Change 'let' to 'const'
    const end = Math.min(start + maxVisiblePages - 1, totalPages) // Change 'let' to 'const'

    if (end - start + 1 < maxVisiblePages) {
      const newStart = Math.max(end - maxVisiblePages + 1, 1) // Change 'let' to 'const'
      return pageNumbers.slice(newStart - 1, end) // Use 'newStart' instead of 'start'
    }

    return pageNumbers.slice(start - 1, end)
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-md"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {visiblePages[0] > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(1)}
            className="w-9 h-9 rounded-md"
          >
            1
          </Button>
          {visiblePages[0] > 2 && <span className="px-2">...</span>}
        </>
      )}
      {visiblePages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'default' : 'outline'}
          size="icon"
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 rounded-md ${
            currentPage === page
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          {page}
        </Button>
      ))}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && <span className="px-2">...</span>}
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(totalPages)}
            className="w-9 h-9 rounded-md"
          >
            {totalPages}
          </Button>
        </>
      )}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-9 h-9 rounded-md"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}