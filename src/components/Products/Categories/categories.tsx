"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/Shared/ui/button"
import { Input } from "@/components/Shared/ui/input"
import { Label } from "@/components/Shared/ui/label"
import { Textarea } from "@/components/Shared/ui/textarea"
import { Card, CardContent } from "@/components/Shared/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Shared/ui/dialog"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import Image from 'next/image'
import { useAuthLayout } from "@/components/Shared/Layout/AuthLayout"
import { createCategory, fetchCategories, updateCategory, deleteCategory } from "../../../services/api/categories"
import axios from 'axios'

interface Category {
  id: string;
  name: string;
  image?: File | null | string;
  description?: string;
  itemCount?: number;
}

// Mock data for categories
const initialCategories: Category[] = [
  { id: "1", name: "Men Clothes", itemCount: 24, image: "/placeholder.svg?height=100&width=100" },
  { id: "2", name: "Women Clothes", itemCount: 12, image: "/placeholder.svg?height=100&width=100" },
  { id: "3", name: "Accessories", itemCount: 43, image: "/placeholder.svg?height=100&width=100" },
  { id: "4", name: "Cotton Clothes", itemCount: 31, image: "/placeholder.svg?height=100&width=100" },
  { id: "5", name: "Summer Clothes", itemCount: 26, image: "/placeholder.svg?height=100&width=100" },
  { id: "6", name: "Wedding Clothes", itemCount: 52, image: "/placeholder.svg?height=100&width=100" },
]

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [newCategory, setNewCategory] = useState<Partial<Category>>({ name: "", description: "", image: null })
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const { token } = useAuthLayout()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (token) {
      loadCategories()
    }
  }, [token])

  const loadCategories = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const fetchedCategories = await fetchCategories(token)
      setCategories(fetchedCategories)
    } catch (error) {
      console.error("Failed to fetch categories:", error)
      setError("Failed to load categories. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddCategory = async () => {
    try {
      const formData = new FormData()
      formData.append('name', newCategory.name || '')
      formData.append('description', newCategory.description || '')
      if (newCategory.image instanceof File) {
        formData.append('image', newCategory.image)
      }

      const addedCategory = await createCategory(formData, token)
      setCategories([...categories, addedCategory])
      setIsAddCategoryOpen(false)
      setNewCategory({ name: "", description: "", image: null })
    } catch (error) {
      console.error("Failed to add category:", error)
      if (axios.isAxiosError(error) && error.response) {
        // Handle specific error messages from the server
        if (error.response.data.image) {
          setError(`Image error: ${error.response.data.image[0]}`)
        } else {
          setError(`Failed to add category: ${error.response.data.detail || 'Unknown error'}`)
        }
      } else {
        setError('Failed to add category. Please try again.')
      }
    }
  }

  const handleUpdateCategory = async () => {
    if (editingCategory) {
      try {
        const formData = new FormData()
        formData.append('name', newCategory.name || '')
        formData.append('description', newCategory.description || '')
        if (newCategory.image instanceof File) {
          formData.append('image', newCategory.image)
        }

        const updatedCategory = await updateCategory(editingCategory.id, formData, token)
        const updatedCategories = categories.map(cat =>
          cat.id === updatedCategory.id ? updatedCategory : cat
        )
        setCategories(updatedCategories)
        setIsAddCategoryOpen(false)
        setEditingCategory(null)
        setNewCategory({ name: "", description: "", image: null })
      } catch (error) {
        console.error("Failed to update category:", error)
      }
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId, token)
      setCategories(categories.filter(cat => cat.id !== categoryId))
    } catch (error) {
      console.error("Failed to delete category:", error)
    }
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setNewCategory({
      name: category.name,
      description: category.description,
      image: category.image
    })
    setIsAddCategoryOpen(true)
  }

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    setNewCategory({ ...newCategory, image: file });
                  }}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={editingCategory ? handleUpdateCategory : handleAddCategory}>
              {editingCategory ? "Update Category" : "Add Category"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
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
        {isLoading ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredCategories.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500 text-lg">No categories found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCategories.map((category) => (
              <Card key={category.id}>
                <CardContent className="p-4">
                  <Image 
                    src={typeof category.image === 'string' ? category.image : "/placeholder.svg?height=100&width=100"} 
                    alt={category.name} 
                    width={100}
                    height={100}
                    className="w-full h-40 object-cover mb-2 rounded" 
                  />
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.itemCount} items</p>
                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditCategory(category)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Categories
