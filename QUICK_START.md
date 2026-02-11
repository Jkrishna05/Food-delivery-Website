# Quick Start Guide - After Fixes

## 🚀 Step-by-Step Setup

### Prerequisites
```bash
# Ensure you have Node.js 16+ installed
node --version  # v16.0.0 or higher
npm --version   # 7.0.0 or higher
```

---

## 1️⃣ Backend Setup

### Terminal 1: Backend
```bash
cd c:\Users\asus\Desktop\Webdev\FoodDelivery\backend

# Install dependencies
npm install

# Start server
node server.js

# Expected output:
# ✅ Connected to DB
# ✅ Backend running on port 3000
```

### Verify Backend
```bash
# In any terminal, test API:
curl http://localhost:3000/api/food/list

# Should return: { "success": true, "foods": [...] }
```

---

## 2️⃣ Admin Frontend Setup

### Terminal 2: Admin
```bash
cd c:\Users\asus\Desktop\Webdev\FoodDelivery\Admin

# Install dependencies
npm install

# Start dev server
npm run dev

# Expected output:
# ➜  Local: http://localhost:5173/
```

### Access Admin Dashboard
- URL: `http://localhost:5173`
- **Add Page**: Add new food items
- **List Page**: View and delete food items
- **Order Page**: View and manage orders

---

## 3️⃣ Frontend Setup

### Terminal 3: Frontend
```bash
cd c:\Users\asus\Desktop\Webdev\FoodDelivery\frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Expected output:
# ➜  Local: http://localhost:5174/
```

### Access User Dashboard
- URL: `http://localhost:5174`
- Browse food items
- Sign up / Login
- Add to cart
- Checkout with Stripe

---

## ⚙️ Configuration Verification

### Check Backend .env
```bash
# File: backend/.env
cat backend/.env

# Should have:
FRONTEND_URL=http://localhost:5174
ADMIN_URL=http://localhost:5173
JWT_SECRET=random
# ... other configs
```

### Check Admin .env
```bash
# File: Admin/.env
cat Admin/.env

# Should have:
VITE_BACKEND_URL=http://localhost:3000
```

### Check Frontend .env
```bash
# File: frontend/.env
cat frontend/.env

# Should have:
VITE_BACKEND_URL=http://localhost:3000
```

---

## 🧪 Quick Test Scenarios

### Test 1: Public API (No Auth)
```bash
# Get all food items
curl http://localhost:3000/api/food/list

# Expected Response:
# {
#   "success": true,
#   "foods": [
#     { "_id": "...", "name": "Burger", "price": 10, ... },
#     ...
#   ]
# }
```

### Test 2: User Signup
1. Go to `http://localhost:5174`
2. Click "Sign In"
3. Click "Create a new account"
4. Fill in Name, Email, Password (8+ chars)
5. Click "Create Account"
6. **Expected**: Modal closes, token stored in localStorage

### Test 3: User Login
1. Click "Sign In" again
2. Switch to "Log In"
3. Enter email and password
4. Click "Login"
5. **Expected**: Modal closes, profile icon appears

### Test 4: Add to Cart
1. On home page, click "Add to Cart" on any item
2. Verify cart count increases in navbar
3. Click cart icon to view items
4. **Expected**: Item shows with quantity and price

### Test 5: Checkout
1. Click "Proceed To Checkout" from cart
2. Fill delivery information
3. Click "Place Order"
4. **Expected**: Redirects to Stripe checkout page

### Test 6: View My Orders
1. Click profile icon → "Orders"
2. **Expected**: Shows all user's orders with status

### Test 7: Admin Operations
1. Go to `http://localhost:5173`
2. Login (admin user required in database)
3. **Add Page**: Upload image, fill details, submit
4. **List Page**: View all items, click X to delete
5. **Order Page**: View all orders, change status

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Error: EADDRINUSE (Port 3000 in use)
# Solution 1: Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Solution 2: Change PORT in .env
PORT=3001
```

### Admin/Frontend can't reach backend
```bash
# Issue: Network Error in browser console
# Check 1: Backend running on port 3000?
curl http://localhost:3000/api/food/list

