# MyToDoList Summary

## Home.jsx

The `Home.jsx` component is a React functional component designed for managing and displaying a todo list based on user authentication status and tasks fetched from a server. It showcases integration with backend services, authentication checks, and dynamic rendering based on fetched data. Here's a summary of its functionality and structure:

1. **Authentication and Authorization**:
   - Utilizes an authentication token (`authToken`) and user email stored in `localStorage` to determine the user's authentication status.
   - Implements a token expiration check using `jwtDecode` to verify if the stored token is still valid. If the token has expired or an error occurs during data fetching, it clears the stored authentication data and refreshes the page to presumably redirect the user to a login state.
2. **Data Fetching**:
   - Fetches todo tasks from a server using the user's email and authentication token. The server URL is sourced from environment variables, following Vite's conventions (`import.meta.env.VITE_SERVERURL`).
   - The `fetchData` function is called within a `useEffect` hook to load data when the component mounts or the user's authentication status changes, assuming the token is valid.
3. **Task Sorting and Rendering**:
   - Sorts tasks by their dates to organize them chronologically.
   - Dynamically renders tasks using the `ListItem` component for each task and a `ListHeader` that likely contains controls or information about the todo list.
   - Conditionally renders the entire list or an authentication component (`Auth`), depending on the user's authentication status.
4. **Error Handling and State Management**:
   - On encountering an error during the data fetch, it logs the error, clears relevant `localStorage` items, and reloads the page to reset the state.
   - Uses React's `useState` hook to manage the state of the tasks, initializing with an empty array and updating it based on the fetched data.
5. **Environment and Deployment Considerations**:
   - Makes use of Vite-specific environment variables for configuration, enabling easy adjustment for different deployment environments.
6. **Security Practices**:
   - Checks for token expiration to enhance security, preventing unauthorized access to user-specific data.

Overall, the `Home.jsx` component is a well-structured React component focusing on user authentication, data fetching and rendering, and basic state management for a todo application. It demonstrates practical use of React hooks, conditional rendering, and interaction with backend services, along with secure practices like token validation.

## Auth.jsx

The `Auth.jsx` component is a React functional component designed for handling user authentication, including both sign-in and sign-up functionalities. It dynamically allows users to switch between signing in and signing up based on their needs. Here’s a concise summary of its features and behavior:

1. **State Management**:
   - Utilizes React's `useState` hook to manage several pieces of state: `isSignIn` to toggle between sign-in and sign-up views, `error` to display any authentication errors, `email`, and `password` for collecting user credentials.
2. **Environment Variables**:
   - Uses `import.meta.env.VITE_SERVERURL` to retrieve the server URL from Vite's environment variables, ensuring that the component can adapt to different deployment environments.
3. **Form Submission**:
   - Contains a form that captures the user's email and password. It supports both sign-in and sign-up actions depending on the mode selected by the user.
   - The form submission is handled by the `handleSubmit` function, which sends a POST request to the server (either to the sign-in or sign-up endpoint based on the `isSignIn` state) with the user's email and password.
4. **Error Handling**:
   - Displays any errors that occur during the authentication process using the `error` state.
5. **User Feedback**:
   - Provides visual feedback by dynamically changing the form and button labels between "Sign in to your account" and "Sign up your account" based on whether the user is in sign-in or sign-up mode.
   - Offers a toggle link at the bottom of the form, allowing users to switch between sign-in and sign-up modes.
6. **Styling**:
   - The component is styled with Tailwind CSS, demonstrating a modern and responsive design approach. It uses utility classes for layout, typography, form inputs, buttons, and hover effects.
7. **Local Storage and Navigation**:
   - Upon successful authentication, stores the returned email and authentication token in `localStorage` and refreshes the page to presumably reflect the user's authenticated state.

This component effectively encapsulates the authentication logic and UI for a React application, providing a seamless user experience for both signing in and signing up. It demonstrates essential practices in React development, such as conditional rendering, event handling, state management, and interacting with a backend server for authentication.

## Server.js

Your `server.js` file is the entry point for an Express.js application that is set up to run a server on a specified port from environment variables or default to port 3002. Here's a summary of its main functionalities and configurations:

1. **Dependencies and Initial Setup**:
   - The application imports essential modules: `express` for server functionalities, `dotenv` for environment variable management, `body-parser` for parsing incoming request bodies, and `cors` for enabling Cross-Origin Resource Sharing.
   - It initializes an Express application instance and configures the application to use environment variables through `dotenv.config()`.
2. **Middleware Configuration**:
   - Uses `body-parser` middleware to parse JSON and URL-encoded request bodies, facilitating the handling of POST and PUT requests.
   - Applies `cors` middleware to allow cross-origin requests, enhancing the API's accessibility from different domains.
