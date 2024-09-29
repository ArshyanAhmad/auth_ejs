
# Authentication App

This is a simple authentication app where users can register, log in, and have their session maintained using tokens. The app allows users to provide dummy credentials (name, email, and password), which are stored in the MongoDB database. Upon registration and login, tokens are generated and used to maintain user sessions, ensuring secure authentication.

## Features
*User Registration*: Allows users to register with **dummy** *name*, *email*, and *password*.
*JWT Token Generation*: Upon registration and login, tokens are generated.
*Login Authentication*: Users must be authenticated by a token stored in cookies to access protected routes.
*Cookie-based Session Management*: Login tokens are stored in cookies to maintain user sessions.
*Access Control*: If a token exists, the user cannot access the login or registration pages. They are redirected to the home (logout) page.
Technology Stack
*MongoDB*: For storing user credentials (name, email, password).
*Express.js*: Web framework for handling routes and middleware.
*JWT (JSON Web Token)*: Used for generating and validating tokens.
*Cookie-Parser*: To manage cookies on the client-side for storing tokens.
*EJS*: Template engine for rendering views.
*dotenv*: To manage environment variables.

## Installation
**npm run dev** => *nodemon app.js*
**npm run start** => *node app.js*

## Set up environment variables:

Create a *.env* file in the root directory.
Add the following environment variables:

*PORT=*
*DATABSE_URL=""*
*JWT_SECRET_1=""*
*JWT_SECRET_2=""*

## How It Works

1. Registration
A user can register with a **dummy** *name*, *email*, and *password*.
The app will store the credentials in *MongoDB*.
A *JWT token* is generated and sent back to the user.

2. Login
After registration, the user can log in using their credentials.
On *successful login*, a second token is generated and stored in cookies.
The presence of this token in cookies will allow access to protected routes.

3. Access Control
If a user already has a *valid token* (stored in cookies), they cannot access the *login* and *registration* pages.
The user is redirected to the home (logout) page, where they can log out.

4. Logout
Users can log out by clearing the token stored in the *cookie*, which redirects them to the *login page*.

## Endpoints

1. /register *[POST]*
Registers a new user by saving name, email, and password in the database.
Generates a JWT token on successful registration.

2. /login *[POST]*
Authenticates the user with email and password.
Generates a second JWT token and stores it in the cookie.

3. /logout *[GET]*
Logs the user out by clearing the token from cookies.

4. /home *[GET]*
If the user has a valid token, they are redirected here after login.
If not authenticated, the user is redirected to the login page.

## Dependencies
*express*
*cookie-parser*
*jsonwebtoken*
*mongoose*
*dotenv*
*ejs*


# Usage

Ensure you have *MongoDB* installed and running, or provide a remote *MongoDB URI* in the *.env* file.
Make sure you have *Node.js* and npm installed.
Run *npm run dev* to start the server.
Open your browser and navigate to **http://localhost:process.env.PORT** to access the app.
