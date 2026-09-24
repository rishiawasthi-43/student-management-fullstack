const API_URL = "http://127.0.0.1:5000/api/students";

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const search = document.getElementById("search");
const message = document.getElementById("message");

let students = [];

async function loadStudents() {
    try {
        const response = await fetch(API_URL);
        students = await response.json();
        renderStudents();
    } catch (error) {
        message.textContent = "Start the Flask backend first.";
    }
}

function renderStudents() {
    const term = search.value.toLowerCase().trim();

    const filtered = students.filter((student) =>
        [student.name, student.email, student.course]
            .some(value => value.toLowerCase().includes(term))
    );

    table.innerHTML = filtered.map((student) => `
        <tr>
            <td>${student.id}</td>
            <td>${escapeHtml(student.name)}</td>
            <td>${escapeHtml(student.email)}</td>
            <td>${escapeHtml(student.course)}</td>
            <td>${student.year}</td>
            <td>
                <button class="action-btn" onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        </tr>
    `).join("");

    if (!filtered.length) {
        table.innerHTML = `<tr><td colspan="6">No students found.</td></tr>`;
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value,
        year: document.getElementById("year").value
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        message.textContent = "Please enter valid details.";
        return;
    }

    form.reset();
    message.textContent = "Student added successfully.";
    await loadStudents();
});

async function deleteStudent(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        message.textContent = "Student deleted successfully.";
        await loadStudents();
    }
}

search.addEventListener("input", renderStudents);

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

loadStudents();
