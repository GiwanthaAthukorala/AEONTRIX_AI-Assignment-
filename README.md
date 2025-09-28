# FashionStore - E-commerce Platform

A modern, full-stack e-commerce application built with React.js, Node.js, Express, and MongoDB. Features user authentication, product catalog, shopping cart, and order management.

## 🚀 Features

- **User Authentication** - Register, login, and JWT-based authentication
- **Product Catalog** - Browse products with advanced filtering and search
- **Shopping Cart** - Guest and authenticated user cart functionality
- **Order Management** - Place orders and view order history
- **Responsive Design** - Mobile-friendly interface
- **Real-time Updates** - Dynamic cart and inventory management
- **Email Notifications** - Order confirmation emails

## 🛠️ Tech Stack

### Frontend
- React.js 18
- React Router DOM
- Axios for API calls
- Context API for state management
- CSS3 with modern features

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Nodemailer for emails

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd fashionstore
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

Edit the `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/fashionstore
JWT_SECRET=your_jwt_secret_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=5000
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Set up environment (if needed)
cp .env.example .env
```

### 4. Database Setup
```bash
# Seed the database with sample products
cd ../backend
npm run seed
```

## 🚀 Running the Application

### Development Mode

#### Option 1: Run Separately
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm start
```

#### Option 2: Using Concurrently (if configured)
```bash
# From root directory
npm run dev
```

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Start production server
cd ../backend
npm start
```

## 📁 Project Structure

```
fashionstore/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── styles/
│   │   └── App.js
│   └── public/
└── README.md
```

## 🎯 Available Scripts

### Backend Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample products
```

### Frontend Scripts
```bash
npm start          # Start development server
npm run build      # Create production build
npm test           # Run tests
npm run eject      # Eject from Create React App
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove from cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders

## 💡 Key Features Implementation

### User Authentication
- JWT-based authentication with secure token storage
- Password hashing with bcryptjs
- Protected routes and API endpoints

### Shopping Cart
- Guest cart functionality using session IDs
- Persistent cart for logged-in users
- Real-time cart updates and calculations

### Product Management
- Advanced filtering (category, size, price range)
- Search functionality
- Pagination for better performance

### Order System
- Order creation with email confirmation
- Order history for users
- Guest checkout support

## ⚠️ Trade-offs & Design Decisions

### 1. **State Management**
- **Choice**: React Context API over Redux
- **Reason**: Simpler setup for medium-sized application
- **Trade-off**: May need migration to Redux for larger scale

### 2. **Authentication**
- **Choice**: JWT tokens stored in localStorage
- **Reason**: Stateless authentication, easy implementation
- **Trade-off**: Vulnerable to XSS attacks (mitigated with HttpOnly cookies in production)

### 3. **Database**
- **Choice**: MongoDB with Mongoose
- **Reason**: Flexible schema, good for e-commerce data
- **Trade-off**: Less relational integrity compared to SQL

### 4. **Cart System**
- **Choice**: Guest cart with session IDs + user cart merge
- **Reason**: Better UX for non-logged-in users
- **Trade-off**: Additional complexity in cart management

### 5. **Image Storage**
- **Choice**: Placeholder images
- **Reason**: Quick setup for demo
- **Trade-off**: Need proper image hosting for production

### 6. **Payment Integration**
- **Choice**: Mock payment system
- **Reason**: Simplified development
- **Trade-off**: Requires real payment gateway for production

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
```bash
# Set environment variables in deployment platform
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
EMAIL_USER=your_production_email
EMAIL_PASS=your_production_email_password
```

### Frontend Deployment (Netlify/Vercel)
- Build command: `npm run build`
- Output directory: `build`



---

**Happy Coding!** 🎉
