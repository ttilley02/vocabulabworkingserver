CREATE TYPE diff AS ENUM ('b','i','a');

ALTER TABLE vocabulab_cards
  ADD COLUMN
    difficulty diff default 'b';
