# CRUD API For A Resource (Student Management)

A RESTful CRUD API built with Node.js, Express, and MongoDB (Mongoose).

## Project Structure

```text
src/
├── db_01/
│   └── db.js                  # MongoDB connection setup
├── models_02/
│   └── student.model.js       # Student Mongoose schema & model
├── controllers_03/
│   └── student.controller.js  # CRUD business logic
├── routes_04/
│   └── student.routes.js      # Student API endpoints
├── middleware_05/
│   └── error.middleware.js    # Not found & global error handlers
└── app.js                     # Express app setup & middleware
server.js                      # Server entry point
```

## Setup & Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure `.env`:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   ```

3. Start the server:
   ```bash
   # Development (with nodemon)
   npm run dev

   # Production
   npm start
   ```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API status check |
| `POST` | `/api/students` | Create a new student |
| `GET` | `/api/students` | Get all students |
| `GET` | `/api/students/:id` | Get student by ID |
| `PUT` | `/api/students/:id` | Update student by ID |
| `DELETE` | `/api/students/:id` | Delete student by ID |
