# Node.js RESTful API Server

This project is a RESTful API server built with Node.js, Express.js, and MongoDB. It provides user authentication and CRUD operations for tasks, along with input validation, error handling, and comprehensive API documentation.

## Features

- User registration and login with JWT authentication
- CRUD operations for tasks
- Input validation using Joi
- Centralized error handling
- API documentation in OpenAPI (Swagger) format
- Unit and integration tests
- Docker support for easy deployment

## Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- Docker (optional, for containerization)

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd node-rest-api-server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file:**

   Copy the `.env.example` to `.env` and fill in the required environment variables.

4. **Run the application:**

   ```bash
   npm start
   ```

   Alternatively, you can use Docker:

   ```bash
   docker build -t node-rest-api-server .
   docker run -p 3000:3000 --env-file .env node-rest-api-server
   ```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `PORT`: Port number for the server (default is 3000)

## Testing

To run the tests, use the following command:

```bash
npm test
```

## API Documentation

The API documentation is available in the `src/docs/api.yaml` file. You can use tools like Swagger UI to visualize and interact with the API endpoints.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.