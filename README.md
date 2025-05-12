# 🏋️ Exercise Tracker
The **Exercise Tracker** allows users to log their fitness activities. Users can create an account, add exercises, and view their workout history using a simple REST API.

## 📖 Learning Journey
This project was built while following [freeCodeCamp's Back End Development and APIs Course](https://www.freecodecamp.org/learn/back-end-development-and-apis).

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS
- **Backend:** Node.js (Express.js)
- **Database:** MongoDB

## 🎯 Features
- Create a new user with a unique `username`.
- Log exercises by sending:
  - `description` (string)
  - `duration` (number in minutes)
  - `date` (optional; defaults to current date)
- Retrieve a user's full exercise log with optional filters:
  - `from` (start date)
  - `to` (end date)
  - `limit` (maximum number of results)

## 🚀 Usage Examples

### Request: Create a User
POST `/api/users` 

**Body:**
```json
{
  "description": "Running",
  "duration": 30,
  "date": "2025-05-01"
}
```
**Response:**
```json
{
  "username": "johndoe",
  "_id": "65f123abc4567890de123456"
}
```

### Request: Add an Exercise
POST `/api/users/:_id/exercises`

**Body:**
```json
description: Running
duration: 30
date: 2025-05-01
```

**Response:**
```json
{
  "_id": "65f123abc4567890de123456",
  "username": "johndoe",
  "date": "Thu, 01 May 2025 00:00:00 GMT",
  "duration": 30,
  "description": "Running"
}
```

### Request: Get Exercise Log
GET `/api/users/:_id/logs?from=2025-01-01&to=2025-12-31&limit=2`

**Response:**
```json
{
  "username": "johndoe",
  "count": 2,
  "_id": "65f123abc4567890de123456",
  "log": [
    {
      "description": "Running",
      "duration": 30,
      "date": "Thu, 01 May 2025 00:00:00 GMT"
    },
    {
      "description": "Cycling",
      "duration": 45,
      "date": "Mon, 03 Jun 2025 00:00:00 GMT"
    }
  ]
}
```


## 📦 Installation & Setup
1. **Clone the repository:**
  ```sh
  git clone https://github.com/calvinbayaua/boilerplate-project-exercisetracker.git
  cd boilerplate-project-exercisetracker
  ```
2. **Install dependencies:**
  ```sh
  npm i
  ```
3. ** Create a .env file and add your MongoDB connection string:
  ```sh
  DB_URL:your_mongodb_connection_string
  ```
4. **Start the server**
  ```sh
  npm run start
  ```
