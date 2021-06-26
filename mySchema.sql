-- DROP TABLE if exists questions
-- CREATE if exists DATABASE questions;
-- USE questions;

CREATE TABLE questions (
  id INT PRIMARY KEY,
  product_id int,
  body VARCHAR (250),
  date_written VARCHAR (80),
  asker_name VARCHAR (80),
  asker_email VARCHAR (80),
  reported INT,
  helpful INT
);
CREATE TABLE answers (
  id INT PRIMARY KEY,
  question_id INT,
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
  id INT PRIMARY KEY,
  answer_id INT,
  url TEXT,
  FOREIGN KEY(answer_id) 
  REFERENCES answers(id)
);

CREATE INDEX questionIndex ON questions USING hash (product_id);

CREATE INDEX answersIndex ON answers USING hash (question_id);

CREATE INDEX imagesIndex ON images USING hash (answer_id);

-- CREATE SEQUENCE images_id START 2063760 INCREMENT 1;



-- \copy questions FROM '/Users/jacobmelnick/web/hackreactor/SDC/csv-files/questions.csv' DELIMITER ',' CSV HEADER;
-- \copy answers FROM '/Users/jacobmelnick/web/hackreactor/SDC/csv-files/answers.csv'  DELIMITER ',' CSV
-- \copy images FROM '/Users/jacobmelnick/web/hackreactor/SDC/csv-files/answers_photos.csv' DELIMITER ',' CSV HEADER;



--id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful


-- SELECT questions.id, questions.body, questions.date_written, questions.asker_name, questions.helpful, questions.reported, answers.id, answers.body, answers.answerer_name,
-- answers.helpful, images.url FROM questions left join answers on answers.question_id = questions.id left join images on 
-- images.answer_id=answers.id WHERE questions.product_id=17309 AND questions.reported=0 AND (answers.reported=0 OR answers.reported is null)

-- INSERT INTO questions (id, asker_name, body, asker_email)
-- Values (345939494, 'batman', 'test', 'test@test') 