checkCustomer();
showCustomerMenu();
show();

function show() {
    const wish = getData(wishKey());
    const products = getData("products").filter(p => wish.includes(p.id));

    let html = "";
    products.forEach(p => {
        html += "<tr><td><img src='" + p.image + "' width='60' alt='no image'></td><td>" +
            p.name + "</td><td>" + p.category + "</td><td>" + p.price + "</td><td>" +
            (p.stock > 0 ? p.stock : "Out of stock") + "</td><td>";
        if (p.stock > 0) {
            html += "<button onclick='addToCart(" + p.id + ")'>Add to Cart</button> ";
        }
        html += "<button onclick='removeWish(" + p.id + ")'>Remove</button></td></tr>";
    });
    if (products.length == 0) {
        html = "<tr><td colspan='6'>Your wish list is empty</td></tr>";
    }
    document.getElementById("list").innerHTML = html;
}

function removeWish(id) {
    saveData(wishKey(), getData(wishKey()).filter(w => w != id));
    show();
}

function addToCart(id) {
    const cart = getData(cartKey());
    const product = getData("products").find(p => p.id == id);
    const item = cart.find(i => i.id == id);

    if (item) {
        if (item.qty + 1 > product.stock) {
            alert("Only " + product.stock + " of " + product.name + " in stock");
            return;
        }
        item.qty++;
    } else {
        cart.push({ id: id, qty: 1 });
    }
    saveData(cartKey(), cart);
    document.getElementById("message").innerText = product.name + " added to cart";
}
