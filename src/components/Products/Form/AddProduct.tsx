'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/Shared/ui/button"
import { Input } from "@/components/Shared/ui/input"
import { Textarea } from "@/components/Shared/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Shared/ui/select"
import { Checkbox } from "@/components/Shared/ui/checkbox"
import { Switch } from "@/components/Shared/ui/switch"
import { Label } from "@/components/Shared/ui/label"
import { Card, CardContent } from "@/components/Shared/ui/card"
import { ChevronLeft, Camera } from 'lucide-react'
import axios from 'axios'
import { useAuthLayout } from '@/components/Shared/Layout/AuthLayout'
import { ChangeEvent } from 'react'
import Image from 'next/image'

interface AddProductProps {
  onBack: () => void;
}

interface Category {
  id: string;
  name: string;
}

interface Shop {
  id: string;
  name: string;
}

export function AddProduct({ onBack }: AddProductProps) {
  const { token } = useAuthLayout();
  const [selectedShops, setSelectedShops] = useState<string[]>([])
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productType, setProductType] = useState('')
  const [discountPrice, setDiscountPrice] = useState('')
  const [addTax, setAddTax] = useState(false)
  const [category, setCategory] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [shops, setShops] = useState<Shop[]>([])
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [additionalImages, setAdditionalImages] = useState<File[]>([])
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null)
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>([])

  useEffect(() => {
    fetchCategories();
    fetchShops();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://elegant-crow-curiously.ngrok-free.app/api/v1/products/categories/', {
        headers: { Authorization: `Token ${token}` }
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchShops = async () => {
    try {
      const response = await axios.get('https://elegant-crow-curiously.ngrok-free.app/api/v1/products/shops/', {
        headers: { Authorization: `Token ${token}` }
      });
      setShops(response.data);
    } catch (error) {
      console.error('Error fetching shops:', error);
    }
  };

  const handleShopChange = (shop: string) => {
    setSelectedShops(prev => 
      prev.includes(shop) 
        ? prev.filter(s => s !== shop)
        : [...prev, shop]
    )
  }

  const handleFeaturedImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFeaturedImage(file);
    setFeaturedImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleAdditionalImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setAdditionalImages(files);
    setAdditionalImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropFeaturedImage = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFeaturedImage(file);
    setFeaturedImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleDropAdditionalImages = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setAdditionalImages(files);
    setAdditionalImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleAddProduct = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('description', productDescription);
      formData.append('price', productPrice);
      formData.append('type', productType);
      formData.append('discount_price', discountPrice);
      formData.append('add_tax', addTax.toString());
      formData.append('category', category);
      selectedShops.forEach(shop => formData.append('shops', shop));
      
      if (featuredImage) {
        formData.append('featured_image', featuredImage);
      }
      
      additionalImages.forEach(image => {
        formData.append('images', image);
      });

      const response = await axios.post('https://elegant-crow-curiously.ngrok-free.app/api/v1/products/create/', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`
        }
      });
      console.log('Product added successfully:', response.data);

      // Reset form fields
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductType('');
      setDiscountPrice('');
      setAddTax(false);
      setCategory('');
      setSelectedShops([]);
      setFeaturedImage(null);
      setAdditionalImages([]);

      // You might want to show a success message here
    } catch (error) {
      console.error('Error adding product:', error);
      // You might want to show an error message here
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = (inputId: string) => {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    if (inputElement) {
      inputElement.click();
    }
  };

  return (
    <>
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ChevronLeft className="mr-2 h-5 w-5" /> Back
      </Button>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold flex items-center text-gray-800">
          Add Product
        </h1>
        <div className="space-x-2">
          <Button variant="outline" className="text-gray-600 border-gray-300 hover:bg-gray-50">Cancel</Button>
          <Button className="bg-[#1A7DC4] hover:bg-[#1565a0]" onClick={handleAddProduct} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="productName" className="text-sm font-medium text-gray-700">Product Name</Label>
                  <Input 
                    id="productName" 
                    placeholder="Summer T-Shirt" 
                    className="mt-1" 
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="productDescription" className="text-sm font-medium text-gray-700">Product Description</Label>
                  <Textarea 
                    id="productDescription" 
                    placeholder="Product description" 
                    className="mt-1 h-32"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">Featured Image</h2>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center"
                    onDragOver={handleDragOver}
                    onDrop={handleDropFeaturedImage}
                  >
                    <label htmlFor="featuredImage" className="cursor-pointer">
                      <Button
                        variant="outline"
                        className="w-full text-[#1A7DC4] border-[#1A7DC4] hover:bg-[#1A7DC4] hover:text-white"
                        onClick={() => handleButtonClick('featuredImage')}
                      >
                        Add File
                      </Button>
                      <input
                        id="featuredImage"
                        type="file"
                        className="hidden"
                        onChange={handleFeaturedImageChange}
                        accept="image/*"
                      />
                    </label>
                    <p className="text-sm text-gray-500 mt-2">Or drag and drop files</p>
                    {featuredImagePreview && (
                      <div className="mt-4">
                        <Image src={featuredImagePreview} alt="Featured preview" width={200} height={200} objectFit="cover" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">Additional Images</h2>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center"
                    onDragOver={handleDragOver}
                    onDrop={handleDropAdditionalImages}
                  >
                    <label htmlFor="additionalImages" className="cursor-pointer">
                      <Button
                        variant="outline"
                        className="w-full text-[#1A7DC4] border-[#1A7DC4] hover:bg-[#1A7DC4] hover:text-white"
                        onClick={() => handleButtonClick('additionalImages')}
                      >
                        Add Files
                      </Button>
                      <input
                        id="additionalImages"
                        type="file"
                        className="hidden"
                        onChange={handleAdditionalImagesChange}
                        accept="image/*"
                        multiple
                      />
                    </label>
                    <p className="text-sm text-gray-500 mt-2">Or drag and drop files</p>
                    {additionalImages.length > 0 && (
                      <p className="text-sm text-green-600 mt-2">{additionalImages.length} images selected</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Price</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="productPrice" className="text-sm font-medium text-gray-700">Product Price</Label>
                  <Input 
                    id="productPrice" 
                    placeholder="Enter price" 
                    className="mt-1"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="productType" className="text-sm font-medium text-gray-700">Product Type</Label>
                  <Select value={productType} onValueChange={setProductType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Product Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital">Digital Product</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="type3">Product Type 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="discountPrice" className="text-sm font-medium text-gray-700">Discount Price</Label>
                  <Input 
                    id="discountPrice" 
                    placeholder="Discount Price" 
                    className="mt-1"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Switch id="tax" checked={addTax} onCheckedChange={setAddTax} />
                <Label htmlFor="tax" className="text-sm font-medium text-gray-700">Add tax for this product</Label>
              </div>
              <p className="text-sm text-gray-500 mt-2">This is digital item</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Categories</h2>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Select Shop</h2>
              <div className="space-y-2">
                {shops.map((shop) => (
                  <div key={shop.id} className="flex items-center">
                    <Checkbox
                      id={shop.id}
                      checked={selectedShops.includes(shop.id)}
                      onCheckedChange={() => handleShopChange(shop.id)}
                      className="border-gray-300 text-[#1A7DC4] focus:ring-[#1A7DC4]"
                    />
                    <label htmlFor={shop.id} className="ml-2 text-sm font-medium text-gray-700">
                      {shop.name}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Scan</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Camera className="mx-auto mb-2 text-gray-400" size={24} />
                <p className="text-sm text-gray-500">Scan Image</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
