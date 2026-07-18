console.log("Register JS Connected");

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", registerUser);

async function registerUser(event) {

    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/api/auth/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            email,
            password
        })

    });

    const data = await response.json();

    console.log(data);

    if (data.success) {

        alert("Registration Successful!");

        window.location.href = "index.html";

    } else {

        alert(data.message);

    }

}