# 🏋️ Exercise Tracker
The **Exercise Tracker** allows users to log their fitness activities. Users can create an account, add exercises, and view their workout history using a simple REST API.

## 📖 Learning Journey
This project was built while following [freeCodeCamp's Back End Development and APIs Course](https://www.freecodecamp.org/learn/back-end-development-and-apis).

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS
- **Backend:** Node.js (Express.js)
- **Database:** MongoDB

## 🎯 Features
- Accepts a `POST` request to `/api/shorturl` with a `url` parameter.
- Returns a JSON response with:
  - `original_url`: The original URL provided by the user.
  - `short_url`: A unique numeric identifier for the shortened link.
- Redirects users to the original URL when they visit `/api/shorturl/:short_url`.

## 🚀 Usage Examples

### Request: Create a User
POST `/api/users` 
johndoe
**Response:**
```json
{
  "username": "johndoe",
  "_id": "65f123abc4567890de123456"
}
```

### Request: Add an Exercise
POST `/api/users/:_id/exercises`
description: Running
duration: 30
date: 2025-05-01
```json
{
  "_id": "65f123abc4567890de123456",
  "username": "johndoe",
  "date": "Thu, 01 May 2025 00:00:00 GMT",
  "duration": 30,
  "description": "Running"
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
