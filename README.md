# VendorConnect - Street Food Vendor Platform
link for the website:https://v0-street-food-hackathon.vercel.app/
VendorConnect is a comprehensive platform designed to connect street food vendors with suppliers, enabling bulk ordering, inventory management, and business growth through AI-powered insights.

## 🚀 Features

### For Vendors
- **Dashboard**: Real-time business analytics and performance metrics
- **Inventory Management**: Track stock levels, expiry dates, and automated reorder alerts
- **Bulk Ordering**: Coordinate with other vendors for better pricing
- **Supplier Network**: Connect with verified suppliers
- **Real-time Chat**: Direct communication with suppliers
- **AI Predictions**: Smart inventory forecasting and demand prediction

### For Suppliers
- **Product Management**: Showcase products with detailed information
- **Order Management**: Track and fulfill vendor orders
- **Vendor Network**: Connect with multiple street food vendors
- **Analytics**: Sales performance and customer insights
- **Real-time Chat**: Direct communication with vendors

### Core Features
- **Authentication**: Secure login/signup with role-based access
- **Real-time Messaging**: Live chat between vendors and suppliers
- **Responsive Design**: Mobile-first design for on-the-go access
- **Database Integration**: Full CRUD operations with Supabase
- **Row Level Security**: Secure data access based on user roles

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **Deployment**: Vercel
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd vendor-connect
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   Create a `.env.local` file with:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   \`\`\`

4. **Set up the database**
   Run the SQL scripts in order:
   \`\`\`bash
   # Execute in your Supabase SQL editor
   scripts/01-create-tables.sql
   scripts/02-seed-data.sql
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

## 🗄️ Database Schema

### Core Tables
- **profiles**: User information (vendors and suppliers)
- **categories**: Product categories
- **products**: Supplier product listings
- **inventory**: Vendor inventory tracking
- **orders**: Order management
- **order_items**: Individual order items
- **bulk_orders**: Coordinated bulk purchasing
- **bulk_order_participants**: Vendors participating in bulk orders
- **messages**: Real-time messaging system

### Key Features
- Row Level Security (RLS) for data protection
- Real-time subscriptions for live updates
- Automated timestamps and triggers
- Optimized indexes for performance

## 🔐 Authentication & Security

- Supabase Auth for secure authentication
- Row Level Security policies for data access control
- Role-based permissions (vendor/supplier)
- Secure middleware for route protection

## 📱 Pages & Routes

### Public Routes
- `/` - Landing page
- `/auth/login` - User login
- `/auth/signup` - User registration

### Vendor Routes
- `/vendor/dashboard` - Vendor dashboard
- `/vendor/inventory` - Inventory management
- `/vendor/suppliers` - Supplier directory
- `/vendor/bulk-orders` - Bulk order coordination
- `/vendor/chat` - Messaging system

### Supplier Routes
- `/supplier/dashboard` - Supplier dashboard
- `/supplier/products` - Product management
- `/supplier/orders` - Order management
- `/supplier/chat` - Messaging system

## 🎨 UI Components

Built with shadcn/ui components:
- Cards, Buttons, Forms
- Data Tables with sorting/filtering
- Real-time chat interface
- Responsive navigation
- Loading states and error handling

## 🚀 Deployment

The application is configured for deployment on Vercel:

1. **Connect to Vercel**
   \`\`\`bash
   vercel
   \`\`\`

2. **Set environment variables** in Vercel dashboard

3. **Deploy**
   \`\`\`bash
   vercel --prod
   \`\`\`

## 🔄 Real-time Features

- Live chat messaging
- Real-time inventory updates
- Order status notifications
- Bulk order participation tracking

## 📊 AI-Powered Features

- Inventory demand prediction
- Reorder suggestions
- Stock level optimization
- Usage pattern analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**VendorConnect** - Empowering street food vendors through technology 🌮🚚
