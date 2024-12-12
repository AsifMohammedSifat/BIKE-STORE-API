# BIKE-STORE-API

This repository contains the code for the **Bike Store API**, a backend application designed to manage the operations of a bike store. The project is built with **Node.js** and **TypeScript**, leveraging **Express.js** and **MongoDB** for efficient data management.

## Live URL

[]

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

## Setup Instructions

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
