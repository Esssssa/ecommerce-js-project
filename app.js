// shared functions for all pages (admin and customer)

function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// first time setup: default admin and some categories
function setup() {
    if (getData("admins").length == 0) {
        saveData("admins", [{ id: 1, name: "Main Admin", email: "admin@shop.com", password: "Admin123" }]);
    }
    if (getData("categories").length == 0) {
        saveData("categories", [{ id: 1, name: "Phones" }, { id: 2, name: "Laptops" }]);
    }
    // remove the old fake test orders from the first version
    saveData("orders", getData("orders").filter(o => Array.isArray(o.items)));
}

function nextId(list) {
    if (list.length == 0) return 1;
    return list[list.length - 1].id + 1;
}

function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---------- admin ----------

// call this at the top of every admin page except login
function checkAdmin() {
    if (localStorage.getItem("loggedAdmin") == null) {
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("loggedAdmin");
    window.location.href = "login.html";
}

function showAdminMenu() {
    document.getElementById("menu").innerHTML =
        '<a href="products.html">Products</a> | ' +
        '<a href="categories.html">Categories</a> | ' +
        '<a href="orders.html">Orders</a> | ' +
        '<a href="admins.html">Admins</a> | ' +
        '<button onclick="logout()">Logout</button><hr>';
}

// ---------- customer ----------

// returns the logged customer id (or null)
function getCustomerId() {
    const id = localStorage.getItem("loggedCustomer");
    return id == null ? null : Number(id);
}

// call this at the top of every customer page except login and register
function checkCustomer() {
    if (getCustomerId() == null) {
        window.location.href = "login.html";
    }
}

function customerLogout() {
    localStorage.removeItem("loggedCustomer");
    window.location.href = "login.html";
}

function showCustomerMenu() {
    const customer = getData("customers").find(c => c.id == getCustomerId());
    document.getElementById("menu").innerHTML =
        'Hello ' + customer.name + ' | ' +
        '<a href="products.html">Products</a> | ' +
        '<a href="wishlist.html">Wish List</a> | ' +
        '<a href="cart.html">Cart</a> | ' +
        '<a href="orders.html">My Orders</a> | ' +
        '<button onclick="customerLogout()">Logout</button><hr>';
}

// wish list and cart are saved per customer
function wishKey() {
    return "wish_" + getCustomerId();
}

function cartKey() {
    return "cart_" + getCustomerId();
}

setup();
