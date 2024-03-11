/*
  Warnings:

  - You are about to drop the `Redemption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Redemption" DROP CONSTRAINT "Redemption_staff_collected_id_fkey";

-- DropForeignKey
ALTER TABLE "Redemption" DROP CONSTRAINT "Redemption_team_name_fkey";

-- DropTable
DROP TABLE "Redemption";

-- CreateTable
CREATE TABLE "redemption" (
    "redemption_id" SERIAL NOT NULL,
    "team_name" TEXT NOT NULL,
    "redeemed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "staff_collected_id" TEXT NOT NULL,

    CONSTRAINT "redemption_pkey" PRIMARY KEY ("redemption_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "redemption_team_name_key" ON "redemption"("team_name");

-- CreateIndex
CREATE UNIQUE INDEX "redemption_staff_collected_id_key" ON "redemption"("staff_collected_id");

-- AddForeignKey
ALTER TABLE "redemption" ADD CONSTRAINT "redemption_staff_collected_id_fkey" FOREIGN KEY ("staff_collected_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "redemption" ADD CONSTRAINT "redemption_team_name_fkey" FOREIGN KEY ("team_name") REFERENCES "teams"("team_name") ON DELETE RESTRICT ON UPDATE CASCADE;
