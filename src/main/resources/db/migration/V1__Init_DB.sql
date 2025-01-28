
CREATE TABLE if NOT EXISTS Brand
(
    id
    BIGSERIAL
    PRIMARY
    KEY,
    name
    VARCHAR
(
    255
) NOT NULL,
    description TEXT,
    country VARCHAR
(
    255
) NOT NULL
    );

CREATE TABLE if NOT EXISTS Perfume
(
    id
    BIGSERIAL
    PRIMARY
    KEY,
    name
    VARCHAR
(
    255
) NOT NULL,
    description TEXT,
    brand_id BIGINT,
    FOREIGN KEY
(
    brand_id
) REFERENCES Brand
(
    id
)
    );

INSERT INTO Brand (name, description, country)
VALUES ('Brand A', 'High quality perfumes from France', 'France'),
       ('Brand B', 'Luxury perfumes with exotic scents', 'United States'),
       ('Brand C', 'Premium perfumes with natural ingredients', 'Italy');

INSERT INTO Perfume (name, description, brand_id)
VALUES ('Perfume A1', 'A floral and fresh scent', 1),
       ('Perfume A2', 'A woody and musky fragrance', 1),
       ('Perfume A3', 'A sweet and fruity perfume', 1);

INSERT INTO Perfume (name, description, brand_id)
VALUES ('Perfume B1', 'A spicy and oriental fragrance', 2),
       ('Perfume B2', 'A light citrus and floral scent', 2),
       ('Perfume B3', 'A bold, leathery fragrance', 2);

INSERT INTO Perfume (name, description, brand_id)
VALUES ('Perfume C1', 'A clean and crisp scent', 3),
       ('Perfume C2', 'A rich and woody fragrance', 3),
       ('Perfume C3', 'A deep, amber-based perfume', 3);
