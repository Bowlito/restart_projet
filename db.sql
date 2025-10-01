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
);

INSERT INTO
    users
VALUES (
        NULL,
        "Test",
        "test",
        "test@test.fr",
        "$2b$10$3H71jScFc1he11PSp6Rp7.y2jH3gqfSmJBLxUAJyYIGa1PNHUzDRO",
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
);

CREATE TABLE commentaire (
    id_com INT AUTO_INCREMENT PRIMARY KEY,
    corps TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_users INT NOT NULL,
    id_publication INT NOT NULL,
    CONSTRAINT fk_com_usr FOREIGN KEY (id_users) REFERENCES users (id_users) ON DELETE CASCADE,
    CONSTRAINT fk_com_pub FOREIGN KEY (id_publication) REFERENCES publication (id_publication) ON DELETE CASCADE
);


/* JEU DE DONNEES TEST */
INSERT INTO publication (titre, corps, chemin_image, id_users) VALUES
('Voyage en van', 'Première expérience en van, super aventure!', 'images/van1.jpg', 1),
('Randonnée en montagne', 'Magnifique randonnée à la montagne, paysage incroyable.', 'images/montagne1.jpg', 1),
('Plage paradisiaque', 'Journée à la plage, eau turquoise et sable fin.', 'images/plage1.jpg', 1),
('Camping sauvage', 'Test du camping sauvage, ambiance nature totale.', 'images/camping1.jpg', 1),
('City trip Paris', 'Visite de Paris, musées et cafés.', 'images/paris1.jpg', 1),
('Road trip Italie', 'Itinéraire en Italie, paysages et gastronomie.', 'images/italie1.jpg', 1),
('Forêt enchantée', 'Balade en forêt, moment relaxant.', 'images/foret1.jpg', 1),
('Escalade aventure', 'Séance d’escalade avec les amis.', 'images/escalade1.jpg', 1),
('Ski alpin', 'Première journée de ski alpin, sensations fortes.', 'images/ski1.jpg', 1),
('Festival de musique', 'Concerts et ambiance incroyable!', 'images/festival1.jpg', 1);

-- Création de quelques utilisateurs supplémentaires
INSERT INTO users (nom, prenom, email, password, role) VALUES
('Dupont', 'Alice', 'alice.dupont@test.fr', '$2b$10$dummyhash', 'user'),
('Martin', 'Bob', 'bob.martin@test.fr', '$2b$10$dummyhash', 'user'),
('Durand', 'Charlie', 'charlie.durand@test.fr', '$2b$10$dummyhash', 'user');

-- Jeu de données pour la table commentaire
INSERT INTO commentaire (corps, id_users, id_publication) VALUES
('Super article, ça donne vraiment envie!', 2, 1),
('Merci pour le partage, très inspirant!', 3, 1),
('J\'adore les photos, paysages magnifiques!', 4, 2),
('On dirait un vrai paradis, superbe!', 2, 3),
('Je note cet endroit pour mes prochaines vacances.', 3, 3),
('Ambiance nature incroyable, j\'aimerais essayer.', 4, 4),
('Paris est toujours une bonne idée, merci du retour!', 2, 5),
('L’Italie est fantastique, excellent récit!', 3, 6),
('La forêt a l’air magique, j’adore!', 4, 7),
('L’escalade donne envie, très motivant!', 2, 8),
('J’ai essayé le ski l’an dernier, sensations uniques!', 3, 9),
('Festival de folie, merci pour le partage!', 4, 10),
('Commentaire supplémentaire sur le voyage en van.', 2, 1),
('Super randonnée, ça me rappelle mes souvenirs!', 3, 2),
('Magnifique plage, ça donne envie d’y aller!', 4, 3),
('Camping sauvage, je suis tenté!', 2, 4),
('Paris en hiver est splendide!', 3, 5),
('L’Italie est sur ma liste de voyages.', 4, 6),
('J’adore marcher en forêt aussi.', 2, 7),
('L’escalade c’est vraiment top!', 3, 8),
('Le ski est épuisant mais génial!', 4, 9),
('Festival incroyable, quelle ambiance!', 2, 10);

