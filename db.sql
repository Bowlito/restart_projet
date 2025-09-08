-- Active: 1750235329113@@127.0.0.1@3306@tripster_db

DROP DATABASE IF EXISTS tripster_db;

CREATE DATABASE tripster_db;

USE tripster_db;

CREATE TABLE users (
    id_users INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(30),
    prenom VARCHAR (30),
    email VARCHAR (30),
    password VARCHAR(255),
    role VARCHAR(10)
)