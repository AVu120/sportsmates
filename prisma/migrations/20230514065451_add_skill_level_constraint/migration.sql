ALTER TABLE "Player" ADD CONSTRAINT "player_skillLevel" CHECK ("skillLevel" IN ('Beginner', 'Intermediate', 'Advanced'))