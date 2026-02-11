# ✅ FINAL VERIFICATION CHECKLIST

## Pre-Startup Checklist

### Backend Configuration
- [ ] Backend `.env` has correct FRONTEND_URL=http://localhost:5174
- [ ] Backend `.env` has correct ADMIN_URL=http://localhost:5173
- [ ] MongoDB connection string is valid in `.env`
- [ ] STRIPE_SECRET_KEY is set in `.env`
- [ ] CLOUDINARY credentials are in `.env`
- [ ] JWT_SECRET is configured in `.env`

### Admin Configuration
- [ ] Admin `.env` has VITE_BACKEND_URL=http://localhost:3000
- [ ] Admin node_modules installed (`npm install` completed)

### Frontend Configuration
- [ ] Frontend `.env` has VITE_BACKEND_URL=http://localhost:3000
- [ ] Frontend node_modules installed (`npm install` completed)

### System
- [ ] Port 3000 is available (not in use)
- [ ] Port 5173 is available (not in use)
- [ ] Port 5174 is available (not in use)
- [ ] MongoDB is running/accessible

---

## Startup Sequence

### Step 1: Start Backend (Port 3000)
```bash
cd backend
npm start
# OR
node server.js
```
✅ Expected Output:
```
[dotenv] injecting env (10) from .env
✅ Connected to DB
✅ Backend running on port 3000
```

**Verify**:
```bash
curl http://localhost:3000/api/food/list
# Should return: {"success": true, "foods": [...]}
```

### Step 2: Start Admin (Port 5173)
```bash
cd Admin
npm run dev
```
✅ Expected Output:
```
➜  Local:   http://localhost:5173/
```

**Verify**:
- Open http://localhost:5173 in browser
- Should see admin dashboard without errors

### Step 3: Start Frontend (Port 5174)
```bash
cd frontend
npm run dev
```
✅ Expected Output:
```
➜  Local:   http://localhost:5174/
```

**Verify**:
- Open http://localhost:5174 in browser
- Should see home page with food items

---

## Runtime Verification Checklist

### After Startup - Backend
- [ ] No console errors in backend terminal
- [ ] Can curl /api/food/list and get foods array
- [ ] Can see network requests being logged

### After Startup - Admin
- [ ] Dashboard loads without "Network Error"
- [ ] Browser console has no CORS errors
- [ ] Can see F12 DevTools → Network tab showing requests to localhost:3000

### After Startup - Frontend
- [ ] Home page loads with food items
- [ ] No "Network Error" in browser
- [ ] Cart icon visible and functional
- [ ] "Sign In" button is visible

---

## Authentication Flow Verification

### Test 1: User Signup
**Location**: http://localhost:5174
1. [ ] Click "Sign In"
2. [ ] Fill: Name, Email, Password (8+ chars)
3. [ ] Click "Create Account"
4. [ ] Modal should close
5. [ ] Profile icon should appear in navbar
6. [ ] Browser DevTools → Application → LocalStorage
    - [ ] `token` key exists
    - [ ] `userId` key exists

### Test 2: User Login
**Location**: http://localhost:5174
1. [ ] Click profile icon → "Log out"
2. [ ] Click "Sign In"
3. [ ] Select "Log In"
4. [ ] Enter email and password
5. [ ] Click "Login"
6. [ ] Modal should close
7. [ ] Profile icon should appear
8. [ ] Check localStorage for token again

### Test 3: Token Persistence
**Location**: http://localhost:5174
1. [ ] Logged in, refresh page (F5)
2. [ ] Should still be logged in (no sign-in prompt)
3. [ ] Profile icon should be there
4. [ ] Close and reopen browser tab
5. [ ] Should still be logged in

---

## API Endpoint Verification

### Test Public Endpoints

#### 1. Get Food List
```bash
curl http://localhost:3000/api/food/list
```
✅ Expected:
```json
{
  "success": true,
  "foods": [
    {
      "_id": "...",
      "name": "Food Name",
      "price": 100,
      "image": "https://cloudinary.com/...",
      ...
    }
  ]
}
```

#### 2. Signup
```bash
curl -X POST http://localhost:3000/api/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```
✅ Expected:
```json
{
  "success": true,
  "message": "User created successfully",
  "token": "eyJhbGciOi...",
  "id": "user_id_here"
}
```

