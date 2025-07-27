export interface Product {
  id: string
  name: string
  category: string
  price: number
  unit: string
  supplier: string
  image: string
  description: string
  inStock: boolean
  minOrder: number
}

export interface InventoryItem {
  id: string
  productId: string
  name: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  unit: string
  price: number
  supplier: string
  lastRestocked: string
  expiryDate: string
  status: "in-stock" | "low-stock" | "out-of-stock"
}

export interface Order {
  id: string
  vendorId: string
  supplierId: string
  items: OrderItem[]
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  orderDate: string
  deliveryDate?: string
  notes?: string
}

export interface OrderItem {
  productId: string
  name: string
  quantity: number
  price: number
  unit: string
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  read: boolean
}

export interface BulkOrder {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  participants: number
  endDate: string
  status: "active" | "completed" | "cancelled"
  category: string
  savings: number
}

// Mock data
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 2.5,
    unit: "kg",
    supplier: "Fresh Farms Co.",
    image: "/placeholder.svg?height=200&width=200",
    description: "Fresh, ripe tomatoes perfect for cooking",
    inStock: true,
    minOrder: 5,
  },
  {
    id: "2",
    name: "Chicken Breast",
    category: "Meat",
    price: 8.99,
    unit: "kg",
    supplier: "Premium Meats",
    image: "/placeholder.svg?height=200&width=200",
    description: "Premium quality chicken breast",
    inStock: true,
    minOrder: 2,
  },
  {
    id: "3",
    name: "Basmati Rice",
    category: "Grains",
    price: 3.25,
    unit: "kg",
    supplier: "Grain Masters",
    image: "/placeholder.svg?height=200&width=200",
    description: "Premium basmati rice",
    inStock: true,
    minOrder: 10,
  },
  {
    id: "4",
    name: "Cooking Oil",
    category: "Oils",
    price: 4.5,
    unit: "liter",
    supplier: "Oil Express",
    image: "/placeholder.svg?height=200&width=200",
    description: "High-quality cooking oil",
    inStock: false,
    minOrder: 5,
  },
]

export const mockInventory: InventoryItem[] = [
  {
    id: "1",
    productId: "1",
    name: "Fresh Tomatoes",
    category: "Vegetables",
    currentStock: 25,
    minStock: 10,
    maxStock: 50,
    unit: "kg",
    price: 2.5,
    supplier: "Fresh Farms Co.",
    lastRestocked: "2024-01-15",
    expiryDate: "2024-01-25",
    status: "in-stock",
  },
  {
    id: "2",
    productId: "2",
    name: "Chicken Breast",
    category: "Meat",
    currentStock: 8,
    minStock: 15,
    maxStock: 30,
    unit: "kg",
    price: 8.99,
    supplier: "Premium Meats",
    lastRestocked: "2024-01-14",
    expiryDate: "2024-01-20",
    status: "low-stock",
  },
  {
    id: "3",
    productId: "3",
    name: "Basmati Rice",
    category: "Grains",
    currentStock: 0,
    minStock: 20,
    maxStock: 100,
    unit: "kg",
    price: 3.25,
    supplier: "Grain Masters",
    lastRestocked: "2024-01-10",
    expiryDate: "2024-06-10",
    status: "out-of-stock",
  },
]

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    vendorId: "1",
    supplierId: "2",
    items: [
      { productId: "1", name: "Fresh Tomatoes", quantity: 10, price: 2.5, unit: "kg" },
      { productId: "2", name: "Chicken Breast", quantity: 5, price: 8.99, unit: "kg" },
    ],
    total: 69.95,
    status: "delivered",
    orderDate: "2024-01-10",
    deliveryDate: "2024-01-12",
    notes: "Please deliver in the morning",
  },
  {
    id: "ORD-002",
    vendorId: "1",
    supplierId: "2",
    items: [{ productId: "3", name: "Basmati Rice", quantity: 20, price: 3.25, unit: "kg" }],
    total: 65.0,
    status: "shipped",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-17",
  },
]

export const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "1",
    receiverId: "2",
    content: "Hi, do you have fresh tomatoes available?",
    timestamp: "2024-01-16T10:30:00Z",
    read: true,
  },
  {
    id: "2",
    senderId: "2",
    receiverId: "1",
    content: "Yes, we have premium quality tomatoes. How much do you need?",
    timestamp: "2024-01-16T10:35:00Z",
    read: true,
  },
  {
    id: "3",
    senderId: "1",
    receiverId: "2",
    content: "I need about 20kg for this week. What's your best price?",
    timestamp: "2024-01-16T10:40:00Z",
    read: false,
  },
]

export const mockBulkOrders: BulkOrder[] = [
  {
    id: "BULK-001",
    title: "Premium Rice Bulk Order",
    description: "High-quality basmati rice for multiple vendors",
    targetAmount: 1000,
    currentAmount: 750,
    participants: 12,
    endDate: "2024-01-25",
    status: "active",
    category: "Grains",
    savings: 15,
  },
  {
    id: "BULK-002",
    title: "Fresh Vegetables Bundle",
    description: "Mixed vegetables including tomatoes, onions, and peppers",
    targetAmount: 500,
    currentAmount: 500,
    participants: 8,
    endDate: "2024-01-20",
    status: "completed",
    category: "Vegetables",
    savings: 20,
  },
]
