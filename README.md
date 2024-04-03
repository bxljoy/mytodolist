# TodoList Application

## Tech Stack

- **Frontend**: Vite + React + Tailwind CSS.
- **Backend**: Node.js + Express.js.

## Setup and Installation for Frontend

To set up the project on your local machine, follow these steps:

1. Clone the repository:

```
git clone https://github.com/jesslee2023/mytodolist.git
```

2. Navigate into the project directory:

```
cd mytodolist/client/
```

3. Install the required dependencies:

```
npm install
```

4. Add Enviroment Variables:

```
Create a new file named .env in client folder, and adding variables as follows:

VITE_SERVERURL = http://localhost:3002 (change to your own URL)

```

5. Usage

**To run** the application in development mode, use the command:

```
npm run dev
```

This will start the application on `localhost:5173`.

## Setup and Installation for Backend

1. Navigate into the project directory:

```
cd mytodolist/server/
```

3. Install the required dependencies:

```
npm install
```

4. Add Enviroment Variables:

```
Create a new file named .env in client folder, and adding variables as follows:

DB_USER =
DB_PASSWORD =
DB_HOST =
DB_PORT =
DB_DATABASE =
SECRET_KEY =

```

5. Usage

**To run** the application in development mode, use the command:

```
npm start
```

This server will start on `localhost:3002`.

## Documentation

- [Important Code Explanations](Modules.md)
- [Backend API Explanations](BackendAPI.md)
- [Authentication and Authorization](Auth.md)

## CI/CD

# Frontend

- Log In Vercel using github account, and install the Vercel plugin on your github.
- Import this github repository to Vercel.
- Change the deployment Root Directory: /client.
- Vercel will deploy automatically for every commit to the main branch.

# Backend

- Read the Vercel Documentation: [How can I use GitHub Actions with Vercel?](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel)
- Follow the guidance to create the .github/workflows/deploy-to-vercel.yml
- Create your Vercel Access Token on Vercel Dashboard
- Find your projectId and orgId on Vercel Dashboard
- Inside GitHub, add VERCEL_TOKEN, VERCEL_ORG_ID, and VERCEL_PROJECT_ID as secrets
- GitHub Action will deploy automatically for every commit to the main branch.
