-- Criando Base de Dados

DROP DATABASE IF EXISTS SpotifyClone;

CREATE DATABASE SpotifyClone;

-- Criando as tabelas

CREATE TABLE SpotifyClone.plans(
  plans_id INT PRIMARY KEY AUTO_INCREMENT
  , plans_name VARCHAR(45)
  , price DECIMAL(5,2)
) engine = InnoDB;

CREATE TABLE SpotifyClone.users(
	users_id INT PRIMARY KEY AUTO_INCREMENT
  , users_name VARCHAR(45)
  , users_age INT
  , signature_date DATE
  , plans_id INT
  , FOREIGN KEY (plans_id) REFERENCES SpotifyClone.plans (plans_id)
) engine = InnoDB;

CREATE TABLE SpotifyClone.artists(
  artists_id INT PRIMARY KEY AUTO_INCREMENT
  , artists_name VARCHAR(45)
) engine = InnoDB;

CREATE TABLE SpotifyClone.albums(
  albums_id INT PRIMARY KEY AUTO_INCREMENT
  , albums_name VARCHAR(45)
  , release_year INT
  , artists_id INT
  , FOREIGN KEY (artists_id) REFERENCES SpotifyClone.artists (artists_id)
) engine = InnoDB;

CREATE TABLE SpotifyClone.musics(
	musics_id INT PRIMARY KEY AUTO_INCREMENT
  , musics_name VARCHAR(45)
  , duration INT
  , albums_id INT
  , FOREIGN KEY (albums_id) REFERENCES SpotifyClone.albums (albums_id)
) engine = InnoDB;

CREATE TABLE SpotifyClone.history(
	reproduction_date DATETIME
	, users_id INT
  , musics_id INT
  , FOREIGN KEY (users_id) REFERENCES SpotifyClone.users (users_id)
  , FOREIGN KEY (musics_id) REFERENCES SpotifyClone.musics (musics_id)
  , CONSTRAINT PRIMARY KEY (users_id, musics_id)
) engine = InnoDB;

CREATE TABLE SpotifyClone.following_artists(
  users_id INT
  , artists_id INT
  , FOREIGN KEY (users_id) REFERENCES SpotifyClone.users (users_id)
  , FOREIGN KEY (artists_id) REFERENCES SpotifyClone.artists (artists_id)
  , CONSTRAINT PRIMARY KEY (users_id, artists_id)
) engine = InnoDB;

-- Populando as tabelas

INSERT INTO SpotifyClone.plans (plans_name, price)
VALUES
  ('gratuito', 0.00)
  , ('familiar', 7.99)
  , ('universitário', 5.99)
  , ('pessoal', 6.99)
;

INSERT INTO SpotifyClone.users (users_name, users_age, signature_date, plans_id)
VALUES
  ('Barbara Liskov', 82, '2019-10-20', 1)
  , ('Robert Cecil Martin', 58, '2017-01-06', 1)
  , ('Ada Lovelace', 37, '2017-12-30', 2)
  , ('Martin Fowler', 46, '2017-01-17', 2)
  , ('Sandi Metz', 58, '2018-04-29', 2)
  , ('Paulo Freire', 19, '2018-02-14', 3)
  , ('Bell Hooks', 26, '2018-01-05', 3)
  , ('Christopher Alexander', 85, '2019-06-05', 4)
  , ('Judith Butler', 45, '2020-05-13', 4)
  , ('Jorge Amado', 58, '2017-02-17', 4)
;

INSERT INTO SpotifyClone.artists (artists_name)
VALUES
  ('Beyoncé')
  , ('Queen')
  , ('Elis Regina')
  , ('Baco Exu do Blues')
  , ('Blind Guardian')
  , ('Nina Simone')
;

INSERT INTO SpotifyClone.albums (albums_name, release_year, artists_id)
VALUES
	('Renaissance', 2022, 1)
	, ('Jazz', 1978, 2)
	, ('Hot Space', 1982, 2)
	, ('Falso Brilhante', 1998, 3)
	, ('Vento de Maio', 2001, 3)
	, ('QVVJFA?', 2003, 4)
	, ('Somewhere Far Beyond', 2007, 5)
	, ('I Put A Spell On You', 2012, 6)
;

INSERT INTO SpotifyClone.musics (musics_name, duration, albums_id)
VALUES
	('BREAK MY SOUL', 279, 1)
	, ('VIRGO’S GROOVE', 369, 1)
  , ('ALIEN SUPERSTAR',116, 1)
	, ('Don’t Stop Me Now', 203, 2)
	, ('Under Pressure', 152, 3)
	, ('Como Nossos Pais', 105, 4)
	, ('O Medo de Amar é o Medo de Ser Livre', 207, 5)
	, ('Samba em Paris', 267, 6)
	, ('The Bard’s Song', 244, 7)
	, ('Feeling Good', 100, 8)
;

INSERT INTO SpotifyClone.history (reproduction_date, users_id, musics_id)
VALUES
	('2022-02-28 10:45:55', 1, 8)
	, ('2020-05-02 05:30:35', 1, 2)
	, ('2020-03-06 11:22:33', 1, 10)
	, ('2022-08-05 08:05:17', 2, 10)
	, ('2020-01-02 07:40:33', 2, 7)
	, ('2020-11-13 16:55:13', 3, 10)
	, ('2020-12-05 18:38:30', 3, 2)
	, ('2021-08-15 17:10:10', 4, 8)
	, ('2022-01-09 01:44:33', 5, 8)
	, ('2020-08-06 15:23:43', 5, 5)
	, ('2017-01-24 00:31:17', 6, 7)
	, ('2017-10-12 12:35:20', 6, 1)
	, ('2011-12-15 22:30:49', 7, 4)
	, ('2012-03-17 14:56:41', 8, 4)
	, ('2022-02-24 21:14:22', 9, 9)
	, ('2015-12-13 08:30:22', 10, 3)
;

INSERT INTO SpotifyClone.following_artists (users_id, artists_id)
VALUES
  (1, 1)
	, (1, 2)
	, (1, 3)
	, (2, 1)
	, (2, 3)
	, (3, 2)
	, (4, 4)
	, (5, 5)
	, (5, 6)
	, (6, 6)
	, (6, 1)
	, (7, 6)
	, (9, 3)
	, (10, 2)
;
