"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Package, ShoppingCart, AlertTriangle, Users, MessageCircle, DollarSign, Truck } from "lucide-react"
import { authService } from "@/lib/auth"
import { mockInventory, mockOrders, mockBulkOrders } from "@/lib/data"

export default function VendorDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(authService.getCurrentUser())

  useEffect(() => {
    if (!user || user.userType !== "vendor") {
      router.push("/auth/login")
      return
    }
  }, [user, router])

  if (!user) return null

  const lowStockItems = mockInventory.filter((item) => item.status === "low-stock" || item.status === "out-of-stock")
  const recentOrders = mockOrders.slice(0, 3)
  const activeBulkOrders = mockBulkOrders.filter((order) => order.status === "active")

  const stats = [
    {
      title: "Total Inventory Value",
      value: "₹45,230",
      change: "+12%",
      icon: Package,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Monthly Orders",
      value: "23",
      change: "+8%",
      icon: ShoppingCart,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Active Suppliers",
      value: "12",
      change: "+3",
      icon: Truck,
      color: "from-violet-500 to-violet-600",
    },
    {
      title: "Savings This Month",
      value: "₹8,450",
      change: "+25%",
      icon: DollarSign,
      color: "from-indigo-500 to-indigo-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-violet-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome back, {user.fullName}!
          </h1>
          <p className="text-gray-600 mt-2">Here's an overview of your business performance and inventory status.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <div className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-xs text-green-600 font-medium">{stat.change} from last month</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inventory Alerts */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <span>Inventory Alerts</span>
              </CardTitle>
              <CardDescription>Items that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.currentStock} {item.unit} remaining
                      </p>
                    </div>
                    <Badge variant={item.status === "out-of-stock" ? "destructive" : "secondary"}>
                      {item.status === "out-of-stock" ? "Out of Stock" : "Low Stock"}
                    </Badge>
                  </div>
                ))}
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  Reorder Items
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-blue-500" />
                <span>Recent Orders</span>
              </CardTitle>
              <CardDescription>Your latest order activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">₹{order.total.toFixed(2)}</p>
                    </div>
                    <Badge
                      className={
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                >
                  View All Orders
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Active Bulk Orders */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-500" />
                <span>Bulk Orders</span>
              </CardTitle>
              <CardDescription>Join group purchases to save money</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeBulkOrders.map((bulkOrder) => (
                  <div
                    key={bulkOrder.id}
                    className="p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900">{bulkOrder.title}</p>
                      <Badge className="bg-gradient-to-r from-purple-500 to-violet-500 text-white">
                        {bulkOrder.savings}% OFF
                      </Badge>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{bulkOrder.participants} vendors joined</span>
                      </div>
                      <Progress value={(bulkOrder.currentAmount / bulkOrder.targetAmount) * 100} className="h-2" />
                    </div>
                    <p className="text-xs text-gray-600">
                      ₹{bulkOrder.currentAmount} / ₹{bulkOrder.targetAmount}
                    </p>
                  </div>
                ))}
                <Button className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600">
                  Browse Bulk Orders
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex flex-col items-center justify-center space-y-2">
              <Package className="w-6 h-6" />
              <span>Manage Inventory</span>
            </Button>
            <Button className="h-20 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 flex flex-col items-center justify-center space-y-2">
              <Truck className="w-6 h-6" />
              <span>Find Suppliers</span>
            </Button>
            <Button className="h-20 bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 flex flex-col items-center justify-center space-y-2">
              <Users className="w-6 h-6" />
              <span>Join Bulk Order</span>
            </Button>
            <Button className="h-20 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 flex flex-col items-center justify-center space-y-2">
              <MessageCircle className="w-6 h-6" />
              <span>Message Suppliers</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
