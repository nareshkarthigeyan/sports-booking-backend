# Project Documentation

## Overview

This project is a Node.js application that implements a RESTful API with authentication using JSON Web Tokens (JWT). The application is designed to provide secure access to protected resources and manage user sessions effectively.

## Key Features

- **User Authentication**: Users can register and log in to receive a JWT for accessing protected routes.
- **Protected Routes**: Certain routes are secured and require a valid JWT for access.
- **Middleware**: Custom middleware is used for authentication and error handling.

## Directory Structure
/project-root
│
├── /middlewares
│ └── authMiddleware.js
|
├── /routes
│ ├── playGroundRoutes.js
│ ├── bookingRoutes.js 
│ └── authRoutes.js
│
├── /models
│ ├── User.js 
│ ├── PlayGround.js
│ └── Booking.js
│
├── /controllers
│ ├── authController.js 
│ ├── bookingController.js
│ └── groundController
|
├── server.js 
└── README.md (this file)

## Usage

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the server with `node server.js`.
4. In .env, add:
    ```
    MONGO_URI=<mongo db cluster> #found in mongo db cluster --> connect. Create a project cluster if not present.
    JWT_SECRET=<random key>
    ```
5. To add sample grounds dataset, go to postman -> POST http://localhost:5001/api/grounds -> raw -> (choose JSON) --> add:
 ```
 [
  {
    "name": "Shivaji Sports Complex",
    "location": "Pune, Maharashtra",
    "sportsPlayed": "Football,Basketball,Tennis",
    "slots": "6AM-9AM,10AM-1PM,3PM-6PM",
    "price": 500,
    "rating": 4.5
  },
  {
    "name": "Gandhi Nagar Ground",
    "location": "Ahmedabad, Gujarat",
    "sportsPlayed": "Cricket,Badminton,Volleyball",
    "slots": "7AM-10AM,12PM-3PM,5PM-8PM",
    "price": 400,
    "rating": 4.2
  },
  {
    "name": "Kanteerava Stadium",
    "location": "Bengaluru, Karnataka",
    "sportsPlayed": "Football,Kabaddi,Hockey",
    "slots": "5AM-8AM,9AM-12PM,4PM-7PM",
    "price": 600,
    "rating": 4.7
  },
  {
    "name": "Marina Sports Arena",
    "location": "Chennai, Tamil Nadu",
    "sportsPlayed": "Tennis,Table Tennis,Basketball",
    "slots": "6AM-9AM,11AM-2PM,6PM-9PM",
    "price": 450,
    "rating": 4.3
  },
  {
    "name": "Chhatrapati Shivaji Ground",
    "location": "Mumbai, Maharashtra",
    "sportsPlayed": "Cricket,Kho Kho,Football",
    "slots": "8AM-11AM,1PM-4PM,7PM-10PM",
    "price": 550,
    "rating": 4.6
  }
]
 ```
6. Use Postman to interact with the API endpoints in http://localhost:5001/api

## API Endpoints

### User Authentication

- **POST** `/api/auth/signup`
  - Description: Register a new user.
  - Request Body: `{ "name": "string", "email": "string", "phoneNo": number, "password": "string" }`
  - Response: `{ "message": "User registered successfully" }`

- **POST** `/api/auth/login`
  - Description: Log in a user and return a JWT.
  - Request Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "token": "JWT" }`

### Playground Operations

- **GET** `/api/grounds`
  - Description: Retrieve a list of all available playgrounds.
  - Response: `[ { "name": "string", "location": "string", "sportsPlayed": "string", "slots": "string", "price": number, "rating": number }, ... ]`

- **POST** `/api/grounds`
  - Description: Create a new playground.
  - Request Body: `{ "name": "string", "location": "string", "sportsPlayed": "string", "slots": "string", "price": number, "rating": number }`
  - Response: `{ "message": "Ground created successfully" }`

### Booking Operations

- **POST** `/api/bookings`
  - Description: Book a ground (requires JWT).
  - Request Header: `{key: "Authorization", body: "Bearer <jwt token>" }`
  - Request Body: `{ "groundId": "string", "date": "YYYY-MM-DD", "time": "HH:MM" }`
  - Response: `{ "message": "Booking successful" }`

- **GET** `/api/bookings/:userId`
  - Description: Retrieve all bookings for a specific user. 
  - Response: `[ { "bookingId": "string", "groundId": "string", "date": "YYYY-MM-DD", "time": "HH:MM" }, ... ]`


