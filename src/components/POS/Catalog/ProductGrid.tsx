"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/Shared/ui/button"
import { Input } from "@/components/Shared/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Shared/ui/select"
import { Card, CardContent } from "@/components/Shared/ui/card"
import { Minus, Plus, X } from "lucide-react"
import Image from 'next/image'
import { getProductsByShop } from "@/services/api/endpoints" 
import { useAuthLayout } from "@/components/Shared/Layout/AuthLayout"

// Define the Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  featured_image: string;
  inStock: boolean;
}

// Define the CartItem interface (extends Product with quantity and inventory)
interface CartItem extends Product {
  quantity: number;
  inventory: string;
}

// Define the Inventory interface
interface Inventory {
  id: number;
  name: string;
}



// Mock data for inventories
const inventories: Inventory[] = [
  { id: 1, name: "Main Store" },
  { id: 2, name: "Warehouse A" },
  { id: 3, name: "Warehouse B" },
]

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => (
  <Card className="w-full cursor-pointer" onClick={() => onAddToCart(product)}>
    <CardContent className="p-4">
      <Image 
        src={product.featured_image || 'ddata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAACUCAMAAAD26AbpAAAAz1BMVEX////tyJPdqGa7fEYREiShazzW1tg+PkYDBRz/37DcpmPsxY325c7htYL416bYo2Ktekvgr3D10p/Zqnb69vS5eD3nu4DGlW+4d0HjtXn/5Lbz3sC4dTfbolrJkl7Ag0vToW3u4tjUspfkvI3JjlPCiFP58ejZnlDnw5uaYjLs0bLRmVvDjmLFl2a1byvbv6kAAADtz6jRonf469r027bOporn1srDhUXhyLe0hVTMn3yvYQCyaBvv2MIAABEdHy1NTVcrLDi9vcB8e4JbW2N1QCbKAAALgElEQVR4nOWdC3eiShLHAyR7YwMaeQVHEWcImInGXMeZ2WT2Zib38f0/0/aDV9MNNAhKduucnMmZROVn1b+7uqowFxdH2GHmyQWbqtLcOuY5T2rR3gP09YOpI0m6v9XeB4T1MC24AMgzVZJW7lJX99q5L0/AtBlgXAABTMWHjnCAHETnvsIai4J1EUCGAHqomJKkToEMwPphyBDRg8fGEARYKisIkLjHm70OVRLWq16QMQAz1ZBWylKHMTRNfwa84HDui+XaQWdEgGLI9H1TMpwp9RNvej+8aIruiwupLKOFdOnGIiiY92VgwRQ9yLyFNMAxpM7kIsFkY98OCsHSiiKQYxGEtAgS2/jusBCigBEBcCQDLaQqiiHGBaGiKINCYEQA1yFJCpb2Eop5xnhAvnOVQSFYr1wR4BgyVIcjAoXYYBC0gJvQmSFcSEtEMCyE6J51gaMa+p2LNuNp8frlyV1KMAwECy6kzDokwRiylwEUAQMg3yk5GwCCpc0KCR2QcUbqQxFIKiMCkMXQQBAO92xKjTfjEC6kDpNvyxvKBQNAsPbMqQZAEQRLd4V2AsYFchHg7AivzHYFyLEsRKcaVgQbnyE4K4J1YLOJKcwmdKVkIZ3QIhgAggbYhRRmE/BUo3ITOjaGzo4wVymxAhJDMCM1eC4oAVAUNzxfIWBOpf/oVKOavgIzUnYh5YogsdDcfjwXAnzTk/cb4FONr/BPNXwRpG5w7d238xzdMAKOeny0D1ZwITVUdjOG2UQFAIbwV9JZamMEAUFM44y0JKGrA3BXKPr2ZygEJAiSNDZIDDmchK4yhojp5J2Q9iePpgxhNN7ky0P1CyllYfwsDlifGiLnhbE8MninmroYIgj4eXAInro2lkcAoxHjBDEAuC+oeFEgS7MXnHKX+JoLJIhg0MupUAwpWMzUmQKAk5WLD7NZQiB9QAhpNBCAehUTAngqKmyF3vrhFNEU7T3PYRHQ+wnk/Mm4LohMg1fg03uXhPUw82RAI4ylZJcQFYHiovISmw+SaOo35yC9jxIE1AMRJAjRmYIDQCDu+3PEQSdH5TyC4WUIhikWRKFjcPLBXDR5PUki2ienBAoBNESAIuBthbSt9R4SJ2s+Sw9qRyC46FRUGkNUNHWdOGn53kcZglSL4KI6fd3lxwzyvktHRPRRubUXYEbLWUjLzAOd9dmjh8JRuZ0XkAikOhHQr+PpHUWTVqy3tFmRXBRDAiKgbXPXjR80tdDjaIHgwhjinClqDCZbXSEUilstEGAMiYsgcQFcvzpEoHZTMOMjlGjBVWBC10gEyOJ0sUuEfI0L140EVyQigqYuSBP2ThHyJ3zSiRJBcH2TWySutqzy0TECBUEEUYuwQiJoug7l8t3OEfKSwM2ESgQsAqelCPpDyDWRUTRVbW3u0jxCBD0i0JJQDbnEC/BU0ySbiI0p//WDQEWTXLYvrFReu7DaOIe+vhCk9NCIaqosgosmRxqLYMMrHPSHQE4tINsg8gj4VNN0HSop3fSIQCQR/8Sg5OyuWuwEZYWDXhFypiu+nngBlegai2DCv/7+EcYf8NuvL1381iMvoBhqnFJXVc/6RhiNxqhJ6KJOh4684Jtq44W0un7ZP8JoZCKCJWkU6AG/vlVlNdWzUyBMJ5tQT/6neTZRV/47CQKQjXhn6FQEJ0b4MDa4zbY6AKW+dHYqBPgPp9VTY2Il5Azh46E9TiXCOEYYN9SBaB+FXLZ12N++SF++fW9JIYjQZEsW7qNABCuaj9XV5883cMX79+L2+WMLDFEEYTkA0V4cTBe1+V5VzZfPV1c36BVMf7e4ffretAUhjiAGIQqgLE1dlVRJf7mCBAQB9TAWC3v746kRRRME7mAtbWKdLNxLxPZ4RewmeQWYz9i2rYTPfSHwJjsbi8BVEgATe4BCkJwl/qXdVlgWDRFwNPFdMRFrJuITEzb9JQHII6A5XvQ89uKbYDg1RijbpzehiAdw/RWZoT9eZQQUArqlAEEstk9CjmiBgA51bAyJASQiMB6vKLuhXyFAKb7i2tvvPSEw81WiW5m/VMkZ0Mx7gIOAb9FCEDuBybI6hCkXgR7wEVtI+SIoQ0gloXyqg2iLIKWD/8yccAkBGjPG9lh0AR9BUle+kCRaIySlP2ERxC/05Ya5/hKE+NSruIvbSkkcgYAgRHeCZfwyOscD5QhIEjiadrcVYzRHIUi6IIBJfj1gRVCDIEmrGOKpFEIIYXQMAmpCEOOJoBahfpfoG8F1kxgyuSKoR0ijyS5ZYHsOpBRAvyn1QC0Cvv/Mtl178YMH0S9CSGJIX5mVPqhDkJzZ86cfW9fe2Zxo6hGBiEA3l6Hi6wYMpAo/VCLAbdTbX1gfn79tF/+5fS5C1CKMWyLglFpfhT6Ug4udobaTMynAeSiErOjj03ZXTJx6Q1jquJpJBBH/evDSHCFOAoCeLKrR84/CNPthz4c4EiFc5upIevaAEkmUIWT5JNhn1xwVjkOWZvAgjvVCLqTM3CPUR64k+Aj5m1YAqBrWjb5yGDpDcEP6McEjh4GLQHcygF6BAD0hMRDo0g25Cy/oxUepbDRxEJjDobevZLjQ9ipN0RUCFUaJMbsEg8DrZKxrZrAsjfZEVwhL/iMLkiggcO7cwqFUd5amJdEVAhNGsdGSoBHKWjHgoQYBQoyzaOoGIa158R58wy/ClE/qAllgnE9LWrTdIBRXo4JlksgQKtt5Xm0oIUfM411i1IkXysIotiCRRILAF0GOoT6UEMSD2hVCVRglz0AOcjFCfSvGE5sMPdyrnSDUhFHyHDdJcV6kJVyzwWWmdaIFvyaMYjMebxCCYE+7boPLoml+vBcEwihmCB5f6kSQuUFkVcogjkJwFUECZKZ4P9ILRBGgJEbSUQhiYURseidKILoqxabNvPanNtEwQuZM3I04w7rJ7WXRfXsvrILaOaHEVHmi+BNBgMZ3yB2+tkXY2XM2hefbFM0sCYZSmzvLDq0Q7N2XCCWOIhAOwGNXIm5oeTOTpY3LLqQMwbZvSdEqnziWmQrI5JhfH0Ny608gi+YlF1KCsNg+Zfwl5YXMpjGCWxNKwDvqLqaSOgcXwbap1nekVUsC3z1B5vcqQ8nTj7z7x9J4juAg2H9si86ulAS5B4sgVIQSFEEHd+pyFhgGweY3KaN9ZRilU5SloQSCbmaXoq9FiCLCIixrAkxL/OCAnBcUpWSD23zqBABZURI0gm2XdyfXU4dHkNzKlyBwQ2lyt+gOoVjnoBAqe8RrOR0/ZsMoQ+CtShvo3Q4RIEQ+mjIE1w4r25JrOf7cVTqM0jc6faLiqoQ/rqJbBBRNKUSKAHeC6gVjjUUpO/QdHzKL4BfmCnBxuWsENEynUghVIsgjxDfYpJbNcuTmunOhBJKbNjpHyHYJgrC7rZ8dWidXJWfR5GRveH40PQ2lbDCiBwQsCYJQJ4LY5GyKCcziYlU+YDIC108A0gaF2wsCSsMlVYc7wSehTSf3AWpgRobyqY/XyHkBn35ywzXuYsv017oyba8Lj26h0k58XzVEGM0cdErgI6BQyg3XLJRPPX4IiPXaaDxWM/EnJCCE6Ww0Lkfwc9NBf3B7zeez1yn0BEGAX6UIWQzZ4bAAoFn3EEIYIXfuGJIdAk8QQWC3OZNZ3x2og1oEd3c7UABs2liefaiQM4qhJvPC5zBr71Qi2OEgRUDbYV6OIDAVOQw7OGsugi0ymzoUewBp4jTJxVBv2UQfln38coIgmnINyLT4L1JM4p1APOUajsUfRY4Rdtu2dySd2Sz052Um6IaFge8EVRYFsvcORUCbpr9HEdAWvW8X/H/bv969Xfz27u3i+t3bxeW7t/8ZhOtr+HWZfovt99+vfybfX/+8vPz16+QXJ2YY4fq3t8vLt1/X5Ft83dd//vXX299v1xju5z9//7z85+2sF1pu/wVrB3qkHkZhzQAAAABJRU5ErkJggg=='} 
        alt={product.name} 
        className="w-full h-32 object-cover mb-2" 
        width={100} 
        height={100} 
      />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm">{product.price} XAF</p>
      <div className="flex justify-between items-center mt-2">
        <span className={`text-xs ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
    </CardContent>
  </Card>
)

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: number, newQuantity: number) => void;
  onRemove: (id: number) => void;
  onChangeInventory: (id: number, newInventory: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove, onChangeInventory }) => (
  <div className="flex flex-col py-2 border-b">
    <div className="flex justify-between items-center">
      <div>
        <h4 className="font-semibold">{item.name}</h4>
        <p className="text-sm">{item.price} XAF</p>
      </div>
      <div className="flex items-center">
        <Button variant="outline" size="icon" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
          <Minus className="h-4 w-4" />
        </Button>
        <span className="mx-2">{item.quantity}</span>
        <Button variant="outline" size="icon" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onRemove(item.id)} className="ml-2">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
    <div className="mt-2">
      <Select 
        value={item.inventory} 
        onValueChange={(value) => onChangeInventory(item.id, value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Inventory" />
        </SelectTrigger>
        <SelectContent>
          {inventories.map((inventory) => (
            <SelectItem key={inventory.id} value={inventory.id.toString()}>
              {inventory.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>
)

export function Pos() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [promoCode, setPromoCode] = useState("")
  const [paymentType, setPaymentType] = useState("CASH")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const [products, setProducts] = useState<Product[]>([]) // State for products
  const {token} = useAuthLayout()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        const response = await getProductsByShop(token);
        console.log("API response:", response);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1, inventory: "1" }])
    }
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id))
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const changeInventory = (id: number, inventoryId: string) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, inventory: inventoryId } : item
    ))
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <div className="w-full md:w-2/3">
        <div className="flex gap-4 mb-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="inStock">In Stock</SelectItem>
              <SelectItem value="outOfStock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
          <Input 
            type="text" 
            placeholder="Live Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button 
            variant="outline" 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ←
          </Button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button 
                key={page} 
                variant={page === currentPage ? "default" : "outline"}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button 
            variant="outline" 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            →
          </Button>
        </div>
      </div>
      <div className="w-full md:w-1/3">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-4">Cart</h2>
            {cartItems.map(item => (
              <CartItem 
                key={item.id} 
                item={item} 
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                onChangeInventory={changeInventory}
              />
            ))}
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Offer</h3>
              <div className="flex gap-2">
                <Input 
                  type="text" 
                  placeholder="Enter Promo Code" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button>APPLY</Button>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Payment Type</h3>
              <Select value={paymentType} onValueChange={setPaymentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Payment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CASH">CASH</SelectItem>
                  <SelectItem value="CARD">CARD</SelectItem>
                  <SelectItem value="MOBILE">MOBILE MONEY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Price Details</h3>
              <div className="flex justify-between">
                <span>Order Total</span>
                <span>{calculateTotal()} XAF</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <span>Total</span>
                <span>{calculateTotal()} XAF</span>
              </div>
            </div>
            <Button className="w-full mt-4">PAY</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
