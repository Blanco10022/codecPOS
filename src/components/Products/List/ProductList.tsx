'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/Shared/ui/button"
import { Input } from "@/components/Shared/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Shared/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Shared/ui/table"
import { Checkbox } from "@/components/Shared/ui/checkbox"
import { ListFilter, Pencil, Trash2 } from "lucide-react"
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/Shared/ui/dialog"
import { Card, CardContent } from "@/components/Shared/ui/card"
import { useAuthLayout } from '@/components/Shared/Layout/AuthLayout'
import { getProductsByShop } from '@/services/api/endpoints'

interface Product {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  };
  inventory: number;
  price: string;
  featured_image: string;
  inStock: boolean;
  description: string;
}

interface ProductListProps {
  onProductClick: (product: Product) => void;
  onAddProduct: () => void;
}

export function ProductList({ onProductClick, onAddProduct }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { token } = useAuthLayout()

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) {
        console.log("Token not available yet, waiting...");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        console.log("Calling getProductsByShop with token:", token);
        const response = await getProductsByShop(token)
        console.log("API response:", response);
        setProducts(response.data)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to fetch products')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [token])

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const isAllSelected = selectedProducts.length === products.length
  const toggleAllSelection = () => {
    setSelectedProducts(isAllSelected ? [] : products.map(p => p.id))
  }

  const openOverlay = (product: Product) => {
    setSelectedProduct(product);
  }

  const closeOverlay = () => {
    setSelectedProduct(null);
  }

  const getInventoryColor = (inventory: number) => {
    if (inventory === 0) return 'text-red-500';
    if (inventory < 10) return 'text-yellow-500';
    return 'text-green-500';
  }

  if (isLoading) {
    return <div>Loading products...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <div className="space-x-2">
          <Button variant="outline">Export</Button>
          <Button onClick={onAddProduct}>+ Add Product</Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px] border-gray-300 text-gray-600">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Input 
              placeholder="Search..." 
              className="pl-10 w-64 border-gray-300 text-gray-600"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className={`border-gray-300 ${view === 'list' ? 'bg-gray-100' : ''}`}
            onClick={() => setView('list')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 6H21" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12H21" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 18H21" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H3.01" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 12H3.01" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 18H3.01" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className={`border-gray-300 ${view === 'grid' ? 'bg-gray-100' : ''}`}
            onClick={() => setView('grid')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 14H3" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 10H3" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 6H3" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 18H3" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
          <Button variant="outline" size="icon" className="border-gray-300">
            <ListFilter className="h-4 w-4 text-gray-600" />
          </Button>
          <Button variant="outline" size="icon" className="border-gray-300">
            <Pencil className="h-4 w-4 text-gray-600" />
          </Button>
          <Button variant="outline" size="icon" className="border-gray-300">
            <Trash2 className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={isAllSelected}
                  onCheckedChange={toggleAllSelection}
                />
              </TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow 
                key={product.id} 
                onClick={() => onProductClick(product)} 
                className="cursor-pointer"
              >
                <TableCell>
                  <Checkbox 
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => toggleProductSelection(product.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Image 
                      src={product.featured_image || 'data:image/png;base64,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'} 
                      alt={product.name} 
                      width={40}
                      height={40}
                      className="rounded mr-3" 
                    />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.category.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className={getInventoryColor(product.inventory)}>
                  {product.inventory} in stock
                </TableCell>
                <TableCell>{product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
      {products.map((product) => (
          <Card key={product.id} className="mb-4 cursor-pointer w-full" onClick={() => openOverlay(product)}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Image 
                  src={product.image || '/default-product-image.jpg'} 
                  alt={product.name} 
                  width={40} 
                  height={40} 
                  className="rounded mr-3" 
                />
                <div>
                  <h2 className="font-medium">{product.name}</h2>
                  <p className="text-gray-500">{product.category.name}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={getInventoryColor(product.inventory)}>{product.inventory} in stock</span>
                <span>{product.price}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Overlay for additional product details */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={closeOverlay}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
            </DialogHeader>
            <p><strong>Category:</strong> {selectedProduct.category.name}</p>
            <p className={getInventoryColor(selectedProduct.inventory)}>
              <strong>Inventory:</strong> {selectedProduct.inventory}
            </p>
            <p><strong>Price:</strong> {selectedProduct.price}</p>
            <Button onClick={closeOverlay}>Close</Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
