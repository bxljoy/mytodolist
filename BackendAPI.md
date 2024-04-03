## API Documentation for Backend API

# Introduction

- Welcome to the API documentation for MyAPI. This document outlines how to integrate with our API, detailing the endpoints available, methods to use, and data formats expected.

# Error Codes

- 400 Bad Request - Your request is invalid.
- 401 Unauthorized - Your API key is wrong.
- 403 Forbidden - The requested resource is hidden for administrators only.
- 404 Not Found - The specified resource could not be found.
- 500 Internal Server Error - We had a problem with our server. Try again later.

# Endpoints

1. **Get All Tasks**

   - URL: /tasks/:userEmail
   - Method: GET
   - Auth required: Yes
   - Response
   - Code: 200 OK
   - SQL: 'SELECT \* FROM tasks WHERE user_email = ${user_email}'

2. **Create A New Task**

   - URL: /tasks/
   - Method: POST
   - Auth required: Yes
   - Response
   - Code: 201 OK
   - SQL: 'INSERT INTO tasks (id, user_email, title, progress, date) VALUES (${id}, ${user_email}, ${title}, ${progress}, ${date})

3. **Update The Selected Task**

   - URL: /tasks/:id
   - Method: PATCH
   - Auth required: Yes
   - Response
   - Code: 200 OK
   - SQL: 'UPDATE tasks SET user_email = ${user_email}, title = ${title}, progress = ${progress}, date = ${date} WHERE id = ${id}'

4. **Delete The Selected Task**

   - URL: /tasks/:id
   - Method: DELETE
   - Auth required: Yes
   - Response
   - Code: 200 OK
   - SQL: 'DELETE FROM tasks WHERE id = ${id}'

5. **User Sign In**

   - URL: /users/signin
   - Method: POST
   - Auth required: No
   - Response
   - Code: 200 OK
   - SQL: 'SELECT \* FROM users WHERE user_email = ${userEmail}'

6. **User Sign Up**

   - URL: /users/signup
   - Method: POST
   - Auth required: No
   - Response
   - Code: 200 OK
   - SQL: 'INSERT INTO users (email, hashed_password) VALUES (${email}, ${hashed_password})'
