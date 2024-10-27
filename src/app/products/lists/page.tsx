'use client'

import { useState } from "react"
import { ProductList } from "@/components/Products/List/ProductList"
import { AddProduct } from "@/components/Products/Form/AddProduct"
import { DashboardLayout } from "@/components/Shared/Layout/DashboardLayout"


interface Product {
  id: number;
  name: string;
  category: string;
  inventory: number;
  price: string;
  image: string;
  inStock: boolean;
  description: string; // Added description property
}

export default function ProductsPage() {
  const [view, setView] = useState<"list" | "add" | "details">("list");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Handle when a product is clicked
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView("details");
  };

  // Handle adding a new product
  const handleAddProduct = () => {
    setView("add");
  };

  // Handle going back to the product list
  const handleBack = () => {
    setView("list");
    setSelectedProduct(null); // Reset selected product on back
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        {/* Render the product list */}
        {view === "list" && (
          <ProductList onProductClick={handleProductClick} onAddProduct={handleAddProduct} />
        )}

        {/* Render the add product form */}
        {view === "add" && (
          <AddProduct onBack={handleBack} />
        )}

        {/* Conditionally render ProductDetails when it's implemented */}
        {view === "details" && selectedProduct && (
          <div>
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p>{selectedProduct.price}</p>
            {/* Add more details as needed */}
            <button onClick={handleBack}>Back to Products</button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
