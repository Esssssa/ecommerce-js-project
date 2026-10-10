if (localStorage.getItem("loggedAdmin") != null) {
    window.location.href = "products.html";
}

function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");

    if (email == "" || password == "") {
        error.innerText = "Please fill email and password";
        return;
    }
    if (!validEmail(email)) {
        error.innerText = "Email is not valid";
        return;
    }

    const admin = getData("admins").find(a => a.email == email && a.password == password);
    if (admin) {
        localStorage.setItem("loggedAdmin", admin.name);
        window.location.href = "products.html";
    } else {
        error.innerText = "Wrong email or password";
    }
}
