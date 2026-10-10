checkCustomer();
showCustomerMenu();

let html = "";
getData("orders").filter(o => o.customerId == getCustomerId()).forEach(o => {
    const items = o.items.map(i => i.name + " x" + i.qty).join(", ");
    html += "<tr><td>" + o.id + "</td><td>" + o.date + "</td><td>" + items +
        "</td><td>" + o.total + "</td><td>" + o.status + "</td></tr>";
});
if (html == "") {
    html = "<tr><td colspan='5'>You have no orders yet</td></tr>";
}
document.getElementById("list").innerHTML = html;
