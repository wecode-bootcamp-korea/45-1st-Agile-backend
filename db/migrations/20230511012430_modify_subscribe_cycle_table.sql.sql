-- migrate:up
ALTER TABLE carts ADD COLUMN subscribe_cycle_id INT NULL AFTER is_subscribe;
ALTER TABLE carts ADD FOREIGN KEY (subscribe_cycle_id) REFERENCES subscribe_cycle (id);
ALTER TABLE orders ADD COLUMN subscribe_cycle_id INT NULL AFTER order_status_id;
ALTER TABLE orders ADD FOREIGN KEY (subscribe_cycle_id) REFERENCES subscribe_cycle (id);

-- migrate:down

