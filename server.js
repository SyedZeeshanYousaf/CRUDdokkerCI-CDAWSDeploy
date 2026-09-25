const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Adjust table/column names below to match your actual schema.
// This assumes a `products` table with: id, name, price, quantity, description, created_at

// CREATE - add a new product
app.post('/products', async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ error: 'name and price are required' });
    }

    const [result] = await pool.query(
      'INSERT INTO products (name, price, quantity, description) VALUES (?, ?, ?, ?)',
      [name, price, quantity || 0, description || null]
    );

    res.status(201).json({ id: result.insertId, name, price, quantity, description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// READ - get all products
app.get('/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// READ - get a single product by id
app.get('/products/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// UPDATE - update a product by id
app.put('/products/:id', async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;

    const [existing] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await pool.query(
      'UPDATE products SET name = ?, price = ?, quantity = ?, description = ? WHERE id = ?',
      [
        name ?? existing[0].name,
        price ?? existing[0].price,
        quantity ?? existing[0].quantity,
        description ?? existing[0].description,
        req.params.id
      ]
    );

    res.json({ message: 'Product updated', id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE - remove a product by id
app.delete('/products/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted', id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
