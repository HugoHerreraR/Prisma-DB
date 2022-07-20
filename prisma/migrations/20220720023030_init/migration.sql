/*
  Warnings:

  - You are about to alter the column `username` on the `missionCommander` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[name]` on the table `missionCommander` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "missionCommander_username_key";

-- AlterTable
ALTER TABLE "missionCommander" ALTER COLUMN "username" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "missionCommander_name_key" ON "missionCommander"("name");
