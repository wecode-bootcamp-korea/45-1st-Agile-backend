-- migrate:up
CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  score INT NOT NULL,
  user_id INT NOT NULL,
  book_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (book_id) REFERENCES books (id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
  )
-- migrate:down
DROP TABLE reviews;