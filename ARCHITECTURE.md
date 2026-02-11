# Architecture & Connection Flow - FIXED ✅

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMPLETE SYSTEM OVERVIEW                      │
└─────────────────────────────────────────────────────────────────┘

                    ┌──────────────────────┐
                    │   Backend Server     │
                    │  (Port 3000)         │
                    │                      │
                    │  - Express.js        │
                    │  - MongoDB           │
                    │  - JWT Auth          │
                    │  - Stripe            │
                    │  - Cloudinary        │
                    └──────────────────────┘
                         ▲         ▲
                         │         │
          ┌──────────────┘         └──────────────┐
          │                                       │
          │    CORS Enabled                       │    CORS Enabled
          │    Port 5173 + 5174                   │    Port 5173 + 5174
          │    Auth: Bearer {token}               │    Auth: Bearer {token}
          │                                       │
    ┌─────────────────────┐              ┌──────────────────────┐
    │  Admin Dashboard    │              │  User Frontend       │
    │  (Port 5173)        │              │  (Port 5174)         │
    │                     │              │                      │
    │  - Vite + React     │              │  - Vite + React      │
    │  - Add Food Items   │              │  - Browse Items      │
    │  - Manage Orders    │              │  - Shopping Cart     │
    │  - View Analytics   │              │  - Place Orders      │
    │  - Auth Required    │              │  - Track Orders      │
    └─────────────────────┘              └──────────────────────┘

```

---

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      USER SIGNUP FLOW                            │
└─────────────────────────────────────────────────────────────────┘

Frontend (5174)
    │
    ├─→ User clicks "Sign Up"
    │
    ├─→ Opens Signpopup modal
    │   ├─ Input: name, email, password
    │   └─ Validation: email format, password 8+ chars
    │
    ├─→ POST /api/user/signup
    │   └─ Body: { name, email, password }
    │
    └─→ Backend (3000)
        ├─ Hash password with bcrypt
        ├─ Create user in MongoDB
        ├─ Generate JWT token (7 days)
        └─ Response: { token, id, success }
            │
            └─→ Frontend stores:
                ├─ localStorage.token = token
                ├─ localStorage.userId = id
                └─ context.token = token
                    │
                    └─→ Can now:
                        ├─ Add items to cart
                        ├─ Place orders
                        └─ View orders

```

---

## 🛒 Shopping Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER SHOPPING FLOW                            │
└─────────────────────────────────────────────────────────────────┘

Frontend (5174)
    │
    ├─→ GET /api/food/list (public)
    │   └─→ Display all food items
    │
    ├─→ User adds item to cart
    │   ├─ Check token exists
    │   ├─ POST /api/cart/add
    │   │   └─ Auth: Bearer {token}
    │   │   └─ Body: { Itemid }
    │   └─ Update context: cartItem
    │
    ├─→ View cart
    │   └─ Display items with totals
    │       ├─ Subtotal
    │       ├─ Delivery Fee ($2)
    │       └─ Total
    │
    ├─→ Click "Proceed to Checkout"
    │   ├─ Check token exists
    │   ├─ Check cart not empty
    │   └─ Redirect to Order form
    │
    ├─→ Fill delivery address
    │
    ├─→ Click "Place Order"
    │   ├─ POST /api/order/placeorder
    │   │   ├─ Auth: Bearer {token}
    │   │   ├─ Body: {
    │   │   │   userId, Items[], address, amount
    │   │   │ }
    │   │   └─ Returns: session_url (Stripe)
    │   │
    │   └─→ Redirect to Stripe checkout
    │
    ├─→ User completes payment (Stripe)
    │
    ├─→ Stripe redirects back to /order-success?orderId=...
    │   ├─ POST /api/order/verify
    │   │   ├─ Auth: Bearer {token}
    │   │   └─ Check: order.payment = true
    │   └─ Display success message
    │
    ├─→ User can view orders
    │   ├─ Click profile → "Orders"
    │   ├─ POST /api/order/userorder
    │   │   ├─ Auth: Bearer {token}
    │   │   └─ Returns: user's orders[]
    │   └─ Track order status

```

---

## 👨‍💼 Admin Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      ADMIN OPERATIONS                            │
└─────────────────────────────────────────────────────────────────┘

Admin Dashboard (5173)
    │
    ├─→ Login with admin account
    │   ├─ POST /api/user/login
    │   ├─ Token returned with isAdmin = true
    │   └─ Token stored: localStorage.token
    │
    ├─→ Navigate to "Add" page
    │   ├─ Upload image
    │   │   └─ File sent to Cloudinary
    │   ├─ Fill: name, description, price, category
    │   ├─ POST /api/food/add
    │   │   ├─ Auth: Bearer {token}
    │   │   ├─ Check: req.user.isAdmin = true
    │   │   └─ Save to MongoDB with Cloudinary URL
    │   └─ Toast: "Item added successfully"
    │
    ├─→ Navigate to "List" page
    │   ├─ GET /api/food/list (public)
    │   ├─ Display all food items
    │   ├─ Show delete button (admin only)
    │   └─ Can delete item:
    │       ├─ POST /api/food/remove
    │       ├─ Auth: Bearer {token}
    │       ├─ Check: req.user.isAdmin = true
    │       ├─ Delete from MongoDB
    │       ├─ Delete image from Cloudinary
    │       └─ Refresh list
    │
    ├─→ Navigate to "Orders" page
    │   ├─ GET /api/order/allorders
    │   │   ├─ Auth: Bearer {token}
    │   │   ├─ Check: req.user.isAdmin = true
    │   │   └─ Returns: all orders[]
    │   │
    │   ├─ Display order details
    │   │   ├─ Customer info
    │   │   ├─ Food items ordered
    │   │   ├─ Amount
    │   │   └─ Current status
    │   │
    │   └─ Update order status
    │       ├─ Select new status from dropdown
    │       ├─ POST /api/order/status
    │       ├─ Auth: Bearer {token}
    │       ├─ Check: req.user.isAdmin = true
    │       ├─ Update MongoDB
    │       └─ Refresh list

```

