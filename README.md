# Student Management System - Full Stack

A simple full-stack Student Management System with a web frontend and Python Flask backend.

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Python, Flask
- Database: SQLite
- API: REST API

## Features

- Add student
- View all students
- Search students
- Delete students
- Store student data in SQLite database
- Responsive web interface

## Project Structure

```text
student-management-fullstack/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── backend/
│   ├── app.py
│   └── requirements.txt
│
└── README.md

How to Run
Backend
cd backend
pip install -r requirements.txt
python app.py
The backend will run at:
http://127.0.0.1:5000
Frontend
Open:
frontend/index.html
API Endpoints
GET /api/students - Get all students
POST /api/students - Add a student
DELETE /api/students/<id> - Delete a student
