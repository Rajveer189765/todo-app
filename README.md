# 📝 Todo App (MERN Backend + Vanilla JS Frontend)

A full-stack Todo application built to understand how frontend and backend communicate in a real-world web application.

This project focuses on learning authentication, REST APIs, CRUD operations, Express.js, MongoDB, and JWT rather than building a production-ready application.

---

## 🚀 Features

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Create Task
- View Tasks
- Update Task
- Delete Task
- Logout
- Delete Confirmation
- Logout Confirmation

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript (Vanilla)

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT (JSON Web Token)
- bcrypt.js

---

## 📂 Project Structure

```
todo-app/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── register.html
│   └── dashboard.html
│
└── README.md
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Tasks

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/Rajveer189765/todo-app.git
```

Go to project directory

```bash
cd todo-app
```

Install backend dependencies

```bash
cd backend
npm install
```

Create a `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend

```bash
npm start
```

Open the frontend

```
frontend/index.html
```

using Live Server.

---

## 📚 What I Learned

- Building REST APIs using Express.js
- Connecting Node.js with MongoDB using Mongoose
- Password hashing with bcrypt
- JWT Authentication
- Express Middleware
- CRUD Operations
- Fetch API
- Frontend ↔ Backend communication
- Local Storage for authentication
- Structuring a backend using Controllers, Routes, Models, and Middleware

---

## 📸 Screenshots

Add screenshots of:

- Login Page
- Register Page
- Dashboard
- CRUD Operations

---

## 🔮 Future Improvements

- Better UI using React
- Task Categories
- Task Status (Pending / Completed)
- Due Date Management
- Search & Filter Tasks
- Responsive Design
- Deploy on Render/Vercel

---

## 👨‍💻 Author

**Rajveer Rajpuria**

GitHub: https://github.com/Rajveer189765