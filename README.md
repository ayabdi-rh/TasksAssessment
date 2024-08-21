# Task Management Application

This is a full-stack task management application with a React frontend and a Node.js backend. It allows users to create, update, and organize tasks in a Kanban-style board.

## Project Structure

The project is divided into two main parts: the client-side React application and the server-side Node.js application.

## Key Directories and Files

### Client

1. `api`: Contains the base API configuration.
2. `assets`: Stores static assets like SVG files.
3. `common`: Houses reusable UI components.
4. `features`: Contains feature-specific code (auth and tasks).
   - `auth`: Authentication-related code.
        - `api`: Authentication API calls.(React-Query Hooks)
        - `dto`: Data Transfer Objects for user data.
        - `hooks`: Custom hooks for login and signup functionality.
        - `pages`: Login and Signup page components.
   - `tasks`: Task management feature.
        - `api`: Task-related API calls (React-Query Hooks)
        - `components`: Task-specific UI components.
        - `dto`: Data Transfer Objects for task data.
        - `hooks`: Custom hooks for task management logic.
        - `pages`: Main Tasks page component.
        - `store`: Zustand store for managing task state.
5. `App.tsx`: The main application component.
6. `main.tsx`: The entry point of the React application.

### Server

1. `app`: Contains the main application logic.
   - `middlewares`: Custom middleware functions.
   - `queries`: Database query functions.
   - `routes`: API route definitions.
   - `index.ts`: Main server setup.
2. `prisma`: Prisma ORM configuration and client.
   - `schema.prisma`: Database schema definition.
3. `Dockerfile`: Docker configuration for the server.

## Key Features

1. User Authentication: Login and Signup functionality.
2. Task Management: Create, update, and delete tasks.
3. Kanban Board: Organize tasks in a drag-and-drop interface.
4. RESTful API: Backend API for handling authentication and task operations.
5. Database Integration: PostgreSQL database with Prisma ORM.

## Technologies Used

### Frontend

- React
- TypeScript
- Zustand for state management
- React Query for data fetching and caching
- Tailwind CSS for styling
- Headless UI for accessible UI components
- Axios for API requests
- Zod for server data type-safety

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JSON Web Tokens (JWT) for authentication

## Getting Started

To run the application locally:

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project.
3. Install all dependencies:
   ```
   npm run install:all
   ```
4. Set up your PostgreSQL database and update the `DATABASE_URL` in the `server/.env` file.
5. Run Prisma migrations:
   ```
   cd server && npx prisma migrate dev
   ```
6. Return to the root directory and start both the client and server in development mode:
   ```
   npm run dev
   ```

## Scripts

The project includes several npm scripts that can be run from the root directory:

- `npm run install:all`: Install dependencies for the root, client, and server.
- `npm run dev`: Start both the client and server in development mode concurrently.
- `npm run build`: Build both the client and server for production.
- `npm run start`: Start the production server.


## Environment Variables

Make sure to set up the following environment variables:

### Client

- `VITE_REACT_APP_BASE_URL`: URL of your backend API

### Server

- `DATABASE_URL`: PostgreSQL database connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Port number for the server (default: 8082)
- `CLIENT_URL`: URL of your frontend application (for CORS configuration)

## Deployment

The project includes a `Dockerfile` for the server, which can be used for containerized deployment. For the client, you can use the built-in Vite build process (`npm run build`) to create a production-ready bundle.

For more detailed instructions on deployment, please refer to the documentation of your chosen hosting platform.
