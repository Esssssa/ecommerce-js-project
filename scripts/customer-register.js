function register() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;
    const error = document.getElementById("error");
    const customers = getData("customers");

    if (name == "" || email == "" || password == "" || confirm == "") {
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
    if (password != confirm) {
        error.innerText = "Passwords do not match";
        return;
    }
    if (customers.some(c => c.email == email)) {
        error.innerText = "This email is already registered";
        return;
    }

    const customer = { id: nextId(customers), name: name, email: email, password: password };
    customers.push(customer);
    saveData("customers", customers);
    localStorage.setItem("loggedCustomer", customer.id);
    window.location.href = "products.html";
}