# Check 2: .env has correct URL?
cat Admin/.env
cat frontend/.env

# Check 3: CORS enabled?
# Search "CORS" in backend/server.js
```

### Images not loading in Admin
```bash
# Issue: Food images show broken
# Check 1: Cloudinary credentials in backend/.env?
CLOUDINARY_CLOUD_NAME=dnwxzghyj
CLOUDINARY_API_KEY=281284279539973

# Check 2: Image upload successful?
# Check browser console for upload errors
```

### 401 Unauthorized errors
```bash
# Issue: "No token provided" error
# Solution: User must login first
# Logout and login again to refresh token

# If token still invalid:
# 1. Open DevTools → Application → LocalStorage
# 2. Delete 'token' key
# 3. Login again
```

### 403 Forbidden (Admin endpoints)
```bash
# Issue: User not admin
# Solution: Database modification required
# Admin user must have isAdmin: true in users collection

# Temporary solution for testing:
# 1. Sign up new account
# 2. Use MongoDB compass/Atlas to set isAdmin: true
# 3. Logout and login again
```

---

## 📊 API Endpoints Reference

### Public Endpoints (No Auth)
```
GET    /api/food/list                    → Gets all food items
POST   /api/user/signup                  → Create account
POST   /api/user/login                   → Login user
POST   /api/order/webhook                → Stripe webhook
```

### Protected Endpoints (Auth Required)
```
POST   /api/cart/add                     → Add item to cart
POST   /api/cart/remove                  → Remove from cart
POST   /api/cart/get                     → Get cart items
POST   /api/order/placeorder             → Create order
POST   /api/order/userorder              → Get user orders
POST   /api/order/verify                 → Verify payment
```

### Admin Endpoints (Auth + Admin)
```
POST   /api/food/add                     → Add new food
POST   /api/food/remove                  → Delete food
GET    /api/order/allorders              → Get all orders
POST   /api/order/status                 → Update order status
```

---

## 📝 Database Structure

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  isAdmin: Boolean (default: false),
  cartdata: Object (default: {}),
  createdAt: Date
}
```

### Foods Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String (Cloudinary URL),
  imageId: String (Cloudinary ID),
  createdAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  userId: String,
  Items: Array[{name, price, quantity, ...}],
  amount: Number,
  address: Object,
  status: String (default: "Food Processing"),
  payment: Boolean (default: false),
  date: Date
}
```

---

## 🎯 Success Indicators

✅ You'll know everything is working when:

1. **Backend**: Console shows "✅ Backend running on port 3000"
2. **Admin**: Loads at http://localhost:5173 without errors
3. **Frontend**: Loads at http://localhost:5174 without errors
4. **Food List**: Shows items from database
5. **Sign Up**: Works and stores token in localStorage
6. **Cart**: Items persist and calculate correctly
7. **Orders**: Can place orders and see them in My Orders
8. **Admin**: Can add/delete food and manage orders

---

## 🆘 Still Having Issues?

### Debug Checklist
- [ ] All 3 servers running (check ports 3000, 5173, 5174)
- [ ] Backend .env has correct MongoDB connection
- [ ] Backend CORS includes both admin and frontend URLs
- [ ] Admin/Frontend .env has VITE_BACKEND_URL=http://localhost:3000
- [ ] No console errors in browser DevTools
- [ ] No console errors in terminal outputs
- [ ] Cleared browser cache (Ctrl+Shift+Delete)
- [ ] Token exists in localStorage after login

### Check Logs
```bash
# Backend logs should show all incoming requests
# Admin logs should show API calls
# Frontend logs should show network activity

# Open DevTools (F12) → Network tab to inspect:
# - API endpoints being called
# - Status codes (200, 401, 403, 500, etc.)
# - Response bodies for errors
```

---

**You're all set! 🚀 Start with Backend, then Admin, then Frontend.**
