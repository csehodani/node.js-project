User Authentication and Management Microservices
This project comprises two microservices: auth-service and user-service. The former handles user authentication, while the latter manages user data, including profiles and addresses. MongoDB serves as the database for both services.
Table of Contents

- Overview
- Architecture
- Setup
- Running the Application
- Environment Variables
- API Endpoints
- Authentication
- Dependencies
- Troubleshooting
  Overview
- auth-service: Responsible for user authentication.
- user-service: Manages user profiles and addresses.
- MongoDB: Stores user data.
- Moleculer: Microservices framework for Node.js.
  Architecture
  The project follows a microservices architecture:
- auth-service: Manages user authentication.
- user-service: Manages user data.
- MongoDB: Stores user-related information.
- Moleculer: Facilitates communication between microservices.
  Setup
  Follow these steps to set up the application:

1. Clone the Repository:

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

2. Install Dependencies:

```bash
cd auth-service
npm install
cd ../user-service
npm install
```

3. Configure Environment Variables:
   Create a .env file in both auth-service and user-service directories and set the necessary variables (see below for details).
4. Run the Application with Docker Compose:

```bash
docker-compose up --build
```

Running the Application
After Docker Compose starts the services, you can access them at the following ports:

- auth-service: http://localhost:3000
- user-service: http://localhost:3001
  Environment Variables
  Create a .env file in each service's root directory with the following variables:

#### For auth-service:

```
JWT_SECRET=<your_jwt_secret>
```

#### For user-service:

```
JWT_SECRET=<your_jwt_secret>
MONGO_URI=mongodb://mongodb:27017/mydatabase
```

Ensure JWT_SECRET is identical across both services.
API Endpoints

#### auth-service

- Register a New User:
- POST /users/register
- Body: { "username": "example", "password": "password123" }
- Login:
- POST /users/login
- Body: { "username": "example", "password": "password123" }
- Response: { "token": "jwt_token" }

#### user-service

- Get All Users:
- GET /users
- Headers: { "Authorization": "Bearer <jwt_token>" }
- Get a Specific User:
- GET /users/:id
- Headers: { "Authorization": "Bearer <jwt_token>" }
- Create a New User:
- POST /users
- Body: { "username": "example", "email": "example@example.com" }
- Headers: { "Authorization": "Bearer <jwt_token>" }
- Update a User:
- PUT /users/:id
- Body: { "username": "newname", "email": "newemail@example.com" }
- Headers: { "Authorization": "Bearer <jwt_token>" }
- Delete a User:
- DELETE /users/:id
- Headers: { "Authorization": "Bearer <jwt_token>" }
- Get All Addresses of a User:
- GET /users/:id/addresses
- Headers: { "Authorization": "Bearer <jwt_token>" }
- Create a New Address for a User:
- POST /users/:id/addresses
- Body: { "street": "123 Main St" }
- Headers: { "Authorization": "Bearer <jwt_token>" }
- Update an Address of a User:
- PUT /users/:id/addresses/:addressId
- Body: { "street": "456 Elm St" }
- Headers: { "Authorization": "Bearer <jwt_token>" }
- Delete an Address of a User:
- DELETE /users/:id/addresses/:addressId
- Headers: { "Authorization": "Bearer <jwt_token>" }
  Authentication
  JWT tokens are used to authenticate requests to user-service. After logging in through auth-service, include the token in the Authorization header of your requests:

```
Authorization: Bearer <jwt_token>
```

Dependencies

- Node.js
- Express
- MongoDB
- Mongoose
- Moleculer
- JSON Web Token (JWT)
- Docker
- Docker Compose
  Troubleshooting
- Cannot connect to MongoDB: Ensure MongoDB is running and the MONGO_URI is correctly set in the .env file.
- Cannot POST /users/register: Verify the endpoint path and ensure the auth-service is running.
- Unauthorized errors: Check if the JWT token is correctly included in the request headers and has not expired.
- Service not reachable: Ensure the services are correctly configured in docker-compose.yml and all dependencies