#### 3. Login
```bash
curl -X POST http://localhost:3000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```
✅ Expected:
```json
{
  "success": true,
  "token": "eyJhbGciOi...",
  "id": "user_id_here"
}
```

---

## Protected Endpoint Verification

### Setup
```bash
# Get token from login response
TOKEN="eyJhbGciOi..."
```

### Test Protected Endpoints

#### 1. Add to Cart
```bash
curl -X POST http://localhost:3000/api/cart/add \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"Itemid": "food_id_here"}'
```
✅ Expected: `{"success": true, "cartdata": {...}}`

#### 2. Get Cart
```bash
curl -X POST http://localhost:3000/api/cart/get \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```
✅ Expected: `{"success": true, "cartdata": {...}}`

#### 3. Place Order
```bash
curl -X POST http://localhost:3000/api/order/placeorder \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "Items": [{...}],
    "address": {...},
    "amount": 100
  }'
```
✅ Expected: `{"success": true, "session_url": "https://checkout.stripe.com/..."}`

#### 4. Get User Orders
```bash
curl -X POST http://localhost:3000/api/order/userorder \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```
✅ Expected: `{"success": true, "orders": [{...}]}`

---

## Admin Endpoint Verification

### Setup
1. [ ] Create admin user in database: `isAdmin: true`
2. [ ] Login with admin account
3. [ ] Get token from response
4. [ ] Use token in requests below

### Test Admin Endpoints

#### 1. Add Food Item
```bash
# First, upload image and get image file
curl -X POST http://localhost:3000/api/food/add \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -F "image=@path/to/image.jpg" \
  -F "name=Burger" \
  -F "description=Delicious burger" \
  -F "price=100" \
  -F "category=Fast Food"
```
✅ Expected: `{"success": true, "message": "Food added"}`

#### 2. Get All Orders
```bash
curl http://localhost:3000/api/order/allorders \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```
✅ Expected: `{"success": true, "orders": [{...}]}`

#### 3. Update Order Status
```bash
curl -X POST http://localhost:3000/api/order/status \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "order_id_here",
    "status": "Order Ready"
  }'
```
✅ Expected: `{"success": true, "message": "Status updated"}`

---

## Frontend User Flow Test

### Flow: Browse → Cart → Checkout

#### Step 1: Browse Items
- [ ] Navigate to http://localhost:5174
- [ ] See list of food items
- [ ] Items have images, names, prices
- [ ] Category filter works

#### Step 2: Add to Cart
- [ ] Click "Add to Cart" on any item
- [ ] Cart count increases in navbar
- [ ] Item added to cart context

#### Step 3: View Cart
- [ ] Click cart icon
- [ ] See added items with quantities
- [ ] See subtotal, delivery fee, total
- [ ] Can remove items
- [ ] Quantities can be changed

#### Step 4: Proceed to Checkout
- [ ] Click "Proceed to Checkout" (requires login)
- [ ] If not logged in, redirects to sign-in
- [ ] After login, redirects to Order form
- [ ] Form displays delivery address fields
- [ ] All fields are visible and functional

#### Step 5: Fill Delivery Info
- [ ] Fill: First Name, Last Name, Email
- [ ] Fill: Street, City, State, PIN, Country, Phone
- [ ] All fields show no validation errors
- [ ] Submit button is visible

#### Step 6: Submit Order
- [ ] Click "Place Order"
- [ ] Redirected to Stripe checkout
- [ ] Can complete payment (use test card: 4242 4242 4242 4242)
- [ ] After payment, redirects to /order-success
- [ ] Shows success message

#### Step 7: Track Order
- [ ] Click profile icon → "Orders"
- [ ] See placed order in list
- [ ] Order shows items, amount, status
- [ ] Can see multiple orders if placed multiple

---

## Admin Dashboard Test

### Flow: Add → List → Manage

#### Step 1: Login as Admin
- [ ] Navigate to http://localhost:5173
- [ ] Login (admin user with isAdmin=true)
- [ ] Redirected to dashboard
- [ ] No errors in console

