CREATE TABLE vocabulab_notes (
  id SERIAL PRIMARY KEY,
  note TEXT,
  cardData text,
  favorite text, -- default as false
  known text, -- set default value "something"
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  card_id INTEGER
      REFERENCES vocabulab_cards(id) ON DELETE CASCADE NOT NULL,
  user_id INTEGER
      REFERENCES vocabulab_users(id) ON DELETE CASCADE NOT NULL,
  author_id INTEGER REFERENCES vocabulab_users(id) ON DELETE SET NULL
);
