CREATE TABLE users (
id INT PRIMARY KEY AUTO_INCREMENT,
user_name TEXT,
email TEXT,
user_password TEXT
);

CREATE TABLE books (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(1000) NOT NULL,
author JSON,
description TEXT,
genres JSON,
image VARCHAR(500),
published_year INT,
created_at DATETIME,
last_modified DATETIME
);

CREATE TABLE authors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    author_key VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    birth_year INT,
    death_year INT,
    bio TEXT
);

CREATE TABLE user_liked_book (
user_id INT NOT NULL,
book_id INT NOT NULL,
PRIMARY KEY(user_id, book_id)
);

CREATE TABLE user_seen_book (
user_id INT NOT NULL,
book_id INT NOT NULL,
PRIMARY KEY(user_id, book_id)
);


SELECT * FROM users;

INSERT INTO users (user_name, email, user_password) VALUES ("Nathan", "nathan@gmail.com","password"),("Jodie Batt", "jodie@gmail.com", "password");

INSERT INTO user_liked_book (user_id, book_id) VALUES (6, 76),(6, 72),(6, 71),(6, 63);
INSERT INTO user_seen_book (user_id, book_id) VALUES (6, 62),(6, 61),(6, 70);