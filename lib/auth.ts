"use client"

export interface User {
  id: string
  email: string
  fullName: string
  businessName: string
  userType: "vendor" | "supplier"
  phone: string
  address: string
  avatar?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// Mock user data
const mockUsers: User[] = [
  {
    id: "1",
    email: "vendor@example.com",
    fullName: "John Doe",
    businessName: "Joe's Tacos",
    userType: "vendor",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    email: "supplier@example.com",
    fullName: "Jane Smith",
    businessName: "Fresh Foods Supply",
    userType: "supplier",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, City, State",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

class AuthService {
  private currentUser: User | null = null

  async signUp(userData: Omit<User, "id">): Promise<{ user: User; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === userData.email)
    if (existingUser) {
      return { user: existingUser, error: "User already exists" }
    }

    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
    }

    mockUsers.push(newUser)
    this.currentUser = newUser
    localStorage.setItem("currentUser", JSON.stringify(newUser))

    return { user: newUser }
  }

  async signIn(email: string, password: string): Promise<{ user: User | null; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = mockUsers.find((u) => u.email === email)
    if (!user) {
      return { user: null, error: "Invalid credentials" }
    }

    this.currentUser = user
    localStorage.setItem("currentUser", JSON.stringify(user))

    return { user }
  }

  async signOut(): Promise<void> {
    this.currentUser = null
    localStorage.removeItem("currentUser")
  }

  getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("currentUser")
      if (stored) {
        this.currentUser = JSON.parse(stored)
        return this.currentUser
      }
    }

    return null
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }
}

export const authService = new AuthService()