3. **Route Handling**:
   - Defines a basic route (`"/"`) that responds with a simple text message, indicating the server's successful running.
   - Integrates external route modules for users (`usersRoute`) and tasks (`tasksRoute`), and mounts them on `"/users"` and `"/tasks"` paths respectively. This modular approach organizes the route handling and makes the codebase cleaner and more maintainable.
4. **Server Initialization**:
   - Listens on the port defined by the `PORT` environment variable or defaults to port 3002, starting the server.
   - Logs a message to the console indicating that the server is running and on which port, providing immediate feedback about the server's status.

This server setup demonstrates a basic but well-structured approach to building RESTful APIs with Express.js, including best practices for project organization, middleware usage, and environment configuration. It's designed to be scalable, making it easy to add more routes and functionalities as the application grows.

## auth.js

The `auth.js` module provides middleware for authenticating HTTP requests in an Express.js application, using JSON Web Tokens (JWT). Here’s a concise overview of its functionality:

1. **Environment Setup and Dependencies**:
   - Utilizes the `jsonwebtoken` package to handle JWT operations and `dotenv` for accessing environment variables.
   - Extracts a secret key from environment variables (`SECRET_KEY`) used to verify the JWT.
2. **Middleware Functionality**:
   - The middleware function `auth` asynchronously intercepts incoming requests to check for JWT in the `Authorization` header.
   - It attempts to split the header value to extract the token (assuming a "Bearer" token format).
   - Uses the extracted token to decode and verify its validity using the secret key. If the token is valid, it extracts the user's email (assumed to be part of the token's payload) and attaches it to the request object for downstream use in the application.
3. **Error Handling and Response**:
   - In case of any errors during token verification (e.g., if the token is missing, invalid, or expired), the middleware catches these errors, logs them to the console, and returns a 401 Unauthorized response to the client. This prevents further processing of the request by subsequent middleware or route handlers.
4. **Continuation of Request Processing**:
   - If the token is successfully verified, it calls `next()` to pass control to the next middleware function or route handler, allowing the request to continue through the Express middleware chain.
5. **Usage**:
   - This middleware can be applied to any route or router where authentication is required, ensuring that only requests with a valid JWT can access protected resources.

This `auth.js` module is a critical component for building secure applications with Express.js, as it provides a straightforward way to implement route-level authentication.

## **usersRoute.js**

The `usersRoute.js` file defines routing middleware for handling user authentication-related requests in an Express.js application. It uses the Express Router to declare routes for user signup and signin operations. Here's a summary of its key components:

1. **Router Initialization**: It initializes an Express Router instance to manage routing paths specific to user actions.
2. **Controller Imports**: Imports the `signup` and `signin` functions from the `usersController` module. These functions are designed to handle the logic for registering new users and authenticating existing users, respectively.
3. **Route Definitions**:
   - **Signup Route (`/signup`)**: Configures a POST route that maps to the `signup` controller function. This route is used to register new users into the system.
   - **Signin Route (`/signin`)**: Sets up a POST route that maps to the `signin` controller function. This route is used to authenticate users, allowing them to log in to the application.
4. **Export**: The router with the configured routes is exported for use in the main application file (typically `server.js` or `app.js`), where it can be mounted as middleware.

This structure allows for a clear separation of concerns between route handling and business logic, promoting cleaner code and easier maintenance. The use of the Express Router also facilitates scalability, making it straightforward to add more user-related routes as needed.

## tasksRoute.js

The `tasksRoute.js` file sets up the routing for task-related actions within an Express.js application, incorporating security through an authentication middleware. It's designed to manage the CRUD operations for tasks, protected so that only authenticated users can perform these operations. Here's a breakdown of its setup and functionality:

1. **Initialization**: It starts by creating a new Express router instance, which is used to define routes for different HTTP methods and paths.
2. **Controller Import**: Imports specific functions (`getTasks`, `addTask`, `deleteTask`, `updateTask`) from the `tasksController`. These functions are responsible for handling the logic associated with each route's purpose, like fetching, adding, updating, or deleting tasks.
3. **Middleware for Authentication**: Applies the `auth` middleware to all routes. This middleware function checks the validity of the user's authentication, ensuring that only authorized requests proceed to the controller functions. It effectively guards access to task operations, enhancing the application's security.
4. **Route Definitions**:
   - **GET `/:userEmail`**: Fetches all tasks associated with the provided userEmail. The route is protected by the `auth` middleware.
   - **POST `/`**: Adds a new task based on the details provided in the request body. This route is also secured by the `auth` middleware.
   - **PATCH `/:id`**: Updates an existing task identified by the `id` parameter with the details supplied in the request body. Authentication is required.
   - **DELETE `/:id`**: Deletes the task corresponding to the `id` parameter. This operation is protected with authentication.
