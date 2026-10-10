checkAdmin();
showAdminMenu();
show();

function show() {
    let html = "";
    getData("admins").forEach(a => {
        html += "<tr><td>" + a.id + "</td><td>" + a.name + "</td><td>" + a.email + "</td></tr>";
    });
    document.getElementById("list").innerHTML = html;
}

function addAdmin() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");
    const admins = getData("admins");

    if (name == "" || email == "" || password == "") {
        error.innerText = "All fields are required";
        return;
    }
    if (name.length < 3) {
        error.innerText = "Name must be at least 3 characters";
        return;
    }
    if (!validEmail(email)) {
        error.innerText = "Email is not valid";
        return;
    }
    if (password.length < 6) {
        error.innerText = "Password must be at least 6 characters";
        return;
    }
    if (admins.some(a => a.email == email)) {
        error.innerText = "This email is already used";
        return;
    }

    admins.push({ id: nextId(admins), name: name, email: email, password: password });
    saveData("admins", admins);
    error.innerText = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    show();
}
