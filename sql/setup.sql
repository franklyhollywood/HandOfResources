-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS foods;

CREATE TABLE  foods (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  food TEXT NOT NULL,
  is_edible BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS artists;

CREATE TABLE  artists (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  artist TEXT NOT NULL,
  album_name TEXT NOT NULL,
  is_favorited BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS didyoudoit;

CREATE TABLE  didyoudoit (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  did_you_do_it TEXT NOT NULL,
  istoblame BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS dididoit;

CREATE TABLE  dididoit (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  did_i_doit TEXT NOT NULL,
  istoblame BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS haveyoudoneit;

CREATE TABLE  haveyoudoneit (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  have_you_done_it TEXT NOT NULL,
  is_done BOOLEAN NOT NULL
);