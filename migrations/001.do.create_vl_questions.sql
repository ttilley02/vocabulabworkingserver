CREATE TABLE vocabulab_cards 
(
  id SERIAL PRIMARY KEY,
  spa_content TEXT NOT NULL,
  eng_content TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);