---

## 🔐 Authentication System

```
┌─────────────────────────────────────────────────────────────────┐
│                  TOKEN-BASED AUTHENTICATION                      │
└─────────────────────────────────────────────────────────────────┘

Token Flow:
──────────
1. User Signs Up / Logs In
   └─→ Backend generates JWT token
       └─ Claims: { id, iat, exp }
       └─ Signed with: JWT_SECRET
       └─ Expires: 7 days

2. Frontend stores token
   └─→ localStorage.token

3. Frontend makes request
   └─→ Headers: { Authorization: "Bearer {token}" }

4. Backend validates token
   └─→ Extract token from header
   └─→ Verify signature with JWT_SECRET
   └─→ Check expiration
   └─→ Extract user ID from claims

5. Fetch user from database
   └─→ Get user document
   └─→ Check user.isAdmin status
   └─→ Attach to req.user

6. Authorize request
   ├─ Public routes: No check needed
   ├─ Protected routes: token required
   └─ Admin routes: token + isAdmin required

Admin Status Determination:
──────────────────────────
❌ OLD: Checked from JWT token
        └─ Problem: Can't change admin status without re-login

✅ NEW: Fetched from database
        └─ Solution: Can change status anytime
        └─ Applied on next request

```

---

## 📡 API Endpoint Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                       ALL ENDPOINTS                              │
└─────────────────────────────────────────────────────────────────┘

PUBLIC ENDPOINTS (No Auth)
─────────────────────────
GET  /api/food/list                 → Get all foods
POST /api/user/signup               → Create account
POST /api/user/login                → Login user
POST /api/order/webhook             → Stripe webhook

PROTECTED ENDPOINTS (Auth Required)
───────────────────────────────────
POST /api/cart/add       Auth        → Add to cart
POST /api/cart/remove    Auth        → Remove from cart
POST /api/cart/get       Auth        → Get cart
POST /api/order/placeorder Auth      → Create order
POST /api/order/userorder Auth       → Get user orders
POST /api/order/verify   Auth        → Check payment status

ADMIN ENDPOINTS (Auth + isAdmin)
────────────────────────────────
POST /api/food/add       Auth+Admin  → Add food item
POST /api/food/remove    Auth+Admin  → Delete food item
GET  /api/order/allorders Auth+Admin → Get all orders
POST /api/order/status   Auth+Admin  → Update order status

```

---

## 🗄️ Database Schema

```
┌─────────────────────────────────────────────────────────────────┐
│                    MONGODB COLLECTIONS                           │
└─────────────────────────────────────────────────────────────────┘

USERS
─────
{
  _id: ObjectId          ← Unique ID
  name: String           ← User's name
  email: String          ← Email (unique)
  password: String       ← Hashed password
  isAdmin: Boolean       ← Admin flag (false by default)
  cartdata: Object       ← { itemId: quantity, ... }
  createdAt: Date        ← Account creation date
}

FOODS
─────
{
  _id: ObjectId          ← Unique ID
  name: String           ← Food name
  description: String    ← Food description
  price: Number          ← Price
  category: String       ← Category (Salad, Bread, etc.)
  image: String          ← Cloudinary URL
  imageId: String        ← Cloudinary public_id (for deletion)
  createdAt: Date        ← Creation date
}

ORDERS
──────
{
  _id: ObjectId          ← Unique ID
  userId: String         ← Reference to user._id
  Items: Array           ← [{ name, price, quantity, ... }, ...]
  amount: Number         ← Total amount
  address: Object        ← { street, city, state, ... }
  status: String         ← "Food Processing" (default)
  payment: Boolean       ← false (true after Stripe)
  date: Date             ← Order creation date
}

```

---

## ✅ All Connections Verified

```
Admin (5173)        ←→      Backend (3000)      ←→      Frontend (5174)
   │                           │                            │
   ├─ Can add foods    ├─ Stores data         ├─ Can browse foods
   ├─ Can delete foods ├─ Handles auth        ├─ Can buy food
   ├─ Can view orders  ├─ Processes payments  ├─ Can track orders
   └─ Can update order └─ Validates requests  └─ Can view account

CORS: ✅ Configured for all three
Auth: ✅ JWT tokens required
Data: ✅ Synced across all endpoints
Images: ✅ Stored on Cloudinary
Payments: ✅ Handled by Stripe
```

---

## 🎯 System Ready For:

✅ User account creation and management
✅ Food browsing and filtering
✅ Shopping cart functionality
✅ Order placement and checkout
✅ Stripe payment processing
✅ Order tracking
✅ Admin food management
✅ Admin order management
✅ Admin status updates

---

**Architecture fully documented and verified! Ready for production testing! 🚀**
