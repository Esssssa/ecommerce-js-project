checkAdmin();
showAdminMenu();
show();

function show() {
    let html = "";
    getData("orders").forEach(o => {
        const items = o.items.map(i => i.name + " x" + i.qty).join(", ");
        html += "<tr><td>" + o.id + "</td><td>" + o.date + "</td><td>" + o.customer + "</td><td>" + items +
            "</td><td>" + o.total + "</td><td>" + o.status + "</td><td>";
        if (o.status == "pending") {
            html += "<button onclick='changeStatus(" + o.id + ", \"confirmed\")'>Confirm</button> " +
                "<button onclick='changeStatus(" + o.id + ", \"rejected\")'>Reject</button>";
        }
        html += "</td></tr>";
    });
    document.getElementById("list").innerHTML = html;
}

function changeStatus(id, status) {
    const orders = getData("orders");
    const order = orders.find(o => o.id == id);
    order.status = status;

    // stock was taken when the customer placed the order, give it back if rejected
    if (status == "rejected") {
        const products = getData("products");
        order.items.forEach(i => {
            const p = products.find(p => p.id == i.id);
            if (p) p.stock += i.qty;
        });
        saveData("products", products);
    }
    saveData("orders", orders);
    show();
}
