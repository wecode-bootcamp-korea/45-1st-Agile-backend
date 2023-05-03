-- migrate:up
ALTER TABLE orders ADD COLUMN subscribe_delivery_time NULL;

-- migrate:down

