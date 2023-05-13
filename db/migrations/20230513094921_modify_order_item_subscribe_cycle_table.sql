-- migrate:up
ALTER TABLE order_items ADD COLUMN subscribe_cycle_id INT NULL AFTER quantity;
ALTER TABLE order_items ADD FOREIGN KEY (subscribe_cycle_id) REFERENCES subscribe_cycle (id);

-- migrate:down

