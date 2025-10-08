-- Active: 1750235329113@@127.0.0.1@3306@tripster_db

DROP DATABASE IF EXISTS tripster_db;

CREATE DATABASE tripster_db;

USE tripster_db;

CREATE TABLE users (
    id_users INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(30) NOT NULL,
    prenom VARCHAR(30) NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10)
)ENGINE=InnoDB;

INSERT INTO
    users
VALUES (
        NULL,
        "Kappa",
        "Tau",
        "kappa@tau.fr",
        "$2b$10$7V6Lk0FFlExNVN..ogvRSusdIcK9jzTShhuSZ.PJ7WmTvRFbC9iJi",
        "admin"
    );

CREATE TABLE publication (
    id_publication INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(100) NOT NULL,
    corps TEXT NOT NULL,
    chemin_image VARCHAR(512),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_users INT NOT NULL,
    CONSTRAINT fk_pub_usr FOREIGN KEY (id_users) REFERENCES users (id_users) ON DELETE CASCADE
)ENGINE=InnoDB;

CREATE TABLE commentaire (
    id_com INT AUTO_INCREMENT PRIMARY KEY,
    corps TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_users INT NOT NULL,
    id_publication INT NOT NULL,
    CONSTRAINT fk_com_usr FOREIGN KEY (id_users) REFERENCES users (id_users) ON DELETE CASCADE,
    CONSTRAINT fk_com_pub FOREIGN KEY (id_publication) REFERENCES publication (id_publication) ON DELETE CASCADE
)ENGINE=InnoDB;



SHOW TABLE STATUS WHERE Name = 'users';