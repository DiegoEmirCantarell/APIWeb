# APIWeb - Online Marketplace API

A RESTful API for an online marketplace platform that allows users to buy and sell products.

## Features

- User authentication (register, login)
- User roles (buyer, seller)
- Product management (CRUD operations)
- Category management
- Protected routes with JWT authentication

## Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT Authentication

## Getting Started

### Prerequisites

- Node.js (v14+)
- MySQL

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/APIWeb.git
cd APIWeb
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:

```
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=mydb

# JWT Secret
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h
```

4. Create the database:
   - Use the provided SQL script in `docs/files/proyecto_base.sql`

```bash
mysql -u root -p < docs/files/proyecto_base.sql
```

5. Seed the database (optional):

```bash
npm run seed
```

### Running the Application

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Users

- `GET /api/users/me` - Get current user
- `PATCH /api/users/updateMe` - Update current user

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product (seller only)
- `PATCH /api/products/:id` - Update a product (owner only)
- `DELETE /api/products/:id` - Delete a product (owner only)

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get a specific category with its products
- `POST /api/categories` - Create a new category (seller only)
- `PATCH /api/categories/:id` - Update a category (seller only)
- `DELETE /api/categories/:id` - Delete a category (seller only)

## License

This project is licensed under the ISC License.