#### Step 2: Add Food Item
- [ ] Navigate to "Add" page
- [ ] Image upload field appears
- [ ] Form fields: Name, Description, Price, Category
- [ ] Upload an image
- [ ] Fill all fields
- [ ] Submit form
- [ ] Toast shows "Item added successfully"
- [ ] Cloudinary image uploaded successfully

#### Step 3: View Food List
- [ ] Navigate to "List" page
- [ ] All food items displayed in table
- [ ] New item appears in list
- [ ] Images load correctly
- [ ] Each item has delete button (X)
- [ ] Can see: Image, Name, Category, Price

#### Step 4: Delete Food Item
- [ ] Click X button on any item
- [ ] Toast shows "Food removed"
- [ ] Item disappears from list
- [ ] Image deleted from Cloudinary
- [ ] List refreshes automatically

#### Step 5: View Orders
- [ ] Navigate to "Order" page
- [ ] All orders displayed
- [ ] Shows customer info, items, amount
- [ ] Status dropdown visible for each order
- [ ] Can see multiple orders

#### Step 6: Update Order Status
- [ ] Click status dropdown on any order
- [ ] Select new status (e.g., "Order Ready")
- [ ] Status updates automatically
- [ ] Toast shows "Status updated"
- [ ] Database reflects change

---

## Error Scenarios

### Test Error Handling

#### Test 1: Unauthorized Access
- [ ] Try accessing protected endpoint without token
  ```bash
  curl http://localhost:3000/api/cart/get
  ```
- [ ] Should get: 401 "No token provided"

#### Test 2: Invalid Token
- [ ] Use invalid token in request
- [ ] Should get: 401 "Invalid or expired token"

#### Test 3: Non-Admin Access to Admin Endpoint
- [ ] Use regular user token for /api/food/add
- [ ] Should get: 403 "Access denied"

#### Test 4: Missing Required Fields
- [ ] POST /api/user/signup with missing email
- [ ] Should get: 400 "Invalid email"

#### Test 5: Duplicate Email
- [ ] Signup with existing email
- [ ] Should get: 400 "User already exists"

#### Test 6: CORS Error
- [ ] Not applicable if CORS properly configured
- [ ] But test from different origin if needed

---

## Performance Checks

### Network Performance
- [ ] API response time < 500ms
- [ ] Image loading < 2s
- [ ] Page load < 3s

### Database
- [ ] No N+1 query problems
- [ ] Indexes on frequently queried fields
- [ ] Connection pooling working

### Frontend
- [ ] No memory leaks in console
- [ ] No unnecessary re-renders
- [ ] Images properly cached

---

## Security Checks

### Authentication
- [ ] Token expiration working (7 days)
- [ ] Password hashing with bcrypt
- [ ] No passwords in logs/responses

### Authorization
- [ ] Admin endpoints require isAdmin=true
- [ ] Regular users can't access admin routes
- [ ] Users can only see their own orders

### Data
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] HTTPS ready (for production)

### API
- [ ] CORS properly configured
- [ ] Rate limiting (consider for production)
- [ ] Input validation on all endpoints

---

## Final Approval Checklist

### Code Quality
- [ ] No console.log() spam (only errors)
- [ ] No hardcoded URLs (all use .env)
- [ ] No commented-out code blocks
- [ ] Proper error handling everywhere
- [ ] Consistent code style

### Documentation
- [ ] README files present
- [ ] API documentation complete
- [ ] Component documentation clear
- [ ] Environment variables documented

### Testing
- [ ] All public APIs working
- [ ] All protected APIs working
- [ ] All admin APIs working
- [ ] Error scenarios handled
- [ ] Full user flow works end-to-end

### Deployment Readiness
- [ ] No dev dependencies in production build
- [ ] Build completes without warnings
- [ ] Assets properly bundled
- [ ] Environment variables configured

---

## Sign-Off

- [ ] **Backend**: Ready for testing
- [ ] **Admin**: Ready for testing
- [ ] **Frontend**: Ready for testing
- [ ] **Database**: Properly configured
- [ ] **All connections**: Verified and working

**Date**: ___________
**Tester**: ___________
**Status**: ✅ APPROVED FOR PRODUCTION TESTING

---

**All systems go! 🚀**
