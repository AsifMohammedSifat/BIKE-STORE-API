# BIKE-STORE-API

This repository contains the code for the **Bike Store API**, a backend application designed to manage the operations of a bike store. The project is built with **Node.js** and **TypeScript**, leveraging **Express.js** and **MongoDB** for efficient data management.

## Live URL

[BIKE STORE API](https://bike-store-api-seven.vercel.app/)

## Features

- **Product Management**: Add, update, and delete bikes in the store.
- **Order Management**: Track and process customer orders.
- **Environment Setup**: Easy setup for local development using environment variables.

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable backend applications.
- **TypeScript**: A typed superset of JavaScript, providing static typing and improved tooling.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: A NoSQL database for storing product and order data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **CORS**: Middleware for enabling cross-origin requests.
- **ESLint & Prettier**: Code linting and formatting to maintain code quality.

----------------------------------------------------------------------------------

### **Project Setup:**

- Create an Express project with TypeScript.
- Set up a MongoDB database to store **Products** (bikes) and **Orders**.
- Use Mongoose for schema definition and data operations.
- Implement CRUD operations for both bikes and orders.

----------------------------------------------------------------------------------

### **Models:**

1. **Product Model (Bike)**
   - **name** (string): The name of the bike.
   - **brand** (string): The manufacturer or brand of the bike.
   - **price** (number): Price of the bike.
   - **category** (string): Type of bike (e.g., Mountain, Road, Hybrid, Electric). Use `enum` with exact values (`Mountain`, `Road`, `Hybrid`, `Electric`).
   - **description** (string): A brief description of the bike.
   - **quantity** (number): Quantity of the bike available.
   - **inStock** (boolean): Indicates if the bike is in stock.
2. **Order Model**
   - **email** (string): The email address of the customer.
   - **product** (ObjectId): The bike ordered (`unused ref`). (Enter the created productId from your database that represents the bike you want to purchase.)
   - **quantity** (number): The quantity of the ordered bike.
   - **totalPrice** (number): The total price (product price \* quantity).

---

### **Generic Error Response:**

1. **`message`**: A brief error message explaining what went wrong.
2. **`success`**: Set to `false` for error responses.
3. **`error`**: The error message or error object returned by the application (e.g., `"ValidationError"`, `"Resource not found"`).
4. **`stack`**: The stack trace showing where the error occurred in the code.

### Example:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "price": {
        "message": "Price must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Price must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "price",
        "value": -5
      }
    }
  },
  "stack": "Error: Something went wrong\n    at app.js:23:13\n    at..."
}
```

----------------------------------------------------------------------------------

### **Main Section

---

### **1. Create a Bike**

- **Endpoint:** **`/api/products`**
- **Method:** `POST`
- **Request Body:**

```json
{
  "name": "Xtreme Mountain Bike",
  "brand": "Giant",
  "price": 1200,
  "category": "Mountain",
  "description": "A high-performance bike built for tough terrains.",
  "quantity": 50,
  "inStock": true
}
```

- **Response:** Success message and created bike details.

```json
{
  "message": "Bike created successfully",
  "success": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Xtreme Mountain Bike",
    "brand": "Giant",
    "price": 1200,
    "category": "Mountain",
    "description": "A high-performance bike built for tough terrains.",
    "quantity": 50,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

---

### **2. Get All Bikes**

- **Endpoint:** **`/api/products`**
- **Method:** `GET`
- **Response:** A list of all bikes with details like name, brand, price, category, etc.
- Query: A list of all bikes from the same category, accessed via `/api/products?searchTerm=category`. `searchTerm` can be `name`, `brand`, or `category`.

```json
{
  "message": "Bikes retrieved successfully",
  "status": true,
  "data": [
    {
      "_id": "648a45e5f0123c45678d9012",
      "name": "Xtreme Mountain Bike",
      "brand": "Giant",
      "price": 1200,
      "category": "Mountain",
      "description": "A high-performance bike built for tough terrains.",
      "quantity": 50,
      "inStock": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
    // ... rest data
  ]
}
```

---

### **3. Get a Specific Bike**

- **Endpoint:** **`/api/products/:productId`**
- **Method:** `GET`
- **Response:** The details of a specific bike by ID.

```json
{
  "message": "Bike retrieved successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Xtreme Mountain Bike",
    "brand": "Giant",
    "price": 1200,
    "category": "Mountain",
    "description": "A high-performance bike built for tough terrains.",
    "quantity": 50,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

---

### **4. Update a Bike**

- **Endpoint:** **`/api/products/:productId`**
- **Method:** `PUT`
- **Request Body:** (Bike details to update)

```json
{
  "price": 1300,
  "quantity": 30
}
```

- **Response:** Success message and updated bike details.

```json
{
  "message": "Bike updated successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Xtreme Mountain Bike",
    "brand": "Giant",
    "price": 1300, // Price updated
    "category": "Mountain",
    "description": "A high-performance bike built for tough terrains.",
    "quantity": 30, // Quantity updated
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T11:00:00.000Z" // Updated timestamp
  }
}
```

---

### **5. Delete a Bike**

- **Endpoint:** **`/api/products/:productId`**
- **Method:** `DELETE`
- **Response:** Success message confirming the bike has been deleted.

```json
{
  "message": "Bike deleted successfully",
  "status": true,
  "data": {}
}
```

---

### **6. Order a Bike**

- **Endpoint:** **`/api/orders`**
- **Method:** `POST`
- **Inventory Management Logic:**
  - When an order is placed, reduce the **quantity** in the product model.
  - If the inventory quantity goes to zero, set **inStock** to `false`.
  - Handle **insufficient stock** cases by returning an appropriate error message.
- **Request Body:**

```json
{
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",
  "quantity": 2,
  "totalPrice": 2400
}
```

- **Response:** Success message confirming the order.

```json
{
  "message": "Order created successfully",
  "status": true,
  "data": {
    "_id": "648b45f5e1234b56789a6789",
    "email": "customer@example.com",
    "product": "648a45e5f0123c45678d9012",
    "quantity": 2,
    "totalPrice": 2400,
    "createdAt": "2024-11-19T12:00:00.000Z",
    "updatedAt": "2024-11-19T12:00:00.000Z"
  }
}
```

---

### **7. Calculate Revenue from Orders (Aggregation)**

- **Endpoint:** **`/api/orders/revenue`**
- **Method:** `GET`
- **Aggregation Suggestion:**
  - Use MongoDB aggregation pipeline to calculate the total revenue from `all orders`.
  - Calculate the total price by multiplying the price of each bike by the quantity ordered.
- **Response:** The total revenue from all orders.

```json
{
  "message": "Revenue calculated successfully",
  "status": true,
  "data": {
    "totalRevenue": 3600 // Total revenue calculated from all orders
  }
}
```

------------------------------------------------------------------------------------

## How to Start the Project?

Follow these steps to set up the project on your local machine.

## 1. Install Dependencies

```bash
cd bike-store-api
npm install
```

## 2. Install TypeScript

Install TypeScript as a development dependency:

```bash
npm install typescript --save-dev
```

## 3. Set up TypeScript Configuration

Generate the `tsconfig.json` file by running the following command:

```bash
tsc --init
```

## 4. Install Additional Dependencies

Generate the `tsconfig.json` file by running the following command:

```bash
npm install mongoose dotenv express
```

```bash
npm install --save-dev @types/express @types/cors
```

## 5. Create Necessary Folders

Create the `src` and `dist` directories for your source and distribution files:

```bash
mkdir src dist
```

## 6. Install CORS

To enable CORS (Cross-Origin Resource Sharing), install the `cors` package:

```bash
npm install cors
```

Also, install the CORS TypeScript definitions

```bash
npm install --save-dev @types/cors
```

## 7. Linting and Formatting Setup

Follow the guides below to set up ESLint and Prettier for linting and formatting:

- [Linting TypeScript with ESLint and Prettier](https://blog.logrocket.com/linting-typescript-eslint-prettier/)
- [Express, TypeScript, ESLint, Prettier Setup Guide](https://dev.to/shafayat/-express-typescript-eslint-prettiersetup-5fhg)

# Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v20 or later)
- **MongoDB** (locally or through a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git**

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/bike-store-api.git
cd bike-store-api
```

### 2. Install Dependencies

Run the following command:

```bash
npm install
```

### 3. Configure Environment Variables

Create a .env file in the root of your project and add the following:

```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 4. Run the Application

Create a .env file in the root of your project and add the following:

```bash
npm run start:dev
```

### 5. Access the API

```bash
Products:
GETAdd New Bike: https://bike-store-api-seven.vercel.app/api/products
Body:
{
  "name": "Xtreme Mountain Bike",
  "brand": "Giant",
  "price":  1200,
  "category": "Mountain",
  "description": "A high-performance bike built for tough terrains.",
  "quantity": 50,
  "inStock": true
}

http://localhost:5000/api/
http://localhost:5000/api/products

```
