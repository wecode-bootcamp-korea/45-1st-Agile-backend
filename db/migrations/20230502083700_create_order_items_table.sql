-- migrate:up
CREATE TABLE order_items (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  quantity INT NOT NULL,
  book_id INT NOT NULL,
  order_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (book_id) REFERENCES books (id),
  FOREIGN KEY (order_id) REFERENCES orders (id)
  )
-- migrate:down
DROP TABLE order_items;