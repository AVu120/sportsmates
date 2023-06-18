-- This is an empty migration.

ALTER TABLE "Player" ADD CONSTRAINT "player_sport" CHECK ("sport" IN ('Cricket', 'Tennis', 'Basketball', 'Soccer', 'Volleyball', 'Cycling', 'Running'))