-- migrate:up
CREATE TABLE book_subscribe (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  book_id INT NOT NULL,
  subscribe_cycle_id INT NOT NULL,
  FOREIGN KEY (book_id) REFERENCES books (id),
  FOREIGN KEY (subscribe_cycle_id) REFERENCES subscribe_cycle (id)
  )
-- migrate:down
DROP TABLE book_subscribe;