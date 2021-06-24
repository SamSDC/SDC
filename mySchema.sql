-- DROP TABLE if exists questions
-- CREATE if exists DATABASE questions;
-- USE questions;

CREATE TABLE questions (
  id VARCHAR(50) PRIMARY KEY,
  product_id int,
  body VARCHAR (250),
  date_written VARCHAR (80),
  asker_name VARCHAR (80),
  asker_email VARCHAR (80),
  reported INT,
  helpful INT
);
CREATE TABLE answers (
  id VARCHAR(50) PRIMARY KEY,
  question_id VARCHAR(30),
  body VARCHAR (250),
  date_written VARCHAR (50),
  answerer_name VARCHAR (30),
  answerer_email VARCHAR (80),
  reported INT,
  helpful INT,
  FOREIGN KEY(question_id) 
  REFERENCES questions(id)
);
CREATE TABLE images (
  id VARCHAR(50) PRIMARY KEY,
  answer_id VARCHAR(50),
  url TEXT,
  FOREIGN KEY(answer_id) 
  REFERENCES answers(id)
);

CREATE INDEX questionIndex ON questions(id, product_id)

CREATE INDEX answersIndex ON answers(id, question_id)

CREATE INDEX imagesIndex ON images(answer_id)




-- COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
-- FROM '/Users/jacobmelnick/web/hackreactor/SDC/csv-files/questions.csv'
-- DELIMITER ','
-- -- CSV HEADER;

-- CSV HEADER;
-- \copy images(id, answer_id, url)
-- FROM '/Users/jacobmelnick/web/hackreactor/SDC/csv-files/answers_photos.csv'
-- DELIMITER ','
-- CSV HEADER;

--id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful