if (getCustomerId() != null) {
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

    const customer = getData("customers").find(c => c.email == email && c.password == password);
    if (customer) {
        localStorage.setItem("loggedCustomer", customer.id);
        window.location.href = "products.html";
    } else {
        error.innerText = "Wrong email or password";
    }
}
