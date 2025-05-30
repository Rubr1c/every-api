-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_KeyValue" (
    "userId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "isEncrypted" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("userId", "key"),
    CONSTRAINT "KeyValue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_KeyValue" ("key", "updatedAt", "userId", "value") SELECT "key", "updatedAt", "userId", "value" FROM "KeyValue";
DROP TABLE "KeyValue";
ALTER TABLE "new_KeyValue" RENAME TO "KeyValue";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
