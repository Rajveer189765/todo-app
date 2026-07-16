// const token = localStorage.getItem("token");

// if (!token) {
//     window.location.href = "index.html";
// }

// async function fetchTasks() {
//     const response = await fetch("http://localhost:5000/api/tasks", {
//         method: "GET",

//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });

//     const data = await response.json();

//     console.log(data);
//     const taskList = document.getElementById("taskList");
//     taskList.innerHTML = "";
//     data.tasks.forEach(task => {
//         const taskDiv = document.createElement("div");
//         taskDiv.innerHTML = `
//             <h4>${task.title}</h4>
//             <p>${task.description}</p>
//             <hr>
//     `;
//         taskList.appendChild(taskDiv);
//     });
// }

// const taskForm = document.getElementById("taskForm");
// taskForm.addEventListener("submit", createTask);
// async function createTask(event) {
//     const taskForm = document.getElementById("taskForm");

// taskForm.addEventListener("submit", createTask);

// async function createTask(event) {

//     event.preventDefault();

//     const title = document.getElementById("title").value;
//     const description = document.getElementById("description").value;

//     const response = await fetch("http://localhost:5000/api/tasks", {

//         method: "POST",

//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },

//         body: JSON.stringify({
//             title,
//             description
//         })

//     });

//     const data = await response.json();

//     console.log(data);

//     if (data.success) {

//         fetchTasks();

//     }

// }

//     event.preventDefault();

// }
// const title = document.getElementById("title").value;

// const description = document.getElementById("description").value;

// const response = await fetch("http://localhost:5000/api/tasks", {

//     method: "POST",

//     headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//     },

//     body: JSON.stringify({
//         title,
//         description
//     })

// });
// const data = await response.json();

// console.log(data);

// if(data.success){

//     fetchTasks();

// }

// fetchTasks();


let editingTaskId = null;
// Get token from localStorage
const token = localStorage.getItem("token");

// If user is not logged in, redirect to login page
if (!token) {
    window.location.href = "index.html";
}

function logout() {

    localStorage.removeItem("token");

    window.location.href = "index.html";

}

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", logout);

function editTask(id, title, description) {

    editingTaskId = id;

    document.getElementById("title").value = title;
    document.getElementById("description").value = description;

}

// =======================
// Fetch All Tasks
// =======================
async function fetchTasks() {

    const response = await fetch("http://localhost:5000/api/tasks", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    console.log(data);

    const taskList = document.getElementById("taskList");

    // Clear old tasks before rendering again
    taskList.innerHTML = "";

    data.tasks.forEach(task => {

        const taskDiv = document.createElement("div");

        taskDiv.innerHTML = `
            <h4>${task.title}</h4>
            <p>${task.description}</p>

            <button onclick="editTask('${task._id}', '${task.title}', '${task.description}')">
                Edit
            </button>

            <button onclick="deleteTask('${task._id}')">
                Delete
            </button>

            <hr>
        `;

        taskList.appendChild(taskDiv);

    });

}

// =======================
// Create Task
// =======================

const taskForm = document.getElementById("taskForm");

taskForm.addEventListener("submit", createTask);

async function createTask(event) {

    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    // const response = await fetch("http://localhost:5000/api/tasks", {

    //     method: "POST",

    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`
    //     },

    //     body: JSON.stringify({
    //         title,
    //         description
    //     })

    // });

    const url = editingTaskId
        ? `http://localhost:5000/api/tasks/${editingTaskId}`
        : "http://localhost:5000/api/tasks";

    const method = editingTaskId ? "PUT" : "POST";

    const response = await fetch(url, {

        method,

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
            title,
            description
        })

    });

    const data = await response.json();

    console.log(data);

    if (data.success) {

        // Clear form
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        
        editingTaskId = null; // Reset editing state
        // Refresh task list
        await fetchTasks();

    }

}

async function deleteTask(id) {

    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {

        method: "DELETE",

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    const data = await response.json();

    console.log(data);

    if (data.success) {
        await fetchTasks();
    }

}

// Load tasks when dashboard opens
await fetchTasks();