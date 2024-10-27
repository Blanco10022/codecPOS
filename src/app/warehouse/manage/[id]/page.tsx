import { InventoryItemDetails } from '@/components/Inventory/details/InventoryItemDetails'
import { Product } from "@/types/product"; // Adjust the import path as necessary

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  // Fetch product details using params.id
  const product = await fetchProductById(params.id); // Replace with actual fetching logic

  // Convert the product id to a string
  const productWithStringId = { ...product, id: product.id.toString() };

  return <InventoryItemDetails product={productWithStringId} />
}

// Add this function to generate static params
export async function generateStaticParams() {
  // Fetch or define the list of IDs you want to pre-render
  const ids = await fetchAllProductIds(); // Replace with your data fetching logic

  // Return an array of params objects
  return ids.map(id => ({ id: id.toString() }));
}

async function fetchProductById(id: string): Promise<Product> {
  // Simulate fetching product details
  return {
    id: Number(id), // Convert id to a number
    name: "Sample Product",
    sku: "SKU123",
    quantity: 10,
    unitType: "pcs",
    purchasePrice: 100,
    sellingPrice: 150, // Add the missing property
    category: "Electronics", // Add the missing property
    suppliers: ["Supplier A", "Supplier B"], // Add the missing property
    status: "Available", // Add the missing property
    description: "This is a sample product description.", // Add the missing property
    price: 120, // Add the missing property
  };
}

// Simulate fetching all product IDs
async function fetchAllProductIds(): Promise<number[]> {
  // Replace this with your actual logic to fetch product IDs
  return [1, 2, 3, 4, 5]; // Example IDs
}