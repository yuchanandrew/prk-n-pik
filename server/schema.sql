CREATE DATABASE sadboiz;
USE sadboiz;

CREATE TABLE product (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO product (id, image_url, description)
VALUES
("BP7KB3CTDG7GT", "https://i.imgur.com/FrZ0JzT.jpeg", "Sweet, scandalous, and way too photogenic for its own good. Pairs best with your most questionable DMs and an IG thirst post no one asked for."),
()