CREATE TABLE users (
id INT PRIMARY KEY AUTO_INCREMENT,
user_name TEXT,
email TEXT,
user_password TEXT
);

CREATE TABLE books (
id INT PRIMARY KEY AUTO_INCREMENT,
title TEXT,
author TEXT,
description TEXT,
image TEXT
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