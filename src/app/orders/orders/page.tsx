"use client"

import { useState } from "react"
import { OrderList } from "@/components/Orders/List/OrderList"
import { AddOrder } from "@/components/Orders/Form/AddOrder"
import { OrderDetails } from "@/components/Orders/Details/OrderDetails"
import { DashboardLayout } from "@/components/Shared/Layout/DashboardLayout"
import { Order } from "@/types/order"; // Ensure this import matches the expected Order type

export default function OrdersPage() {
  const [view, setView] = useState<"list" | "add" | "details">("list")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const handleOrderClick = (order: Order) => { // Use the Order type
    setSelectedOrder(order)
    setView("details")
  }

  const handleAddOrder = () => {
    setView("add")
  }

  const handleBack = () => {
    setView("list")
    setSelectedOrder(null)
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        {view === "list" && (
          <OrderList onOrderClick={(order: Order) => handleOrderClick(order)} onAddOrder={handleAddOrder} />
        )}
        {view === "add" && (
          <AddOrder onBack={handleBack} />
        )}
        {view === "details" && selectedOrder && (
          <OrderDetails orderId={selectedOrder.id} />   
        )}
      </div>
    </DashboardLayout>
  )
}
