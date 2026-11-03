-- AlterTable
ALTER TABLE "Project" ADD COLUMN "displayOrder" INTEGER NOT NULL DEFAULT 0;

-- Backfill: keep the current order (createdAt DESC, id ASC breaks ties)
UPDATE "Project" AS p
SET "displayOrder" = o.position
FROM (
    SELECT "id", ROW_NUMBER() OVER (ORDER BY "createdAt" DESC, "id" ASC) AS position
    FROM "Project"
) AS o
WHERE p."id" = o."id";
