# 📝 Note Organizer Web App

A full-stack web application that allows users to organize, manage, and track notes efficiently.  
Built using **React**, **Node.js**, **Express**, **File System**, **JavaScript**, **HTML**, and **Tailwind CSS**.

---

## 🚀 Features

- ✍️ Create, edit, and delete notes
- 🗂️ Organize notes by category or tags
- 🔍 Search and filter functionality
- 💾 Persistent storage with backend API
- ⚡ Responsive and modern UI using Tailwind CSS
- 🌐 RESTful API built with Express and Node.js
- 📁 File-based data storage for simplicity

---

## 🏗️ Project Structure

```
Task-Tracker-WebApp/
├── backend/
│ ├── files/
│ ├── node_modules/
│ ├── .env
│ ├── package-lock.json
│ ├── package.json
│ └── server.js
│
├── frontend/
│ ├── node_modules/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ │ ├── App.jsx
│ │ │ ├── index.css
│ │ │ └── main.jsx
│ │ ├── .env
│ ├── .gitignore
│ ├── eslint.config.js
│ ├── index.html
│ ├── package-lock.json
│ ├── package.json
│ ├── README.md
│ └── vite.config.js
│
└── README.md
```


---

## ⚙️ Tech Stack

**Frontend**
<p>
  <img src="https://skillicons.dev/icons?i=react,javascript,html,css,tailwind,git,github,vite" />
</p>

**Backend**
<p>
  <img src="https://skillicons.dev/icons?i=nodejs,express" />
  <br>
🗂️ File System (fs)
</p>

---

## 🧱 API Endpoints (Example)

| Method | Endpoint       | Description             |
| ------ | -------------- | ----------------------- |
| GET    | /api/notes     | Get all notes           |
| POST   | /api/notes     | Add a new note          |
| PUT    | /api/notes/:id | Update an existing note |
| DELETE | /api/notes/:id | Delete a note           |



## 🧑‍💻 Development Notes
- Frontend and backend run on separate servers for easier development.
- Ensure both servers are running concurrently.
- Use CORS middleware in the backend for frontend communication.

## 📸 Folder Preview

The project structure ensures clean separation of frontend and backend logic, making the app scalable and maintainable.

## 📜 License

This project is licensed under the `MIT License`.

## 💡 Author

Developed by `Rakesh Kr. Dey`.