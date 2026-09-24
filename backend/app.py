from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from pathlib import Path

app = Flask(__name__)
CORS(app)

DB_PATH = Path(__file__).with_name("students.db")


def get_connection():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    connection = get_connection()
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            course TEXT NOT NULL,
            year INTEGER NOT NULL
        )
        """
    )
    connection.commit()
    connection.close()


@app.get("/api/students")
def get_students():
    connection = get_connection()
    students = connection.execute(
        "SELECT id, name, email, course, year FROM students ORDER BY id DESC"
    ).fetchall()
    connection.close()

    return jsonify([dict(student) for student in students])


@app.post("/api/students")
def add_student():
    data = request.get_json(silent=True) or {}

    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    course = str(data.get("course", "")).strip()

    try:
        year = int(data.get("year"))
    except (TypeError, ValueError):
        year = 0

    if not name or not email or not course or year not in (1, 2, 3, 4):
        return jsonify({"error": "Please provide valid student details."}), 400

    connection =
