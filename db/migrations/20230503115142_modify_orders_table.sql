-- migrate:up
ALTER TABLE orders ADD COLUMN subscribe_delivery_time DATE NULL;

-- migrate:down

