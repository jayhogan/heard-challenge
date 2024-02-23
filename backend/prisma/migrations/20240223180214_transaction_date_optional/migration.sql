-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transactions" (
    "transaction_id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "from_account" TEXT NOT NULL,
    "to_account" TEXT NOT NULL,
    "transaction_date" TEXT
);
INSERT INTO "new_transactions" ("amount", "description", "from_account", "to_account", "transaction_date", "transaction_id") SELECT "amount", "description", "from_account", "to_account", "transaction_date", "transaction_id" FROM "transactions";
DROP TABLE "transactions";
ALTER TABLE "new_transactions" RENAME TO "transactions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