5. **Export**: The configured router is exported for use in the application's main file (typically `app.js` or `server.js`), where it can be mounted as a middleware to handle routes starting with a specific path, usually related to tasks.

Overall, `tasksRoute.js` effectively organizes the endpoints for task management within the application, ensuring that these operations are secure and accessible only to authenticated users.

## usersController.js

The `usersController.js` module provides two main functionalities for user management in an Express.js application, specifically handling user signup and signin processes. It integrates with a PostgreSQL database for storing user data and utilizes `bcrypt` for password hashing and `jsonwebtoken` for generating auth tokens. Here's a detailed summary:

### Environment and Dependencies

- Utilizes `bcrypt` for hashing and comparing passwords, ensuring secure password storage.
- Uses `jsonwebtoken` to create tokens that allow for secure and efficient user authentication.
- Interacts with a PostgreSQL database through `pool`, a client from the `pg` module, to execute database operations.
- Retrieves the secret key from environment variables (`SECRET_KEY`) for token signing, enhancing security by keeping sensitive information out of the codebase.

### Signup Function

- **Path**: Receives user credentials (`email` and `password`) from the request body.
- **Process**:
  - Hashes the user's password using `bcrypt` with a generated salt for added security.
  - Inserts the new user's email and hashed password into the `users` table in the PostgreSQL database.
  - Generates a JWT token signed with the user's email, using the environment variable as the secret, and sets the token to expire in 1 hour.
- **Response**: On successful signup, returns a JSON object containing the user's email and the generated token. If an error occurs (e.g., email already exists), it logs the error and returns the error details.

### Signin Function

- **Path**: Accepts user credentials (`email` and `password`) from the request body for authentication.
- **Process**:
  - Queries the `users` database table to find a user with the provided email.
  - If a user is found, uses `bcrypt` to compare the submitted password with the stored hashed password.
  - If the password matches, generates a JWT token signed with the user's email, set to expire in 1 hour.
- **Response**: If authentication is successful, returns a JSON object with the user's email and the token. If the user is not found or the password is incorrect, returns an error message indicating the issue.

### Error Handling and Security

- Incorporates try-catch blocks to handle and log database or hashing errors.
- Securely handles passwords by hashing them before storage and comparing hashed values during signin, without ever exposing plaintext passwords.
- Generates JWTs for authenticated sessions, allowing for secure and stateless authentication across requests.

This module effectively abstracts the authentication logic for a user management system, ensuring security practices like password hashing and token-based authentication are centrally managed and applied consistently.

## tasksController.js

The `tasksController.js` module is a collection of asynchronous functions that handle CRUD operations for tasks in an Express.js application, interfacing with a PostgreSQL database. Each function verifies user authentication and performs a specific database operation related to task management. Here's an overview of each function within the module:

### getTasks

- **Purpose**: Fetches all tasks associated with a specific user, identified by their email.
- **Authorization Check**: Verifies if the request is authorized by checking if the `req.email` is present, returning a 401 Unauthorized response if not.
- **Database Operation**: Executes a `SELECT` query on the `tasks` table to retrieve tasks where the `user_email` matches the provided email.
- **Response**: Returns the fetched tasks in JSON format or logs an error if the operation fails.

### addTask

- **Purpose**: Adds a new task to the database with details provided in the request body.
- **Authorization Check**: Ensures the request is authorized by checking `req.email`.
- **Unique Identifier**: Generates a unique ID for the new task using `uuidv4`.
- **Database Operation**: Inserts a new task into the `tasks` table with the generated ID and details from the request body (`user_email`, `title`, `progress`, `date`).
- **Response**: Returns the newly added task or logs an error upon failure.

### updateTask

- **Purpose**: Updates an existing task identified by its ID with new details provided in the request body.
- **Authorization Check**: Checks for authorization similar to the other functions.
- **Database Operation**: Executes an `UPDATE` query on the `tasks` table to modify the task with the provided details where the task's ID matches.
- **Response**: Returns the updated task or logs an error if the operation is unsuccessful.

### deleteTask

- **Purpose**: Deletes a task identified by its ID.
- **Authorization Check**: Verifies the request's authorization.
- **Database Operation**: Performs a `DELETE` operation on the `tasks` table to remove the task with the specified ID.
- **Response**: Returns the result of the delete operation or logs an error if it fails.

Overall, `tasksController.js` centralizes the logic for task management, ensuring that operations are secure and that only authenticated users can manipulate their tasks. It leverages PostgreSQL for data persistence and `uuid` for generating unique identifiers for tasks.
