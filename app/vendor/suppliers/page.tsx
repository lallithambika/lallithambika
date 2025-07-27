"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, MapPin, Phone, Mail, MessageCircle, ShoppingCart, Filter } from "lucide-react"
import { authService } from "@/lib/auth"

interface Supplier {
  id: string
  name: string
  businessName: string
  category: string
  rating: number
  reviews: number
  location: string
  phone: string
  email: string
  avatar: string
  description: string
  specialties: string[]
  verified: boolean
  responseTime: string
  minOrder: number
}

const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Fresh Farms Co.",
    businessName: "Fresh Farms Co.",
    category: "Vegetables",
    rating: 4.8,
    reviews: 156,
    location: "Mumbai, Maharashtra",
    phone: "+91 98765 43210",
    email: "contact@freshfarms.com",
    avatar: "/placeholder.svg?height=40&width=40",
    description: "Premium quality fresh vegetables and fruits supplier with 15+ years of experience.",
    specialties: ["Organic Vegetables", "Seasonal Fruits", "Herbs"],
    verified: true,
    responseTime: "< 2 hours",
    minOrder: 500,
  },
  {
    id: "2",
    name: "Premium Meats",
    businessName: "Premium Meats Ltd.",
    category: "Meat",
    rating: 4.9,
    reviews: 203,
    location: "Delhi, NCR",
    phone: "+91 87654 32109",
    email: "orders@premiummeats.com",
    avatar: "/placeholder.svg?height=40&width=40",
    description: "High-quality meat products with proper cold chain management and hygiene standards.",
    specialties: ["Chicken", "Mutton", "Fish", "Processed Meats"],
    verified: true,
    responseTime: "< 1 hour",
    minOrder: 1000,
  },
  {
    id: "3",
    name: "Grain Masters",
    businessName: "Grain Masters Pvt. Ltd.",
    category: "Grains",
    rating: 4.7,
    reviews: 89,
    location: "Pune, Maharashtra",
    phone: "+91 76543 21098",
    email: "info@grainmasters.com",
    avatar: "/placeholder.svg?height=40&width=40",
    description: "Wholesale supplier of premium quality grains, pulses, and cereals.",
    specialties: ["Basmati Rice", "Wheat", "Pulses", "Cereals"],
    verified: true,
    responseTime: "< 3 hours",
    minOrder: 2000,
  },
  {
    id: "4",
    name: "Spice Kingdom",
    businessName: "Spice Kingdom",
    category: "Spices",
    rating: 4.6,
    reviews: 124,
    location: "Kochi, Kerala",
    phone: "+91 65432 10987",
    email: "sales@spicekingdom.com",
    avatar: "/placeholder.svg?height=40&width=40",
    description: "Authentic Indian spices and seasonings sourced directly from farms.",
    specialties: ["Whole Spices", "Ground Spices", "Spice Blends"],
    verified: false,
    responseTime: "< 4 hours",
    minOrder: 300,
  },
]

export default function VendorSuppliers() {
  const router = useRouter()
  const [user, setUser] = useState(authService.getCurrentUser())
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterRating, setFilterRating] = useState("all")

  useEffect(() => {
    if (!user || user.userType !== "vendor") {
      router.push("/auth/login")
      return
    }
  }, [user, router])

  if (!user) return null

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = filterCategory === "all" || supplier.category === filterCategory
    const matchesRating = filterRating === "all" || supplier.rating >= Number.parseFloat(filterRating)

    return matchesSearch && matchesCategory && matchesRating
  })

  const categories = [...new Set(suppliers.map((supplier) => supplier.category))]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-violet-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Find Suppliers
          </h1>
          <p className="text-gray-600 mt-2">
            Connect with verified suppliers and build lasting business relationships.
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-blue-500" />
              <span>Search & Filter Suppliers</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search suppliers, products, or specialties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Minimum rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  <SelectItem value="4.0">4.0+ Stars</SelectItem>
                  <SelectItem value="3.5">3.5+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Card
              key={supplier.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={supplier.avatar || "/placeholder.svg"} alt={supplier.name} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        {supplier.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{supplier.businessName}</h3>
                      <div className="flex items-center space-x-1">
                        {renderStars(supplier.rating)}
                        <span className="text-sm text-gray-600 ml-1">
                          {supplier.rating} ({supplier.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  {supplier.verified && (
                    <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">Verified</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">{supplier.description}</p>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{supplier.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {supplier.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Response time: {supplier.responseTime}</span>
                    <span className="text-gray-600">Min order: ₹{supplier.minOrder}</span>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Order
                    </Button>
                  </div>

                  <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
                    <div className="flex items-center space-x-1">
                      <Phone className="w-3 h-3" />
                      <span>{supplier.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Mail className="w-3 h-3" />
                      <span>{supplier.email}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSuppliers.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No suppliers found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
