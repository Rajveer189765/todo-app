console.log("Login JS Connected");
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", loginUser);
async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);

    const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await response.json();

    console.log(data);
    if (data.success) {

        // localStorage.setItem("token", data.token);
        console.log(data.token);

        localStorage.setItem("token", data.token);

        console.log(localStorage.getItem("token"));

        console.log("Token Saved!");

    }
}
