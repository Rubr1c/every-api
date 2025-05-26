-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discordId" BIGINT,
    "username" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "xp" BIGINT NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("discordId", "id", "level", "username") SELECT "discordId", "id", "level", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
