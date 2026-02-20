#  React Native ECOMAPP
 
A full-featured eCommerce mobile application built using **React Native CLI**.

---

## Features


-  Profile screen (view stored email and username)
-  Product listing from Fake Store API
-  Search products by title
-  Product detail screen
-  Add to Cart (with quantity controls)
-  Checkout screen
-  
-  
---

##  Tech Stack & Packages

| Tool/Library                            | Purpose                                 |
|----------------------------------------|-----------------------------------------|
| React Native CLI                       | Core framework                          |
| @react-navigation/native               | Navigation stack                        |
| @react-navigation/native-stack         | Stack navigation                        |
| react-native-vector-icons              | Icons (MaterialCommunityIcons)          |
       
| Fake Store API                         | Product API (https://fakestoreapi.com)  |

---

##  Folder Structure

root/
├── android/
├── ios/
├── src/
│ ├── api/
│ │ └── productService.js
│ ├── screens/
│ │ ├── 
│ │ ├── 
│ │ ├── HomeScreen.js
│ │ ├── ProductDetailScreen.js
│ │ ├── CartScreen.js
│ │ ├── CheckoutScreen.js
│ │
│ └── navigation/
│ └── AppNavigator.js
├── App.js
└── README.md

# Install Dependencies-
npm install
# or
yarn install


# Run the app:
npx react-native run-android

# API Used:
Fake Store API
All Products: https://fakestoreapi.com/products
Single Product: https://fakestoreapi.com/products/:id
No API key or auth needed. It returns JSON responses with product id, title, price, image, etc.





#Cart and Checkout:
Users can add products to cart from the product detail screen.
Cart supports quantity adjustment.
Checkout button clears the cart and shows a confirmation.

# Navigation Structure
Uses @react-navigation/native-stack for screen transitions.
All screens are registered in a central file: AppNavigator.js.
Login/Signup/Logout logic is decoupled from navigation using conditional flows (navigation.replace('Home'), etc.).





# Stateless API Calls:
The app uses https://fakestoreapi.com, which doesn’t require auth tokens.
fetchProducts() and fetchProductById() abstract API logic.

# Simple State Management:
Redux was used to keep the app lightweight.State is handled locally via useState and useEffect.

# UI/UX Considerations:
Minimal, clean design using native components (TextInput, FlatList, etc.)
Vector icons from react-native-vector-icons enhance UI
Reusable card design for products
Header icons for profile, logout, and cart improve navigation


# Performance Choices
Image rendering is optimized using proper dimensions and resizeMode.
useLayoutEffect is used to update navigation headers dynamically.
FlatList is used for efficient list rendering.

 



#Building APK:
cd android
gradlew assembleRelease






