# E-Commerce Project (JS without framework)

Simple e-commerce site with an admin side and a customer side. It uses plain HTML and JavaScript and saves everything in localStorage.

## How to run

Open `index.html` in the browser (or run `python -m http.server` in this folder and open `http://localhost:8000`).

Default admin: `admin@shop.com` / `Admin123`

## Admin
- Login / logout, add other admins
- Add, edit, delete products
- Add, edit, delete categories
- See all orders and confirm / reject them

## Customer
- Register / login / logout
- View products with filters (search, category, max price)
- Wish list
- Shopping cart
- Place order (pending until admin confirms or rejects it)
- See previous orders

Note: stock is taken when the order is placed and given back if the admin rejects it.
