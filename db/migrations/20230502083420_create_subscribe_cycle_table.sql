-- migrate:up
CREATE TABLE subscribe_cycle (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  delivery_cycle VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
  )
-- migrate:down
DROP TABLE subscribe_cycle;