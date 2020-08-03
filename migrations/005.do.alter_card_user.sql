

ALTER TABLE vocabulab_cards
  ADD COLUMN
      user_id INTEGER REFERENCES vocabulab_users(id) ON DELETE CASCADE;
