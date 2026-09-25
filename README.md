# Product CRUD API

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and fill in your MySQL credentials.
3. Run `check_db.sql` in MySQL Workbench/CLI first to confirm your database and `products` table (it includes a `CREATE TABLE IF NOT EXISTS` at the bottom if you need one).
4. `npm start` (or `npm run dev` with nodemon).

## Endpoints
- `POST /products` — create a product (`{ name, price, quantity, description }`)
- `GET /products` — list all products
- `GET /products/:id` — get one product
- `PUT /products/:id` — update a product
- `DELETE /products/:id` — delete a product

## Notes
- Adjust table/column names in `server.js` and `check_db.sql` if your actual schema differs (e.g. different table name or extra columns).
