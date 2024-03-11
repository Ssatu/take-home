/*
  Warnings:

  - You are about to drop the column `staff_collected_id` on the `redemption` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "redemption" DROP CONSTRAINT "redemption_staff_collected_id_fkey";

-- DropIndex
DROP INDEX "redemption_staff_collected_id_key";

-- AlterTable
ALTER TABLE "redemption" DROP COLUMN "staff_collected_id";
