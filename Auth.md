## Authentication and Authorization

# JWT-token authrization

JWT (JSON Web Tokens) can be used for both authentication and authorization, though they serve different purposes in each context.

### Authentication

Authentication is the process of verifying who a user is. JWTs are used in authentication to enable users to log in to an application. Here’s a typical flow:

1. **User Logs In**: The user provides their credentials, such as a username and password.
2. **Verify Credentials**: The server verifies the credentials against its user database.
3. **Generate JWT**: Upon successful verification, the server generates a JWT containing claims about the user (such as their user ID) and sends it back to the client.
4. **Client Stores JWT**: The client stores the JWT (usually in memory or local storage) and includes it in subsequent requests to the server.
5. **Server Validates JWT**: The server validates the JWT with each request to confirm the user's identity and provides access to protected resources.

In this way, JWTs facilitate the initial authentication process by providing a token that the server can quickly verify without needing to query a database or perform complex calculations.

### Authorization

Authorization, on the other hand, is the process of verifying what specific applications, files, and data a user has access to. Once a user is authenticated, JWTs can be used to authorize their access to certain resources within an application. Here’s how JWTs fit into authorization:

1. **Access Protected Resource**: The authenticated user attempts to access a protected resource or perform an action that requires certain permissions.
2. **Token Includes Permissions**: The JWT issued after authentication can include claims specifying the user’s roles or permissions.
3. **Check Permissions in JWT**: When the user attempts to access a protected resource, the server decodes the JWT to verify that the user has the necessary permissions.
4. **Grant or Deny Access**: Based on the permissions encoded in the JWT, the server decides whether to grant or deny access to the requested resource.

In this context, JWTs serve as a compact, self-contained way for the server to verify the user's authorization to perform certain actions or access specific resources based on the roles or permissions encoded in the token.

### Conclusion

JWTs are versatile and can be used for both authenticating users (verifying who they are) and authorizing them (determining what they are allowed to do). The key difference lies in how the token is generated and what information it contains: for authentication, the focus is on user identity; for authorization, the focus shifts to user permissions.

To implement JWT-based authentication and authorization, including user roles or permissions in a Node.js application, you generally follow these steps:

1. **User Authentication**: Verify the user's credentials and generate a JWT.
2. **Include Roles/Permissions in the JWT**: When creating the JWT, include the user's roles or permissions as claims within the token.
3. **Validate the JWT on Requests**: For each request, validate the JWT and extract the roles or permissions to determine if the user is authorized to perform the requested action.

Here's a simplified example using the `jsonwebtoken` package to implement these steps:

### Step 1: Install Dependencies

First, install `jsonwebtoken` for creating and verifying JWTs, and `express` as your web framework:

```bash
npm install express jsonwebtoken

```

### Step 2: User Authentication and JWT Generation

In your user login route, authenticate the user, then generate and send a JWT including their roles or permissions.

```jsx
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
app.use(express.json());

const JWT_SECRET = "your_jwt_secret"; // Keep this secret safe

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Placeholder for actual authentication logic
  const isAuthenticated = true; // Replace with actual check
  const userRoles = ["admin", "editor"]; // Example roles, fetch from your DB based on user

  if (isAuthenticated) {
    const token = jwt.sign({ username, roles: userRoles }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } else {
    res.status(401).send("Authentication failed");
  }
});
```

### Step 3: Middleware to Validate JWT and Check Permissions

Create middleware that validates the JWT and checks if the user has the required role or permission to access specific routes.

```jsx
const jwt = require("jsonwebtoken");

// Function to generate JWT
function generateToken(user) {
  const payload = {
    sub: user.id,
    name: user.name,
    roles: user.roles,
    permissions: user.permissions,
  };
  return jwt.sign(payload, "your_secret_key", { expiresIn: "1h" });
}

// Middleware to verify token and check permissions
function authorize(req, res, next) {
  const token = req.headers.authorization.split(" ")[1]; // Assuming "Bearer <token>"
  try {
    const decoded = jwt.verify(token, "your_secret_key");
    // Check if the user has the required role/permission
    if (decoded.permissions.includes("required_permission")) {
      next(); // Permission granted
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (error) {
    res.status(401).send("Invalid token");
  }
}

// Usage
app.get("/protected-route", authorize, (req, res) => {
  res.send("This is a protected route");
});
```

### Step 4: Run the Server

Don't forget to start your Express server.

```jsx
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### Conclusion

- This example demonstrates how to include roles or permissions in a JWT and check these claims in middleware to authorize user actions in a Node.js application.
- Our project only implemented the Authentication part, and we will implement the Authorization part later.
- For the implementation, we also need to modify our database design to add Role and Permission properties.
