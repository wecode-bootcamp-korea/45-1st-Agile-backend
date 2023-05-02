-- migrate:up
CREATE TABLE sub_categories (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories (id)
  )
-- migrate:down
DROP TABLE sub_categories;