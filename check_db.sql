-- 1. See which database you're connected to
SELECT DATABASE();

-- 2. List all databases on this MySQL server
SHOW DATABASES;

-- 3. List all tables in the current database
SHOW TABLES;

-- 4. Check if a `products` table exists and see its structure
DESCRIBE products;
-- or equivalently:
-- SHOW COLUMNS FROM products;

-- 5. Peek at the first 10 rows of the products table
SELECT * FROM products LIMIT 10;

-- 6. Count how many rows are in it
SELECT COUNT(*) AS total_products FROM products;

-- ---------------------------------------------------------
-- If the table doesn't exist yet, create it with this:
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INT DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
