DROP TABLE IF EXISTS inventory;

CREATE TABLE inventory (
    id SERIAL,
    item_name TEXT,
    price MONEY,
    item_desc TEXT
);


INSERT INTO inventory (item_name, item_desc, price) VALUES ('Candle_Sandalwood', 'A sandalwood scented candle', 20);
INSERT INTO inventory (item_name, item_desc, price) VALUES ('Candle_Pine Tar', 'A sandalwood scented candle', 20);
INSERT INTO inventory (item_name, item_desc, price) VALUES ('Candle_Mustard Gas', 'A sandalwood scented candle', 25);
