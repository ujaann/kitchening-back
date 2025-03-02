# Kitchening Backend

This is the backend for the Kitchening application, a web API for managing recipes, users, ratings, and comments. The backend is built using Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- CRUD operations for recipes
- Image upload for user profiles and recipes
- Rating and commenting on recipes
- JWT-based authentication

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Multer (for file uploads)
- bcrypt (for password hashing)
- dotenv (for environment variables)


## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance running
- Create a `.env` file in the root directory with the following variables:
  ```
  MONGO_URI=<your_mongodb_connection_string>
  SECRET_KEY=<your_secret_key>
  ```

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd kitchening-back
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

The server will start on port 5000.

## API Endpoints

### User Routes

- `GET /api/user/` - Get all users (requires authentication)
- `GET /api/user/:id` - Get user by ID
- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login a user
- `DELETE /api/user/:id` - Delete user by ID (requires authentication)
- `PUT /api/user/:id` - Update user by ID (requires authentication)
- `POST /api/user/uploadImage` - Upload user profile image
- `GET /api/user/:id/getProfileImage` - Get user profile image

### Recipe Routes

- `GET /api/recipe/` - Get all recipes
- `GET /api/recipe/:id` - Get recipe by ID
- `POST /api/recipe/` - Create a new recipe
- `DELETE /api/recipe/:id` - Delete recipe by ID (requires authentication)
- `PUT /api/recipe/:id` - Update recipe by ID (requires authentication)
- `POST /api/recipe/uploadImage` - Upload recipe image (requires authentication)
- `GET /api/recipe/getRecipeImage/:imageName` - Get recipe image

### Rating Routes

- `GET /api/rating/user/:userId` - Get all ratings for a user
- `GET /api/rating/recipe/:recipeId` - Get all ratings for a recipe
- `POST /api/rating/recipe/:recipeId` - Create a rating for a recipe
- `DELETE /api/rating/:id` - Delete rating by ID
- `PATCH /api/rating/recipe/:recipeId` - Toggle rating for a recipe

### Comment Routes

- `GET /api/comment/recipe/:recipeId` - Get all comments for a recipe
- `POST /api/comment/recipe/:recipeId` - Create a comment for a recipe (requires authentication)
- `DELETE /api/comment/` - Delete comment (requires authentication)
- `PATCH /api/comment/:commentId` - Update comment (requires authentication)

## Middleware

- `authenticateToken` - Middleware to authenticate JWT tokens
- `authorizeRole` - Middleware to authorize user roles

## Error Handling

Custom error handling middleware is used to handle errors and send appropriate responses.

## License

This project is licensed under the MIT License.
